import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'nat-button',
  styleUrl: 'nat-button.css',
  shadow: true,
})
export class NatButton {
  @Prop() variant: ButtonVariant = 'primary';
  @Prop() size: ButtonSize = 'md';
  @Prop() disabled: boolean = false;
  @Prop() loading: boolean = false;
  @Prop() fullWidth: boolean = false;
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

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
        >
          {this.loading && (
            <span class="nat-button__spinner">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round" />
              </svg>
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
