import { Component, Prop, Event, EventEmitter, Host, h, State } from '@stencil/core';

/**
 * Alert component for displaying important messages
 *
 * @slot - Alert message content
 * @slot title - Alert title
 * @slot icon - Custom icon
 * @slot actions - Action buttons
 */
@Component({
  tag: 'nat-alert',
  styleUrl: 'nat-alert.css',
  shadow: true,
})
export class NatAlert {
  /**
   * Alert variant
   */
  @Prop() variant: 'info' | 'success' | 'warning' | 'danger' = 'info';

  /**
   * Show close button
   */
  @Prop() closable: boolean = false;

  /**
   * Show icon
   */
  @Prop() showIcon: boolean = true;

  /**
   * Alert size
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Use outline style
   */
  @Prop() outline: boolean = false;

  /**
   * Emitted when alert is closed
   */
  @Event() natClose!: EventEmitter<void>;

  @State() visible: boolean = true;

  private handleClose = () => {
    this.visible = false;
    this.natClose.emit();
  };

  private getDefaultIcon() {
    switch (this.variant) {
      case 'success':
        return (
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        );
      case 'warning':
        return (
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            />
          </svg>
        );
      case 'danger':
        return (
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clip-rule="evenodd"
            />
          </svg>
        );
      default: // info
        return (
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
              clip-rule="evenodd"
            />
          </svg>
        );
    }
  }

  render() {
    if (!this.visible) {
      return null;
    }

    return (
      <Host>
        <div
          class={{
            'alert': true,
            [`alert--${this.variant}`]: true,
            [`alert--${this.size}`]: true,
            'alert--outline': this.outline,
          }}
          role="alert"
        >
          {this.showIcon && (
            <div class="alert__icon">
              <slot name="icon">{this.getDefaultIcon()}</slot>
            </div>
          )}

          <div class="alert__content">
            <div class="alert__title">
              <slot name="title" />
            </div>

            <div class="alert__message">
              <slot />
            </div>

            <div class="alert__actions">
              <slot name="actions" />
            </div>
          </div>

          {this.closable && (
            <button class="alert__close" onClick={this.handleClose} aria-label="Close alert" type="button">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          )}
        </div>
      </Host>
    );
  }
}
