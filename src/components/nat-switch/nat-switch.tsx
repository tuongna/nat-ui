import { Component, Prop, Event, EventEmitter, Host, h, State, Element } from '@stencil/core';

/**
 * Toggle switch for binary states
 *
 * @slot - Switch label content
 */
@Component({
  tag: 'nat-switch',
  styleUrl: 'nat-switch.css',
  shadow: true,
})
export class NatSwitch {
  @Element() el!: HTMLElement;

  private inputId = `nat-switch-${switchIds++}`;

  /**
   * The name of the switch
   */
  @Prop() name?: string;

  /**
   * Whether the switch is checked
   */
  @Prop({ mutable: true }) checked: boolean = false;

  /**
   * Whether the switch is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * Size variant
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Position of the label
   */
  @Prop() labelPosition: 'left' | 'right' = 'right';

  /**
   * Color variant when checked
   */
  @Prop() color: 'primary' | 'success' | 'warning' | 'danger' = 'primary';

  /**
   * Show loading state
   */
  @Prop() loading: boolean = false;

  /**
   * Emitted when the switch value changes
   */
  @Event() natChange!: EventEmitter<{ checked: boolean }>;

  /**
   * Emitted when the switch receives focus
   */
  @Event() natFocus!: EventEmitter<void>;

  /**
   * Emitted when the switch loses focus
   */
  @Event() natBlur!: EventEmitter<void>;

  @State() hasFocus: boolean = false;

  private handleChange = (event: Event) => {
    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }

    const target = event.target as HTMLInputElement;
    this.checked = target.checked;

    this.natChange.emit({
      checked: this.checked,
    });
  };

  private handleFocus = () => {
    this.hasFocus = true;
    this.natFocus.emit();
  };

  private handleBlur = () => {
    this.hasFocus = false;
    this.natBlur.emit();
  };

  render() {
    return (
      <Host>
        <label
          class={{
            'switch': true,
            'switch--checked': this.checked,
            'switch--disabled': this.disabled,
            'switch--loading': this.loading,
            'switch--focus': this.hasFocus,
            [`switch--${this.size}`]: true,
            [`switch--${this.color}`]: true,
            [`switch--label-${this.labelPosition}`]: true,
          }}
        >
          <input
            type="checkbox"
            id={this.inputId}
            name={this.name}
            checked={this.checked}
            disabled={this.disabled || this.loading}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            class="switch__input"
            role="switch"
            aria-checked={this.checked ? 'true' : 'false'}
          />

          <span class="switch__track">
            <span class="switch__thumb">
              {this.loading && (
                <svg class="switch__spinner" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeke-width="2" />
                </svg>
              )}
            </span>
          </span>

          <span class="switch__label">
            <slot />
          </span>
        </label>
      </Host>
    );
  }
}

let switchIds = 0;
