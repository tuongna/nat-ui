import { Component, Prop, Host, h } from '@stencil/core';

/**
 * @slot - Optional text content displayed in the divider
 */
@Component({
  tag: 'nat-divider',
  styleUrl: 'nat-divider.css',
  shadow: true,
})
export class NatDivider {
  /**
   * Orientation of the divider line
   */
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  render() {
    return (
      <Host>
        <div class={`divider divider--${this.orientation}`}>
          <slot />
        </div>
      </Host>
    );
  }
}
