import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Premium skeleton loading placeholder
 */
@Component({
  tag: 'nat-skeleton',
  styleUrl: 'nat-skeleton.css',
  shadow: true,
})
export class NatSkeleton {
  /**
   * The variant of the skeleton
   */
  @Prop() variant: 'text' | 'rect' | 'circle' = 'text';

  /**
   * Enable shimmer wave animation
   */
  @Prop() animated: boolean = true;

  /**
   * Custom width (e.g., '100%', '200px')
   */
  @Prop() width?: string;

  /**
   * Custom height (e.g., '100%', '200px')
   */
  @Prop() height?: string;

  render() {
    const style: Record<string, string> = {};
    if (this.width) style.width = this.width;
    if (this.height) style.height = this.height;

    return (
      <Host 
        class={{
          [`variant-${this.variant}`]: true,
          'is-animated': this.animated,
        }}
        style={style}
      >
        <div class="skeleton-base"></div>
      </Host>
    );
  }
}
