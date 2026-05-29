import { Component, Host, h, Prop, State, Event, EventEmitter, Watch, Listen } from '@stencil/core';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function formatDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function parseDate(s: string): Date | null {
  const d = new Date(s + 'T00:00:00');
  return isNaN(d.getTime()) ? null : d;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/**
 * Date picker with an inline calendar popup.
 * Supports single date selection, min/max constraints, and disabled dates.
 */
@Component({
  tag: 'nat-date-picker',
  styleUrl: 'nat-date-picker.css',
  shadow: true,
})
export class NatDatePicker {
  /**
   * Selected date as ISO string (YYYY-MM-DD)
   */
  @Prop({ mutable: true, reflect: true }) value: string = '';

  /**
   * Minimum selectable date (YYYY-MM-DD)
   */
  @Prop() min?: string;

  /**
   * Maximum selectable date (YYYY-MM-DD)
   */
  @Prop() max?: string;

  /**
   * Input placeholder
   * @default 'Select date…'
   */
  @Prop() placeholder: string = 'Select date…';

  /**
   * Input label
   */
  @Prop() label?: string;

  /**
   * If true, the input is disabled
   * @default false
   */
  @Prop() disabled: boolean = false;

  /**
   * Display format for the input field (uses simple token replacement)
   * @default 'MMM D, YYYY'
   */
  @Prop() displayFormat: string = 'MMM D, YYYY';

  /**
   * Size variant
   * @default 'md'
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Glass style popup
   * @default false
   */
  @Prop() glass: boolean = false;

  /**
   * Emitted when the selected date changes
   */
  @Event() natChange: EventEmitter<{ value: string; date: Date }>;

  @State() private isOpen: boolean = false;
  @State() private viewYear: number = new Date().getFullYear();
  @State() private viewMonth: number = new Date().getMonth();
  @State() private inputText: string = '';

  private containerEl: HTMLElement;

  componentWillLoad() {
    if (this.value) {
      const d = parseDate(this.value);
      if (d) { this.viewYear = d.getFullYear(); this.viewMonth = d.getMonth(); this.inputText = this.formatDisplay(d); }
    }
  }

  @Watch('value')
  onValueChange(val: string) {
    const d = parseDate(val);
    if (d) this.inputText = this.formatDisplay(d);
    else this.inputText = '';
  }

  @Listen('click', { target: 'window' })
  onOutsideClick(e: MouseEvent) {
    if (!this.containerEl?.contains(e.target as Node)) this.isOpen = false;
  }

  @Listen('keydown', { target: 'window' })
  handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.isOpen) this.isOpen = false;
  }

  private formatDisplay(d: Date): string {
    return this.displayFormat
      .replace('YYYY', String(d.getFullYear()))
      .replace('MMM', MONTHS[d.getMonth()].slice(0, 3))
      .replace('MM', String(d.getMonth() + 1).padStart(2, '0'))
      .replace('D', String(d.getDate()))
      .replace('DD', String(d.getDate()).padStart(2, '0'));
  }

  private isDisabled(d: Date): boolean {
    const minD = this.min ? parseDate(this.min) : null;
    const maxD = this.max ? parseDate(this.max) : null;
    if (minD && d < minD) return true;
    if (maxD && d > maxD) return true;
    return false;
  }

  private getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  private getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
  }

  private selectDate(year: number, month: number, day: number) {
    const d = new Date(year, month, day);
    if (this.isDisabled(d)) return;
    const iso = formatDate(d);
    this.value = iso;
    this.inputText = this.formatDisplay(d);
    this.isOpen = false;
    this.natChange.emit({ value: iso, date: d });
  }

  private prevMonth = () => {
    if (this.viewMonth === 0) { this.viewMonth = 11; this.viewYear--; }
    else this.viewMonth--;
  };

  private nextMonth = () => {
    if (this.viewMonth === 11) { this.viewMonth = 0; this.viewYear++; }
    else this.viewMonth++;
  };

  private renderCalendar() {
    const year = this.viewYear;
    const month = this.viewMonth;
    const daysInMonth = this.getDaysInMonth(year, month);
    const firstDay = this.getFirstDayOfMonth(year, month);
    const today = new Date();
    const selected = this.value ? parseDate(this.value) : null;

    const cells: (number | null)[] = [
      ...Array(firstDay).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    // Pad to full rows
    while (cells.length % 7 !== 0) cells.push(null);

    return (
      <div class="nat-dp__calendar">
        {/* Navigation */}
        <div class="nat-dp__nav">
          <button class="nat-dp__nav-btn" onClick={this.prevMonth} aria-label="Previous month">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M10 4L6 8l4 4" />
            </svg>
          </button>
          <span class="nat-dp__month-label">{MONTHS[month]} {year}</span>
          <button class="nat-dp__nav-btn" onClick={this.nextMonth} aria-label="Next month">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M6 4l4 4-4 4" />
            </svg>
          </button>
        </div>

        {/* Day-of-week headers */}
        <div class="nat-dp__grid">
          {DAYS.map(d => <div class="nat-dp__dow">{d}</div>)}

          {cells.map((day, i) => {
            if (day === null) return <div class="nat-dp__cell nat-dp__cell--empty" key={`e${i}`} />;
            const date = new Date(year, month, day);
            const isToday = isSameDay(date, today);
            const isSelected = selected && isSameDay(date, selected);
            const isOff = this.isDisabled(date);
            return (
              <button
                class={{
                  'nat-dp__cell': true,
                  'nat-dp__cell--today': isToday,
                  'nat-dp__cell--selected': !!isSelected,
                  'nat-dp__cell--disabled': isOff,
                }}
                key={`d${day}`}
                disabled={isOff}
                aria-label={`${MONTHS[month]} ${day}, ${year}`}
                aria-pressed={isSelected ? 'true' : 'false'}
                aria-current={isToday ? 'date' : undefined}
                onClick={() => this.selectDate(year, month, day)}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Today button */}
        <div class="nat-dp__footer">
          <button
            class="nat-dp__today-btn"
            onClick={() => { const n = new Date(); this.viewYear = n.getFullYear(); this.viewMonth = n.getMonth(); this.selectDate(n.getFullYear(), n.getMonth(), n.getDate()); }}
          >
            Today
          </button>
          {this.value && (
            <button class="nat-dp__clear-btn" onClick={() => { this.value = ''; this.inputText = ''; this.isOpen = false; }}>
              Clear
            </button>
          )}
        </div>
      </div>
    );
  }

  render() {
    return (
      <Host>
        {this.label && <label class="nat-dp__label">{this.label}</label>}
        <div
          class={{ 'nat-dp': true, [`nat-dp--${this.size}`]: true, 'nat-dp--open': this.isOpen }}
          ref={el => (this.containerEl = el as HTMLElement)}
        >
          <div
            class={{
              'nat-dp__input': true,
              'nat-dp--disabled': this.disabled,
            }}
            onClick={() => !this.disabled && (this.isOpen = !this.isOpen)}
            role="button"
            tabIndex={this.disabled ? -1 : 0}
            aria-expanded={this.isOpen ? 'true' : 'false'}
            aria-label={this.label || 'Date picker'}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && !this.disabled && (this.isOpen = !this.isOpen)}
          >
            <svg class="nat-dp__calendar-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="14" height="14" rx="2" />
              <path d="M3 8h14M7 2v4M13 2v4" />
            </svg>
            <span class={{ 'nat-dp__display': true, 'nat-dp__display--placeholder': !this.inputText }}>
              {this.inputText || this.placeholder}
            </span>
            {this.value && (
              <button
                class="nat-dp__clear"
                onClick={e => { e.stopPropagation(); this.value = ''; this.inputText = ''; }}
                aria-label="Clear date"
              >
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M2 2l8 8M10 2L2 10" />
                </svg>
              </button>
            )}
          </div>

          {this.isOpen && (
            <div class={{ 'nat-dp__popup': true, 'nat-dp__popup--glass': this.glass }}>
              {this.renderCalendar()}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
