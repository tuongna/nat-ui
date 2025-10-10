import { Component, Host, h, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'flushed';

@Component({
  tag: 'nat-input',
  styleUrl: 'nat-input.css',
  shadow: true,
})
export class NatInput {
  private inputElement?: HTMLInputElement;

  @Prop() type: InputType = 'text';
  @Prop() size: InputSize = 'md';
  @Prop() variant: InputVariant = 'default';
  @Prop({ mutable: true }) value: string = '';
  @Prop() placeholder: string = '';
  @Prop() label: string = '';
  @Prop() helperText: string = '';
  @Prop() error: string = '';
  @Prop() disabled: boolean = false;
  @Prop() readonly: boolean = false;
  @Prop() required: boolean = false;
  @Prop() clearable: boolean = false;
  @Prop() fullWidth: boolean = false;
  @Prop() prefixIcon: string = '';
  @Prop() suffixIcon: string = '';
  @Prop() maxLength: number;
  @Prop() minLength: number;
  @Prop() autocomplete: string = 'off';
  @Prop() name: string = '';
  @Prop() inputId: string = '';
  @State() isFocused: boolean = false;
  @Event() natChange: EventEmitter<string>;
  @Event() natInput: EventEmitter<string>;
  @Event() natFocus: EventEmitter<void>;
  @Event() natBlur: EventEmitter<void>;
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

  async setFocus() {
    this.inputElement?.focus();
  }

  async removeFocus() {
    this.inputElement?.blur();
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
            <label class="nat-input-label" htmlFor={this.inputId}>
              {this.label}
              {this.required && <span class="nat-input-required">*</span>}
            </label>
          )}

          <div class={wrapperClasses}>
            {this.prefixIcon && (
              <span class="nat-input-prefix">
                <slot name="prefix-icon" />
              </span>
            )}

            <input
              ref={(el) => (this.inputElement = el)}
              type={this.type}
              class="nat-input"
              value={this.value}
              placeholder={this.placeholder}
              disabled={this.disabled}
              readonly={this.readonly}
              required={this.required}
              maxLength={this.maxLength}
              minLength={this.minLength}
              autocomplete={this.autocomplete}
              name={this.name}
              id={this.inputId}
              onInput={this.handleInput}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />

            {showClear && (
              <button
                type="button"
                class="nat-input-clear"
                onClick={this.handleClear}
                tabIndex={-1}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </button>
            )}

            {this.suffixIcon && (
              <span class="nat-input-suffix">
                <slot name="suffix-icon" />
              </span>
            )}
          </div>

          {(this.helperText || hasError) && (
            <div class={`nat-input-message ${hasError ? 'nat-input-message--error' : ''}`}>
              {hasError ? this.error : this.helperText}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
