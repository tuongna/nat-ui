import { Component, Host, h, Prop, State, Event, EventEmitter, Method } from '@stencil/core';

export interface UploadFile {
  /** Browser File object */
  file: File;
  /** Unique ID */
  id: string;
  /** Upload progress 0-100 */
  progress: number;
  /** Current status */
  status: 'pending' | 'uploading' | 'done' | 'error';
  /** Error message if status='error' */
  error?: string;
  /** Object URL for image preview */
  preview?: string;
}

/**
 * Drag-and-drop file upload zone with preview, progress, and multiple file support.
 *
 * @slot - Custom content inside the drop zone (replaces default icon + text)
 */
@Component({
  tag: 'nat-upload',
  styleUrl: 'nat-upload.css',
  shadow: true,
})
export class NatUpload {
  /**
   * Accepted file types (same as HTML accept attribute: 'image/*', '.pdf', etc.)
   */
  @Prop() accept?: string;

  /**
   * Allow multiple file selection
   * @default false
   */
  @Prop() multiple: boolean = false;

  /**
   * Maximum file size in bytes
   */
  @Prop() maxSize?: number;

  /**
   * Maximum number of files (only relevant when multiple=true)
   */
  @Prop() maxFiles?: number;

  /**
   * Drag & drop label text
   * @default 'Drop files here or click to browse'
   */
  @Prop() label: string = 'Drop files here or click to browse';

  /**
   * Hint text shown below label
   */
  @Prop() hint?: string;

  /**
   * If true, shows thumbnails for image files
   * @default true
   */
  @Prop() showPreviews: boolean = true;

  /**
   * If true, the upload zone is disabled
   * @default false
   */
  @Prop() disabled: boolean = false;

  /**
   * Visual variant
   * @default 'default'
   */
  @Prop() variant: 'default' | 'minimal' | 'glass' = 'default';

  /**
   * Emitted when files are added (before upload)
   */
  @Event() natFilesAdded: EventEmitter<File[]>;

  /**
   * Emitted when a file is removed
   */
  @Event() natFileRemoved: EventEmitter<UploadFile>;

  /**
   * Emitted when file exceeds maxSize or type is not allowed
   */
  @Event() natFileRejected: EventEmitter<{ file: File; reason: 'size' | 'type' | 'count' }>;

  @State() private files: UploadFile[] = [];
  @State() private dragging: boolean = false;

  private inputEl: HTMLInputElement;
  private dragCounter: number = 0;

  /** Clear all files */
  @Method()
  async clearFiles() {
    this.files.forEach(f => { if (f.preview) URL.revokeObjectURL(f.preview); });
    this.files = [];
  }

  /** Get the list of added files */
  @Method()
  async getFiles(): Promise<UploadFile[]> {
    return this.files;
  }

  /** Update progress for a specific file by id */
  @Method()
  async setProgress(id: string, progress: number, status?: UploadFile['status']) {
    this.files = this.files.map(f =>
      f.id === id ? { ...f, progress, status: status || f.status } : f,
    );
  }

  private generateId(): string {
    return Math.random().toString(36).slice(2);
  }

  private isAccepted(file: File): boolean {
    if (!this.accept) return true;
    const types = this.accept.split(',').map(t => t.trim());
    return types.some(type => {
      if (type.startsWith('.')) return file.name.toLowerCase().endsWith(type.toLowerCase());
      if (type.endsWith('/*')) return file.type.startsWith(type.slice(0, -1));
      return file.type === type;
    });
  }

  private addFiles(rawFiles: FileList | File[]) {
    const fileArr = Array.from(rawFiles);
    const accepted: File[] = [];

    for (const file of fileArr) {
      if (this.maxFiles && this.files.length + accepted.length >= this.maxFiles) {
        this.natFileRejected.emit({ file, reason: 'count' });
        continue;
      }
      if (this.maxSize && file.size > this.maxSize) {
        this.natFileRejected.emit({ file, reason: 'size' });
        continue;
      }
      if (!this.isAccepted(file)) {
        this.natFileRejected.emit({ file, reason: 'type' });
        continue;
      }
      accepted.push(file);
    }

    if (accepted.length === 0) return;

    const newEntries: UploadFile[] = accepted.map(file => ({
      file,
      id: this.generateId(),
      progress: 0,
      status: 'pending',
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }));

    this.files = this.multiple ? [...this.files, ...newEntries] : newEntries;
    this.natFilesAdded.emit(accepted);
  }

