import { Component, Prop, h, Host, Event, EventEmitter, Watch } from '@stencil/core';

/**
 * Premium Accordion Component
 *
 * @slot - Main accordion content
 */
@Component({
  tag: 'nat-accordion',
  styleUrl: 'nat-accordion.css',
  shadow: true,
})
export class NatAccordion {
  /**
   * The heading text of the accordion
   */
  @Prop() heading!: string;

  /**
   * Whether the accordion is expanded
   */
  @Prop({ mutable: true }) expanded: boolean = false;

  /**
   * Whether the accordion is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * Emitted when the accordion toggles
   */
  @Event() natToggle: EventEmitter<{ expanded: boolean }>;

  private toggle = () => {
    if (this.disabled) return;
    this.expanded = !this.expanded;
    this.natToggle.emit({ expanded: this.expanded });
  };

  @Watch('expanded')
  onExpandedChange() {
    // Allows external control to trigger internal updates if needed
    // In this simple grid animation approach, CSS handles the visual change based on the attribute.
  }

  render() {
    return (
      <Host class={{
        'is-expanded': this.expanded,
        'is-disabled': this.disabled
      }}>
        <div class="accordion-item">
          <button 
            class="header" 
            onClick={this.toggle} 
            disabled={this.disabled}
            aria-expanded={this.expanded ? 'true' : 'false'}
            aria-controls="content"
          >
            <span class="heading-text">{this.heading}</span>
            <div class="icon-wrapper">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </button>
          
          <div 
            id="content" 
            class="content-wrapper" 
            aria-hidden={!this.expanded ? 'true' : 'false'}
          >
            <div class="content-inner">
              <slot></slot>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
