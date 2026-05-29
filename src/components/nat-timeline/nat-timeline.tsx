import { Component, Host, h, Prop } from '@stencil/core';

export type TimelineVariant = 'dot' | 'icon' | 'numbered' | 'connected';

export interface TimelineItem {
  /** Unique identifier */
  id: string;
  /** Title of the event */
  title: string;
  /** Subtitle or metadata (e.g. timestamp) */
  subtitle?: string;
  /** Body description */
  description?: string;
  /** Icon name (nat-icon compatible), used when variant='icon' */
  icon?: string;
  /** Status color: 'default' | 'success' | 'warning' | 'error' | 'info' */
  status?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

/**
 * Vertical timeline for displaying a sequence of events.
 */
@Component({
  tag: 'nat-timeline',
  styleUrl: 'nat-timeline.css',
  shadow: true,
})
export class NatTimeline {
  /**
   * Array of timeline events
   */
  @Prop() items: TimelineItem[] = [];

  /**
   * Visual style variant
   * @default 'dot'
   */
  @Prop() variant: TimelineVariant = 'dot';

  /**
   * If true, the connecting line between events is dashed
   * @default false
   */
  @Prop() dashed: boolean = false;

  /**
   * If true, renders items in reverse chronological order
   * @default false
   */
  @Prop() reverse: boolean = false;

  /**
   * If true, alternates items left/right (zigzag layout)
   * @default false
   */
  @Prop() alternate: boolean = false;

  private getStatusColor(status?: string): string {
    const map: Record<string, string> = {
      success: 'var(--nat-success)',
      warning: 'var(--nat-warning)',
      error: 'var(--nat-error)',
      info: 'var(--nat-info)',
      default: 'var(--nat-primary)',
    };
    return map[status || 'default'] || map.default;
  }

  private renderMarker(item: TimelineItem, index: number) {
    const color = this.getStatusColor(item.status);

    if (this.variant === 'numbered') {
      return (
        <div class="nat-timeline__marker nat-timeline__marker--numbered" style={{ '--nat-tl-color': color } as any}>
          <span>{index + 1}</span>
        </div>
      );
    }

    if (this.variant === 'icon' && item.icon) {
      return (
        <div class="nat-timeline__marker nat-timeline__marker--icon" style={{ '--nat-tl-color': color } as any}>
          <nat-icon name={item.icon} />
        </div>
      );
    }

    return (
      <div class="nat-timeline__marker nat-timeline__marker--dot" style={{ '--nat-tl-color': color } as any} />
    );
  }

  render() {
    const items = this.reverse ? [...this.items].reverse() : this.items;

    return (
      <Host>
        <ol
          class={{
            'nat-timeline': true,
            [`nat-timeline--${this.variant}`]: true,
            'nat-timeline--dashed': this.dashed,
            'nat-timeline--alternate': this.alternate,
          }}
          aria-label="Timeline"
        >
          {items.map((item, i) => (
            <li
              class={{
                'nat-timeline__item': true,
                [`nat-timeline__item--${item.status || 'default'}`]: true,
                'nat-timeline__item--last': i === items.length - 1,
                'nat-timeline__item--alt': this.alternate && i % 2 === 1,
              }}
              key={item.id}
            >
              <div class="nat-timeline__track">
                {this.renderMarker(item, i)}
                {i < items.length - 1 && <div class="nat-timeline__line" />}
              </div>
              <div class="nat-timeline__content">
                <div class="nat-timeline__header">
                  <span class="nat-timeline__title">{item.title}</span>
                  {item.subtitle && (
                    <span class="nat-timeline__subtitle">{item.subtitle}</span>
                  )}
                </div>
                {item.description && (
                  <p class="nat-timeline__description">{item.description}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Host>
    );
  }
}
