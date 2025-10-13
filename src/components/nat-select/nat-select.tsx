import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch } from '@stencil/core';

@Component({
  tag: 'nat-select',
  styleUrl: 'nat-select.css',
  shadow: true,
})
export class NatSelect {
  @Element() el!: HTMLElement;

  private selectDiv?: HTMLElement;
  private optionsList?: HTMLElement;

  /**
   * Option items in [{ value, label, disabled? }]
   */
  @Prop() options: { value: string; label: string; disabled?: boolean }[] = [];

  /**
   * Selected value
   */
  @Prop({ mutable: true }) value: string = '';

  /**
   * Label text
   */
  @Prop() label: string = '';

  /**
   * Disabled state
   */
  @Prop() disabled: boolean = false;

  /**
   * Error message
   */
  @Prop() error: string = '';

  /**
   * Placeholder text when no value selected
   */
  @Prop() placeholder: string = 'Select an option';

  /**
   * Full width style
   */
  @Prop() fullWidth: boolean = false;

  @State() isOpen: boolean = false;
  @State() popoverStyles: { top?: string; left?: string; right?: string; maxHeight?: string } = {};

  @Event() natChange: EventEmitter<string>;

  /**
   * Watch for external value changes
   */
  @Watch('value')
  valueChanged(_newValue: string) {
    this.isOpen = false;
  }

  private updatePopoverPosition = () => {
    if (!this.selectDiv || !this.optionsList) {
      return;
    }
    const viewportPadding = 16;

    const rect = this.selectDiv.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const popupHeight = this.optionsList.offsetHeight;
    const popupWidth = this.optionsList.offsetWidth;

    let top = rect.bottom + window.scrollY;
    if (top + popupHeight + viewportPadding > window.scrollY + viewportHeight) {
      top = rect.top + window.scrollY - popupHeight;
    }

    let left = rect.left + window.scrollX;

    if (left + popupWidth + viewportPadding > window.scrollX + viewportWidth) {
      left = window.scrollX + viewportWidth - popupWidth - viewportPadding;
    }

    if (left < viewportPadding + window.scrollX) {
      left = viewportPadding + window.scrollX;
    }

    const maxHeight = Math.min(popupHeight, window.scrollY + viewportHeight - top - viewportPadding) + 'px';

    this.popoverStyles = {
      top: `${top}px`,
      left: `${left}px`,
      maxHeight,
    };
  };

  private toggleOpen = () => {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      window.requestAnimationFrame(() => {
        this.updatePopoverPosition();
      });
    }
  };

  private selectOption = (optionValue: string) => {
    if (this.disabled) return;
    this.value = optionValue;
    this.natChange.emit(this.value);
    this.isOpen = false;
  };

  private getSelectedLabel() {
    const selected = this.options.find(opt => opt.value === this.value);
    return selected ? selected.label : '';
  }

  private handleBlur = (event: FocusEvent) => {
    const related = event.relatedTarget as HTMLElement | null;
    if (!this.el.contains(related)) {
      this.isOpen = false;
    }
  };

  render() {
    const hasError = !!this.error;
    const containerClasses = {
      'nat-select-container': true,
      'nat-select-full-width': this.fullWidth,
    };

    const selectClasses = {
      'nat-select': true,
      'nat-select-open': this.isOpen,
      'nat-select-disabled': this.disabled,
      'nat-select-error': hasError,
    };

    return (
      <Host onBlur={this.handleBlur} tabIndex={-1} aria-disabled={this.disabled ? 'true' : 'false'}>
        <div class={containerClasses}>
          {this.label && (
            <label class="nat-select-label">
              {this.label}
              {hasError && <span class="nat-select-required">*</span>}
            </label>
          )}

          <div
            class={selectClasses}
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={this.isOpen ? 'true' : 'false'}
            onClick={this.toggleOpen}
            tabIndex={this.disabled ? -1 : 0}
            aria-disabled={this.disabled ? 'true' : 'false'}
          >
            <div class="nat-select-value">{this.value ? this.getSelectedLabel() : <span class="nat-select-placeholder">{this.placeholder}</span>}</div>

            <div class="nat-select-arrow">&#9662;</div>

            {this.isOpen && (
              <ul class="nat-select-options" role="listbox" aria-activedescendant={`option-${this.value}`}>
                {this.options.length === 0 && <li class="nat-select-option nat-select-option-disabled">No options</li>}
                {this.options.map(opt => (
                  <li
                    key={opt.value}
                    id={`option-${opt.value}`}
                    role="option"
                    aria-selected={this.value === opt.value ? 'true' : 'false'}
                    class={{
                      'nat-select-option': true,
                      'selected': this.value === opt.value,
                      'disabled': opt.disabled,
                    }}
                    onClick={() => !opt.disabled && this.selectOption(opt.value)}
                  >
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {(this.error || (!hasError && this.label)) && <div class={{ 'nat-select-message': true, 'nat-select-message-error': hasError }}>{hasError ? this.error : ''}</div>}
        </div>
      </Host>
    );
  }
}
