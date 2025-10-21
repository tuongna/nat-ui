import { Component, Prop, h, State, Event, EventEmitter, Element, Watch, Host, Listen } from '@stencil/core';

export interface MenuItem {
  value: string;
  label: string;
  icon?: string;
  description?: string;
  disabled?: boolean;
  separator?: boolean;
}

/**
 * Menu component (dropdown, context menu)
 *
 * @slot trigger - menu trigger button/icon/etc
 * @slot - custom menu items
 */
@Component({
  tag: 'nat-menu',
  styleUrl: 'nat-menu.css',
  shadow: true,
})
export class NatMenu {
  @Element() el!: HTMLElement;

  /** Items prop (can use slot instead) */
  @Prop() items: MenuItem[] = [];

  /** Is menu open */
  @Prop({ mutable: true }) open: boolean = false;

  /** Placement relative to trigger */
  @Prop() placement: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' = 'bottom-start';

  /** Size */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /** ARIA label */
  @Prop() label: string = 'Menu';

  /** Emits selected value */
  @Event() natSelect: EventEmitter<MenuItem>;

  /** Emits when menu opens */
  @Event() natOpen: EventEmitter<void>;

  /** Emits when menu closes */
  @Event() natClose: EventEmitter<void>;

  @State() activeIndex: number = -1;

  private menuRef?: HTMLDivElement;
  private triggerRef?: HTMLDivElement;

  componentDidLoad() {
    if (this.open) {
      this.natOpen.emit();
      setTimeout(() => this.updatePlacement());
    }
  }

  @Watch('open')
  onOpenChange(newVal: boolean) {
    if (newVal) {
      setTimeout(() => this.updatePlacement());
      this.natOpen.emit();
      this.activeIndex = 0;
    } else {
      this.natClose.emit();
      this.activeIndex = -1;
    }
  }

  @Listen('mousedown', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (!this.open) return;

    const target = event.target as Node;
    // Only close if click is outside BOTH the menu and the trigger
    if (!this.menuRef?.contains(target) && !(this.el.shadowRoot?.querySelector('slot[name="trigger"]') as HTMLSlotElement)?.assignedElements()[0]?.contains(target)) {
      this.open = false;
    }
  }

  handleTriggerClick = () => {
    this.open = !this.open;
  };

  handleItemClick = (item: MenuItem) => {
    if (item.disabled || item.separator) return;
    this.natSelect.emit(item);
    this.open = false;
  };

  handleKeyDown = (e: KeyboardEvent) => {
    if (!this.open) return;
    const enabledIndices = this.items.map((item, idx) => (!item.disabled && !item.separator ? idx : -1)).filter(idx => idx !== -1);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.activeIndex = enabledIndices[(enabledIndices.indexOf(this.activeIndex) + 1) % enabledIndices.length];
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.activeIndex = enabledIndices[(enabledIndices.indexOf(this.activeIndex) - 1 + enabledIndices.length) % enabledIndices.length];
    } else if (e.key === 'Escape') {
      this.open = false;
    } else if (e.key === 'Enter' && this.activeIndex >= 0) {
      this.handleItemClick(this.items[this.activeIndex]);
    }
  };

  private updatePlacement() {
    if (!this.menuRef || !this.triggerRef) return;
    const triggerRect = this.triggerRef.getBoundingClientRect();
    const menuRect = this.menuRef.getBoundingClientRect();

    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    if (this.placement.startsWith('bottom')) {
      if (spaceBelow < menuRect.height + 8 && spaceAbove > spaceBelow) {
        // Not enough space below, more space above: flip to top
        this.placement = this.placement.replace('bottom', 'top') as typeof this.placement;
      }
    } else if (this.placement.startsWith('top')) {
      if (spaceAbove < menuRect.height + 8 && spaceBelow > spaceAbove) {
        // Not enough space above, more space below: flip to bottom
        this.placement = this.placement.replace('top', 'bottom') as typeof this.placement;
      }
    }
  }

  render() {
    return (
      <Host>
        <div class="menu-wrapper">
          <div ref={el => (this.triggerRef = el)} class="menu-trigger" onClick={this.handleTriggerClick}>
            <slot name="trigger" />
          </div>
          {this.open && (
            <div
              ref={el => (this.menuRef = el)}
              class={{
                menu: true,
                [`menu--${this.placement}`]: true,
                [`menu--${this.size}`]: true,
              }}
              role="menu"
              aria-label={this.label}
              tabindex={-1}
              onKeyDown={this.handleKeyDown}
            >
              {this.items.map((item, idx) =>
                item.separator ? (
                  <div class="menu-separator" />
                ) : (
                  <div
                    class={{
                      'menu-item': true,
                      'menu-item--active': idx === this.activeIndex,
                      'menu-item--disabled': item.disabled,
                    }}
                    role="menuitem"
                    aria-disabled={item.disabled ? 'true' : undefined}
                    tabindex={item.disabled ? -1 : 0}
                    onClick={() => this.handleItemClick(item)}
                  >
                    {item.icon && <nat-icon name={item.icon} />}
                    <span class="menu-item__label">{item.label}</span>
                    {item.description && <span class="menu-item__desc">{item.description}</span>}
                  </div>
                ),
              )}
              <slot />
            </div>
          )}
        </div>
      </Host>
    );
  }
}
