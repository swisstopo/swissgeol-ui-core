import { Component, Host, h, Prop, Watch } from '@stencil/core';
import { LocalDate } from '../../models/base/local-date';

@Component({
  tag: 'sgc-date',
  styleUrl: 'sgc-date.css',
  shadow: false,
})
export class SgcDate {
  @Prop()
  value: LocalDate | Date;

  private displayValue: string | null = null;

  connectedCallback(): void {
    this.handleValueChange();
  }

  @Watch('value')
  private handleValueChange(): void {
    const { value } = this;
    const [year, month, day] =
      value instanceof Date
        ? [value.getFullYear(), value.getMonth() + 1, value.getDate()]
        : [value.year, value.month, value.day];
    this.displayValue = `${pad(day)}.${pad(month)}.${pad(year, 4)}`;
  }

  render() {
    return <Host>{this.displayValue}</Host>;
  }
}

const pad = (value: number, length = 2) => `${value}`.padStart(length, '0');
