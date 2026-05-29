import { Component, Host, h, Prop, State, Event, EventEmitter } from '@stencil/core';

/**
 * Star rating component with hover preview, half-star support, and keyboard accessibility.
 */
@Component({
  tag: 'nat-rating',
  styleUrl: 'nat-rating.css',
  shadow: true,
})
export class NatRating {
  /**
   * Current rating value (0 to count)
   */
  @Prop({ mutable: true, reflect: true }) value: number = 0;

  /**
   * Total number of stars
   * @default 5
   */
  @Prop() count: number = 5;

  /**
   * Allow half-star ratings
   * @default false
   */
  @Prop() allowHalf: boolean = false;

  /**
   * If true, user cannot change the rating
   * @default false
   */
  @Prop() readonly: boolean = false;

  /**
   * If true, the component is disabled
   * @default false
   */
  @Prop() disabled: boolean = false;

  /**
   * Size of each star
   * @default 'md'
   */
  @Prop() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * Color for filled stars
   */
  @Prop() color: string = '';

  /**
   * Emitted when user selects a rating
   */
  @Event() natChange: EventEmitter<number>;

  /**
   * Emitted when hover state changes (preview value, or 0 when leave)
   */
  @Event() natHover: EventEmitter<number>;

  @State() private hoverValue: number = 0;

  private getDisplayValue(): number {
    return this.hoverValue || this.value;
  }

  private getFillType(starIndex: number): 'full' | 'half' | 'empty' {
    const display = this.getDisplayValue();
    if (display >= starIndex) return 'full';
    if (this.allowHalf && display >= starIndex - 0.5) return 'half';
    return 'empty';
  }

  private handleMouseMove = (e: MouseEvent, starIndex: number) => {
    if (this.readonly || this.disabled) return;
    if (this.allowHalf) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const isLeft = e.clientX < rect.left + rect.width / 2;
      this.hoverValue = isLeft ? starIndex - 0.5 : starIndex;
    } else {
      this.hoverValue = starIndex;
    }
    this.natHover.emit(this.hoverValue);
  };

  private handleMouseLeave = () => {
    this.hoverValue = 0;
    this.natHover.emit(0);
  };

  private handleClick = (starIndex: number) => {
    if (this.readonly || this.disabled) return;
    const newVal = this.hoverValue || starIndex;
    this.value = newVal;
    this.natChange.emit(newVal);
  };

  private handleKeyDown = (e: KeyboardEvent, starIndex: number) => {
    if (this.readonly || this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.value = starIndex;
      this.natChange.emit(starIndex);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(this.count, this.value + (this.allowHalf ? 0.5 : 1));
      this.value = next;
      this.natChange.emit(next);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      const prev = Math.max(0, this.value - (this.allowHalf ? 0.5 : 1));
      this.value = prev;
      this.natChange.emit(prev);
    }
  };

  private renderStar(index: number) {
    const fill = this.getFillType(index);
    const isInteractive = !this.readonly && !this.disabled;

    return (
      <span
        class={{
          'nat-rating__star': true,
          'nat-rating__star--full': fill === 'full',
          'nat-rating__star--half': fill === 'half',
          'nat-rating__star--empty': fill === 'empty',
          'nat-rating__star--interactive': isInteractive,
        }}
        tabIndex={isInteractive ? 0 : -1}
        role={isInteractive ? 'radio' : undefined}
        aria-checked={fill !== 'empty' ? 'true' : 'false'}
        aria-label={`${index} star${index !== 1 ? 's' : ''}`}
        onMouseMove={e => this.handleMouseMove(e, index)}
        onMouseLeave={this.handleMouseLeave}
        onClick={() => this.handleClick(index)}
        onKeyDown={e => this.handleKeyDown(e, index)}
      >
        {/* Star SVG */}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          {fill === 'half' && (
            <defs>
              <linearGradient id={`half-${index}`} x1="0" x2="1" y1="0" y2="0">
                <stop offset="50%" stop-color="currentColor" />
                <stop offset="50%" stop-color="transparent" />
              </linearGradient>
            </defs>
          )}
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill={fill === 'full' ? 'currentColor' : fill === 'half' ? `url(#half-${index})` : 'none'}
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    );
  }

  render() {
    const stars = Array.from({ length: this.count }, (_, i) => i + 1);

    return (
      <Host>
        <div
          class={{
            'nat-rating': true,
            [`nat-rating--${this.size}`]: true,
            'nat-rating--disabled': this.disabled,
            'nat-rating--readonly': this.readonly,
          }}
          style={this.color ? { '--nat-rating-color': this.color } : {}}
          role="radiogroup"
          aria-label={`Rating: ${this.value} out of ${this.count}`}
          aria-disabled={this.disabled ? 'true' : 'false'}
          aria-readonly={this.readonly ? 'true' : 'false'}
        >
          {stars.map(i => this.renderStar(i))}
          {this.value > 0 && (
            <span class="nat-rating__value" aria-hidden="true">
              {this.allowHalf ? this.value.toFixed(1) : this.value}/{this.count}
            </span>
          )}
        </div>
      </Host>
    );
  }
}
