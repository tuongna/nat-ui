import { Component, Prop, Event, EventEmitter, Host, h, State, Listen, Element } from '@stencil/core';

/**
 * Radio button for single selection from multiple options
 *
 * @slot - Radio label content
 */
@Component({
  tag: 'nat-radio',
  styleUrl: 'nat-radio.css',
  shadow: true,
})
export class NatRadio {
  @Element() el!: HTMLElement;

  private inputId = `nat-radio-${radioIds++}`;

  /**
   * The name of the radio group
   */
  @Prop() name!: string;

  /**
   * The value of the radio button
   */
  @Prop() value!: string;

  /**
   * Whether the radio is checked
   */
  @Prop({ mutable: true }) checked: boolean = false;

  /**
   * Whether the radio is disabled
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
   * Emitted when the radio value changes
   */
  @Event() natChange!: EventEmitter<{ value: string; checked: boolean }>;

  /**
   * Emitted when the radio receives focus
   */
  @Event() natFocus!: EventEmitter<void>;

  /**
   * Emitted when the radio loses focus
   */
  @Event() natBlur!: EventEmitter<void>;

  @State() hasFocus: boolean = false;

  // Listen to other radios in the same group
  @Listen('natChange', { target: 'body' })
  handleOtherRadioChange(event: CustomEvent) {
    const target = event.target as HTMLElement;

    // If another radio in the same group is checked, uncheck this one
    if (target !== this.el && target.tagName === 'NAT-RADIO' && (target as any).name === this.name && event.detail.checked) {
      this.checked = false;
    }
  }

  private handleChange = (event: Event) => {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    const target = event.target as HTMLInputElement;

    if (target.checked) {
      this.checked = true;
      this.natChange.emit({
        value: this.value,
        checked: true,
      });
    }
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
            'radio': true,
            'radio--checked': this.checked,
            'radio--disabled': this.disabled,
            'radio--focus': this.hasFocus,
            [`radio--${this.size}`]: true,
            [`radio--label-${this.labelPosition}`]: true,
          }}
        >
          <input
            type="radio"
            id={this.inputId}
            name={this.name}
            value={this.value}
            checked={this.checked}
            disabled={this.disabled}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            class="radio__input"
          />

          <span class="radio__control">
            <span class="radio__dot"></span>
          </span>

          <span class="radio__label">
            <slot />
          </span>
        </label>
      </Host>
    );
  }
}

let radioIds = 0;
