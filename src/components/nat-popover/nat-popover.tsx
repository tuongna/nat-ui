import { Component, Prop, h, State, Element, Event, EventEmitter, Listen, Watch, Host } from '@stencil/core';

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
      requestAnimationFrame(() => {
        this.updatePosition();
        this.natOpen.emit();
      });
    } else {
      this.visible = false;
      this.natClose.emit();
    }
  }

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (!this.closeOnOutside || !this.open) return;

    const target = event.target as Node;
    if (!this.el.contains(target)) {
      this.open = false;
    }
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

    if (this.open) {
      this.visible = true;
      requestAnimationFrame(() => {
        this.updatePosition();
      });
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
          <div
            ref={el => (this.popoverElement = el as HTMLDivElement)}
            class={{
              'nat-popover': true,
              [`nat-popover--${this.placement}`]: true,
              [`nat-popover--${this.size}`]: true,
              'nat-popover--visible': this.visible,
            }}
            role="dialog"
            aria-modal="false"
          >
            <div class="nat-popover__content">
              <slot />
            </div>
            {this.showArrow && <div class="nat-popover__arrow" />}
          </div>
        </div>
      </Host>
    );
  }
}