  private removeFile(id: string) {
    const removed = this.files.find(f => f.id === id);
    if (removed?.preview) URL.revokeObjectURL(removed.preview);
    this.files = this.files.filter(f => f.id !== id);
    if (removed) this.natFileRemoved.emit(removed);
  }

  private handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    if (this.disabled) return;
    this.dragCounter++;
    this.dragging = true;
  };

  private handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    this.dragCounter--;
    if (this.dragCounter === 0) this.dragging = false;
  };

  private handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (this.disabled) return;
    e.dataTransfer.dropEffect = 'copy';
  };

  private handleDrop = (e: DragEvent) => {
    e.preventDefault();
    this.dragging = false;
    this.dragCounter = 0;
    if (this.disabled) return;
    const files = e.dataTransfer?.files;
    if (files?.length) this.addFiles(files);
  };

  private handleInputChange = () => {
    const files = this.inputEl?.files;
    if (files?.length) {
      this.addFiles(files);
      this.inputEl.value = '';
    }
  };

  private openFilePicker = () => {
    if (!this.disabled) this.inputEl?.click();
  };

  private formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  render() {
    return (
      <Host>
        <input
          ref={el => (this.inputEl = el as HTMLInputElement)}
          type="file"
          class="nat-upload__input"
          accept={this.accept}
          multiple={this.multiple}
          disabled={this.disabled}
          onChange={this.handleInputChange}
          aria-hidden="true"
          tabIndex={-1}
        />

        <div
          class={{
            'nat-upload__zone': true,
            [`nat-upload__zone--${this.variant}`]: true,
            'nat-upload__zone--dragging': this.dragging,
            'nat-upload__zone--disabled': this.disabled,
            'nat-upload__zone--has-files': this.files.length > 0,
          }}
          onDragEnter={this.handleDragEnter}
          onDragLeave={this.handleDragLeave}
          onDragOver={this.handleDragOver}
          onDrop={this.handleDrop}
          onClick={this.openFilePicker}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && this.openFilePicker()}
          tabIndex={this.disabled ? -1 : 0}
          role="button"
          aria-label={this.label}
          aria-disabled={this.disabled ? 'true' : 'false'}
        >
          <slot>
            <div class="nat-upload__default-content">
              <div class="nat-upload__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <p class="nat-upload__label">{this.label}</p>
              {this.hint && <p class="nat-upload__hint">{this.hint}</p>}
              {this.maxSize && (
                <p class="nat-upload__hint">Max size: {this.formatSize(this.maxSize)}</p>
              )}
            </div>
          </slot>
        </div>

        {this.files.length > 0 && (
          <ul class="nat-upload__file-list" aria-label="Selected files">
            {this.files.map(f => (
              <li class={`nat-upload__file nat-upload__file--${f.status}`} key={f.id}>
                {f.preview && this.showPreviews ? (
                  <img class="nat-upload__preview" src={f.preview} alt={f.file.name} />
                ) : (
                  <span class="nat-upload__file-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                      <polyline points="13 2 13 9 20 9" />
                    </svg>
                  </span>
                )}

                <div class="nat-upload__file-info">
                  <span class="nat-upload__file-name">{f.file.name}</span>
                  <span class="nat-upload__file-size">{this.formatSize(f.file.size)}</span>
                  {f.status === 'uploading' && (
                    <div class="nat-upload__progress-bar">
                      <div class="nat-upload__progress-fill" style={{ width: `${f.progress}%` }} />
                    </div>
                  )}
                  {f.error && <span class="nat-upload__file-error">{f.error}</span>}
                </div>

                <button
                  class="nat-upload__remove"
                  onClick={e => { e.stopPropagation(); this.removeFile(f.id); }}
                  aria-label={`Remove ${f.file.name}`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Host>
    );
  }
}
