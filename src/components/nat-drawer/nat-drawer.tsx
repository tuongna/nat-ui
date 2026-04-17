import { Component, Prop, h, Host, State, Event, EventEmitter, Listen, Watch } from '@stencil/core';

/**
 * Premium slide-out Drawer panel
 *
 * @slot - Main drawer content
 * @slot footer - Footer action area
 */
@Component({
  tag: 'nat-drawer',
  styleUrl: 'nat-drawer.css',
  shadow: true,
})
export class NatDrawer {
  /**
   * Controls visibility of the drawer
   */
  @Prop({ mutable: true }) open: boolean = false;

  /**
   * The edge from which the drawer slides out
   */
  @Prop() position: 'left' | 'right' | 'top' | 'bottom' = 'right';

  /**
   * Drawer heading text
   */
  @Prop() heading?: string;

  /**
   * Size of the drawer (width for left/right, height for top/bottom)
   * Examples: '300px', '50vw'
   */
  @Prop() size: string = '350px';

  /**
   * Show close button
   */
  @Prop() closable: boolean = true;

  /**
   * Close when clicking outside
   */
  @Prop() closeOnOutsideClick: boolean = true;

  @Event() natOpen: EventEmitter<void>;
  @Event() natClose: EventEmitter<void>;

  @State() isAnimating: boolean = false;
  @State() isRendered: boolean = false;

  private animationTimeout?: number;

  @Watch('open')
  onOpenChange(newValue: boolean) {
    if (newValue) {
      this.isRendered = true;
      requestAnimationFrame(() => {
        this.isAnimating = true;
        this.natOpen.emit();
        document.body.style.overflow = 'hidden';
      });
    } else {
      this.isAnimating = false;
      this.natClose.emit();
      document.body.style.overflow = '';
      
      if (this.animationTimeout) clearTimeout(this.animationTimeout);
      this.animationTimeout = window.setTimeout(() => {
        this.isRendered = false;
      }, 300);
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
    if (this.closeOnOutsideClick && (e.target as HTMLElement).classList.contains('backdrop')) {
      this.close();
    }
  };

  render() {
    if (!this.isRendered) return null;

    const panelStyle = {
      [this.position === 'left' || this.position === 'right' ? 'width' : 'height']: this.size
    };

    return (
      <Host class={{ 'is-animating': this.isAnimating }}>
        <div class="overlay">
          <div class="backdrop" onClick={this.handleBackdropClick}></div>
          <div 
            class={`drawer-panel position-${this.position}`} 
            style={panelStyle}
            role="dialog" 
            aria-modal="true" 
            aria-labelledby={this.heading ? 'drawer-title' : undefined}
          >
            {(this.heading || this.closable) && (
              <header class="header">
                {this.heading ? <h2 id="drawer-title" class="title">{this.heading}</h2> : <div></div>}
                {this.closable && (
                  <button class="close-btn" onClick={this.close} aria-label="Close drawer">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}
              </header>
            )}

            <main class="content">
              <slot></slot>
            </main>

            <footer class="footer">
              <slot name="footer"></slot>
            </footer>
          </div>
        </div>
      </Host>
    );
  }
}
