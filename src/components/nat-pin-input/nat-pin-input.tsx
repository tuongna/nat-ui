import { Component, Host, h, Prop, State, Event, EventEmitter, Watch, Method } from '@stencil/core';

/**
 * OTP / PIN code input — a series of connected single-digit fields
 * with auto-advance, paste support, and backspace navigation.
 */
@Component({
  tag: 'nat-pin-input',
  styleUrl: 'nat-pin-input.css',
  shadow: true,
})
export class NatPinInput {
  /**
   * Number of PIN digits
   * @default 6
   */
  @Prop() length: number = 6;

  /**
   * If true, hides the characters (password mode)
   * @default false
   */
  @Prop() masked: boolean = false;

  /**
   * Only allow numeric input
   * @default true
   */
  @Prop() numeric: boolean = true;

  /**
   * If true, all inputs are disabled
   * @default false
   */
  @Prop() disabled: boolean = false;

  /**
   * Size variant
   * @default 'md'
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Shows invalid state styling
   * @default false
   */
  @Prop() invalid: boolean = false;

  /**
   * Placeholder character shown in empty slots
   * @default '·'
   */
  @Prop() placeholder: string = '·';

  /**
   * Emitted when the full PIN is entered
   */
  @Event() natComplete: EventEmitter<string>;

  /**
   * Emitted on any value change
   */
  @Event() natChange: EventEmitter<string>;

  @State() private digits: string[] = [];
  @State() private focusedIndex: number = -1;

  private inputEls: HTMLInputElement[] = [];

  componentWillLoad() {
    this.digits = Array(this.length).fill('');
  }

  @Watch('length')
  onLengthChange(len: number) {
    this.digits = Array(len).fill('');
    this.inputEls = [];
  }

  /** Clear all digits */
  @Method()
  async clear() {
    this.digits = Array(this.length).fill('');
    this.inputEls[0]?.focus();
  }

  /** Get the current value as a string */
  @Method()
  async getValue(): Promise<string> {
    return this.digits.join('');
  }

  private isValidChar(char: string): boolean {
    if (this.numeric) return /^\d$/.test(char);
    return /^[a-zA-Z0-9]$/.test(char);
  }

  private handleInput = (e: InputEvent, index: number) => {
    const input = e.target as HTMLInputElement;
    const rawVal = input.value;

    // Handle paste
    if (rawVal.length > 1) {
      const chars = rawVal.split('').filter(c => this.isValidChar(c));
      const newDigits = [...this.digits];
      let i = index;
      for (const c of chars) {
        if (i >= this.length) break;
        newDigits[i] = c;
        i++;
      }
      this.digits = newDigits;
      const nextIdx = Math.min(i, this.length - 1);
      this.inputEls[nextIdx]?.focus();
      this.emitChange();
      return;
    }

    const char = rawVal.slice(-1);
    if (char && !this.isValidChar(char)) {
      input.value = this.digits[index] || '';
      return;
    }

    const newDigits = [...this.digits];
    newDigits[index] = char;
    this.digits = newDigits;

    if (char && index < this.length - 1) {
      this.inputEls[index + 1]?.focus();
    }

    this.emitChange();
  };

  private handleKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key === 'Backspace') {
      const newDigits = [...this.digits];
      if (newDigits[index]) {
        newDigits[index] = '';
        this.digits = newDigits;
        this.emitChange();
      } else if (index > 0) {
        newDigits[index - 1] = '';
        this.digits = newDigits;
        this.inputEls[index - 1]?.focus();
        this.emitChange();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      this.inputEls[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < this.length - 1) {
      this.inputEls[index + 1]?.focus();
    }
  };

  private handlePaste = (e: ClipboardEvent, index: number) => {
    e.preventDefault();
    const text = e.clipboardData?.getData('text') || '';
    const chars = text.split('').filter(c => this.isValidChar(c));
    const newDigits = [...this.digits];
    let i = index;
    for (const c of chars) {
      if (i >= this.length) break;
      newDigits[i] = c;
      i++;
    }
    this.digits = newDigits;
    const nextIdx = Math.min(i, this.length - 1);
    this.inputEls[nextIdx]?.focus();
    this.emitChange();
  };

  private emitChange() {
    const value = this.digits.join('');
    this.natChange.emit(value);
    if (value.length === this.length && !value.includes('')) {
      this.natComplete.emit(value);
    }
  }

  render() {
    return (
      <Host>
        <div
          class={{
            'nat-pin': true,
            [`nat-pin--${this.size}`]: true,
            'nat-pin--disabled': this.disabled,
            'nat-pin--invalid': this.invalid,
          }}
          role="group"
          aria-label="PIN input"
        >
          {Array.from({ length: this.length }, (_, i) => (
            <input
              key={i}
              ref={el => {
                if (el) this.inputEls[i] = el as HTMLInputElement;
              }}
              class={{
                'nat-pin__cell': true,
                'nat-pin__cell--filled': !!this.digits[i],
                'nat-pin__cell--focused': this.focusedIndex === i,
              }}
              type={this.masked ? 'password' : 'text'}
              inputMode={this.numeric ? 'numeric' : 'text'}
              maxLength={1}
              value={this.digits[i]}
              placeholder={this.placeholder}
              disabled={this.disabled}
              autocomplete={i === 0 ? 'one-time-code' : 'off'}
              aria-label={`Digit ${i + 1} of ${this.length}`}
              onInput={e => this.handleInput(e as InputEvent, i)}
              onKeyDown={e => this.handleKeyDown(e, i)}
              onPaste={e => this.handlePaste(e, i)}
              onFocus={() => (this.focusedIndex = i)}
              onBlur={() => (this.focusedIndex = -1)}
            />
          ))}
        </div>
      </Host>
    );
  }
}
