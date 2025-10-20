import { Component, Prop, h, State, Element, Event, EventEmitter, Listen, Watch, Host } from '@stencil/core';

// Inject global popover styles once
let popoverStylesInjected = false;

function injectPopoverStyles() {
  if (popoverStylesInjected) return;

  const styleElement = document.createElement('style');
  styleElement.id = 'nat-popover-styles';
  styleElement.textContent = `
    .nat-popover {
      position: fixed;
      z-index: 2200;
      background: var(--nat-bg-elevated, #ffffff);
      border-radius: 12px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
      min-width: 180px;
      max-width: 320px;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
      color: #1a1a1a;
      opacity: 0;
      transform: scale(0.95);
      transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .nat-popover--visible {
      opacity: 1;
      transform: scale(1);
    }

    .nat-popover--sm { min-width: 150px; max-width: 220px; padding: 12px; }
    .nat-popover--md { min-width: 180px; max-width: 320px; padding: 16px; }
    .nat-popover--lg { min-width: 320px; max-width: 480px; padding: 20px; }

    .nat-popover__content {
      line-height: 1.5;
      word-wrap: break-word;
    }

    .nat-popover__arrow {
      position: absolute;
      width: 14px;
      height: 14px;
      background: var(--nat-bg-elevated, #ffffff);
      transform: rotate(45deg);
      z-index: 1;
    }

    .nat-popover--top .nat-popover__arrow { bottom: -7px; left: 50%; transform: translateX(-50%) rotate(45deg); }
    .nat-popover--bottom .nat-popover__arrow { top: -7px; left: 50%; transform: translateX(-50%) rotate(45deg); }
    .nat-popover--left .nat-popover__arrow { right: -7px; top: 50%; transform: translateY(-50%) rotate(45deg); }
    .nat-popover--right .nat-popover__arrow { left: -7px; top: 50%; transform: translateY(-50%) rotate(45deg); }

    /* Mist theme */
    :root[data-theme='mist'] .nat-popover {
      background: rgba(255,255,255,0.7);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(255,255,255,0.2);
    }
    :root[data-theme='mist'] .nat-popover__arrow {
      background: rgba(255,255,255,0.7);
    }
  `;

  document.head.appendChild(styleElement);
  popoverStylesInjected = true;
}

/**
 * Popover component for contextual overlays
 *
 * @slot - Popover content
 * @slot trigger - Trigger element
 */
@Component({
  tag: 'nat-popover',
  styleUrl: 'nat-popover.css',
  shadow: true,
})
export class NatPopover {
  @Element() el!: HTMLElement;

  private triggerRef?: HTMLElement;
  private popoverElement?: HTMLDivElement;
  private contentSlot?: HTMLSlotElement;

  /**
   * When true, shows the popover
   */
  @Prop({ mutable: true }) open: boolean = false;

  /**
   * Placement of the popover relative to trigger
   */
  @Prop() placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  /**
   * Whether to close when clicking outside
   */
  @Prop() closeOnOutside: boolean = true;

  /**
   * Whether to show arrow
   */
  @Prop() showArrow: boolean = true;

  /**
   * Popover size
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Emitted when popover opens
   */
  @Event() natOpen: EventEmitter<void>;

  /**
   * Emitted when popover closes
   */
  @Event() natClose: EventEmitter<void>;

  @State() visible: boolean = false;

  @Watch('open')
  onOpenChange(newValue: boolean) {
    if (newValue) {
      this.visible = true;
      this.createPopover();
      requestAnimationFrame(() => {
        this.updatePosition();
      });
    } else {
      this.visible = false;
      this.destroyPopover();
    }
  }

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (!this.closeOnOutside || !this.open) return;

