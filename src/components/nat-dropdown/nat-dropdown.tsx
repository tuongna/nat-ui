import { Component, Prop, h, State, Event, EventEmitter, Element, Watch, Host } from '@stencil/core';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: string;
  description?: string;
  disabled?: boolean;
}

@Component({
  tag: 'nat-dropdown',
  styleUrl: 'nat-dropdown.css',
  shadow: true,
})
export class NatDropdown {
  @Element() el!: HTMLElement;

  /** List of options */
  @Prop() options: DropdownOption[] = [];

  /** Current selected value (single select) */
  @Prop({ mutable: true }) value?: string;

  /** Is dropdown open */
  @State() open: boolean = false;

  /** Search/filter query */
  @State() query: string = '';

  /** Label for controlled input */
  @Prop() label?: string;

  /** ARIA label */
  @Prop() ariaLabel?: string;

  /** Allow search/filter */
  @Prop() searchable: boolean = false;

  /** Allow clear */
  @Prop() clearable: boolean = false;

  /** Disabled state */
  @Prop() disabled: boolean = false;

  /** Multi-select support */
  @Prop() multiple: boolean = false;
  @Prop({ mutable: true }) values: string[] = [];

  /** Placement of dropdown (bottom/top/auto) */
  @Prop() placement: 'auto' | 'bottom' | 'top' = 'auto';

  /** Emits when selection changes */
  @Event() natChange: EventEmitter<{ value: string | string[]; option?: DropdownOption }>;

  /** Emits when dropdown opens/closes */
  @Event() natOpen: EventEmitter<void>;
  @Event() natClose: EventEmitter<void>;

  private dropdownMenuRef?: HTMLDivElement;
  private triggerRef?: HTMLDivElement;

  componentDidLoad() {
    this.watchClickOutside();
  }

  @Watch('open')
  onOpenChange(val: boolean) {
    if (val) {
      this.natOpen.emit();
      setTimeout(() => this.updateDropdownPlacement());
    } else {
      this.natClose.emit();
    }
  }

  @Watch('open')
  watchClickOutside() {
    if (this.open) {
      window.addEventListener('mousedown', this.handleClickOutside, true);
      window.addEventListener('touchstart', this.handleClickOutside, true);
    } else {
      window.removeEventListener('mousedown', this.handleClickOutside, true);
      window.removeEventListener('touchstart', this.handleClickOutside, true);
    }
  }

  handleTriggerClick = () => {
    if (this.disabled) return;
    this.open = !this.open;
  };

  handleOptionClick = (option: DropdownOption) => {
    if (option.disabled) return;
    if (this.multiple) {
      this.values = this.values.includes(option.value) ? this.values.filter(v => v !== option.value) : [...this.values, option.value];
      this.natChange.emit({ value: this.values.slice(), option });
    } else {
      this.value = option.value;
      this.open = false;
      this.natChange.emit({ value: option.value, option });
    }
  };

  handleClear = () => {
    if (this.multiple) {
      this.values = [];
      this.natChange.emit({ value: [] });
    } else {
      this.value = undefined;
      this.natChange.emit({ value: undefined });
    }
    this.open = false;
  };

  private updateDropdownPlacement() {
    if (!this.el || !this.dropdownMenuRef || !this.triggerRef) return;
    const triggerRect = this.triggerRef.getBoundingClientRect();
    const menuRect = this.dropdownMenuRef.getBoundingClientRect();

    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    // If placement is auto, decide direction
    if (this.placement === 'auto') {
      if (spaceBelow < menuRect.height + 8 && spaceAbove > spaceBelow) {
        this.placement = 'top';
      } else {
        this.placement = 'bottom';
      }
    }
  }

  private handleClickOutside = (event: MouseEvent | TouchEvent) => {
    const target = event.target as Node;
    if (!this.dropdownMenuRef?.contains(target) && !this.triggerRef?.contains(target)) {
      this.open = false;
    }
  };

  render() {
    // Filtered options (searchable)
    const opts = this.searchable && this.query ? this.options.filter(o => o.label.toLowerCase().includes(this.query.toLowerCase())) : this.options;

    return (
      <Host>
        <div ref={el => (this.triggerRef = el)} class="dropdown-trigger" tabIndex={0} onClick={this.handleTriggerClick} aria-label={this.ariaLabel || this.label}>
          <slot name="trigger">
            {this.multiple ? (
              this.values.length > 0 ? (
                this.values.map(val => opts.find(o => o.value === val)?.label || val).join(', ')
              ) : (
                <span class="dropdown-placeholder">{this.label}</span>
              )
            ) : this.value ? (
              opts.find(o => o.value === this.value)?.label || this.value
            ) : (
              <span class="dropdown-placeholder">{this.label}</span>
            )}
            {this.clearable && (this.value || this.values?.length > 0) && (
              <button
                class="dropdown-clear"
                onClick={e => {
                  e.stopPropagation();
                  this.handleClear();
                }}
              >
                <nat-icon name="x" />
              </button>
            )}
            <span class="dropdown-caret">
              <nat-icon name="chevron-down" />
            </span>
          </slot>
        </div>
        {this.open && (
          <div ref={el => (this.dropdownMenuRef = el)} class={`dropdown-menu dropdown-menu--${this.placement}`} role="listbox" aria-label={this.ariaLabel || 'Options list'}>
            {this.searchable && (
              <input class="dropdown-search" type="text" value={this.query} onInput={e => (this.query = (e.target as HTMLInputElement).value)} placeholder="Search..." autoFocus />
            )}
            {opts.length === 0 ? (
              <div class="dropdown-empty">No options</div>
            ) : (
              opts.map(option => (
                <div
                  key={option.value}
                  class={{
                    'dropdown-option': true,
                    'dropdown-option--selected': this.multiple ? this.values.includes(option.value) : this.value === option.value,
                    'dropdown-option--disabled': !!option.disabled,
                  }}
                  role="option"
                  aria-selected={(this.multiple ? this.values.includes(option.value) : this.value === option.value) ? 'true' : 'false'}
                  aria-disabled={option.disabled ? 'true' : undefined}
                  onClick={() => this.handleOptionClick(option)}
                >
                  {option.icon && <nat-icon name={option.icon} />}
                  <span class="dropdown-option-label">{option.label}</span>
                  {option.description && <span class="dropdown-option-desc">{option.description}</span>}
                </div>
              ))
            )}
          </div>
        )}
      </Host>
    );
  }
}
