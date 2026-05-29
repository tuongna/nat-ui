import { Component, Host, h, Prop, Element } from '@stencil/core';

export type LiquidGlassVariant = 'frosted' | 'liquid' | 'crystal' | 'aurora';
export type LiquidGlassShape = 'rounded' | 'pill' | 'square';

/**
 * @slot - Content rendered on top of the glass surface
 */
@Component({
  tag: 'nat-liquid-glass',
  styleUrl: 'nat-liquid-glass.css',
  shadow: true,
})
export class NatLiquidGlass {
  @Element() el: HTMLElement;

  /**
   * The visual style of the glass surface
   * @default 'frosted'
   */
  @Prop() variant: LiquidGlassVariant = 'frosted';

  /**
   * Shape of the glass panel
   * @default 'rounded'
   */
  @Prop() shape: LiquidGlassShape = 'rounded';

  /**
   * Intensity of the glass effect (0–1)
   * @default 0.7
   */
  @Prop() intensity: number = 0.7;

  /**
   * If true, shows the animated caustic light pattern via Three.js
   * @default true
   */
  @Prop() animated: boolean = true;

  /**
   * Tint color for the glass (CSS color string)
   */
  @Prop() tint?: string;

  private canvasEl: HTMLCanvasElement;
  private animFrame: number;
  private glContext: WebGLRenderingContext | null = null;
  private shaderProgram: WebGLProgram | null = null;
  private startTime: number = Date.now();

  // GLSL Vertex Shader
  private readonly vertSrc = `
    attribute vec2 aPosition;
    varying vec2 vUv;
    void main() {
      vUv = aPosition * 0.5 + 0.5;
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `;

  // GLSL Fragment Shader — Apple Liquid Glass caustics + iridescence
  private readonly fragSrc = `
    precision mediump float;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform float uIntensity;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
        f.y
      );
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p = p * 2.0 + vec2(1.7, 9.2);
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = vUv;
      float t = uTime * 0.25;

      // Liquid warp
      vec2 warpUv = uv * 3.5 + vec2(t * 0.12, t * 0.09);
      vec2 warp = vec2(
        fbm(warpUv) - 0.5,
        fbm(warpUv + vec2(1.7, 9.2)) - 0.5
      ) * 0.18;

      // Caustic light bands
      vec2 cauUv = uv * 4.5 + warp + vec2(t * 0.18);
      float c1 = fbm(cauUv);
      float c2 = fbm(cauUv + vec2(3.2, 1.7) + t * 0.14);
      float caustic = clamp(pow(c1 * c2 * 3.2, 1.4), 0.0, 1.0);

      // Iridescent edge fresnel
      vec2 center = uv - 0.5;
      float edge = length(center) * 2.0;
      float fresnel = pow(clamp(edge, 0.0, 1.0), 2.2);

      vec3 iri = vec3(
        0.5 + 0.5 * cos(edge * 3.14159 + uTime * 0.4 + 0.0),
        0.5 + 0.5 * cos(edge * 3.14159 + uTime * 0.4 + 2.094),
        0.5 + 0.5 * cos(edge * 3.14159 + uTime * 0.4 + 4.189)
      );

      // Moving specular
      vec2 specPos = vec2(0.3 + sin(uTime * 0.35) * 0.28, 0.35 + cos(uTime * 0.28) * 0.25);
      float spec = exp(-length(uv - specPos) * length(uv - specPos) * 12.0) * 0.5;

      // Compose
      vec3 base = vec3(0.87, 0.93, 1.0);
      vec3 color = base + vec3(caustic * 0.18);
      color = mix(color, iri, fresnel * 0.55);
      color += vec3(spec);
      color = clamp(color, 0.0, 1.0);

      float alpha = (0.18 + fresnel * 0.35 + caustic * 0.06) * uIntensity;
      alpha = clamp(alpha, 0.05, 0.72);

      gl_FragColor = vec4(color, alpha);
    }
  `;

  componentDidLoad() {
    if (this.animated) {
      this.initWebGL();
    }
  }

  disconnectedCallback() {
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
    if (this.glContext) {
      const ext = this.glContext.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    }
  }

  private initWebGL() {
    if (!this.canvasEl) return;

    const gl = this.canvasEl.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    this.glContext = gl;

    const vert = this.compileShader(gl, gl.VERTEX_SHADER, this.vertSrc);
    const frag = this.compileShader(gl, gl.FRAGMENT_SHADER, this.fragSrc);
    if (!vert || !frag) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    this.shaderProgram = prog;

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    gl.useProgram(prog);
    const posLoc = gl.getAttribLocation(prog, 'aPosition');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    this.renderLoop();
  }

  private compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
  }

  private renderLoop = () => {
    const gl = this.glContext;
    const prog = this.shaderProgram;
    if (!gl || !prog) return;

    const canvas = this.canvasEl;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }

    gl.clear(gl.COLOR_BUFFER_BIT);

    const elapsed = (Date.now() - this.startTime) / 1000;
    gl.uniform1f(gl.getUniformLocation(prog, 'uTime'), elapsed);
    gl.uniform2f(gl.getUniformLocation(prog, 'uResolution'), w, h);
    gl.uniform1f(gl.getUniformLocation(prog, 'uIntensity'), this.intensity);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    this.animFrame = requestAnimationFrame(this.renderLoop);
  };

  render() {
    const classes = {
      'nat-glass': true,
      [`nat-glass--${this.variant}`]: true,
      [`nat-glass--${this.shape}`]: true,
      'nat-glass--animated': this.animated,
    };

    const tintStyle = this.tint ? { '--nat-glass-tint': this.tint } : {};

    return (
      <Host>
        <div class={classes} style={tintStyle}>
          {this.animated && (
            <canvas
              class="nat-glass__canvas"
              ref={el => (this.canvasEl = el as HTMLCanvasElement)}
            />
          )}
          <div class="nat-glass__content">
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
