import { Component, Host, h, Prop, State, Event, EventEmitter, Listen, Method } from '@stencil/core';

export interface ContextMenuItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label?: string;
  /** Icon name (nat-icon compatible) */
  icon?: string;
  /** Keyboard shortcut display */
  shortcut?: string;
  /** If true, renders a visual separator instead of a menu item */
  separator?: boolean;
  /** If true, item is disabled */
  disabled?: boolean;
  /** Danger/destructive action styling */
  danger?: boolean;
  /** Sub-menu items */
  children?: ContextMenuItem[];
}

/**
 * Context menu — triggered by right-click on the default slot.
 * Supports icons, keyboard shortcuts, separators, danger items, and sub-menus.
 *
 * @slot - The element that triggers the context menu on right-click
 */
@Component({
  tag: 'nat-context-menu',
  styleUrl: 'nat-context-menu.css',
  shadow: true,
})
export class NatContextMenu {
  /**
   * Menu items array
   */
  @Prop() items: ContextMenuItem[] = [];

  /**
   * Glass style menu
   * @default false
   */
  @Prop() glass: boolean = false;

  /**
   * Emitted when a menu item is selected
   */
  @Event() natSelect: EventEmitter<ContextMenuItem>;

  @State() private isOpen: boolean = false;
  @State() private x: number = 0;
  @State() private y: number = 0;
  @State() private activeIndex: number = -1;
  @State() private openSubmenuId: string | null = null;

  @Listen('contextmenu', { target: 'window' })
  onGlobalContextMenu() {
    if (this.isOpen) { this.close(); }
  }

  @Listen('click', { target: 'window' })
  onGlobalClick() { if (this.isOpen) this.close(); }

  @Listen('keydown', { target: 'window' })
  handleGlobalKey(e: KeyboardEvent) {
    if (!this.isOpen) return;
    const items = this.flatItems;
    if (e.key === 'Escape') { e.preventDefault(); this.close(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); this.activeIndex = Math.min(this.activeIndex + 1, items.length - 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); this.activeIndex = Math.max(this.activeIndex - 1, 0); }
    else if (e.key === 'Enter' && this.activeIndex >= 0) { const item = items[this.activeIndex]; if (item && !item.disabled) this.selectItem(item); }
  }

  /** Close the context menu */
  @Method()
  async close() {
    this.isOpen = false;
    this.activeIndex = -1;
    this.openSubmenuId = null;
  }

  private get flatItems(): ContextMenuItem[] {
    return this.items.filter(i => !i.separator && !i.children?.length);
  }

  private handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    this.isOpen = false;
    requestAnimationFrame(() => {
      this.isOpen = true;
      this.activeIndex = -1;
      this.openSubmenuId = null;

      // Position menu, keeping it in viewport
      const vw = window.innerWidth, vh = window.innerHeight;
      const mw = 220, mh = Math.min(this.items.length * 38 + 16, 400);
      this.x = e.clientX + mw > vw ? e.clientX - mw : e.clientX;
      this.y = e.clientY + mh > vh ? e.clientY - mh : e.clientY;
    });
  };

  private selectItem(item: ContextMenuItem) {
    if (item.disabled || item.separator) return;
    this.natSelect.emit(item);
    this.close();
  }

  private renderItem(item: ContextMenuItem, index: number) {
    if (item.separator) {
      return <div class="nat-ctx__separator" role="separator" aria-hidden="true" />;
    }

    return (
      <div
        class={{
          'nat-ctx__item': true,
          'nat-ctx__item--active': index === this.activeIndex,
          'nat-ctx__item--disabled': !!item.disabled,
          'nat-ctx__item--danger': !!item.danger,
          'nat-ctx__item--has-submenu': !!(item.children?.length),
        }}
        role="menuitem"
        aria-disabled={item.disabled ? 'true' : 'false'}
        aria-haspopup={item.children?.length ? 'menu' : undefined}
        tabIndex={item.disabled ? -1 : 0}
        onClick={() => !item.children?.length && this.selectItem(item)}
        onMouseEnter={() => { this.activeIndex = index; this.openSubmenuId = item.children?.length ? item.id : null; }}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && !item.children?.length && this.selectItem(item)}
      >
        {item.icon && (
          <span class="nat-ctx__item-icon">
            <nat-icon name={item.icon} />
          </span>
        )}
        <span class="nat-ctx__item-label">{item.label}</span>
        {item.shortcut && <span class="nat-ctx__item-shortcut">{item.shortcut}</span>}
        {item.children?.length && (
          <span class="nat-ctx__item-arrow" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M6 4l4 4-4 4" />
            </svg>
          </span>
        )}

        {/* Sub-menu */}
        {item.children?.length && this.openSubmenuId === item.id && (
          <div class="nat-ctx__submenu" role="menu">
            {item.children.map((child, ci) => this.renderItem(child, ci))}
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <Host>
        <div onContextMenu={this.handleContextMenu}>
          <slot />
        </div>

        {this.isOpen && (
          <div
            class={{
              'nat-ctx__menu': true,
              'nat-ctx__menu--glass': this.glass,
            }}
            style={{ left: `${this.x}px`, top: `${this.y}px` }}
            role="menu"
            aria-label="Context menu"
          >
            {this.items.map((item, i) => this.renderItem(item, i))}
          </div>
        )}
      </Host>
    );
  }
}
