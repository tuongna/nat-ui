import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

/**
 * Visual style variants for the button
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'warning';

/**
 * Size variants for the button
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * @slot - Button content (text, icons, etc.)
 */
@Component({
  tag: 'nat-button',
  styleUrl: 'nat-button.css',
  shadow: true,
})
export class NatButton {
  /**
   * The visual style variant of the button
   * @default 'primary'
   */
  @Prop() variant: ButtonVariant = 'primary';

  /**
   * The size of the button
   * @default 'md'
   */
  @Prop() size: ButtonSize = 'md';

  /**
   * If true, the button is disabled and cannot be interacted with
   * @default false
   */
  @Prop() disabled: boolean = false;

  /**
   * If true, displays a loading spinner and disables interaction
   * @default false
   */
  @Prop() loading: boolean = false;

  /**
   * If true, the button will take up the full width of its container
   * @default false
   */
  @Prop() fullWidth: boolean = false;

  /**
   * The HTML button type attribute
   * @default 'button'
   */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Aria label for the button (accessibility)
   */
  @Prop() ariaLabel?: string;

  /**
   * Emitted when the button is clicked (not fired when disabled or loading)
   */
  @Event() natClick: EventEmitter<MouseEvent>;

  private handleClick = (event: MouseEvent) => {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.natClick.emit(event);
  };

  render() {
    const classes = {
      'nat-button': true,
      [`nat-button--${this.variant}`]: true,
      [`nat-button--${this.size}`]: true,
      'nat-button--disabled': this.disabled,
      'nat-button--loading': this.loading,
      'nat-button--full-width': this.fullWidth,
    };

    return (
      <Host>
        <button
          type={this.type}
          class={classes}
          disabled={this.disabled || this.loading}
          onClick={this.handleClick}
          aria-label={this.ariaLabel}
          aria-busy={this.loading ? 'true' : 'false'}
          aria-disabled={this.disabled ? 'true' : 'false'}
        >
          {this.loading && (
            <span class="nat-button__spinner" aria-hidden="true">
              {/* CSS border spinner - simpler & no transform conflict */}
            </span>
          )}
          <span class="nat-button__content">
            <slot />
          </span>
        </button>
      </Host>
    );
  }
}
