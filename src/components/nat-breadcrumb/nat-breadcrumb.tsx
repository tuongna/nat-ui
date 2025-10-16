import { Component, Host, h } from '@stencil/core';

/**
 * @slot - Breadcrumb items (nat-breadcrumb-item components)
 */
@Component({
  tag: 'nat-breadcrumb',
  styleUrl: 'nat-breadcrumb.css',
  shadow: true,
})
export class NatBreadcrumb {
  render() {
    return (
      <Host>
        <nav class="breadcrumb" aria-label="breadcrumb">
          <slot />
        </nav>
      </Host>
    );
  }
}
