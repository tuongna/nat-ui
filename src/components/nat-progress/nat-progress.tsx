import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Modern Progress Bar
 */
@Component({
  tag: 'nat-progress',
  styleUrl: 'nat-progress.css',
  shadow: true,
})
export class NatProgress {
  /**
   * The progress value (0 to 100)
   */
  @Prop() value: number = 0;

  /**
   * Indeterminate state (loading without specific value)
   */
  @Prop() indeterminate: boolean = false;

  /**
   * Whether to display the percentage text
   */
  @Prop() showValue: boolean = false;

  /**
   * Size of the progress bar
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  render() {
    const clampedValue = Math.max(0, Math.min(100, this.value));
    
    return (
      <Host class={{ [`size-${this.size}`]: true }}>
        <div class="progress-header">
          <slot name="label"></slot>
          {this.showValue && !this.indeterminate && (
            <span class="progress-value">{Math.round(clampedValue)}%</span>
          )}
        </div>
        
        <div class="progress-track" role="progressbar" aria-valuenow={this.indeterminate ? undefined : clampedValue} aria-valuemin="0" aria-valuemax="100">
          <div 
            class={{
              'progress-fill': true,
              'is-indeterminate': this.indeterminate
            }}
            style={{ width: this.indeterminate ? '100%' : `${clampedValue}%` }}
          ></div>
        </div>
      </Host>
    );
  }
}
