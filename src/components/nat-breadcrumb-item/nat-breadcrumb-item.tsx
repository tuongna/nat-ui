import { Component, Prop, Host, h } from '@stencil/core';

/**
 * @slot - Text content of the breadcrumb item
 */
@Component({
  tag: 'nat-breadcrumb-item',
  styleUrl: 'nat-breadcrumb-item.css',
  shadow: true,
})
export class NatBreadcrumbItem {
  /**
   * URL for the breadcrumb link
   */
  @Prop() href?: string;

  /**
   * Whether this is the active/current page
   */
  @Prop() active: boolean = false;

  render() {
    return (
      <Host role="listitem">
        <span class="breadcrumb-item">
          {this.href && !this.active ? (
            <a href={this.href} class="breadcrumb-item__link">
              <slot />
            </a>
          ) : (
            <span class="breadcrumb-item__text" aria-current={this.active ? 'page' : undefined}>
              <slot />
            </span>
          )}
          {!this.active && (
            <span class="breadcrumb-item__separator" aria-hidden="true">
              /
            </span>
          )}
        </span>
      </Host>
    );
  }
}
