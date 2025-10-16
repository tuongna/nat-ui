import { Component, Prop, State, Host, h } from '@stencil/core';

export type AvatarSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'nat-avatar',
  styleUrl: 'nat-avatar.css',
  shadow: true,
})
export class NatAvatar {
  /**
   * Image source URL
   */
  @Prop() src?: string;

  /**
   * Alternative text for the image
   */
  @Prop() alt: string = '';

  /**
   * Name used to generate initials when image is not available
   */
  @Prop() name?: string;

  /**
   * Size of the avatar
   */
  @Prop() size: AvatarSize = 'md';

  @State() imageError: boolean = false;

  private getInitials(): string {
    if (!this.name) return '?';
    return this.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  render() {
    return (
      <Host>
        <div class={`avatar avatar--${this.size}`}>
          {this.src && !this.imageError ? (
            <img src={this.src} alt={this.alt} onError={() => (this.imageError = true)} />
          ) : (
            <span class="avatar__initials">{this.getInitials()}</span>
          )}
        </div>
      </Host>
    );
  }
}
