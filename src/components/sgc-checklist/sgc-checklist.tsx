import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
} from '@stencil/core';

@Component({
  tag: 'sgc-checklist',
  styleUrl: 'sgc-checklist.css',
  shadow: true,
})
export class SgcChecklist {
  @Prop()
  value: boolean | undefined;

  @Prop({ mutable: true })
  isDisabled = false;

  @Event({ eventName: 'checklistChange' })
  changeEvent: EventEmitter<boolean>;

  @Element()
  element!: HTMLElement;

  @State()
  private state = CheckboxState.Unchecked;

  /**
   * The `SgcChecklist` containing this one, if it exists.
   * If this is not set, then this item is on the topmost level.
   * @private
   */
  @State()
  private parent: SgcChecklist | null = null;

  /**
   * The checklist's children, i.e. the items nested within it.
   * @private
   */
  private children: SgcChecklist[] = [];

  /**
   * How many of this item's children are currently checked (or indeterminate).
   * - If this is equal to `children.length`, the item is set to {@link CheckboxState.Checked}.
   * - Otherwise, if this is `0`, the item is set to {@link CheckboxState.Unchecked}.
   * - Otherwise, the item is set to {@link CheckboxState.Indeterminate}.
   *
   * @private
   */
  private activeChildCount = 0;

  private disabledChildCount = 0;

  connectedCallback(): void {
    this.element['component'] = this;
  }

  componentDidLoad(): void {
    this.initializeChildren();

    if (this.value !== undefined) {
      const newState = this.value
        ? CheckboxState.Checked
        : CheckboxState.Unchecked;
      if (this.state !== newState) {
        this.setState(newState);
      }
    }
  }

  private initializeChildren(): void {
    const slot =
      this.element.shadowRoot.querySelector<HTMLSlotElement>(':host > slot');
    for (const node of slot.assignedNodes()) {
      if ('component' in node && node.component instanceof SgcChecklist) {
        const child = node.component;
        this.children.push(child);
      }
    }
    setTimeout(() => {
      for (const child of this.children) {
        child.setParent(this);
        if (child.state !== CheckboxState.Unchecked) {
          this.handleChildChange(child);
        }
      }
    });
  }

  private setParent(parent: SgcChecklist): void {
    this.parent = parent;
    if (this.isDisabled) {
      this.parent?.handleChildDisabledChange(this);
    }
  }

  readonly toggle = (): void => {
    switch (this.state) {
      case CheckboxState.Checked:
        this.setState(CheckboxState.Unchecked);
        break;
      case CheckboxState.Unchecked:
        this.setState(CheckboxState.Checked);
        break;
      case CheckboxState.Indeterminate: {
        const hasOnlyActiveChildren =
          this.children.length !== 0 &&
          this.children.every(
            (child) =>
              child.isDisabled || child.state !== CheckboxState.Unchecked,
          );
        this.setState(
          hasOnlyActiveChildren
            ? CheckboxState.Unchecked
            : CheckboxState.Checked,
        );
        break;
      }
    }
  };

  private setState(
    state: CheckboxState,
    options: { preventUp?: boolean } = {},
  ): void {
    const wasChecked = this.state !== CheckboxState.Unchecked;
    const isChecked = state !== CheckboxState.Unchecked;

    const wasFullyChecked = this.state === CheckboxState.Checked;
    const isFullyChecked = state === CheckboxState.Checked;

    this.state = state;
    if (wasChecked !== isChecked && !options.preventUp) {
      this.parent?.handleChildChange(this);
    }

    if (wasFullyChecked !== isFullyChecked) {
      this.changeEvent.emit(isFullyChecked);
    }

    const childState =
      state === CheckboxState.Unchecked
        ? CheckboxState.Unchecked
        : CheckboxState.Checked;

    this.activeChildCount = 0;
    if (this.children !== undefined) {
      for (const child of this.children) {
        if (!child.isDisabled) {
          child.setState(childState, { preventUp: true });
        }
        if (child.state !== CheckboxState.Unchecked) {
          this.activeChildCount += 1;
        }
      }
      if (
        this.state === CheckboxState.Checked &&
        this.activeChildCount !== 0 &&
        this.activeChildCount !== this.children.length
      ) {
        this.state = CheckboxState.Indeterminate;
      }
    }
  }

  handleChildChange(child: SgcChecklist): void {
    const wasChecked = this.state !== CheckboxState.Unchecked;
    const wasFullyChecked = this.state === CheckboxState.Checked;

    this.activeChildCount += child.state === CheckboxState.Unchecked ? -1 : 1;
    if (this.activeChildCount === 0) {
      this.state = CheckboxState.Unchecked;
    } else if (this.activeChildCount === this.children.length) {
      this.state = CheckboxState.Checked;
    } else {
      this.state = CheckboxState.Indeterminate;
    }
    const isChecked = this.state !== CheckboxState.Unchecked;
    const isFullyChecked = this.state === CheckboxState.Checked;
    if (wasChecked !== isChecked) {
      this.parent?.handleChildChange(this);
    }
    if (wasFullyChecked !== isFullyChecked) {
      this.changeEvent.emit(isFullyChecked);
    }
  }

  handleChildDisabledChange(child: SgcChecklist): void {
    this.disabledChildCount += child.isDisabled ? 1 : -1;
    const wasDisabled = this.isDisabled;
    this.isDisabled = this.disabledChildCount === this.children.length;
    if (this.isDisabled !== wasDisabled) {
      this.parent?.handleChildDisabledChange(this);
    }
  }

  private get level(): number {
    return (this.parent?.level ?? 0) + 1;
  }

  render() {
    return (
      <Host
        class={{
          'is-checked': this.state !== CheckboxState.Unchecked,
          'is-disabled': this.isDisabled,
        }}
        data-level={this.level}
      >
        <div class="title">
          <slot name="title"></slot>
        </div>
        <div class="checkbox">
          <sgc-checkbox
            value={this.state !== CheckboxState.Unchecked}
            isIndeterminate={this.state === CheckboxState.Indeterminate}
            isDisabled={this.isDisabled}
            onCheckboxChange={this.toggle}
          ></sgc-checkbox>
          <slot name="label"></slot>
        </div>

        <slot></slot>
      </Host>
    );
  }
}

enum CheckboxState {
  /**
   * The checkbox is checked, i.e. active.
   */
  Checked,

  /**
   * The checkbox is unchecked, i.e. inactive.
   */
  Unchecked,

  /**
   * The checkbox is partially active, i.e. some, but not all, of its children are active.
   */
  Indeterminate,
}
