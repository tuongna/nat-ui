import { Component, Host, h, Prop, State, Event, EventEmitter, Listen, Method, Watch } from '@stencil/core';

export interface CommandItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional description or shortcut hint */
  description?: string;
  /** Icon name (nat-icon compatible) */
  icon?: string;
  /** Group/category name */
  group?: string;
  /** Keyboard shortcut display string */
  shortcut?: string;
  /** If true, item is disabled */
  disabled?: boolean;
  /** Arbitrary metadata */
  meta?: Record<string, unknown>;
}

/**
 * Command palette — keyboard-driven command menu inspired by Linear and Vercel.
 * Open with Cmd+K / Ctrl+K or call `.open()` programmatically.
 *
 * @slot trigger - Optional trigger element that opens the palette
 */
@Component({
  tag: 'nat-command',
  styleUrl: 'nat-command.css',
  shadow: true,
})
export class NatCommand {
  /**
   * Flat list of command items. Group them with the `group` property.
   */
  @Prop() items: CommandItem[] = [];

  /**
   * Placeholder text for the search input
   * @default 'Type a command or search…'
   */
  @Prop() placeholder: string = 'Type a command or search…';

  /**
   * If true, pressing Cmd+K / Ctrl+K globally opens the palette
   * @default true
   */
  @Prop() globalShortcut: boolean = true;

  /**
   * Maximum number of results to show at once
   * @default 8
   */
  @Prop() maxResults: number = 8;

  /**
   * Emitted when a command item is selected
   */
  @Event() natSelect: EventEmitter<CommandItem>;

  /**
   * Emitted when the palette opens
   */
  @Event() natOpen: EventEmitter<void>;

  /**
   * Emitted when the palette closes
   */
  @Event() natClose: EventEmitter<void>;

  @State() private isOpen: boolean = false;
  @State() private query: string = '';
  @State() private activeIndex: number = 0;

  private inputEl: HTMLInputElement;

  @Listen('keydown', { target: 'window' })
  handleGlobalKey(e: KeyboardEvent) {
    if (!this.globalShortcut) return;
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      this.isOpen ? this.close() : this.openPalette();
    }
  }

  /** Open the command palette */
  @Method()
  async open() {
    this.openPalette();
  }

  /** Close the command palette */
  @Method()
  async close() {
    this.closePalette();
  }

  @Watch('isOpen')
  onOpenChange(open: boolean) {
    if (open) {
      setTimeout(() => this.inputEl?.focus(), 50);
      this.natOpen.emit();
    } else {
      this.natClose.emit();
    }
  }

  private openPalette() {
    this.isOpen = true;
    this.query = '';
    this.activeIndex = 0;
  }

  private closePalette() {
    this.isOpen = false;
    this.query = '';
  }

  private get filteredItems(): CommandItem[] {
    const q = this.query.toLowerCase().trim();
    let results = this.items;
    if (q) {
      results = this.items.filter(
        item =>
          item.label.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.group?.toLowerCase().includes(q),
      );
    }
    return results.slice(0, this.maxResults);
  }

  private get groupedItems(): Map<string, CommandItem[]> {
    const map = new Map<string, CommandItem[]>();
    for (const item of this.filteredItems) {
      const group = item.group || '';
      if (!map.has(group)) map.set(group, []);
      map.get(group).push(item);
    }
    return map;
  }

  private get flatFiltered(): CommandItem[] {
    return this.filteredItems;
  }

  private handleInput = (e: InputEvent) => {
    this.query = (e.target as HTMLInputElement).value;
    this.activeIndex = 0;
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    const items = this.flatFiltered;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.activeIndex = Math.min(this.activeIndex + 1, items.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
    } else if (e.key === 'Enter') {
      const item = items[this.activeIndex];
      if (item && !item.disabled) this.selectItem(item);
    } else if (e.key === 'Escape') {
      this.closePalette();
    }
  };

  private selectItem(item: CommandItem) {
    this.natSelect.emit(item);
    this.closePalette();
  }

  private handleBackdropClick = () => {
    this.closePalette();
  };

  private renderShortcut(shortcut: string) {
    return shortcut.split('+').map(key => <kbd class="nat-command__kbd">{key}</kbd>);
  }

  render() {
    if (!this.isOpen) {
      return (
        <Host>
          <slot name="trigger" />
        </Host>
      );
    }

    const grouped = this.groupedItems;
    let globalIndex = 0;

    return (
      <Host>
        <slot name="trigger" />
        <div class="nat-command__backdrop" onClick={this.handleBackdropClick} aria-hidden="true" />
        <div class="nat-command__panel" role="dialog" aria-label="Command palette" aria-modal="true">
          <div class="nat-command__search">
            <svg class="nat-command__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={el => (this.inputEl = el as HTMLInputElement)}
              class="nat-command__input"
              type="text"
              placeholder={this.placeholder}
              value={this.query}
              onInput={this.handleInput}
              onKeyDown={this.handleKeyDown}
              autocomplete="off"
              spellcheck={false}
              aria-autocomplete="list"
              aria-expanded="true"
            />
            <kbd class="nat-command__esc">Esc</kbd>
          </div>

          <div class="nat-command__list" role="listbox">
            {this.flatFiltered.length === 0 ? (
              <div class="nat-command__empty">No results for "{this.query}"</div>
            ) : (
              Array.from(grouped.entries()).map(([group, groupItems]) => (
                <div class="nat-command__group">
                  {group && <div class="nat-command__group-label">{group}</div>}
                  {groupItems.map(item => {
                    const idx = globalIndex++;
                    return (
                      <div
                        class={{
                          'nat-command__item': true,
                          'nat-command__item--active': idx === this.activeIndex,
                          'nat-command__item--disabled': !!item.disabled,
                        }}
                        role="option"
                        aria-selected={idx === this.activeIndex}
                        aria-disabled={item.disabled ? 'true' : 'false'}
                        onClick={() => !item.disabled && this.selectItem(item)}
                        onMouseEnter={() => (this.activeIndex = idx)}
                      >
                        {item.icon && (
                          <span class="nat-command__item-icon">
                            <nat-icon name={item.icon} />
                          </span>
                        )}
                        <span class="nat-command__item-body">
                          <span class="nat-command__item-label">{item.label}</span>
                          {item.description && (
                            <span class="nat-command__item-desc">{item.description}</span>
                          )}
                        </span>
                        {item.shortcut && (
                          <span class="nat-command__item-shortcut">
                            {this.renderShortcut(item.shortcut)}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          <div class="nat-command__footer">
            <span><kbd class="nat-command__kbd">↑</kbd><kbd class="nat-command__kbd">↓</kbd> navigate</span>
            <span><kbd class="nat-command__kbd">↵</kbd> select</span>
            <span><kbd class="nat-command__kbd">Esc</kbd> close</span>
          </div>
        </div>
      </Host>
    );
  }
}
