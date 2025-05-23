export class LocalDate {
  private constructor(date: Date) {
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDay();
  }

  static now(): LocalDate {
    return new LocalDate(new Date());
  }

  static of(year: number, month: number, day: number): LocalDate {
    return new LocalDate(new Date(year, month - 1, day));
  }

  static fromDate(date: Date): LocalDate {
    return new LocalDate(date);
  }

  static parse(value: string): LocalDate {
    const parts = value.split('-');
    if (parts.length !== 3) {
      throw new Error(
        `failed to parse LocalDate (expected 3 parts, but got ${parts.length})`,
      );
    }
    const [year, month, day] = parts.map(parseInt);
    if (isNaN(year)) {
      throw new Error('failed to parse LocalDate (invalid year)');
    }
    if (isNaN(month)) {
      throw new Error('failed to parse LocalDate (invalid month)');
    }
    if (isNaN(day)) {
      throw new Error('failed to parse LocalDate (invalid day)');
    }
    return LocalDate.of(year, month, day);
  }

  static tryParse(value: string): LocalDate | null {
    if (typeof value !== 'string') {
      return null;
    }
    const parts = value.split('-');
    if (parts.length !== 3) {
      return null;
    }
    const [year, month, day] = parts.map(Number);
    if (isNaN(year)) {
      return null;
    }
    if (isNaN(month)) {
      return null;
    }
    if (isNaN(day)) {
      return null;
    }
    return LocalDate.of(year, month, day);
  }

  readonly year: number;
  readonly month: number;
  readonly day: number;

  toString(): string {
    return `${this.year}-${this.month}-${this.day}`;
  }

  toJSON(): string {
    return this.toString();
  }

  toDate(): Date {
    return new Date(this.year, this.month - 1, this.day);
  }
}
