import { Component, Prop, Host, h } from '@stencil/core';

export type BadgeVariant = 'primary' | 'success' | 'danger' | 'warning' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * @slot - Badge content (text or number)
 */
@Component({
  tag: 'nat-badge',
  styleUrl: 'nat-badge.css',
  shadow: true,
})
export class NatBadge {
  /**
   * Visual style variant of the badge
   */
  @Prop() variant: BadgeVariant = 'primary';

  /**
   * Size of the badge
   */
  @Prop() size: BadgeSize = 'md';

  /**
   * Display as a dot indicator instead of text/number
   */
  @Prop() dot: boolean = false;

  /**
   * Numeric count to display in badge
   */
  @Prop() count?: number;

  render() {
    return (
      <Host>
        <span class={`badge badge--${this.variant} badge--${this.size}`}>{this.dot ? <span class="badge__dot"></span> : <slot>{this.count}</slot>}</span>
      </Host>
    );
  }
}
