import { Component, Host, h, Prop, State, Event, EventEmitter, Watch, Method, Listen } from '@stencil/core';

export interface AutocompleteOption {
  /** Displayed label */
  label: string;
  /** Value submitted/emitted on selection */
  value: string;
  /** Optional description shown below label */
  description?: string;
  /** If true, option is disabled */
  disabled?: boolean;
  /** Group header label */
  group?: string;
}

/**
 * Autocomplete / combobox — a text input with a filtered dropdown list.
 * Supports single and multiple selection, keyboard navigation, and clearable mode.
 */
@Component({
  tag: 'nat-autocomplete',
  styleUrl: 'nat-autocomplete.css',
  shadow: true,
})
export class NatAutocomplete {
  /**
   * List of available options
   */
  @Prop() options: AutocompleteOption[] = [];

  /**
   * Currently selected value (single mode)
   */
  @Prop({ mutable: true, reflect: true }) value: string = '';

  /**
   * Currently selected values (multiple mode)
   */
  @Prop({ mutable: true }) values: string[] = [];

  /**
   * Allow selecting multiple values
   * @default false
   */
  @Prop() multiple: boolean = false;

  /**
   * Input placeholder
   * @default 'Search…'
   */
  @Prop() placeholder: string = 'Search…';

  /**
   * Input label
   */
  @Prop() label?: string;

  /**
   * Show a clear button when a value is selected
   * @default true
   */
  @Prop() clearable: boolean = true;

  /**
   * If true, the component is disabled
   * @default false
   */
  @Prop() disabled: boolean = false;

  /**
   * Maximum number of results to show
   * @default 8
   */
  @Prop() maxOptions: number = 8;

  /**
   * Size variant
   * @default 'md'
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Emitted when the selection changes
   */
  @Event() natChange: EventEmitter<{ value: string; option: AutocompleteOption }>;

  /**
   * Emitted when multiple selection changes
   */
  @Event() natMultiChange: EventEmitter<{ values: string[]; options: AutocompleteOption[] }>;

  /**
   * Emitted when the input text changes
   */
  @Event() natSearch: EventEmitter<string>;

  @State() private query: string = '';
  @State() private isOpen: boolean = false;
  @State() private activeIndex: number = 0;
  @State() private focused: boolean = false;

  private inputEl: HTMLInputElement;
  private containerEl: HTMLElement;

  @Watch('value')
  onValueChange(val: string) {
    if (!this.multiple) {
      const opt = this.options.find(o => o.value === val);
      if (opt && !this.isOpen) this.query = opt.label;
    }
  }

  componentWillLoad() {
    if (!this.multiple && this.value) {
      const opt = this.options.find(o => o.value === this.value);
      if (opt) this.query = opt.label;
    }
  }

  @Listen('click', { target: 'window' })
  onOutsideClick(e: MouseEvent) {
    if (!this.containerEl?.contains(e.target as Node)) {
      this.close();
    }
  }

  /** Clear the current selection */
  @Method()
  async clear() {
    this.value = '';
    this.values = [];
    this.query = '';
    this.inputEl?.focus();
  }

  private get filtered(): AutocompleteOption[] {
    const q = this.query.toLowerCase().trim();
    const available = this.multiple ? this.options.filter(o => !this.values.includes(o.value)) : this.options;
    const filtered = q ? available.filter(o => o.label.toLowerCase().includes(q) || o.description?.toLowerCase().includes(q)) : available;
    return filtered.slice(0, this.maxOptions);
  }

  private open() {
    if (this.disabled) return;
    this.isOpen = true;
    this.activeIndex = 0;
  }

  private close() {
    this.isOpen = false;
    if (!this.multiple && this.value) {
      const opt = this.options.find(o => o.value === this.value);
      if (opt) this.query = opt.label;
    } else if (!this.multiple && !this.value) {
      this.query = '';
    }
  }

  private selectOption(opt: AutocompleteOption) {
    if (opt.disabled) return;
    if (this.multiple) {
      const next = [...this.values, opt.value];
      this.values = next;
      this.query = '';
      this.natMultiChange.emit({ values: next, options: next.map(v => this.options.find(o => o.value === v)) });
    } else {
      this.value = opt.value;
      this.query = opt.label;
      this.isOpen = false;
      this.natChange.emit({ value: opt.value, option: opt });
    }
    this.inputEl?.focus();
  }

  private removeTag(val: string) {
    const next = this.values.filter(v => v !== val);
    this.values = next;
    this.natMultiChange.emit({ values: next, options: next.map(v => this.options.find(o => o.value === v)) });
  }

