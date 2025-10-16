import { Component, Prop, Host, h } from '@stencil/core';

export type SpinnerSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'nat-spinner',
  styleUrl: 'nat-spinner.css',
  shadow: true,
})
export class NatSpinner {
  /**
   * Size of the spinner
   */
  @Prop() size: SpinnerSize = 'md';

  /**
   * Accessible label for screen readers
   */
  @Prop() label: string = 'Loading...';

  render() {
    return (
      <Host role="status" aria-label={this.label}>
        <div class={`spinner spinner--${this.size}`}>
          <div class="spinner__circle"></div>
        </div>
      </Host>
    );
  }
}
