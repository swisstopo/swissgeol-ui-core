import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import styles from './sgc-select.css';

export type SelectValue = unknown;
export type SelectKey = unknown;

// Experimental, do not use in production
@Component({
  tag: 'sgc-select',
  styles,
  shadow: true,
})
export class SgcSelect {
  @Prop() values: SelectValue[] = [];
  @Prop() bindLabel?: string;
  @Prop() bindKey?: string;
  @Prop() multiple = false;
  @Prop() initialKeys: SelectKey[] = [];
  @Prop() disabled = false;
  @Prop() trigger = '';
  @Prop() errorMessage = '';
  @Prop() placeholder = '';

  @Event({ eventName: 'selectionChanged', composed: true })
  selectionChangedEvent: EventEmitter<SelectKey[]>;

  @State() selectedValues: SelectValue[] = [];
  @State() isDropdownOpen = false;
  @State() labelToRender: string;

  componentWillLoad() {
    this.syncInitialSelection();
    this.labelToRender = this.renderSelectedLabel();
    document.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  @Watch('initialKeys')
  syncInitialSelection() {
    if (this.bindKey) {
      this.selectedValues = this.values.filter((val) =>
        this.initialKeys.includes(this.getKey(val)),
      );
    } else {
      this.selectedValues = [...(this.initialKeys as unknown as SelectValue[])];
    }
    this.labelToRender = this.renderSelectedLabel();
  }

  getKey(value: SelectValue): SelectKey {
    return this.bindKey
      ? (value[this.bindKey] as SelectKey)
      : (value as SelectKey);
  }

  isSelected(value: SelectValue): boolean {
    return this.selectedValues.some(
      (v) => this.getKey(v) === this.getKey(value),
    );
  }

  toggleDropdown = (e: Event) => {
    e.stopPropagation();
    if (!this.disabled) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  };

  handleOutsideClick = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest('sgc-select')) {
      this.isDropdownOpen = false;
    }
  };

  toggleSelection = (value: SelectValue) => {
    if (this.multiple) {
      const isSelected = this.isSelected(value);
      this.selectedValues = isSelected
        ? this.selectedValues.filter(
            (v) => this.getKey(v) !== this.getKey(value),
          )
        : [...this.selectedValues, value];
    } else {
      this.selectedValues = [value];
      this.isDropdownOpen = false;
    }

    const keys = this.selectedValues.map((v) => this.getKey(v));
    this.selectionChangedEvent.emit(keys);
    this.labelToRender = this.renderSelectedLabel();
  };

  render() {
    return (
      <Host>
        <div
          class={{ 'select-trigger': true, 'is-disabled': this.disabled }}
          onClick={this.toggleDropdown}
        >
          <span>{this.labelToRender}</span>
          <sgc-icon
            name="chevronDown"
            class={{
              'is-open': this.isDropdownOpen,
              'is-hidden': this.disabled,
            }}
          ></sgc-icon>
        </div>

        {this.isDropdownOpen && (
          <div class="select-dropdown">
            {this.values.map((value) => {
              const label = this.bindLabel ? value[this.bindLabel] : value;
              const isSelected = this.isSelected(value);
              return (
                <div
                  class={{
                    'select-option': true,
                    selected: isSelected,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    this.toggleSelection(value);
                  }}
                >
                  {this.multiple ? (
                    <sgc-checkbox
                      value={isSelected}
                      isDisabled={false}
                    ></sgc-checkbox>
                  ) : null}
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
        )}

        {this.errorMessage && <p class="error-message">{this.errorMessage}</p>}
      </Host>
    );
  }

  renderSelectedLabel() {
    if (this.trigger) {
      return `${this.selectedValues.length} ${this.trigger}`;
    } else if (this.multiple) {
      return this.selectedValues.length > 0
        ? this.selectedValues
            .map((value) => (this.bindLabel ? value[this.bindLabel] : value))
            .join(', ')
        : this.placeholder;
    } else {
      const selected = this.selectedValues[0];
      if (selected) {
        return this.bindLabel ? selected[this.bindLabel] : selected;
      }
      return this.placeholder;
    }
  }
}
