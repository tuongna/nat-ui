import { Component, Prop, h, Host, Event, EventEmitter } from '@stencil/core';

/**
 * Premium Tag component
 */
@Component({
  tag: 'nat-tag',
  styleUrl: 'nat-tag.css',
  shadow: true,
})
export class NatTag {
  /**
   * The visual variant of the tag
   */
  @Prop() variant: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';

  /**
   * Shape of the tag
   */
  @Prop() shape: 'round' | 'pill' = 'round';

  /**
   * Whether the tag can be closed
   */
  @Prop() closable: boolean = false;

  /**
   * Emitted when the close button is clicked
   */
  @Event() natClose: EventEmitter<void>;

  private handleClose = (e: Event) => {
    e.stopPropagation();
    this.natClose.emit();
  };

  render() {
    return (
      <Host class={{
        [`variant-${this.variant}`]: true,
        [`shape-${this.shape}`]: true,
        'is-closable': this.closable
      }}>
        <span class="content">
          <slot></slot>
        </span>
        {this.closable && (
          <button class="close-btn" onClick={this.handleClose} aria-label="Close tag">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </Host>
    );
  }
}
