import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch, Method, Listen } from '@stencil/core';

/**
 * Size variants for the select
 */
export type SelectSize = 'sm' | 'md' | 'lg';

/**
 * Option type for select items
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

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
   * Array of option objects with value, label, and optional disabled flag
   * Must be set via JavaScript property, not HTML attribute
   * @default []
   */
  @Prop() options: SelectOption[] = [];

  /**
   * The currently selected value
   * @default ''
   */
  @Prop({ mutable: true }) value: string = '';

  /**
   * Label text displayed above the select
   * @default ''
   */
  @Prop() label: string = '';

  /**
   * If true, the select is disabled
   * @default false
   */
  @Prop() disabled: boolean = false;

  /**
   * Error message displayed below the select
   * @default ''
   */
  @Prop() error: string = '';

  /**
   * Placeholder text when no value is selected
   * @default 'Select an option'
   */
  @Prop() placeholder: string = 'Select an option';

  /**
   * If true, the select takes full width of its container
   * @default false
   */
  @Prop() fullWidth: boolean = false;

  /**
   * Size variant of the select
   * @default 'md'
   */
  @Prop() size: SelectSize = 'md';

  /**
   * Helper text displayed below the select
   * @default ''
   */
  @Prop() helperText: string = '';

  /**
   * If true, the select is required
   * @default false
   */
  @Prop() required: boolean = false;

  /**
   * Name attribute for form submission
   * @default ''
   */
  @Prop() name: string = '';

  /**
   * Internal state for dropdown visibility
   */
  @State() isOpen: boolean = false;

  /**
   * Internal state for popup positioning styles
   */
  @State() popoverStyles: { top?: string; left?: string; maxHeight?: string; width?: string } = {};

  /**
   * Internal state for focused option index (keyboard navigation)
   */
  @State() focusedIndex: number = -1;

  /**
   * Emitted when the selected value changes
   */
  @Event() natChange: EventEmitter<string>;

  /**
   * Emitted when the dropdown opens
   */
  @Event() natOpen: EventEmitter<void>;

  /**
   * Emitted when the dropdown closes
   */
  @Event() natClose: EventEmitter<void>;

  /**
   * Watch for external value changes
   */
  @Watch('value')
  valueChanged(_newValue: string) {
    this.isOpen = false;
  }

  componentDidLoad() {
    window.addEventListener('resize', this.handleWindowResize);
    window.addEventListener('scroll', this.handleWindowScroll, true);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.handleWindowResize);
    window.removeEventListener('scroll', this.handleWindowScroll, true);
  }

  private handleWindowResize = () => {
    if (this.isOpen) {
      this.updatePopoverPosition();
    }
  };

  private handleWindowScroll = () => {
    if (this.isOpen) {
      this.updatePopoverPosition();
    }
  };

  private updatePopoverPosition = () => {
    if (!this.selectDiv || !this.optionsList) {
      return;
    }

    const viewportPadding = 16;
    const gap = 8;

    const rect = this.selectDiv.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const popupHeight = this.optionsList.scrollHeight;
    const popupWidth = rect.width;

    const spaceBelow = viewportHeight - rect.bottom - viewportPadding;
    const spaceAbove = rect.top - viewportPadding;

    let top: number;
    let left = rect.left;
    let maxHeight: number;

    if (popupHeight > spaceBelow && spaceAbove > spaceBelow) {
      top = rect.top - popupHeight - gap;
      maxHeight = Math.min(popupHeight, spaceAbove - gap);
    } else {
      top = rect.bottom + gap;
      maxHeight = Math.min(popupHeight, spaceBelow - gap);
    }

    if (left + popupWidth + viewportPadding > viewportWidth) {
      left = viewportWidth - popupWidth - viewportPadding;
    }

    if (left < viewportPadding) {
      left = viewportPadding;
    }

    this.popoverStyles = {
      top: `${top}px`,
      left: `${left}px`,
      width: `${popupWidth}px`,
      maxHeight: `${maxHeight}px`,
    };
  };

  private toggleOpen = () => {
    if (this.disabled) return;

    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  };

  /**
   * Opens the dropdown
   */
  @Method()
  async open() {
    if (this.disabled || this.isOpen) return;

    this.isOpen = true;
    this.natOpen.emit();

    // Reset focused index to current selection
    const selectedIndex = this.options.findIndex(opt => opt.value === this.value);
    this.focusedIndex = selectedIndex >= 0 ? selectedIndex : 0;

    requestAnimationFrame(() => {
      this.updatePopoverPosition();
      // Scroll to selected option
      if (this.optionsList && selectedIndex >= 0) {
        const selectedOption = this.optionsList.children[selectedIndex] as HTMLElement;
        selectedOption?.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  /**
   * Closes the dropdown
   */
  @Method()
  async close() {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.focusedIndex = -1;
    this.natClose.emit();
  }

  private selectOption = (optionValue: string) => {
    if (this.disabled) return;
    this.value = optionValue;
    this.natChange.emit(this.value);
    this.close();
  };

  private getSelectedLabel() {
    const selected = this.options.find(opt => opt.value === this.value);
    return selected ? selected.label : '';
  }

  private handleBlur = (event: FocusEvent) => {
    const related = event.relatedTarget as HTMLElement | null;
    if (!this.el.contains(related)) {
      this.close();
    }
  };

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.isOpen && this.focusedIndex >= 0) {
          const option = this.options[this.focusedIndex];
          if (!option.disabled) {
            this.selectOption(option.value);
          }
        } else {
          this.open();
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.close();
        break;

      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen) {
          this.open();
        } else {
          this.focusNextOption();
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen) {
          this.open();
        } else {
          this.focusPreviousOption();
        }
        break;

      case 'Home':
        event.preventDefault();
        if (this.isOpen) {
          this.focusedIndex = 0;
        }
        break;

      case 'End':
        event.preventDefault();
        if (this.isOpen) {
          this.focusedIndex = this.options.length - 1;
        }
        break;
    }
  }

  private focusNextOption() {
    let nextIndex = this.focusedIndex + 1;

    // Skip disabled options
    while (nextIndex < this.options.length && this.options[nextIndex].disabled) {
      nextIndex++;
    }

    if (nextIndex < this.options.length) {
      this.focusedIndex = nextIndex;
      this.scrollToFocusedOption();
    }
  }

  private focusPreviousOption() {
    let prevIndex = this.focusedIndex - 1;

    // Skip disabled options
    while (prevIndex >= 0 && this.options[prevIndex].disabled) {
      prevIndex--;
    }

    if (prevIndex >= 0) {
      this.focusedIndex = prevIndex;
      this.scrollToFocusedOption();
    }
  }

  private scrollToFocusedOption() {
    if (this.optionsList && this.focusedIndex >= 0) {
      const focusedOption = this.optionsList.children[this.focusedIndex] as HTMLElement;
      focusedOption?.scrollIntoView({ block: 'nearest' });
    }
  }

  render() {
    const hasError = !!this.error;

    const containerClasses = {
      'nat-select-container': true,
      'nat-select-full-width': this.fullWidth,
    };

    const selectClasses = {
      'nat-select': true,
      [`nat-select--${this.size}`]: true,
      'nat-select--open': this.isOpen,
      'nat-select--disabled': this.disabled,
      'nat-select--error': hasError,
    };

    return (
      <Host onBlur={this.handleBlur} tabIndex={-1} aria-disabled={this.disabled ? 'true' : 'false'}>
        <div class={containerClasses}>
          {this.label && (
            <label class="nat-select-label">
              {this.label}
              {this.required && <span class="nat-select-required">*</span>}
            </label>
          )}

          <div
            ref={el => (this.selectDiv = el)}
            class={selectClasses}
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={this.isOpen ? 'true' : 'false'}
            aria-controls="nat-select-listbox"
            aria-labelledby={this.label ? 'nat-select-label' : undefined}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-required={this.required ? 'true' : 'false'}
            onClick={this.toggleOpen}
            tabIndex={this.disabled ? -1 : 0}
          >
            <div class="nat-select-value">{this.value ? this.getSelectedLabel() : <span class="nat-select-placeholder">{this.placeholder}</span>}</div>

            <div class={{ 'nat-select-arrow': true, 'nat-select-arrow--open': this.isOpen }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>

          {this.isOpen && (
            <ul
              ref={el => (this.optionsList = el)}
              id="nat-select-listbox"
              class="nat-select-options"
              role="listbox"
              style={this.popoverStyles}
              aria-labelledby={this.label ? 'nat-select-label' : undefined}
            >
              {this.options.length === 0 && <li class="nat-select-option nat-select-option--empty">No options available</li>}
              {this.options.map((opt, index) => (
                <li
                  key={opt.value}
                  id={`option-${opt.value}`}
                  role="option"
                  aria-selected={this.value === opt.value ? 'true' : 'false'}
                  aria-disabled={opt.disabled ? 'true' : 'false'}
                  class={{
                    'nat-select-option': true,
                    'nat-select-option--selected': this.value === opt.value,
                    'nat-select-option--focused': index === this.focusedIndex,
                    'nat-select-option--disabled': opt.disabled,
                  }}
                  onClick={() => !opt.disabled && this.selectOption(opt.value)}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          )}

          {(this.helperText || hasError) && <div class={{ 'nat-select-message': true, 'nat-select-message--error': hasError }}>{hasError ? this.error : this.helperText}</div>}

          {/* Hidden input for form submission */}
          {this.name && <input type="hidden" name={this.name} value={this.value} />}
        </div>
      </Host>
    );
  }
}
