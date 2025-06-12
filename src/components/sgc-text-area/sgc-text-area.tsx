import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import styles from './sgc-text-area.css';

@Component({
  tag: 'sgc-text-area',
  styles,
  shadow: true,
})
export class SgcTextArea {
  @Prop() value: string;
  @Prop() placeholder: string = '';
  @Prop() disabled = false;
  @Prop() rows = 4;

  @Event() valueChanged: EventEmitter<string>;

  private handleInput = (event: Event) => {
    const input = event.target as HTMLTextAreaElement;
    this.valueChanged.emit(input.value);
  };

  render() {
    return (
      <Host>
        <textarea
          value={this.value}
          placeholder={this.placeholder}
          disabled={this.disabled}
          rows={this.rows}
          onInput={this.handleInput}
        ></textarea>
      </Host>
    );
  }
}
