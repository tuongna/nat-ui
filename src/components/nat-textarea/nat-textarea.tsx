import { Component, Host, h, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';

@Component({
  tag: 'nat-textarea',
  styleUrl: 'nat-textarea.css',
  shadow: true,
})
export class NatTextarea {
  private textareaElement?: HTMLTextAreaElement;

  @Prop({ mutable: true }) value: string = '';
  @Prop() placeholder: string = '';
  @Prop() label: string = '';
  @Prop() helperText: string = '';
  @Prop() error: string = '';
  @Prop() disabled: boolean = false;
  @Prop() readonly: boolean = false;
  @Prop() required: boolean = false;
  @Prop() rows: number = 3;
  @Prop() maxLength: number;
  @Prop() minLength: number;
  @Prop() clearable: boolean = false;
  @Prop() fullWidth: boolean = false;
  @Prop() name: string = '';
  @Prop() textareaId: string = '';
  @State() isFocused: boolean = false;
  @Event() natChange: EventEmitter<string>;
  @Event() natInput: EventEmitter<string>;
  @Event() natFocus: EventEmitter<void>;
  @Event() natBlur: EventEmitter<void>;
  @Event() natClear: EventEmitter<void>;

  @Watch('value')
  valueChanged(newValue: string) {
    if (this.textareaElement && this.textareaElement.value !== newValue) {
      this.textareaElement.value = newValue;
    }
  }

  private handleInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.natInput.emit(this.value);
  };

  private handleChange = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
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
    if (this.textareaElement) {
      this.textareaElement.focus();
    }
  };

  async setFocus() {
    this.textareaElement?.focus();
  }

  async removeFocus() {
    this.textareaElement?.blur();
  }

  render() {
    const hasError = !!this.error;
    const showClear = this.clearable && this.value && !this.disabled && !this.readonly;

    const containerClasses = {
      'nat-textarea-container': true,
      'nat-textarea-container--full-width': this.fullWidth,
    };

    const wrapperClasses = {
      'nat-textarea-wrapper': true,
      'nat-textarea-wrapper--focused': this.isFocused,
      'nat-textarea-wrapper--error': hasError,
      'nat-textarea-wrapper--disabled': this.disabled,
    };

    return (
      <Host>
        <div class={containerClasses}>
          {this.label && (
            <label class="nat-textarea-label" htmlFor={this.textareaId}>
              {this.label}
              {this.required && <span class="nat-textarea-required">*</span>}
            </label>
          )}

          <div class={wrapperClasses}>
            <textarea
              ref={el => (this.textareaElement = el)}
              class="nat-textarea"
              rows={this.rows}
              value={this.value}
              placeholder={this.placeholder}
              disabled={this.disabled}
              readonly={this.readonly}
              required={this.required}
              maxLength={this.maxLength}
              minLength={this.minLength}
              name={this.name}
              id={this.textareaId}
              onInput={this.handleInput}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />

            {showClear && (
              <button type="button" class="nat-textarea-clear" onClick={this.handleClear} tabIndex={-1} aria-label="Clear text">
                ✕
              </button>
            )}
          </div>

          {(this.helperText || hasError) && <div class={`nat-textarea-message ${hasError ? 'nat-textarea-message--error' : ''}`}>{hasError ? this.error : this.helperText}</div>}
        </div>
      </Host>
    );
  }
}
