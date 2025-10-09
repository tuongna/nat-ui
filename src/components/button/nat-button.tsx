import { Component, h } from '@stencil/core';

@Component({
  tag: 'nat-button',
  styleUrl: 'nat-button.css',
  shadow: true
})
export class NatButton {
  render() {
    return (
      <button>
        <slot />
      </button>
    );
  }
}
