import { Component, Host, h, Prop, State, Watch, Element } from '@stencil/core';
import { getIconLibrary } from '../../utils/icon-registry';

/**
 * Icon component with registry system support.
 * Supports loading icons from registered libraries or direct SVG URLs.
 *
 * @slot - Fallback content when icon fails to load
 */
@Component({
  tag: 'nat-icon',
  styleUrl: 'nat-icon.css',
  shadow: true,
})
export class NatIcon {
  @Element() el!: HTMLElement;

  private io?: IntersectionObserver;

  /**
   * Name of the icon from the registered library
   * @example "check", "x", "chevron-down"
   */
  @Prop() name?: string;

  /**
   * Icon library to use (must be registered first)
   * @default 'default'
   */
  @Prop() library: string = 'default';

  /**
   * Direct SVG source URL (bypasses icon library)
   * Takes precedence over name + library
   */
  @Prop() src?: string;

  /**
   * Accessible label for screen readers
   * Required for icons without accompanying text
   */
  @Prop() label?: string;

  /**
   * If true, icon is decorative and hidden from screen readers
   * @default false
   */
  @Prop() decorative: boolean = false;

  /**
   * Internal state for loaded SVG content
   */
  @State() svg: string = '';

  /**
   * Internal loading state
   */
  @State() isLoading: boolean = false;

  /**
   * Internal error state
   */
  @State() hasError: boolean = false;

  @Watch('name')
  @Watch('library')
  @Watch('src')
  handleChange() {
    this.loadIcon();
  }

  componentDidLoad() {
    this.setupIntersectionObserver();
  }

  disconnectedCallback() {
    if (this.io) {
      this.io.disconnect();
    }
  }

  private setupIntersectionObserver() {
    // Lazy load icons when they enter viewport
    this.io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadIcon();
            this.io?.disconnect(); // Load once
          }
        });
      },
      { rootMargin: '50px' }, // Pre-load 50px before visible
    );

    this.io.observe(this.el);
  }

  private async loadIcon() {
    // Reset states
    this.isLoading = true;
    this.hasError = false;
    this.svg = '';

    try {
      let url: string | undefined;

      if (this.src) {
        // Direct src takes precedence
        url = this.src;
      } else if (this.name) {
        // Get URL from registered library
        const library = getIconLibrary(this.library);

        if (!library) {
          throw new Error(`Icon library "${this.library}" is not registered`);
        }

        if (typeof library.resolver === 'function') {
          url = library.resolver(this.name);
        }
      }

      if (!url) {
        throw new Error('No icon URL resolved');
      }

      // Fetch SVG
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch icon: ${response.statusText}`);
      }

      let svgContent = await response.text();

      // Apply mutator if library has one
      if (!this.src && this.name) {
        const library = getIconLibrary(this.library);

        if (library?.mutator) {
          svgContent = library.mutator(svgContent);
        }
      }

      this.svg = svgContent;
      this.isLoading = false;
    } catch (error) {
      console.error('Icon load error:', error);
      this.hasError = true;
      this.isLoading = false;
    }
  }

  render() {
    const hasLabel = !!this.label;
    const isDecorative = this.decorative || !hasLabel;

    return (
      <Host role={isDecorative ? 'presentation' : 'img'} aria-label={!isDecorative ? this.label : undefined} aria-hidden={isDecorative ? 'true' : undefined}>
        <div
          class={{
            'nat-icon': true,
            'nat-icon--loading': this.isLoading,
            'nat-icon--error': this.hasError,
          }}
          innerHTML={this.svg}
        />

        {this.hasError && <slot />}
      </Host>
    );
  }
}
