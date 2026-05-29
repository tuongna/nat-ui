import { Component, Host, h, Prop, State, Event, EventEmitter, Watch, Element } from '@stencil/core';

interface HSV { hue: number; sat: number; val: number }
interface RGB { r: number; g: number; b: number }

function hsvToRgb({ hue, sat, val }: HSV): RGB {
  const f = (n: number) => {
    const k = (n + hue / 60) % 6;
    return val - val * sat * Math.max(0, Math.min(k, 4 - k, 1));
  };
  return { r: Math.round(f(5) * 255), g: Math.round(f(3) * 255), b: Math.round(f(1) * 255) };
}

function rgbToHsv({ r, g, b }: RGB): HSV {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  const hue = max === min ? 0 : max === r ? ((g - b) / d + (g < b ? 6 : 0)) * 60 : max === g ? ((b - r) / d + 2) * 60 : ((r - g) / d + 4) * 60;
  return { hue, sat: max === 0 ? 0 : d / max, val: max };
}

function hexToRgb(hex: string): RGB | null {
  const m = hex.replace('#', '').match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return m ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) } : null;
}

function rgbToHex({ r, g, b }: RGB): string {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function rgbToHsl({ r, g, b }: RGB): { hue: number; sat: number; lum: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const lum = (max + min) / 2;
  if (max === min) return { hue: 0, sat: 0, lum };
  const d = max - min, sat = lum > 0.5 ? d / (2 - max - min) : d / (max + min);
  const hue = max === r ? ((g - b) / d + (g < b ? 6 : 0)) / 6 : max === g ? ((b - r) / d + 2) / 6 : ((r - g) / d + 4) / 6;
  return { hue: hue * 360, sat, lum };
}

/**
 * Full-featured color picker with hue/saturation/value spectrum,
 * alpha slider, hex input, and preset swatches.
 */
@Component({
  tag: 'nat-color-picker',
  styleUrl: 'nat-color-picker.css',
  shadow: true,
})
export class NatColorPicker {
  @Element() el: HTMLElement;

  /**
   * Current color value as a hex string
   * @default '#5b6fe8'
   */
  @Prop({ mutable: true, reflect: true }) value: string = '#5b6fe8';

  /**
   * Show alpha (opacity) slider
   * @default false
   */
  @Prop() showAlpha: boolean = false;

  /**
   * Show preset color swatches
   * @default true
   */
  @Prop() showSwatches: boolean = true;

  /**
   * Custom swatch colors (hex strings)
   */
  @Prop() swatches: string[] = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#6b7280', '#000000', '#ffffff'];

  /**
   * Glass style picker panel
   * @default false
   */
  @Prop() glass: boolean = false;

  /**
   * Emitted on every color change
   */
  @Event() natChange: EventEmitter<{ hex: string; rgba: string; rgb: RGB }>;

  @State() private hsv: HSV = { hue: 0, sat: 0, val: 0 };
  @State() private alpha: number = 1;
  @State() private hexInput: string = '';

  private spectrumEl: HTMLElement;
  private hueEl: HTMLElement;
  private alphaEl: HTMLElement;

  componentWillLoad() {
    this.syncFromValue();
  }

  @Watch('value')
  onValueChange(val: string) {
    const rgb = hexToRgb(val);
    if (rgb) {
      this.hsv = rgbToHsv(rgb);
      this.hexInput = val.replace('#', '').toUpperCase();
    }
  }

  private syncFromValue() {
    const rgb = hexToRgb(this.value);
    if (rgb) {
      this.hsv = rgbToHsv(rgb);
      this.hexInput = this.value.replace('#', '').toUpperCase();
    }
  }

  private get currentRgb(): RGB {
    return hsvToRgb(this.hsv);
  }

  private get currentHex(): string {
    return rgbToHex(this.currentRgb);
  }

  private get hueColor(): string {
    return rgbToHex(hsvToRgb({ hue: this.hsv.hue, sat: 1, val: 1 }));
  }

  private emit() {
    const rgb = this.currentRgb;
    const hex = this.currentHex;
    this.value = hex;
    this.hexInput = hex.replace('#', '').toUpperCase();
    this.natChange.emit({ hex, rgba: `rgba(${rgb.r},${rgb.g},${rgb.b},${this.alpha.toFixed(2)})`, rgb });
  }

  private startDrag(type: 'spectrum' | 'hue' | 'alpha', e: MouseEvent | TouchEvent) {
    this.handleDragMove(type, e);
    const move = (ev: MouseEvent | TouchEvent) => this.handleDragMove(type, ev);
    const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('touchmove', move); window.removeEventListener('mouseup', up); window.removeEventListener('touchend', up); };
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);
  }

  private handleDragMove(type: 'spectrum' | 'hue' | 'alpha', e: MouseEvent | TouchEvent) {
    e.preventDefault?.();
    const point = 'touches' in e ? e.touches[0] : e;
    if (type === 'spectrum' && this.spectrumEl) {
      const rect = this.spectrumEl.getBoundingClientRect();
      const sat = Math.max(0, Math.min(1, (point.clientX - rect.left) / rect.width));
      const val = Math.max(0, Math.min(1, 1 - (point.clientY - rect.top) / rect.height));
      this.hsv = { ...this.hsv, sat, val };
      this.emit();
    } else if (type === 'hue' && this.hueEl) {
      const rect = this.hueEl.getBoundingClientRect();
      const hue = Math.max(0, Math.min(360, ((point.clientX - rect.left) / rect.width) * 360));
      this.hsv = { ...this.hsv, hue };
      this.emit();
    } else if (type === 'alpha' && this.alphaEl) {
      const rect = this.alphaEl.getBoundingClientRect();
      this.alpha = Math.max(0, Math.min(1, (point.clientX - rect.left) / rect.width));
      this.emit();
    }
  }

  private handleHexInput = (e: InputEvent) => {
    const raw = (e.target as HTMLInputElement).value.replace('#', '').toUpperCase().slice(0, 6);
    this.hexInput = raw;
    if (raw.length === 6) {
      const rgb = hexToRgb('#' + raw);
      if (rgb) { this.hsv = rgbToHsv(rgb); this.emit(); }
    }
  };

  private pickSwatch(hex: string) {
    const rgb = hexToRgb(hex);
    if (rgb) { this.hsv = rgbToHsv(rgb); this.emit(); }
  }

  render() {
    const rgb = this.currentRgb;
    const hex = this.currentHex;
    const { hue, sat, val } = this.hsv;
    const hsl = rgbToHsl(rgb);

    const thumbX = `${sat * 100}%`;
    const thumbY = `${(1 - val) * 100}%`;
    const hueX = `${(hue / 360) * 100}%`;
    const alphaX = `${this.alpha * 100}%`;
    const currentRgbaStr = `rgba(${rgb.r},${rgb.g},${rgb.b},${this.alpha})`;
    const contrastColor = hsl.lum > 0.5 ? '#000' : '#fff';

    return (
      <Host>
        <div
          class={{
            'nat-cp': true,
            'nat-cp--glass': this.glass,
          }}
        >
          {/* Spectrum (SV picker) */}
          <div
            class="nat-cp__spectrum"
            ref={el => (this.spectrumEl = el as HTMLElement)}
            style={{ background: `hsl(${hue}, 100%, 50%)` }}
            onMouseDown={e => this.startDrag('spectrum', e)}
            onTouchStart={e => this.startDrag('spectrum', e)}
          >
            <div class="nat-cp__spectrum-white" />
            <div class="nat-cp__spectrum-black" />
            <div
              class="nat-cp__thumb"
              style={{
                left: thumbX,
                top: thumbY,
                background: hex,
                borderColor: contrastColor,
              }}
            />
          </div>

          <div class="nat-cp__sliders">
            {/* Color preview dot */}
            <div
              class="nat-cp__preview"
              style={{ background: currentRgbaStr }}
            />

            <div class="nat-cp__slider-group">
              {/* Hue slider */}
              <div
                class="nat-cp__hue-track"
                ref={el => (this.hueEl = el as HTMLElement)}
                onMouseDown={e => this.startDrag('hue', e)}
                onTouchStart={e => this.startDrag('hue', e)}
              >
                <div class="nat-cp__slider-thumb" style={{ left: hueX }} />
              </div>

              {/* Alpha slider */}
              {this.showAlpha && (
                <div
                  class="nat-cp__alpha-track"
                  ref={el => (this.alphaEl = el as HTMLElement)}
                  onMouseDown={e => this.startDrag('alpha', e)}
                  onTouchStart={e => this.startDrag('alpha', e)}
                >
                  <div
                    class="nat-cp__alpha-gradient"
                    style={{ background: `linear-gradient(to right, transparent, ${this.hueColor})` }}
                  />
                  <div class="nat-cp__slider-thumb" style={{ left: alphaX }} />
                </div>
              )}
            </div>
          </div>

          {/* Hex input */}
          <div class="nat-cp__hex-row">
            <span class="nat-cp__hex-hash">#</span>
            <input
              class="nat-cp__hex-input"
              type="text"
              value={this.hexInput}
              maxLength={6}
              spellcheck={false}
              aria-label="Hex color value"
              onInput={this.handleHexInput}
            />
            {this.showAlpha && (
              <span class="nat-cp__alpha-label">{Math.round(this.alpha * 100)}%</span>
            )}
          </div>

          {/* Swatches */}
          {this.showSwatches && (
            <div class="nat-cp__swatches" role="listbox" aria-label="Color presets">
              {this.swatches.map(sw => (
                <button
                  class={{
                    'nat-cp__swatch': true,
                    'nat-cp__swatch--active': sw.toLowerCase() === hex.toLowerCase(),
                  }}
                  style={{ background: sw }}
                  title={sw}
                  role="option"
                  aria-selected={sw.toLowerCase() === hex.toLowerCase() ? 'true' : 'false'}
                  aria-label={`Color ${sw}`}
                  onClick={() => this.pickSwatch(sw)}
                />
              ))}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
