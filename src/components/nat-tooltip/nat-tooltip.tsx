import { Component, Prop, Host, h, Element, State, Listen, Watch } from '@stencil/core';

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
      requestAnimationFrame(() => {
        this.updatePosition();
      });
    }
  }

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (this.trigger !== 'click') return;

    const target = event.target as Node;
    if (!this.el.contains(target)) {
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
  }

  disconnectedCallback() {
    this.removeTrigger();
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
          <div
            ref={el => (this.tooltipElement = el as HTMLDivElement)}
            class={{
              'nat-tooltip': true,
              [`nat-tooltip--${this.placement}`]: true,
              [`nat-tooltip--${this.size}`]: true,
              'nat-tooltip--visible': this.visible,
            }}
            role="tooltip"
          >
            <div class="nat-tooltip__content">
              {this.content ? this.content : <slot />}
            </div>
            <div class="nat-tooltip__arrow" />
          </div>
        </div>
      </Host>
    );
  }
}
