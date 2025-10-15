import { Component, Host, h, Prop, Event, EventEmitter, State, Watch, Method } from '@stencil/core';

/**
 * HTML input types supported by the component
 */
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

/**
 * Size variants for the input
 */
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Visual style variants for the input
 */
export type InputVariant = 'default' | 'filled' | 'flushed';

/**
 * @slot prefix-icon - Icon or content displayed before the input
 * @slot suffix-icon - Icon or content displayed after the input
 */
@Component({
  tag: 'nat-input',
  styleUrl: 'nat-input.css',
  shadow: true,
})
export class NatInput {
  private inputElement?: HTMLInputElement;

  /**
   * The HTML input type
   * @default 'text'
   */
  @Prop() type: InputType = 'text';

  /**
   * The size of the input
   * @default 'md'
   */
  @Prop() size: InputSize = 'md';

  /**
   * The visual style variant
   * @default 'default'
   */
  @Prop() variant: InputVariant = 'default';

  /**
   * The value of the input
   * @default ''
   */
  @Prop({ mutable: true }) value: string = '';

  /**
   * Placeholder text when input is empty
   * @default ''
   */
  @Prop() placeholder: string = '';

  /**
   * Label text displayed above the input
   * @default ''
   */
  @Prop() label: string = '';

  /**
   * Helper text displayed below the input
   * @default ''
   */
  @Prop() helperText: string = '';

  /**
   * Error message displayed below the input (replaces helper text)
   * @default ''
   */
  @Prop() error: string = '';

  /**
   * If true, the input is disabled
   * @default false
   */
  @Prop() disabled: boolean = false;

  /**
   * If true, the input is readonly
   * @default false
   */
  @Prop() readonly: boolean = false;

  /**
   * If true, the input is required
   * @default false
   */
  @Prop() required: boolean = false;

  /**
   * If true, shows a clear button when input has value
   * @default false
   */
  @Prop() clearable: boolean = false;

  /**
   * If true, the input takes full width of its container
   * @default false
   */
  @Prop() fullWidth: boolean = false;

  /**
   * Maximum length of input value
   */
  @Prop() maxLength?: number;

  /**
   * Minimum length of input value
   */
  @Prop() minLength?: number;

  /**
   * Pattern for input validation (regex)
   */
  @Prop() pattern?: string;

  /**
   * Step value for number inputs
   */
  @Prop() step?: string;

  /**
   * Autocomplete attribute value
   * @default 'off'
   */
  @Prop() autocomplete: string = 'off';

  /**
   * Name attribute for the input
   * @default ''
   */
  @Prop() name: string = '';

  /**
   * ID attribute for the input element
   * @default ''
   */
  @Prop() inputId: string = '';

  /**
   * Aria label for accessibility
   */
  @Prop() ariaLabel?: string;

  /**
   * Internal focus state
   */
  @State() isFocused: boolean = false;

  /**
   * Emitted when the input value changes (on blur or Enter key)
   */
  @Event() natChange: EventEmitter<string>;

  /**
   * Emitted on every input event (real-time)
   */
  @Event() natInput: EventEmitter<string>;

  /**
   * Emitted when input receives focus
   */
  @Event() natFocus: EventEmitter<void>;

  /**
   * Emitted when input loses focus
   */
  @Event() natBlur: EventEmitter<void>;

  /**
   * Emitted when clear button is clicked
   */
  @Event() natClear: EventEmitter<void>;

  @Watch('value')
  valueChanged(newValue: string) {
    if (this.inputElement && this.inputElement.value !== newValue) {
      this.inputElement.value = newValue;
    }
  }

  private handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.natInput.emit(this.value);
  };

  private handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.natChange.emit(this.value);
  };

  private handleFocus = () => {
    this.isFocused = true;
    this.natFocus.emit();
  };

  private handleBlur = () => {
    this.isFocused = false;
    this.natBlur.emit();
  };

  private handleClear = () => {
    this.value = '';
    this.natClear.emit();
    this.natChange.emit('');
    if (this.inputElement) {
      this.inputElement.focus();
    }
  };

  /**
   * Sets focus on the input element
   */
  @Method()
  async setFocus() {
    this.inputElement?.focus();
  }

  /**
   * Removes focus from the input element
   */
  @Method()
  async removeFocus() {
    this.inputElement?.blur();
  }

  /**
   * Selects all text in the input
   */
  @Method()
  async select() {
    this.inputElement?.select();
  }

  render() {
    const hasError = !!this.error;
    const showClear = this.clearable && this.value && !this.disabled && !this.readonly;

    const containerClasses = {
      'nat-input-container': true,
      'nat-input-container--full-width': this.fullWidth,
    };

    const wrapperClasses = {
      'nat-input-wrapper': true,
      [`nat-input-wrapper--${this.size}`]: true,
      [`nat-input-wrapper--${this.variant}`]: true,
      'nat-input-wrapper--focused': this.isFocused,
      'nat-input-wrapper--error': hasError,
      'nat-input-wrapper--disabled': this.disabled,
    };

    return (
      <Host>
        <div class={containerClasses}>
          {this.label && (
            <label class="nat-input-label" htmlFor={this.inputId || undefined}>
              {this.label}
              {this.required && <span class="nat-input-required">*</span>}
            </label>
          )}

          <div class={wrapperClasses}>
            <slot name="prefix-icon" />

            <input
              ref={el => (this.inputElement = el)}
              type={this.type}
              class="nat-input"
              placeholder={this.placeholder}
              disabled={this.disabled}
              readonly={this.readonly}
              required={this.required}
              maxLength={this.maxLength}
              minLength={this.minLength}
              pattern={this.pattern}
              step={this.step}
              autocomplete={this.autocomplete}
              name={this.name}
              id={this.inputId || undefined}
              aria-label={this.ariaLabel || this.label || undefined}
              aria-invalid={hasError ? 'true' : 'false'}
              aria-required={this.required ? 'true' : 'false'}
              aria-disabled={this.disabled ? 'true' : 'false'}
              value={this.value}
              onInput={this.handleInput}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />

            {showClear && (
              <button type="button" class="nat-input-clear" onClick={this.handleClear} tabIndex={-1} aria-label="Clear input">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </button>
            )}

            <slot name="suffix-icon" />
          </div>

          {(this.helperText || hasError) && <div class={`nat-input-message ${hasError ? 'nat-input-message--error' : ''}`}>{hasError ? this.error : this.helperText}</div>}
        </div>
      </Host>
    );
  }
}
