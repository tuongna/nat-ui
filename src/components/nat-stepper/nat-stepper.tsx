import { Component, Prop, h, Event, EventEmitter, Element, Host } from '@stencil/core';

export interface StepperStep {
  value: string;
  label: string;
  icon?: string;
  description?: string;
  error?: boolean;
  disabled?: boolean;
}

@Component({
  tag: 'nat-stepper',
  styleUrl: 'nat-stepper.css',
  shadow: true,
})
export class NatStepper {
  @Element() el!: HTMLElement;

  /** Steps list */
  @Prop() steps: StepperStep[] = [];

  /** Which step is active */
  @Prop({ mutable: true }) active: number = 0;

  /** Layout orientation */
  @Prop() vertical: boolean = false;

  /** Clickable steps */
  @Prop() clickable: boolean = false;

  /** Emits when step changes */
  @Event() natChange: EventEmitter<{ index: number; value: string }>;

  handleStepClick(idx: number, step: StepperStep) {
    if (!this.clickable || step.disabled || step.error) return;
    this.active = idx;
    this.natChange.emit({ index: idx, value: step.value });
  }

  render() {
    return (
      <Host>
        <nav
          class={{
            'stepper': true,
            'stepper--vertical': this.vertical,
          }}
        >
          {this.steps.map((step, idx) => (
            <div
              class={{
                'step': true,
                'step--active': idx === this.active,
                'step--completed': idx < this.active,
                'step--error': !!step.error,
                'step--disabled': !!step.disabled,
              }}
              tabindex={this.clickable && !step.disabled && !step.error ? 0 : -1}
              role="button"
              aria-current={idx === this.active ? 'step' : undefined}
              aria-disabled={step.disabled ? 'true' : undefined}
              onClick={() => this.handleStepClick(idx, step)}
            >
              {step.icon && <nat-icon name={step.icon} />}
              <span class="step-label">{step.label}</span>
              {step.description && <span class="step-desc">{step.description}</span>}
            </div>
          ))}
        </nav>
      </Host>
    );
  }
}
