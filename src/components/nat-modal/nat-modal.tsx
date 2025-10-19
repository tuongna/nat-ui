import { Component, Prop, Event, EventEmitter, Host, h, State, Watch, Method } from '@stencil/core';

/**
 * Modal dialog component
 *
 * @slot - Modal body content
 * @slot header - Modal header content
 * @slot footer - Modal footer content
 */
@Component({
  tag: 'nat-modal',
  styleUrl: 'nat-modal.css',
  shadow: true,
})
export class NatModal {
  // private modalRef?: HTMLDivElement;

  /**
   * Whether the modal is open
   */
  @Prop({ mutable: true }) open: boolean = false;

  /**
   * Modal size
   */
  @Prop() size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';

  /**
   * Show close button
   */
  @Prop() closable: boolean = true;

  /**
   * Close modal when clicking backdrop
   */
  @Prop() closeOnBackdrop: boolean = true;

  /**
   * Close modal when pressing Escape key
   */
  @Prop() closeOnEscape: boolean = true;

  /**
   * Prevent body scroll when modal is open
   */
  @Prop() preventScroll: boolean = true;

  /**
   * Center modal vertically
   */
  @Prop() centered: boolean = false;

  /**
   * Emitted when modal is opened
   */
  @Event() natOpen!: EventEmitter<void>;

  /**
   * Emitted when modal is closed
   */
  @Event() natClose!: EventEmitter<void>;

  /**
   * Emitted before modal opens (cancelable)
   */
  @Event() natBeforeOpen!: EventEmitter<{ preventDefault: () => void }>;

  /**
   * Emitted before modal closes (cancelable)
   */
  @Event() natBeforeClose!: EventEmitter<{ preventDefault: () => void }>;

  @State() isAnimating: boolean = false;

  @Watch('open')
  onOpenChange(newValue: boolean) {
    if (newValue) {
      this.handleOpen();
    } else {
      this.handleClose();
    }
  }

  componentDidLoad() {
    if (this.open) {
      this.handleOpen();
    }
  }

  disconnectedCallback() {
    this.cleanup();
  }

  /**
   * Open the modal programmatically
   */
  @Method()
  async openModal() {
    this.open = true;
  }

  /**
   * Close the modal programmatically
   */
  @Method()
  async closeModal() {
    this.open = false;
  }

  private handleOpen() {
    let prevented = false;
    this.natBeforeOpen.emit({
      preventDefault: () => {
        prevented = true;
      },
    });

    if (prevented) {
      this.open = false;
      return;
    }

    this.isAnimating = true;

    if (this.preventScroll) {
      document.body.style.overflow = 'hidden';
    }

    // Add keyboard listener
    document.addEventListener('keydown', this.handleKeyDown);

    requestAnimationFrame(() => {
      this.isAnimating = false;
      this.natOpen.emit();
    });
  }

  private handleClose() {
    let prevented = false;
    this.natBeforeClose.emit({
      preventDefault: () => {
        prevented = true;
      },
    });

    if (prevented) {
      this.open = true;
      return;
    }

    this.isAnimating = true;

    setTimeout(() => {
      this.cleanup();
      this.isAnimating = false;
      this.natClose.emit();
    }, 200); // Match animation duration
  }

  private cleanup() {
    if (this.preventScroll) {
      document.body.style.overflow = '';
    }
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.closeOnEscape && event.key === 'Escape' && this.open) {
      this.open = false;
    }
  };

  private handleBackdropClick = (event: MouseEvent) => {
    if (this.closeOnBackdrop && event.target === event.currentTarget) {
      this.open = false;
    }
  };

  private handleCloseClick = () => {
    this.open = false;
  };

  render() {
    if (!this.open && !this.isAnimating) {
      return null;
    }

    return (
      <Host>
        <div
          class={{
            'modal-backdrop': true,
            'modal-backdrop--visible': this.open && !this.isAnimating,
          }}
          onClick={this.handleBackdropClick}
        >
          <div
            // ref={el => (this.modalRef = el)}
            class={{
              'modal': true,
              'modal--visible': this.open && !this.isAnimating,
              'modal--centered': this.centered,
              [`modal--${this.size}`]: true,
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Modal dialog"
          >
            {this.closable && (
              <button class="modal__close" onClick={this.handleCloseClick} aria-label="Close modal" type="button">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            )}

            <div class="modal__header">
              <slot name="header" />
            </div>

            <div class="modal__body">
              <slot />
            </div>

            <div class="modal__footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
