import { Component, Prop, h, State, Event, EventEmitter, Method, Watch } from '@stencil/core';

/**
 * Toast component for transient notifications
 *
 * @slot - Custom content (message, actions)
 */
@Component({
  tag: 'nat-toast',
  styleUrl: 'nat-toast.css',
  shadow: true,
})
export class NatToast {
  /**
   * Toast message (as fallback if not using slot)
   */
  @Prop() message?: string;

  /**
   * Toast type variant
   */
  @Prop() variant: 'info' | 'success' | 'warning' | 'danger' = 'info';

  /**
   * Position on viewport
   */
  @Prop() position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' = 'bottom-right';

  /**
   * Visiblity control
   */
  @Prop({ mutable: true }) open: boolean = false;

  /**
   * Dismiss automatically after X ms (0 = sticky)
   */
  @Prop() duration: number = 3500;

  /**
   * Show close (X) button
   */
  @Prop() closable: boolean = true;

  /**
   * ARIA label for close button
   */
  @Prop() closeLabel: string = 'Close toast';

  /**
   * Emitted when toast closes
   */
  @Event() natClose: EventEmitter<void>;

  @State() visible: boolean = false;
  private closeTimeout?: number;

  @Watch('open')
  handleOpenChange(isOpen: boolean) {
    if (isOpen) {
      this.visible = true;
      this.startAutoClose();
    } else {
      this.triggerClose();
    }
  }

  componentDidLoad() {
    if (this.open) {
      this.visible = true;
      this.startAutoClose();
    }
  }

  private startAutoClose() {
    if (this.duration > 0) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = window.setTimeout(() => this.close(), this.duration);
    }
  }

  @Method()
  async close() {
    this.visible = false;
    this.open = false;
    setTimeout(() => this.natClose.emit(), 200); // Delay to match animation
  }

  private triggerClose = () => {
    this.visible = false;
    this.open = false;
    setTimeout(() => this.natClose.emit(), 200); // Delay to match animation
  };

  private handleManualClose = () => {
    this.close();
  };

  render() {
    if (!this.visible) return null;
    return (
      <div
        class={{
          toast: true,
          [`toast--${this.variant}`]: true,
          [`toast--${this.position}`]: true,
        }}
        tabindex={0}
        role="alert"
        aria-live="polite"
      >
        <span class="toast__icon"></span>
        <span class="toast__content">{this.message || <slot />}</span>
        {this.closable && (
          <button class="toast__close" aria-label={this.closeLabel} onClick={this.handleManualClose}>
            <nat-icon name="x" />
          </button>
        )}
      </div>
    );
  }
}
