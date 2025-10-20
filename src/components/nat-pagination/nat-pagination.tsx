import { Component, Prop, Event, EventEmitter, h, Host, State } from '@stencil/core';

/**
 * Pagination component for page navigation
 *
 * @slot - Custom content (optional)
 */
@Component({
  tag: 'nat-pagination',
  styleUrl: 'nat-pagination.css',
  shadow: true,
})
export class NatPagination {
  /**
   * Total number of pages
   */
  @Prop() total: number = 1;

  /**
   * Current active page
   */
  @Prop({ mutable: true }) current: number = 1;

  /**
   * Show page size selector
   */
  @Prop() pageSizeOptions: number[] = [10, 20, 50];

  /**
   * Current size
   */
  @Prop() pageSize: number = 10;

  /**
   * Number of page buttons to display around current
   */
  @Prop() siblingCount: number = 1;

  /**
   * Compact mode
   */
  @Prop() compact: boolean = false;

  /**
   * Show first/last buttons
   */
  @Prop() showEnds: boolean = true;

  /**
   * Show jump-to-page
   */
  @Prop() showJump: boolean = false;

  /**
   * Disabled state
   */
  @Prop() disabled: boolean = false;

  /**
   * i18n
   */
  @Prop() labelPrev: string = 'Prev';
  @Prop() labelNext: string = 'Next';
  @Prop() labelFirst: string = 'First';
  @Prop() labelLast: string = 'Last';
  @Prop() labelPage: string = 'Page';
  @Prop() labelOf: string = 'of';

  /**
   * Emitted when page changes
   */
  @Event() natChange: EventEmitter<{ page: number; pageSize: number }>;

  /**
   * Emitted when page size changes
   */
  @Event() natPageSizeChange: EventEmitter<{ pageSize: number }>;

  @State() inputJump: string = '';

  private getPages() {
    const total = this.total;
    const current = this.current;
    const siblingCount = this.siblingCount;
    const pages: Array<number | 'dots'> = [];

    // Always show first, last, siblings, dots
    let startPage = Math.max(current - siblingCount, 1);
    let endPage = Math.min(current + siblingCount, total);

    if (startPage > 2) {
      pages.push(1, 'dots');
    } else {
      for (let i = 1; i < startPage; i++) pages.push(i);
    }

    for (let i = startPage; i <= endPage; i++) pages.push(i);

    if (endPage < total - 1) {
      pages.push('dots', total);
    } else {
      for (let i = endPage + 1; i <= total; i++) pages.push(i);
    }

    return pages;
  }

  private goTo(page: number) {
    if (page < 1 || page > this.total || page === this.current) return;
    this.current = page;
    this.natChange.emit({ page: this.current, pageSize: this.pageSize });
    this.inputJump = '';
  }

  private onPageSizeChange(newSize: string) {
    const numSize = Number(newSize);
    if (!isNaN(numSize)) {
      this.pageSize = numSize;
      this.natPageSizeChange.emit({ pageSize: numSize });
      this.goTo(1);
    }
  }

  private onJumpInput(e: Event) {
    this.inputJump = (e.target as HTMLInputElement).value;
  }

  private onJump(e: Event) {
    e.preventDefault();
    const num = Number(this.inputJump);
    if (!isNaN(num)) {
      this.goTo(num);
    }
  }

  render() {
    if (this.total < 1) return null;
    const pages = this.getPages();

    return (
      <Host>
        <nav
          class={{
            'pagination': true,
            'pagination--compact': this.compact,
            'pagination--disabled': this.disabled,
          }}
          aria-label="Pagination"
        >
          {/* Page Size Selector */}
          <nat-select label="Page size" value={String(this.pageSize)} disabled={this.disabled} onNatChange={e => this.onPageSizeChange(e.detail)}>
            {this.pageSizeOptions.map(size => (
              <option value={size}>{size} / page</option>
            ))}
          </nat-select>

          {/* First Button */}
          {this.showEnds && (
            <button class="pagination__btn" disabled={this.current === 1 || this.disabled} aria-label={this.labelFirst} onClick={() => this.goTo(1)}>
              « {this.labelFirst}
            </button>
          )}

          {/* Prev Button */}
          <button class="pagination__btn" disabled={this.current === 1 || this.disabled} aria-label={this.labelPrev} onClick={() => this.goTo(this.current - 1)}>
            ‹ {this.labelPrev}
          </button>

          {/* Page Buttons */}
          {pages.map((p, idx) =>
            p === 'dots' ? (
              <span key={`dots-${idx}`} class="pagination__dots">
                ...
              </span>
            ) : (
              <button
                key={`page-${p}`}
                class={{
                  'pagination__btn': true,
                  'pagination__page': true,
                  'pagination__btn--active': this.current === p,
                }}
                disabled={this.disabled || this.current === p}
                aria-label={`${this.labelPage} ${p}`}
                aria-current={this.current === p ? 'page' : undefined}
                onClick={() => this.goTo(Number(p))}
              >
                {p}
              </button>
            ),
          )}

          {/* Next Button */}
          <button class="pagination__btn" disabled={this.current >= this.total || this.disabled} aria-label={this.labelNext} onClick={() => this.goTo(this.current + 1)}>
            {this.labelNext} ›
          </button>

          {/* Last Button */}
          {this.showEnds && (
            <button class="pagination__btn" disabled={this.current === this.total || this.disabled} aria-label={this.labelLast} onClick={() => this.goTo(this.total)}>
              {this.labelLast} »
            </button>
          )}

          {/* Jump to page */}
          {this.showJump && (
            <form class="pagination__jump" onSubmit={e => this.onJump(e)}>
              <label htmlFor="jump">{this.labelPage}:</label>
              <input type="number" min={1} max={this.total} value={this.inputJump} disabled={this.disabled} onInput={e => this.onJumpInput(e)} />
              <button type="submit" disabled={this.disabled}>
                Go
              </button>
            </form>
          )}

          <span class="pagination__info">
            {this.labelPage} {this.current} {this.labelOf} {this.total}
          </span>
        </nav>
      </Host>
    );
  }
}
