import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'sgc-text-area',
  styleUrl: 'sgc-text-area.css',
  shadow: true,
})
export class SgcTextArea {
  @Prop() label: string;
  @Prop() value: string;
  @Prop() isRequired = false;
  @Prop() placeholder: string;
  @Prop() disabled = false;
  @Prop() rows = 4;

  @Event() valueChanged: EventEmitter<string>;

  private onInput = (event: Event) => {
    const input = event.target as HTMLTextAreaElement;
    this.valueChanged.emit(input.value);
  };

  render() {
    return (
      <Host>
        <sgc-form-item-wrapper
          label={this.label}
          icon={this.isRequired ? 'required' : 'optional'}
        >
          <textarea
            value={this.value}
            placeholder={this.placeholder}
            disabled={this.disabled}
            required={this.isRequired}
            rows={this.rows}
            onInput={this.onInput}
          ></textarea>
        </sgc-form-item-wrapper>
      </Host>
    );
  }
}
