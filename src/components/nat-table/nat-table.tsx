import { Component, Prop, h, Element, State, Host } from '@stencil/core';

export interface TableColumn {
  label: string;
  key: string;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  width?: string;
}

@Component({
  tag: 'nat-table',
  styleUrl: 'nat-table.css',
  shadow: true,
})
export class NatTable {
  @Element() el!: HTMLElement;

  /** Columns definition */
  @Prop() columns: TableColumn[] = [];

  /** Data rows */
  @Prop() rows: Record<string, any>[] = [];

  /** Enable sorting */
  @Prop() sortable: boolean = false;

  /** Track column sorting */
  @State() sortKey?: string;
  @State() sortAsc: boolean = true;

  handleSort(key: string) {
    if (!this.sortable) return;
    if (this.sortKey === key) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortKey = key;
      this.sortAsc = true;
    }
  }

  getSortedRows() {
    if (!this.sortKey) return this.rows;
    return [...this.rows].sort((a, b) => {
      if (a[this.sortKey!] === b[this.sortKey!]) return 0;
      if (this.sortAsc) return a[this.sortKey!] > b[this.sortKey!] ? 1 : -1;
      else return a[this.sortKey!] < b[this.sortKey!] ? 1 : -1;
    });
  }

  render() {
    const columns = this.columns;
    const rows = this.getSortedRows();

    return (
      <Host>
        <div class="table-responsive">
          <table class="nat-table" role="table">
            <thead>
              <tr>
                {columns.map(col => (
                  <th style={col.width ? { width: col.width } : {}} class={{ [`col--${col.align || 'left'}`]: true }} onClick={() => col.sortable && this.handleSort(col.key)}>
                    {col.label}
                    {this.sortable && col.sortable && (
                      <span class="table-sort">
                        {this.sortKey === col.key ? this.sortAsc ? <nat-icon name="chevron-up" /> : <nat-icon name="chevron-up" /> : <nat-icon name="chevrons-up-down" />}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {columns.map(col => (
                    <td class={{ [`col--${col.align || 'left'}`]: true }}>
                      <slot name={`cell-${col.key}-${rIdx}`}>{String(row[col.key] ?? '')}</slot>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Host>
    );
  }
}
