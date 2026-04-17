import { Component, Prop, h, State, Event, EventEmitter, Listen, Watch, Element } from '@stencil/core';

/**
 * Premium Dialog component with sleek animations and backdrop blur
 *
 * @slot - Main dialog content
 * @slot actions - Footer action buttons
 */
@Component({
  tag: 'nat-dialog',
  styleUrl: 'nat-dialog.css',
  shadow: true,
})
export class NatDialog {
  @Element() el!: HTMLElement;

  /**
   * Controls the visibility of the dialog
   */
  @Prop({ mutable: true }) open: boolean = false;

  /**
   * The heading text of the dialog
   */
  @Prop() heading?: string;

  /**
   * Whether to show the close cross icon
   */
  @Prop() closable: boolean = true;

  /**
   * Close the dialog when clicking on the backdrop
   */
  @Prop() closeOnOutsideClick: boolean = true;

  /**
   * Emitted when the dialog opens
   */
  @Event() natOpen: EventEmitter<void>;

  /**
   * Emitted when the dialog closes
   */
  @Event() natClose: EventEmitter<void>;

  // Internal visual state for animation
  @State() isAnimating: boolean = false;
  @State() isRendered: boolean = false;

  private animationTimeout?: number;

  @Watch('open')
  onOpenChange(newValue: boolean) {
    if (newValue) {
      this.isRendered = true;
      // Allow DOM to update before applying animation classes
      requestAnimationFrame(() => {
        this.isAnimating = true;
        this.natOpen.emit();
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
      });
    } else {
      this.isAnimating = false;
      this.natClose.emit();
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Wait for exit animation to complete before removing from DOM
      if (this.animationTimeout) clearTimeout(this.animationTimeout);
      this.animationTimeout = window.setTimeout(() => {
        this.isRendered = false;
      }, 300); // 300ms matches css transition
    }
  }

  componentDidLoad() {
    if (this.open) {
      this.onOpenChange(true);
    }
  }

  disconnectedCallback() {
    if (this.open) {
      document.body.style.overflow = '';
    }
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }

  @Listen('keydown', { target: 'window' })
  handleKeyDown(ev: KeyboardEvent) {
    if (this.open && ev.key === 'Escape' && this.closable) {
      this.close();
    }
  }

  private close = () => {
    this.open = false;
  };

  private handleBackdropClick = (e: MouseEvent) => {
    // Only close if clicking directly on the backdrop, not the dialog content
    if (this.closeOnOutsideClick && (e.target as HTMLElement).classList.contains('backdrop')) {
      this.close();
    }
  };

  render() {
    if (!this.isRendered) {
      return null;
    }

    return (
      <div class={{ overlay: true, 'is-animating': this.isAnimating }}>
        <div class="backdrop" onClick={this.handleBackdropClick}>
          <div 
            class="dialog-container" 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby={this.heading ? 'dialog-title' : undefined}
          >
            {/* Header */}
            {(this.heading || this.closable) && (
              <header class="header">
                {this.heading ? <h2 id="dialog-title" class="title">{this.heading}</h2> : <div></div>}
                {this.closable && (
                  <button class="close-btn" onClick={this.close} aria-label="Close dialog">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}
              </header>
            )}

            {/* Content */}
            <main class="content">
              <slot />
            </main>

            {/* Footer / Actions */}
            <footer class="actions">
              <slot name="actions" />
            </footer>
          </div>
        </div>
      </div>
    );
  }
}
