import { Component, Prop, h, Host, Event, EventEmitter } from '@stencil/core';

export interface ListItem {
  value: string;
  label: string;
  icon?: string;
  description?: string;
  disabled?: boolean;
}

@Component({
  tag: 'nat-list',
  styleUrl: 'nat-list.css',
  shadow: true,
})
export class NatList {
  /** List items data */
  @Prop() items: ListItem[] = [];

  /** Show dividers between items */
  @Prop() dividers: boolean = false;

  /** Compact spacing */
  @Prop() compact: boolean = false;

  /** Horizontal layout */
  @Prop() horizontal: boolean = false;

  /** Emits when item is clicked */
  @Event() natItemClick: EventEmitter<ListItem>;

  handleItemClick(item: ListItem) {
    if (item.disabled) return;
    this.natItemClick.emit(item);
  }

  render() {
    return (
      <Host>
        <ul
          class={{
            'list': true,
            'list--dividers': this.dividers,
            'list--compact': this.compact,
            'list--horizontal': this.horizontal,
          }}
          role="list"
        >
          {this.items.length > 0 ? (
            this.items.map(item => (
              <li
                class={{
                  'list-item': true,
                  'list-item--disabled': !!item.disabled,
                }}
                role="listitem"
                onClick={() => this.handleItemClick(item)}
              >
                {item.icon && <nat-icon name={item.icon} class="list-item__icon" />}
                <div class="list-item__content">
                  <span class="list-item__label">{item.label}</span>
                  {item.description && <span class="list-item__desc">{item.description}</span>}
                </div>
              </li>
            ))
          ) : (
            <slot />
          )}
        </ul>
      </Host>
    );
  }
}
