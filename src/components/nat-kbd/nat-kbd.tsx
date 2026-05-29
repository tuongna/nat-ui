import { Component, Host, h, Prop } from '@stencil/core';

/**
 * Keyboard shortcut display badge.
 * Renders individual key names with Mac or Windows symbols.
 *
 * @slot - Key label text
 */
@Component({
  tag: 'nat-kbd',
  styleUrl: 'nat-kbd.css',
  shadow: true,
})
export class NatKbd {
  /**
   * Key label to display (alternative to slot)
   */
  @Prop() keyLabel?: string;

  /**
   * If true, renders Mac symbols (⌘ ⌥ ⇧ ⌃) instead of text
   * @default false
   */
  @Prop() mac: boolean = false;

  /**
   * Size variant
   * @default 'md'
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  private readonly macSymbols: Record<string, string> = {
    cmd: '⌘',
    command: '⌘',
    meta: '⌘',
    opt: '⌥',
    option: '⌥',
    alt: '⌥',
    shift: '⇧',
    ctrl: '⌃',
    control: '⌃',
    enter: '↵',
    return: '↵',
    delete: '⌫',
    backspace: '⌫',
    tab: '⇥',
    esc: '⎋',
    escape: '⎋',
    up: '↑',
    down: '↓',
    left: '←',
    right: '→',
    space: '␣',
    capslock: '⇪',
  };

  private getLabel(): string {
    const raw = this.keyLabel || '';
    if (!raw) return '';
    if (this.mac) {
      const sym = this.macSymbols[raw.toLowerCase()];
      return sym || raw;
    }
    return raw;
  }

  render() {
    const label = this.getLabel();
    return (
      <Host>
        <kbd class={`nat-kbd nat-kbd--${this.size}`} aria-label={this.keyLabel}>
          {label || <slot />}
        </kbd>
      </Host>
    );
  }
}
