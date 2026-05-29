import { Component, Host, h, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';

export interface SegmentOption {
  /** Unique value for this segment */
  value: string;
  /** Display label */
  label: string;
  /** Optional icon name */
  icon?: string;
  /** If true, this option is disabled */
  disabled?: boolean;
}

/**
 * iOS-style segmented control — animated sliding pill selector.
 */
@Component({
  tag: 'nat-segmented-control',
  styleUrl: 'nat-segmented-control.css',
  shadow: true,
})
export class NatSegmentedControl {
  /**
   * Array of segment options
   */
  @Prop() options: SegmentOption[] = [];

  /**
   * Currently selected value
   */
  @Prop({ mutable: true, reflect: true }) value: string = '';

  /**
   * Size variant
   * @default 'md'
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Full width of container
   * @default false
   */
  @Prop() fullWidth: boolean = false;

  /**
   * Glass style background
   * @default false
   */
  @Prop() glass: boolean = false;

  /**
   * Emitted when the selected value changes
   */
  @Event() natChange: EventEmitter<string>;

  @State() private pillStyle: { [key: string]: string } = {};
  @State() private mounted: boolean = false;

  private containerEl: HTMLElement;
  private segmentEls: Map<string, HTMLElement> = new Map();

  componentDidLoad() {
    this.mounted = true;
    requestAnimationFrame(() => this.updatePill());
  }

  @Watch('value')
  onValueChange() {
    this.updatePill();
  }

  private updatePill() {
    const el = this.segmentEls.get(this.value);
    if (!el || !this.containerEl) return;

    const containerRect = this.containerEl.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    this.pillStyle = {
      width: `${elRect.width}px`,
      left: `${elRect.left - containerRect.left}px`,
    };
  }

  private select(option: SegmentOption) {
    if (option.disabled || option.value === this.value) return;
    this.value = option.value;
    this.natChange.emit(this.value);
  }

  private handleKey = (e: KeyboardEvent, option: SegmentOption) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.select(option);
    }
  };

  render() {
    return (
      <Host>
        <div
          class={{
            'nat-seg': true,
            [`nat-seg--${this.size}`]: true,
            'nat-seg--full-width': this.fullWidth,
            'nat-seg--glass': this.glass,
          }}
          ref={el => (this.containerEl = el as HTMLElement)}
          role="group"
          aria-label="Segmented control"
        >
          {/* Sliding pill indicator */}
          {this.mounted && this.value && (
            <div
              class="nat-seg__pill"
              style={this.pillStyle}
              aria-hidden="true"
            />
          )}

          {this.options.map(opt => (
            <button
              class={{
                'nat-seg__option': true,
                'nat-seg__option--active': opt.value === this.value,
                'nat-seg__option--disabled': !!opt.disabled,
              }}
              ref={el => el && this.segmentEls.set(opt.value, el as HTMLElement)}
              role="radio"
              aria-checked={opt.value === this.value ? 'true' : 'false'}
              aria-disabled={opt.disabled ? 'true' : 'false'}
              tabIndex={opt.disabled ? -1 : 0}
              onClick={() => this.select(opt)}
              onKeyDown={e => this.handleKey(e, opt)}
              disabled={opt.disabled}
            >
              {opt.icon && (
                <span style={{ width: this.size === 'sm' ? '14px' : this.size === 'lg' ? '18px' : '16px', height: this.size === 'sm' ? '14px' : this.size === 'lg' ? '18px' : '16px', display: 'inline-flex' }}>
                  <nat-icon name={opt.icon} />
                </span>
              )}
              <span class="nat-seg__label">{opt.label}</span>
            </button>
          ))}
        </div>
      </Host>
    );
  }
}