    const target = event.target as Node;
    if (!this.el.contains(target) && target !== this.popoverElement) {
      this.open = false;
    }
  }

  componentWillLoad() {
    injectPopoverStyles();
  }

  componentDidLoad() {
    // Get trigger slot
    const triggerSlot = this.el.shadowRoot?.querySelector('slot[name="trigger"]') as HTMLSlotElement;
    if (triggerSlot) {
      const assignedElements = triggerSlot.assignedElements();
      if (assignedElements.length > 0) {
        this.triggerRef = assignedElements[0] as HTMLElement;
      }
    }

    // Get content slot
    this.contentSlot = this.el.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;

    if (this.open) {
      this.visible = true;
      this.createPopover();
      requestAnimationFrame(() => {
        this.updatePosition();
      });
    }
  }

  disconnectedCallback() {
    this.destroyPopover();
  }

  private getPopoverContent(): HTMLElement[] {
    if (this.contentSlot) {
      const assignedElements = this.contentSlot.assignedElements();
      if (assignedElements.length > 0) {
        return Array.from(assignedElements) as HTMLElement[];
      }

      // Fallback to text nodes
      const assignedNodes = this.contentSlot.assignedNodes();
      if (assignedNodes.length > 0) {
        const textContent = assignedNodes.map(node => node.textContent || '').join('');
        if (textContent.trim()) {
          const textDiv = document.createElement('div');
          textDiv.textContent = textContent;
          return [textDiv];
        }
      }
    }
    return [];
  }

  private createPopover() {
    if (this.popoverElement) return;

    this.popoverElement = document.createElement('div');
    this.popoverElement.className = `nat-popover nat-popover--${this.placement} nat-popover--${this.size}`;
    this.popoverElement.setAttribute('role', 'dialog');
    this.popoverElement.setAttribute('aria-modal', 'false');

    const contentDiv = document.createElement('div');
    contentDiv.className = 'nat-popover__content';

    // Set content from slot
    const popoverContent = this.getPopoverContent();
    popoverContent.forEach(element => {
      const clonedElement = element.cloneNode(true) as HTMLElement;
      contentDiv.appendChild(clonedElement);
    });

    this.popoverElement.appendChild(contentDiv);

    // Add arrow
    if (this.showArrow) {
      const arrowDiv = document.createElement('div');
      arrowDiv.className = 'nat-popover__arrow';
      this.popoverElement.appendChild(arrowDiv);
    }

    document.body.appendChild(this.popoverElement);

    requestAnimationFrame(() => {
      if (this.popoverElement) {
        this.popoverElement.classList.add('nat-popover--visible');
        this.natOpen.emit();
      }
    });
  }

  private destroyPopover() {
    if (this.popoverElement) {
      this.popoverElement.classList.remove('nat-popover--visible');
      setTimeout(() => {
        if (this.popoverElement && this.popoverElement.parentNode) {
          this.popoverElement.parentNode.removeChild(this.popoverElement);
          this.popoverElement = undefined;
        }
        this.natClose.emit();
      }, 200);
    }
  }

  private updatePosition() {
    if (!this.triggerRef || !this.popoverElement) return;

    const triggerRect = this.triggerRef.getBoundingClientRect();
    const popoverRect = this.popoverElement.getBoundingClientRect();

    let top = 0;
    let left = 0;
    const offset = 12;

    switch (this.placement) {
      case 'top':
        top = triggerRect.top - popoverRect.height - offset;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + offset;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.left - popoverRect.width - offset;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.right + offset;
        break;
    }

    // Keep within viewport
    const padding = 8;
    const maxLeft = window.innerWidth - popoverRect.width - padding;
    const maxTop = window.innerHeight - popoverRect.height - padding;

    if (left < padding) left = padding;
    if (left > maxLeft) left = maxLeft;
    if (top < padding) top = padding;
    if (top > maxTop) top = maxTop;

    this.popoverElement.style.top = `${Math.round(top)}px`;
    this.popoverElement.style.left = `${Math.round(left)}px`;
  }

  render() {
    return (
      <Host>
        <div class="popover-wrapper">
          <slot name="trigger" />
          <div style={{ display: 'none' }}>
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
