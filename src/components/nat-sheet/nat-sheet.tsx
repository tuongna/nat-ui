import { Component, Host, h, Prop, State, Event, EventEmitter, Watch, Method, Listen } from '@stencil/core';

export type SheetPosition = 'bottom' | 'right' | 'left';

/**
 * Slide-in sheet panel — bottom sheet for mobile, side sheet for desktop.
 * Glass variant available for Apple liquid glass aesthetic.
 *
 * @slot - Main sheet content
 * @slot header - Sheet header area (above content)
 * @slot footer - Sheet footer area (below content, e.g. action buttons)
 */
@Component({
  tag: 'nat-sheet',
  styleUrl: 'nat-sheet.css',
  shadow: true,
})
export class NatSheet {
  /**
   * Whether the sheet is open
   * @default false
   */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /**
   * Slide direction
   * @default 'bottom'
   */
  @Prop() position: SheetPosition = 'bottom';

  /**
   * Sheet title (shown in header if no header slot)
   */
  @Prop() heading?: string;

  /**
   * If true, clicking the backdrop closes the sheet
   * @default true
   */
  @Prop() dismissible: boolean = true;

  /**
   * Shows a drag handle for bottom sheets
   * @default true
   */
  @Prop() showHandle: boolean = true;

  /**
   * Height for bottom sheet (CSS value)
   * @default 'auto'
   */
  @Prop() sheetHeight: string = 'auto';

  /**
   * Width for side sheets (CSS value)
   * @default '400px'
   */
  @Prop() sheetWidth: string = '400px';

  /**
   * Apply liquid glass styling
   * @default false
   */
  @Prop() glass: boolean = false;

  /**
   * Emitted when the sheet opens
   */
  @Event() natOpen: EventEmitter<void>;

  /**
   * Emitted when the sheet closes
   */
  @Event() natClose: EventEmitter<void>;

  @State() private visible: boolean = false;
  @State() private animating: boolean = false;

  private closeTimeout: ReturnType<typeof setTimeout>;

  @Watch('open')
  onOpenChange(isOpen: boolean) {
    clearTimeout(this.closeTimeout);
    if (isOpen) {
      this.visible = true;
      requestAnimationFrame(() => { this.animating = true; });
      this.natOpen.emit();
    } else {
      this.animating = false;
      this.closeTimeout = setTimeout(() => { this.visible = false; }, 350);
      this.natClose.emit();
    }
  }

  @Listen('keydown', { target: 'window' })
  handleEsc(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.open && this.dismissible) {
      this.open = false;
    }
  }

  /** Open the sheet */
  @Method()
  async show() { this.open = true; }

  /** Close the sheet */
  @Method()
  async hide() { this.open = false; }

  disconnectedCallback() {
    clearTimeout(this.closeTimeout);
  }

  private dismiss = () => {
    if (this.dismissible) this.open = false;
  };

  render() {
    if (!this.visible) return <Host />;

    const isBottom = this.position === 'bottom';

    return (
      <Host>
        <div
          class={{ 'nat-sheet__backdrop': true, 'nat-sheet__backdrop--visible': this.animating }}
          onClick={this.dismiss}
          aria-hidden="true"
        />
        <div
          class={{
            'nat-sheet__panel': true,
            [`nat-sheet__panel--${this.position}`]: true,
            'nat-sheet__panel--open': this.animating,
            'nat-sheet__panel--glass': this.glass,
          }}
          style={{
            ...(isBottom ? { height: this.sheetHeight === 'auto' ? undefined : this.sheetHeight } : { width: this.sheetWidth }),
          }}
          role="dialog"
          aria-modal="true"
          aria-label={this.heading || 'Sheet'}
        >
          {isBottom && this.showHandle && (
            <div class="nat-sheet__handle" aria-hidden="true" />
          )}

          <slot name="header">
            {this.heading && (
              <div class="nat-sheet__header">
                <h2 class="nat-sheet__title">{this.heading}</h2>
                {this.dismissible && (
                  <button
                    class="nat-sheet__close"
                    onClick={() => { this.open = false; }}
                    aria-label="Close sheet"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </slot>

          <div class="nat-sheet__body">
            <slot />
          </div>

          <slot name="footer" />
        </div>
      </Host>
    );
  }
}
