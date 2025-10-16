import { Component, Prop, Host, h } from '@stencil/core';

/**
 * NAT-UI logo with liquid glass effect
 */
@Component({
  tag: 'nat-logo',
  styleUrl: 'nat-logo.css',
  shadow: true,
})
export class NatLogo {
  /**
   * Size of the logo in pixels
   */
  @Prop() size: number = 200;

  /**
   * Enable/disable pulse animation
   */
  @Prop() animated: boolean = true;

  /**
   * Blur intensity for glass effect
   */
  @Prop() blurIntensity: number = 1.2;

  render() {
    const filterId = `glassBlur-${Math.random().toString(36).substr(2, 9)}`;
    const gradientId = `glassGradient-${Math.random().toString(36).substr(2, 9)}`;
    const borderGlowId = `borderGlow-${Math.random().toString(36).substr(2, 9)}`;
    const innerGlowId = `innerGlow-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <Host>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width={this.size} height={this.size} class="nat-logo">
          <defs>
            <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation={this.blurIntensity} />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.8" />
              </feComponentTransfer>
            </filter>

            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="rgba(255,255,255,0.4)" stop-opacity="1" />
              <stop offset="50%" stop-color="rgba(255,255,255,0.2)" stop-opacity="1" />
              <stop offset="100%" stop-color="rgba(255,255,255,0.1)" stop-opacity="1" />
            </linearGradient>

            <linearGradient id={borderGlowId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="rgba(255,255,255,0.6)" stop-opacity="1" />
              <stop offset="100%" stop-color="rgba(255,255,255,0.2)" stop-opacity="1" />
            </linearGradient>

            <filter id={innerGlowId}>
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
              <feFlood flood-color="rgba(255,255,255,0.5)" result="color" />
              <feComposite in="color" in2="offsetBlur" operator="in" result="shadow" />
              <feComposite in="SourceGraphic" in2="shadow" operator="over" />
            </filter>
          </defs>

          <circle cx="100" cy="100" r="80" fill={`url(#${gradientId})`} filter={`url(#${filterId})`} opacity="0.6">
            {this.animated && <animate attributeName="r" values="80;85;80" dur="3s" repeatCount="indefinite" />}
          </circle>

          <rect
            x="40"
            y="40"
            width="120"
            height="120"
            rx="24"
            fill={`url(#${gradientId})`}
            stroke={`url(#${borderGlowId})`}
            stroke-width="2"
            filter={`url(#${innerGlowId})`}
            opacity="0.9"
          />

          <text
            x="100"
            y="92"
            font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            font-size="45"
            font-weight="700"
            fill="rgba(255,255,255,0.95)"
            text-anchor="middle"
            filter={`url(#${filterId})`}
          >
            NAT
          </text>

          <text
            x="100"
            y="148"
            font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            font-size="45"
            font-weight="600"
            fill="rgba(255,255,255,0.85)"
            text-anchor="middle"
          >
            UI
          </text>

          <rect x="48" y="48" width="104" height="56" rx="20" fill="rgba(255,255,255,0.3)" opacity="0.4" />
        </svg>
      </Host>
    );
  }
}
