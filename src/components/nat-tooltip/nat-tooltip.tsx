import { Component, Prop, Host, h, Element, State, Listen, Watch } from '@stencil/core';

// Inject global tooltip styles once
let stylesInjected = false;

function injectGlobalStyles() {
  if (stylesInjected) return;

  const styleElement = document.createElement('style');
  styleElement.id = 'nat-tooltip-styles';
  styleElement.textContent = `
    .nat-tooltip {
      position: fixed;
      z-index: 1600;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
      background: #1a1a1a;
      color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
      pointer-events: none;
      opacity: 0;
      transform: scale(0.95);
      transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .nat-tooltip--visible {
      opacity: 1;
      transform: scale(1);
    }

    .nat-tooltip--sm {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      max-width: 150px;
    }

    .nat-tooltip--md {
      font-size: 0.875rem;
      padding: 0.5rem 0.75rem;
      max-width: 250px;
    }

    .nat-tooltip--lg {
      font-size: 1rem;
      padding: 0.75rem 1rem;
      max-width: 350px;
    }

    .nat-tooltip__content {
      line-height: 1.375;
      word-wrap: break-word;
    }

    .nat-tooltip__arrow {
      position: absolute;
      width: 8px;
      height: 8px;
      background: #1a1a1a;
      transform: rotate(45deg);
    }

    .nat-tooltip--top .nat-tooltip__arrow {
      bottom: -4px;
      left: 50%;
      margin-left: -4px;
    }

    .nat-tooltip--bottom .nat-tooltip__arrow {
      top: -4px;
      left: 50%;
      margin-left: -4px;
    }

    .nat-tooltip--left .nat-tooltip__arrow {
      right: -4px;
      top: 50%;
      margin-top: -4px;
    }

    .nat-tooltip--right .nat-tooltip__arrow {
      left: -4px;
      top: 50%;
      margin-top: -4px;
    }

    @media (prefers-color-scheme: dark) {
      .nat-tooltip {
        background: #2d2d2d;
      }
      
      .nat-tooltip__arrow {
        background: #2d2d2d;
      }
    }
  `;

  document.head.appendChild(styleElement);
  stylesInjected = true;
}

/**
 * Tooltip component for displaying helpful information on hover
 *
 * @slot - Tooltip content
 * @slot trigger - Element that triggers the tooltip
 */
@Component({
  tag: 'nat-tooltip',
  styleUrl: 'nat-tooltip.css',
  shadow: true,
})
export class NatTooltip {
  @Element() el!: HTMLElement;

  private triggerRef?: HTMLElement;
  private tooltipElement?: HTMLDivElement;
  private hideTimeout?: number;
  private showTimeout?: number;
  private contentSlot?: HTMLSlotElement;

  /**
   * Tooltip content (alternative to default slot)
   */
  @Prop() content?: string;

  /**
   * Tooltip placement
   */
  @Prop() placement: 'top' | 'bottom' | 'left' | 'right' = 'top';

  /**
   * Trigger method
   */
  @Prop() trigger: 'hover' | 'click' | 'focus' = 'hover';

  /**
   * Show delay in milliseconds
   */
  @Prop() showDelay: number = 200;

  /**
   * Hide delay in milliseconds
   */
  @Prop() hideDelay: number = 100;

  /**
   * Tooltip size
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Disable tooltip
   */
  @Prop() disabled: boolean = false;

  @State() visible: boolean = false;

  @Watch('visible')
  onVisibleChange(newValue: boolean) {
    if (newValue) {
      this.createTooltip();
      requestAnimationFrame(() => {
        this.updatePosition();
      });
    } else {
      this.destroyTooltip();
    }
  }

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (this.trigger !== 'click') return;

