import { Component, Prop, h, Host, Event, EventEmitter, Element, State, Watch } from '@stencil/core';

/**
 * Premium Range Slider component
 */
@Component({
  tag: 'nat-slider',
  styleUrl: 'nat-slider.css',
  shadow: true,
})
export class NatSlider {
  @Element() el!: HTMLElement;

  /**
   * Current value
   */
  @Prop({ mutable: true }) value: number = 0;

  /**
   * Minimum value
   */
  @Prop() min: number = 0;

  /**
   * Maximum value
   */
  @Prop() max: number = 100;

  /**
   * Step size
   */
  @Prop() step: number = 1;

  /**
   * Disabled state
   */
  @Prop() disabled: boolean = false;

  /**
   * Emitted when the value changes (on release)
   */
  @Event() natChange: EventEmitter<{ value: number }>;

  /**
   * Emitted continuously during drag
   */
  @Event() natInput: EventEmitter<{ value: number }>;

  @State() percentage: number = 0;

  componentWillLoad() {
    this.updatePercentage(this.value);
  }

  @Watch('value')
  onValueChanged(newValue: number) {
    this.updatePercentage(newValue);
  }

  private updatePercentage(val: number) {
    const clampedValue = Math.max(this.min, Math.min(this.max, val));
    this.percentage = ((clampedValue - this.min) / (this.max - this.min)) * 100;
    this.el.style.setProperty('--slider-percent', `${this.percentage}%`);
  }

  private handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const val = parseFloat(target.value);
    this.value = val;
    this.natInput.emit({ value: val });
  };

  private handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const val = parseFloat(target.value);
    this.value = val;
    this.natChange.emit({ value: val });
  };

  render() {
    return (
      <Host class={{ 'is-disabled': this.disabled }}>
        <div class="slider-container">
          <input
            type="range"
            class="slider-input"
            min={this.min}
            max={this.max}
            step={this.step}
            value={this.value}
            disabled={this.disabled}
            onInput={this.handleInput}
            onChange={this.handleChange}
            aria-valuemin={this.min}
            aria-valuemax={this.max}
            aria-valuenow={this.value}
          />
          <div class="slider-track">
            <div class="slider-fill"></div>
          </div>
        </div>
      </Host>
    );
  }
}
