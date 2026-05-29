import { Component, Host, h, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';

/**
 * Number input with increment/decrement stepper buttons.
 */
@Component({
  tag: 'nat-number-input',
  styleUrl: 'nat-number-input.css',
  shadow: true,
})
export class NatNumberInput {
  /**
   * The current numeric value
   */
  @Prop({ mutable: true, reflect: true }) value: number = 0;

  /**
   * Minimum allowed value
   */
  @Prop() min: number = -Infinity;

  /**
   * Maximum allowed value
   */
  @Prop() max: number = Infinity;

  /**
   * Step size for increment/decrement
   * @default 1
   */
  @Prop() step: number = 1;

  /**
   * Number of decimal places to display
   */
  @Prop() precision?: number;

  /**
   * Input label
   */
  @Prop() label?: string;

  /**
   * Placeholder text
   */
  @Prop() placeholder: string = '0';

  /**
   * If true, the input is disabled
   * @default false
   */
  @Prop() disabled: boolean = false;

  /**
   * If true, the input is read-only
   * @default false
   */
  @Prop() readonly: boolean = false;

  /**
   * Size variant
   * @default 'md'
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Leading symbol shown before the input (e.g. '$', '€')
   */
  @Prop() adornStart?: string;

  /**
   * Trailing symbol shown after the input (e.g. 'kg', '%')
   */
  @Prop() adornEnd?: string;

  /**
   * Emitted when value changes
   */
  @Event() natChange: EventEmitter<number>;

  /**
   * Emitted on input while typing
   */
  @Event() natInput: EventEmitter<number>;

  @State() private inputValue: string = '';
  @State() private focused: boolean = false;

  componentWillLoad() {
    this.inputValue = this.formatValue(this.value);
  }

  @Watch('value')
  onValuePropChange(val: number) {
    if (!this.focused) {
      this.inputValue = this.formatValue(val);
    }
  }

  private formatValue(val: number): string {
    if (val === null || val === undefined || isNaN(val)) return '';
    return this.precision !== undefined ? val.toFixed(this.precision) : String(val);
  }

  private clamp(val: number): number {
    return Math.min(this.max, Math.max(this.min, val));
  }

  private increment = () => {
    if (this.disabled || this.readonly) return;
    const next = this.clamp(this.value + this.step);
    this.value = next;
    this.inputValue = this.formatValue(next);
    this.natChange.emit(next);
  };

  private decrement = () => {
    if (this.disabled || this.readonly) return;
    const next = this.clamp(this.value - this.step);
    this.value = next;
    this.inputValue = this.formatValue(next);
    this.natChange.emit(next);
  };

  private handleInput = (e: InputEvent) => {
    const raw = (e.target as HTMLInputElement).value;
    this.inputValue = raw;
    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) {
      this.natInput.emit(parsed);
    }
  };

  private handleBlur = () => {
    this.focused = false;
    const parsed = parseFloat(this.inputValue);
    if (!isNaN(parsed)) {
      const clamped = this.clamp(parsed);
      this.value = clamped;
      this.inputValue = this.formatValue(clamped);
      this.natChange.emit(clamped);
    } else {
      this.inputValue = this.formatValue(this.value);
    }
  };

  private handleFocus = () => {
    this.focused = true;
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.increment();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.decrement();
    }
  };

  render() {
    const canDecrement = !this.disabled && !this.readonly && this.value > this.min;
    const canIncrement = !this.disabled && !this.readonly && this.value < this.max;

    return (
      <Host>
        {this.label && (
          <label class="nat-number-input__label">{this.label}</label>
        )}
        <div
          class={{
            'nat-number-input': true,
            [`nat-number-input--${this.size}`]: true,
            'nat-number-input--disabled': this.disabled,
            'nat-number-input--focused': this.focused,
          }}
        >
          <button
            class="nat-number-input__btn nat-number-input__btn--dec"
            onClick={this.decrement}
            disabled={!canDecrement}
            tabIndex={-1}
            aria-label="Decrement"
          >
            <svg viewBox="0 0 12 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M1 1h10" />
            </svg>
          </button>

          <div class="nat-number-input__field">
            {this.adornStart && <span class="nat-number-input__affix">{this.adornStart}</span>}
            <input
              class="nat-number-input__input"
              type="number"
              min={this.min}
              max={this.max}
              step={this.step}
              value={this.inputValue}
              placeholder={this.placeholder}
              disabled={this.disabled}
              readOnly={this.readonly}
              onInput={this.handleInput}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              onKeyDown={this.handleKeyDown}
              aria-valuemin={this.min}
              aria-valuemax={this.max}
              aria-valuenow={this.value}
              aria-label={this.label}
            />
            {this.adornEnd && <span class="nat-number-input__affix">{this.adornEnd}</span>}
          </div>

          <button
            class="nat-number-input__btn nat-number-input__btn--inc"
            onClick={this.increment}
            disabled={!canIncrement}
            tabIndex={-1}
            aria-label="Increment"
          >
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M6 1v10M1 6h10" />
            </svg>
          </button>
        </div>
      </Host>
    );
  }
}
