import {
  AttachInternals,
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  Watch,
} from '@stencil/core';

@Component({
  tag: 'sgc-checkbox',
  styleUrl: 'sgc-checkbox.css',
  shadow: true,
  formAssociated: true,
})
export class SgcCheckbox {
  @Prop()
  value!: boolean;

  @Prop({ reflect: true, attribute: 'indeterminate' })
  isIndeterminate = false;

  @Prop({ reflect: true, attribute: 'disabled' })
  isDisabled = false;

  @Event({ eventName: 'checkboxChange' })
  changeEvent: EventEmitter<boolean>;

  @AttachInternals()
  internals!: ElementInternals;

  connectedCallback(): void {
    this.handleValueChange();
  }

  @Watch('value')
  handleValueChange(): void {
    this.internals?.setFormValue(this.value ? 'on' : null);
  }

  @Listen('click')
  handleClick(): void {
    this.changeEvent.emit(!this.value);
  }

  render = () => (
    <Host
      role="checkbox"
      tabindex="0"
      aria-checked={this.value.toString()}
      class={{
        'is-checked': this.value,
        'is-indeterminate': this.isIndeterminate,
      }}
    >
      <svg
        class="is-checkmark"
        width="12"
        height="10"
        viewBox="0 0 12 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.2588 0.991227C11.4931 1.22564 11.6248 1.54352 11.6248 1.87498C11.6248 2.20643 11.4931 2.52432 11.2588 2.75873L5.00877 9.00873C4.77436 9.24307 4.45648 9.37471 4.12502 9.37471C3.79357 9.37471 3.47568 9.24307 3.24127 9.00873L0.741271 6.50873C0.513573 6.27297 0.38758 5.95722 0.390428 5.62948C0.393276 5.30173 0.524737 4.98821 0.756498 4.75645C0.988258 4.52469 1.30177 4.39323 1.62952 4.39038C1.95727 4.38754 2.27302 4.51353 2.50877 4.74123L4.12502 6.35748L9.49127 0.991227C9.72568 0.756889 10.0436 0.625244 10.375 0.625244C10.7065 0.625244 11.0244 0.756889 11.2588 0.991227Z"
          fill="currentColor"
        />
      </svg>

      <svg
        class="is-indeterminate"
        width="14"
        height="3"
        viewBox="0 0 14 3"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="1.75"
          y1="1.25"
          x2="12.25"
          y2="1.25"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </Host>
  );
}