    const target = event.target as Node;
    if (!this.el.contains(target) && target !== this.tooltipElement) {
      this.hide();
    }
  }

  @Listen('scroll', { target: 'window', passive: true })
  @Listen('resize', { target: 'window', passive: true })
  handleWindowEvent() {
    if (this.visible) {
      this.updatePosition();
    }
  }

  componentWillLoad() {
    injectGlobalStyles();
  }

  componentDidLoad() {
    // Get trigger slot
    const triggerSlot = this.el.shadowRoot?.querySelector('slot[name="trigger"]') as HTMLSlotElement;
    if (triggerSlot) {
      const assignedElements = triggerSlot.assignedElements();
      if (assignedElements.length > 0) {
        this.triggerRef = assignedElements[0] as HTMLElement;
        this.setupTrigger();
      }
    }

    // Get content slot
    this.contentSlot = this.el.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
  }

  disconnectedCallback() {
    this.removeTrigger();
    this.destroyTooltip();
    this.clearTimeouts();
  }

  private clearTimeouts() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = undefined;
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }
  }

  private setupTrigger() {
    if (!this.triggerRef) return;

    if (this.trigger === 'hover') {
      this.triggerRef.addEventListener('mouseenter', this.handleShow);
      this.triggerRef.addEventListener('mouseleave', this.handleHide);
    } else if (this.trigger === 'click') {
      this.triggerRef.addEventListener('click', this.handleToggle);
    } else if (this.trigger === 'focus') {
      this.triggerRef.addEventListener('focus', this.handleShow);
      this.triggerRef.addEventListener('blur', this.handleHide);
    }
  }

  private removeTrigger() {
    if (!this.triggerRef) return;

    this.triggerRef.removeEventListener('mouseenter', this.handleShow);
    this.triggerRef.removeEventListener('mouseleave', this.handleHide);
    this.triggerRef.removeEventListener('click', this.handleToggle);
    this.triggerRef.removeEventListener('focus', this.handleShow);
    this.triggerRef.removeEventListener('blur', this.handleHide);
  }

  private handleShow = () => {
    if (this.disabled) return;
    this.clearTimeouts();
    this.showTimeout = window.setTimeout(() => {
      this.show();
    }, this.showDelay);
  };

  private handleHide = () => {
    if (this.disabled) return;
    this.clearTimeouts();
    this.hideTimeout = window.setTimeout(() => {
      this.hide();
    }, this.hideDelay);
  };

  private handleToggle = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled) return;
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  };

  private show() {
    this.visible = true;
  }

  private hide() {
    this.visible = false;
  }

  private getTooltipContent(): string | HTMLElement[] {
    // Priority: content prop > slot content
    if (this.content) {
      return this.content;
    }

    // Get slotted content
    if (this.contentSlot) {
      const assignedElements = this.contentSlot.assignedElements();
      if (assignedElements.length > 0) {
        return Array.from(assignedElements) as HTMLElement[];
      }

      // Fallback to text nodes
      const assignedNodes = this.contentSlot.assignedNodes();
      if (assignedNodes.length > 0) {
        return assignedNodes.map(node => node.textContent || '').join('');
      }
    }

    return '';
  }

  private createTooltip() {
    if (this.tooltipElement) return;

    this.tooltipElement = document.createElement('div');
    this.tooltipElement.className = `nat-tooltip nat-tooltip--${this.placement} nat-tooltip--${this.size}`;
    this.tooltipElement.setAttribute('role', 'tooltip');

    const contentDiv = document.createElement('div');
    contentDiv.className = 'nat-tooltip__content';

    // Set content
    const tooltipContent = this.getTooltipContent();
    if (typeof tooltipContent === 'string') {
      contentDiv.textContent = tooltipContent;
    } else if (Array.isArray(tooltipContent)) {
      // Clone and append HTML elements
      tooltipContent.forEach(element => {
        const clonedElement = element.cloneNode(true) as HTMLElement;
        contentDiv.appendChild(clonedElement);
      });
    }

    const arrowDiv = document.createElement('div');
    arrowDiv.className = 'nat-tooltip__arrow';

    this.tooltipElement.appendChild(contentDiv);
    this.tooltipElement.appendChild(arrowDiv);

    document.body.appendChild(this.tooltipElement);

    requestAnimationFrame(() => {
      if (this.tooltipElement) {
        this.tooltipElement.classList.add('nat-tooltip--visible');
      }
    });
  }

  private destroyTooltip() {
    if (this.tooltipElement) {
      this.tooltipElement.classList.remove('nat-tooltip--visible');
      setTimeout(() => {
        if (this.tooltipElement && this.tooltipElement.parentNode) {
          this.tooltipElement.parentNode.removeChild(this.tooltipElement);
          this.tooltipElement = undefined;
        }
      }, 150);
    }
  }

  private updatePosition() {
    if (!this.triggerRef || !this.tooltipElement) return;

    const triggerRect = this.triggerRef.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();

    let top = 0;
    let left = 0;
    const offset = 12;

    switch (this.placement) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - offset;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + offset;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - offset;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + offset;
        break;
    }

    const padding = 8;
    const maxLeft = window.innerWidth - tooltipRect.width - padding;
    const maxTop = window.innerHeight - tooltipRect.height - padding;

    if (left < padding) left = padding;
    if (left > maxLeft) left = maxLeft;
    if (top < padding) top = padding;
    if (top > maxTop) top = maxTop;

    this.tooltipElement.style.top = `${Math.round(top)}px`;
    this.tooltipElement.style.left = `${Math.round(left)}px`;
  }

  render() {
    return (
      <Host>
        <div class="tooltip-wrapper">
          <slot name="trigger" />
        </div>
        <div style={{ display: 'none' }}>
          <slot />
        </div>
      </Host>
    );
  }
}