  private handleInput = (e: InputEvent) => {
    this.query = (e.target as HTMLInputElement).value;
    this.isOpen = true;
    this.activeIndex = 0;
    this.natSearch.emit(this.query);
    if (!this.multiple) this.value = '';
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    const items = this.filtered;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.open();
      this.activeIndex = Math.min(this.activeIndex + 1, items.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
    } else if (e.key === 'Enter' && this.isOpen) {
      e.preventDefault();
      const opt = items[this.activeIndex];
      if (opt) this.selectOption(opt);
    } else if (e.key === 'Escape') {
      this.close();
    } else if (e.key === 'Backspace' && this.multiple && !this.query && this.values.length) {
      this.removeTag(this.values[this.values.length - 1]);
    }
  };

  private handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    this.value = '';
    this.values = [];
    this.query = '';
    this.inputEl?.focus();
  };

  private get hasValue(): boolean {
    return this.multiple ? this.values.length > 0 : !!this.value;
  }

  private getTagLabel(val: string): string {
    return this.options.find(o => o.value === val)?.label || val;
  }

  render() {
    const filtered = this.filtered;
    const showClear = this.clearable && this.hasValue && !this.disabled;

    return (
      <Host>
        {this.label && <label class="nat-ac__label">{this.label}</label>}
        <div
          class={{
            'nat-ac': true,
            [`nat-ac--${this.size}`]: true,
            'nat-ac--open': this.isOpen,
            'nat-ac--focused': this.focused,
            'nat-ac--disabled': this.disabled,
            'nat-ac--multiple': this.multiple,
          }}
          ref={el => (this.containerEl = el as HTMLElement)}
        >
          {/* Tags (multiple mode) */}
          {this.multiple && this.values.map(val => (
            <span class="nat-ac__tag" key={val}>
              <span class="nat-ac__tag-label">{this.getTagLabel(val)}</span>
              <button
                class="nat-ac__tag-remove"
                onClick={() => this.removeTag(val)}
                aria-label={`Remove ${this.getTagLabel(val)}`}
              >
                <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M2 2l6 6M8 2l-6 6" />
                </svg>
              </button>
            </span>
          ))}

          <input
            ref={el => (this.inputEl = el as HTMLInputElement)}
            class="nat-ac__input"
            type="text"
            value={this.query}
            placeholder={this.hasValue && !this.multiple ? '' : this.placeholder}
            disabled={this.disabled}
            autocomplete="off"
            spellcheck={false}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={this.isOpen ? 'true' : 'false'}
            aria-activedescendant={this.isOpen ? `nat-ac-opt-${this.activeIndex}` : undefined}
            onInput={this.handleInput}
            onKeyDown={this.handleKeyDown}
            onFocus={() => { this.focused = true; this.open(); }}
            onBlur={() => { this.focused = false; setTimeout(() => this.close(), 150); }}
          />

          <div class="nat-ac__icons">
            {showClear && (
              <button class="nat-ac__clear" onClick={this.handleClear} tabIndex={-1} aria-label="Clear">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            )}
            <span class="nat-ac__chevron" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M4 6l4 4 4-4" />
              </svg>
            </span>
          </div>

          {/* Dropdown */}
          {this.isOpen && (
            <div class="nat-ac__dropdown" role="listbox">
              {filtered.length === 0 ? (
                <div class="nat-ac__empty">No results</div>
              ) : (
                filtered.map((opt, i) => (
                  <div
                    class={{
                      'nat-ac__option': true,
                      'nat-ac__option--active': i === this.activeIndex,
                      'nat-ac__option--disabled': !!opt.disabled,
                    }}
                    id={`nat-ac-opt-${i}`}
                    role="option"
                    aria-selected={this.value === opt.value || this.values.includes(opt.value) ? 'true' : 'false'}
                    aria-disabled={opt.disabled ? 'true' : 'false'}
                    onMouseDown={e => { e.preventDefault(); this.selectOption(opt); }}
                    onMouseEnter={() => (this.activeIndex = i)}
                  >
                    <div class="nat-ac__option-content">
                      <span class="nat-ac__option-label">{opt.label}</span>
                      {opt.description && <span class="nat-ac__option-desc">{opt.description}</span>}
                    </div>
                    {(this.value === opt.value || this.values.includes(opt.value)) && (
                      <svg class="nat-ac__option-check" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                        <path d="M3 8l3.5 3.5L13 4" />
                      </svg>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
