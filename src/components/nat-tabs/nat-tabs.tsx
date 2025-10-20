import { Component, Prop, Event, EventEmitter, h, Host, State, Element, Listen } from '@stencil/core';

export interface TabItem {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

/**
 * Tabs navigation with animated indicator
 *
 * @slot - Tab panel content (one element per tab, use slot="panel-{tab.value}")
 */
@Component({
  tag: 'nat-tabs',
  styleUrl: 'nat-tabs.css',
  shadow: true,
})
export class NatTabs {
  @Element() el!: HTMLElement;

  /**
   * Tab items
   */
  @Prop() tabs: TabItem[] = [];

  /**
   * Current active tab value
   */
  @Prop({ mutable: true }) value?: string;

  /**
   * Vertical mode
   */
  @Prop() vertical: boolean = false;

  /**
   * Size variant
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Color variant
   */
  @Prop() color: 'primary' | 'success' | 'info' | 'warning' | 'danger' = 'primary';

  /**
   * Emitted when tab is changed
   */
  @Event() natChange: EventEmitter<{ value: string }>;

  @State() focusIndex = -1;

  private tabRefs: HTMLElement[] = [];

  private handleTabClick = (idx: number, t: TabItem) => {
    if (t.disabled) return;
    this.value = t.value;
    this.natChange.emit({ value: t.value });
    this.focusIndex = idx;
  };

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent) {
    const enabledIndices = this.tabs.reduce((arr, t, i) => (!t.disabled ? arr.concat(i) : arr), [] as number[]);
    let idx = this.tabs.findIndex(t => t.value === this.value);

    if (ev.key === 'ArrowRight' || (this.vertical && ev.key === 'ArrowDown')) {
      ev.preventDefault();
      const nextIdx = enabledIndices[(enabledIndices.indexOf(idx) + 1) % enabledIndices.length];
      const nextTab = this.tabs[nextIdx];
      this.handleTabClick(nextIdx, nextTab);
      this.tabRefs[nextIdx]?.focus();
    } else if (ev.key === 'ArrowLeft' || (this.vertical && ev.key === 'ArrowUp')) {
      ev.preventDefault();
      const prevIdx = enabledIndices[(enabledIndices.indexOf(idx) - 1 + enabledIndices.length) % enabledIndices.length];
      const prevTab = this.tabs[prevIdx];
      this.handleTabClick(prevIdx, prevTab);
      this.tabRefs[prevIdx]?.focus();
    }
  }

  private getActiveIndex() {
    return this.tabs.findIndex(t => t.value === this.value && !t.disabled);
  }

  render() {
    const activeIdx = this.getActiveIndex();

    return (
      <Host>
        <div
          class={{
            'tabs': true,
            'tabs--vertical': this.vertical,
            [`tabs--${this.size}`]: true,
            [`tabs--${this.color}`]: true,
          }}
          role="tablist"
          aria-orientation={this.vertical ? 'vertical' : 'horizontal'}
        >
          {this.tabs.map((tab, idx) => (
            <button
              key={tab.value}
              ref={el => (this.tabRefs[idx] = el!)}
              class={{
                'tab': true,
                'tab--active': tab.value === this.value,
                'tab--disabled': !!tab.disabled,
              }}
              aria-selected={tab.value === this.value ? 'true' : 'false'}
              aria-disabled={tab.disabled ? 'true' : 'false'}
              role="tab"
              tabindex={tab.value === this.value ? 0 : -1}
              onClick={() => this.handleTabClick(idx, tab)}
            >
              {tab.icon && <nat-icon name={tab.icon} style={{ marginRight: '6px' }} />}
              <span>{tab.label}</span>
            </button>
          ))}
          <div
            class="tabs__indicator"
            style={
              this.vertical
                ? {
                    top: `calc(${activeIdx} * var(--nat-tabs-tab-height, 48px))`,
                    height: 'var(--nat-tabs-tab-height, 48px)',
                  }
                : {
                    left: `calc(${activeIdx} * var(--nat-tabs-tab-width, 120px))`,
                    width: 'var(--nat-tabs-tab-width, 120px)',
                  }
            }
          ></div>
        </div>
        <div class="tabs__panels">
          <slot />
        </div>
      </Host>
    );
  }
}
