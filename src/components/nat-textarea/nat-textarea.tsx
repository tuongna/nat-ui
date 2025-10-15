import { Component, Host, h, Prop, Event, EventEmitter, State, Watch, Method } from '@stencil/core';

/**
 * @slot - Textarea content
 */
@Component({
  tag: 'nat-textarea',
  styleUrl: 'nat-textarea.css',
  shadow: true,
})
export class NatTextarea {
  private textareaElement?: HTMLTextAreaElement;

  /**
   * The value of the textarea
   * @default ''
   */
  @Prop({ mutable: true }) value: string = '';

  /**
   * Placeholder text when textarea is empty
   * @default ''
   */
  @Prop() placeholder: string = '';

  /**
   * Label text displayed above the textarea
   * @default ''
   */
  @Prop() label: string = '';

  /**
   * Helper text displayed below the textarea
   * @default ''
   */
  @Prop() helperText: string = '';

  /**
   * Error message displayed below the textarea (replaces helper text)
   * @default ''
   */
  @Prop() error: string = '';

  /**
   * If true, the textarea is disabled
   * @default false
   */
  @Prop() disabled: boolean = false;

  /**
   * If true, the textarea is readonly
   * @default false
   */
  @Prop() readonly: boolean = false;

  /**
   * If true, the textarea is required
   * @default false
   */
  @Prop() required: boolean = false;

  /**
   * Number of visible text lines (height)
   * @default 3
   */
  @Prop() rows: number = 3;

  /**
   * Maximum number of characters allowed
   */
  @Prop() maxLength?: number;

  /**
   * Minimum number of characters required
   */
  @Prop() minLength?: number;

  /**
   * If true, shows a clear button when textarea has value
   * @default false
   */
  @Prop() clearable: boolean = false;

  /**
   * If true, the textarea takes full width of its container
   * @default false
   */
  @Prop() fullWidth: boolean = false;

  /**
   * Name attribute for form submission
   * @default ''
   */
  @Prop() name: string = '';

  /**
   * ID attribute for the textarea element
   * @default ''
   */
  @Prop() textareaId: string = '';

  /**
   * Aria label for accessibility
   */
  @Prop() ariaLabel?: string;

  /**
   * If true, shows character counter when maxLength is set
   * @default false
   */
  @Prop() showCounter: boolean = false;

  /**
   * If true, textarea auto-resizes to fit content
   * @default false
   */
  @Prop() autoResize: boolean = false;

  /**
   * Resize behavior: 'none', 'vertical', 'horizontal', 'both'
   * @default 'vertical'
   */
  @Prop() resize: 'none' | 'vertical' | 'horizontal' | 'both' = 'vertical';

  /**
   * Internal focus state
   */
  @State() isFocused: boolean = false;

  /**
   * Emitted when the textarea value changes (on blur)
   */
  @Event() natChange: EventEmitter<string>;

  /**
   * Emitted on every input event (real-time)
   */
  @Event() natInput: EventEmitter<string>;

  /**
   * Emitted when textarea receives focus
   */
  @Event() natFocus: EventEmitter<void>;

  /**
   * Emitted when textarea loses focus
   */
  @Event() natBlur: EventEmitter<void>;

  /**
   * Emitted when clear button is clicked
   */
  @Event() natClear: EventEmitter<void>;

  @Watch('value')
  valueChanged(newValue: string) {
    if (this.textareaElement && this.textareaElement.value !== newValue) {
      this.textareaElement.value = newValue;
    }
    
    if (this.autoResize) {
      this.adjustHeight();
    }
  }

  componentDidLoad() {
    if (this.autoResize) {
      this.adjustHeight();
    }
  }

  private adjustHeight() {
    if (!this.textareaElement || !this.autoResize) return;
    
    // Reset height to recalculate
    this.textareaElement.style.height = 'auto';
    // Set height to scrollHeight
    this.textareaElement.style.height = this.textareaElement.scrollHeight + 'px';
  }

  private handleInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.natInput.emit(this.value);
    
    if (this.autoResize) {
      this.adjustHeight();
    }
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
    
    if (this.autoResize) {
      this.adjustHeight();
    }
  };

  /**
   * Sets focus on the textarea element
   */
  @Method()
  async setFocus() {
    this.textareaElement?.focus();
  }

  /**
   * Removes focus from the textarea element
   */
  @Method()
  async removeFocus() {
    this.textareaElement?.blur();
  }

  /**
   * Selects all text in the textarea
   */
  @Method()
  async select() {
    this.textareaElement?.select();
  }

  private getCharacterCount() {
    return this.value.length;
  }

  render() {
    const hasError = !!this.error;
    const showClear = this.clearable && this.value && !this.disabled && !this.readonly;
    const showCount = this.showCounter && this.maxLength;

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
            <label class="nat-textarea-label" htmlFor={this.textareaId || undefined}>
              {this.label}
              {this.required && <span class="nat-textarea-required">*</span>}
            </label>
          )}

          <div class={wrapperClasses}>
            <textarea
              ref={el => (this.textareaElement = el)}
              class={{
                'nat-textarea': true,
                [`nat-textarea--resize-${this.resize}`]: true,
                'nat-textarea--auto-resize': this.autoResize,
              }}
              rows={this.rows}
              value={this.value}
              placeholder={this.placeholder}
              disabled={this.disabled}
              readonly={this.readonly}
              required={this.required}
              maxLength={this.maxLength}
              minLength={this.minLength}
              name={this.name}
              id={this.textareaId || undefined}
              aria-label={this.ariaLabel || this.label || undefined}
              aria-invalid={hasError ? 'true' : 'false'}
              aria-required={this.required ? 'true' : 'false'}
              aria-disabled={this.disabled ? 'true' : 'false'}
              onInput={this.handleInput}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />

            {showClear && (
              <button
                type="button"
                class="nat-textarea-clear"
                onClick={this.handleClear}
                tabIndex={-1}
                aria-label="Clear text"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </button>
            )}
          </div>

          <div class="nat-textarea-footer">
            {(this.helperText || hasError) && (
              <div class={`nat-textarea-message ${hasError ? 'nat-textarea-message--error' : ''}`}>
                {hasError ? this.error : this.helperText}
              </div>
            )}

            {showCount && (
              <div class="nat-textarea-counter">
                {this.getCharacterCount()} / {this.maxLength}
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
