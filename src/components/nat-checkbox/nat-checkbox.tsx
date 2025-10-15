import { Component, Host, h, Prop, Event, EventEmitter, State, Watch, Element } from '@stencil/core';

/**
 * Size variants for the checkbox
 */
export type CheckboxSize = 'sm' | 'md' | 'lg';

/**
 * @slot - Label content (alternative to label prop)
 */
@Component({
  tag: 'nat-checkbox',
  styleUrl: 'nat-checkbox.css',
  shadow: true,
})
export class NatCheckbox {
  @Element() private el!: HTMLElement;

  private inputElement?: HTMLInputElement;
  private checkboxId = `nat-checkbox-${Math.random().toString(36).substr(2, 9)}`;

  /**
   * If true, the checkbox is checked
   * @default false
   */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;

  /**
   * If true, the checkbox is in indeterminate state (mixed/partial selection)
   * @default false
   */
  @Prop({ mutable: true }) indeterminate: boolean = false;

  /**
   * Label text for the checkbox
   * @default ''
   */
  @Prop() label: string = '';

  /**
   * If true, the checkbox is disabled
   * @default false
   */
  @Prop() disabled: boolean = false;

  /**
   * If true, the checkbox is required
   * @default false
   */
  @Prop() required: boolean = false;

  /**
   * Size variant of the checkbox
   * @default 'md'
   */
  @Prop() size: CheckboxSize = 'md';

  /**
   * Name attribute for form submission
   * @default ''
   */
  @Prop() name: string = '';

  /**
   * Value attribute for form submission
   * @default 'on'
   */
  @Prop() value: string = 'on';

  /**
   * Aria label for accessibility
   */
  @Prop() ariaLabel?: string;

  /**
   * Internal focus state
   */
  @State() isFocused: boolean = false;

  /**
   * Emitted when the checked state changes
   */
  @Event() natChange: EventEmitter<boolean>;

  /**
   * Emitted when the checkbox receives focus
   */
  @Event() natFocus: EventEmitter<void>;

  /**
   * Emitted when the checkbox loses focus
   */
  @Event() natBlur: EventEmitter<void>;

  @Watch('checked')
  checkedChanged(newValue: boolean) {
    if (this.inputElement) {
      this.inputElement.checked = newValue;
    }
    // Clear indeterminate when explicitly checked/unchecked
    if (this.indeterminate) {
      this.indeterminate = false;
    }
  }

  @Watch('indeterminate')
  indeterminateChanged(newValue: boolean) {
    if (this.inputElement) {
      this.inputElement.indeterminate = newValue;
    }
  }

  componentDidLoad() {
    if (this.inputElement) {
      this.inputElement.indeterminate = this.indeterminate;
    }
  }

  private handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.indeterminate = false; // Clear indeterminate on user interaction
    this.natChange.emit(this.checked);
  };

  private handleFocus = () => {
    this.isFocused = true;
    this.natFocus.emit();
  };

  private handleBlur = () => {
    this.isFocused = false;
    this.natBlur.emit();
  };

  render() {
    const containerClasses = {
      'nat-checkbox-container': true,
      [`nat-checkbox-container--${this.size}`]: true,
      'nat-checkbox-container--disabled': this.disabled,
      'nat-checkbox-container--focused': this.isFocused,
    };

    const checkboxClasses = {
      'nat-checkbox': true,
      'nat-checkbox--checked': this.checked,
      'nat-checkbox--indeterminate': this.indeterminate,
      'nat-checkbox--disabled': this.disabled,
    };

    return (
      <Host>
        <label class={containerClasses}>
          <div class="nat-checkbox-wrapper">
            <input
              ref={el => (this.inputElement = el)}
              type="checkbox"
              class="nat-checkbox-input"
              id={this.checkboxId}
              checked={this.checked}
              disabled={this.disabled}
              required={this.required}
              name={this.name}
              value={this.value}
              aria-label={this.ariaLabel || this.label || undefined}
              aria-checked={this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false'}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            <div class={checkboxClasses}>
              <nat-icon
                class={{
                  'nat-checkbox-icon': true,
                  'nat-checkbox-icon--checkmark': true,
                  'nat-checkbox-icon--visible': this.checked && !this.indeterminate,
                }}
                name="check"
                library="default"
                decorative
              />

              <nat-icon
                class={{
                  'nat-checkbox-icon': true,
                  'nat-checkbox-icon--indeterminate': true,
                  'nat-checkbox-icon--visible': this.indeterminate,
                }}
                name="minus"
                library="default"
                decorative
              />
            </div>
          </div>

          {(this.label || this.hasSlotContent()) && <div class="nat-checkbox-label">{this.label || <slot />}</div>}
        </label>
      </Host>
    );
  }

  private hasSlotContent(): boolean {
    return !!this.el.childNodes.length;
  }
}
