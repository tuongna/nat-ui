import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'nat-card',
  styleUrl: 'nat-card.css',
  shadow: true,
})
export class NatCard {
  /** Card heading */
  @Prop() heading?: string;

  /** Card subheading */
  @Prop() subheading?: string;

  /** Description / summary */
  @Prop() description?: string;

  /** Special appearance */
  @Prop() variant: 'default' | 'outline' | 'shadow' | 'glass' = 'default';

  /** Compact style */
  @Prop() compact: boolean = false;

  /** Hover effect */
  @Prop() clickable: boolean = false;

  render() {
    return (
      <Host>
        <div
          class={{
            'card': true,
            [`card--${this.variant}`]: true,
            'card--compact': this.compact,
            'card--clickable': this.clickable,
          }}
        >
          <slot name="icon" />
          {this.heading && <div class="card-title">{this.heading}</div>}
          {this.subheading && <div class="card-subtitle">{this.subheading}</div>}
          {this.description && <div class="card-desc">{this.description}</div>}
          <div class="card-content">
            <slot />
          </div>
          <div class="card-actions">
            <slot name="actions" />
          </div>
        </div>
      </Host>
    );
  }
}
