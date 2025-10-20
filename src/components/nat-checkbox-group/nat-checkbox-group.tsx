import { Component, Prop, Event, EventEmitter, Host, h, State, Watch } from '@stencil/core';

export interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

/**
 * Checkbox group for multiple selections
 *
 * @slot - Custom options content (if not using options prop)
 */
@Component({
  tag: 'nat-checkbox-group',
  styleUrl: 'nat-checkbox-group.css',
  shadow: true,
})
export class NatCheckboxGroup {
  private groupId = `nat-checkbox-group-${groupIds++}`;

  /**
   * Group name
   */
  @Prop() name!: string;

  /**
   * Group label
   */
  @Prop() label?: string;

  /**
   * Group description
   */
  @Prop() description?: string;

  /**
   * Array of checkbox options
   */
  @Prop() options: CheckboxOption[] = [];

  /**
   * Selected values
   */
  @Prop({ mutable: true }) value: string[] = [];

  /**
   * Whether the group is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * Whether the group is required
   */
  @Prop() required: boolean = false;

  /**
   * Size variant
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Layout direction
   */
  @Prop() direction: 'vertical' | 'horizontal' = 'vertical';

  /**
   * Show select all checkbox
   */
  @Prop() showSelectAll: boolean = false;

  /**
   * Select all label
   */
  @Prop() selectAllLabel: string = 'Select All';

  /**
   * Error state
   */
  @Prop() error: boolean = false;

  /**
   * Error message
   */
  @Prop() errorMessage?: string;

  /**
   * Emitted when selection changes
   */
  @Event() natChange!: EventEmitter<{ value: string[]; selectedOptions: CheckboxOption[] }>;

  /**
   * Emitted when select all changes
   */
  @Event() natSelectAll!: EventEmitter<{ checked: boolean; allValues: string[] }>;

  @State() selectAllState: 'unchecked' | 'checked' | 'indeterminate' = 'unchecked';

  @Watch('value')
  onValueChange() {
    this.updateSelectAllState();
  }

  @Watch('options')
  onOptionsChange() {
    this.updateSelectAllState();
  }

  componentDidLoad() {
    this.updateSelectAllState();
  }

  private updateSelectAllState() {
    if (!this.showSelectAll) return;

    const enabledOptions = this.options.filter(option => !option.disabled);
    const enabledValues = enabledOptions.map(option => option.value);
    const selectedEnabledValues = this.value.filter(val => enabledValues.includes(val));

    if (selectedEnabledValues.length === 0) {
      this.selectAllState = 'unchecked';
    } else if (selectedEnabledValues.length === enabledOptions.length) {
      this.selectAllState = 'checked';
    } else {
      this.selectAllState = 'indeterminate';
    }
  }

  private handleCheckboxChange = (optionValue: string, checked: boolean) => {
    if (this.disabled) return;

    let newValue: string[];

    if (checked) {
      newValue = [...this.value, optionValue];
    } else {
      newValue = this.value.filter(val => val !== optionValue);
    }

    this.value = newValue;

    const selectedOptions = this.options.filter(option => newValue.includes(option.value));

    this.natChange.emit({
      value: newValue,
      selectedOptions,
    });
  };

  private handleSelectAllChange = (checked: boolean) => {
    if (this.disabled) return;

    const enabledOptions = this.options.filter(option => !option.disabled);
    const enabledValues = enabledOptions.map(option => option.value);

    let newValue: string[];

    if (checked) {
      // Add all enabled values, keep existing disabled selections
      const disabledSelections = this.value.filter(val => !enabledValues.includes(val));
      newValue = [...disabledSelections, ...enabledValues];
    } else {
      // Remove all enabled values, keep disabled selections
      newValue = this.value.filter(val => !enabledValues.includes(val));
    }

    this.value = newValue;

    const selectedOptions = this.options.filter(option => newValue.includes(option.value));

    this.natSelectAll.emit({
      checked,
      allValues: enabledValues,
    });

    this.natChange.emit({
      value: newValue,
      selectedOptions,
    });
  };

  render() {
    return (
      <Host>
        <fieldset
          class={{
            'checkbox-group': true,
            'checkbox-group--disabled': this.disabled,
            'checkbox-group--error': this.error,
            [`checkbox-group--${this.size}`]: true,
            [`checkbox-group--${this.direction}`]: true,
          }}
          role="group"
          aria-labelledby={this.label ? `${this.groupId}-label` : undefined}
          aria-describedby={this.description ? `${this.groupId}-description` : undefined}
          aria-required={this.required ? 'true' : 'false'}
          aria-invalid={this.error ? 'true' : 'false'}
        >
          {this.label && (
            <legend id={`${this.groupId}-label`} class="checkbox-group__label">
              {this.label}
              {this.required && <span class="checkbox-group__required">*</span>}
            </legend>
          )}

          {this.description && (
            <div id={`${this.groupId}-description`} class="checkbox-group__description">
              {this.description}
            </div>
          )}

          <div class="checkbox-group__options">
            {this.showSelectAll && this.options.length > 0 && (
              <div class="checkbox-group__select-all">
                <nat-checkbox
                  name={`${this.name}-select-all`}
                  checked={this.selectAllState === 'checked'}
                  indeterminate={this.selectAllState === 'indeterminate'}
                  disabled={this.disabled}
                  size={this.size}
                  onNatChange={e => this.handleSelectAllChange(e.detail)}
                >
                  <strong>{this.selectAllLabel}</strong>
                </nat-checkbox>
                <div class="checkbox-group__divider"></div>
              </div>
            )}

            {this.options.map(option => (
              <div key={option.value} class="checkbox-group__option">
                <nat-checkbox
                  name={this.name}
                  value={option.value}
                  checked={this.value.includes(option.value)}
                  disabled={this.disabled || option.disabled}
                  size={this.size}
                  onNatChange={e => this.handleCheckboxChange(option.value, e.detail)}
                >
                  <div class="checkbox-group__option-content">
                    <div class="checkbox-group__option-label">{option.label}</div>
                    {option.description && <div class="checkbox-group__option-description">{option.description}</div>}
                  </div>
                </nat-checkbox>
              </div>
            ))}

            <slot />
          </div>

          {this.error && this.errorMessage && <div class="checkbox-group__error">{this.errorMessage}</div>}
        </fieldset>
      </Host>
    );
  }
}

let groupIds = 0;
