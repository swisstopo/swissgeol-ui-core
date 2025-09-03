import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import styles from './sgc-dropdown.css';
import {
  SgcPopupAlignment,
  SgcPopupPosition,
  updatePopupPosition,
} from '../../utils/popup.utils';

const DROPDOWN_ANIMATION_DURATION_MS = 250;

@Component({
  tag: 'sgc-dropdown',
  styles,
  shadow: true,
})
export class SgcDropdown implements ComponentInterface {
  @Prop()
  isOpen: boolean | null = null;

  /**
   * How the dropdown is positioned relative to its target.
   *
   * If this is `null`, the position will be automatically determined.
   */
  @Prop()
  position: SgcPopupPosition | null = null;

  /**
   How the dropdown is aligned relative to its target.

   If this is `null`, the alignment will be automatically determined.
   */
  @Prop()
  align: SgcPopupAlignment | null = null;

  @Event({ eventName: 'sgcToggle', composed: true })
  toggleEvent!: EventEmitter<boolean>;

  @Element()
  element!: HTMLElement;

  @State()
  isActuallyOpen = false;

  private originalParent!: HTMLElement | ShadowRoot;

  private timeoutForClassToggle: NodeJS.Timeout = null;

  private trigger!: HTMLElement;

  private shouldClose = false;

  private knownItems = new Set<HTMLElement>();

  connectedCallback(): void {
    if (this.originalParent === undefined) {
      this.element.classList.add('is-hidden');
    } else {
      this.handleOpenChange();
    }

    document.addEventListener('click', this.handleDocumentClick, {
      capture: true,
    });
  }

  disconnectedCallback(): void {
    if (this.trigger === undefined) {
      return;
    }

    // const container = this.trigger.parentElement;
    // this.element.prepend(this.trigger);
    // container.remove();

    // this.element.prepend(this.trigger);
    this.trigger = undefined;
    this.shouldClose = false;
    document.removeEventListener('click', this.handleDocumentClick, {
      capture: true,
    });
  }

  componentDidLoad(): void {
    if (this.trigger === undefined) {
      this.initializeContent();
    }
  }

  componentDidUpdate(): void {
    this.updatePosition();
  }

  private initializeContent(): void {
    this.originalParent = this.element.parentNode as HTMLElement | ShadowRoot;

    const trigger = this.element.children[0] as HTMLElement;
    if (trigger.tagName === 'SGC-DROPDOWN-ITEM') {
      throw new Error(
        'The first child of a dropdown should be its trigger, not an item.',
      );
    }

    const container = document.createElement('div');
    container.classList.add('sgc-dropdown-trigger');
    container.append(trigger);

    this.originalParent.insertBefore(container, this.element);
    document.body.appendChild(this.element);
    this.trigger = trigger;
    trigger.addEventListener('click', () => {
      this.shouldClose = false;
      if (this.isOpen === null) {
        this.isActuallyOpen = !this.isActuallyOpen;
      }
    });
  }

  private handleDocumentClick = () => {
    this.shouldClose = true;
    setTimeout(() => {
      if (this.shouldClose) {
        if (this.isOpen === null) {
          this.isActuallyOpen = false;
        }
        this.toggleEvent.emit(false);
      }
    });
  };

  private readonly handleItemClick = () => {
    this.shouldClose = false;
  };

  private handleSlotChange = () => {
    const items = this.element.shadowRoot
      .querySelector('slot')
      .assignedNodes()
      .filter((it) => it instanceof HTMLElement);

    // Make the dropdown temporarily visible so that we can detect the size of our content.
    this.element.style.display = 'block';

    let height = 0;
    for (const item of items) {
      height += item.getBoundingClientRect().height;
      const isInteractive = !item.hasAttribute('noninteractive');
      if (this.knownItems.delete(item) && isInteractive) {
        item.removeEventListener('click', this.handleItemClick);
        continue;
      }
      item.addEventListener('click', this.handleItemClick);
    }
    for (const oldItem of this.knownItems) {
      oldItem.removeEventListener('click', this.handleItemClick);
    }

    this.element.style.display = '';

    this.element.style.setProperty('--sgc-dropdown-height', `${height}px`);

    this.knownItems = new Set(items);

    this.updatePosition();
  };

  @Watch('isOpen')
  handleOpenChange(): void {
    if (this.isOpen !== null) {
      this.isActuallyOpen = this.isOpen;
    }
  }

  @Watch('isActuallyOpen')
  handleActuallyOpen(): void {
    if (this.isActuallyOpen) {
      this.show();
    } else {
      this.hide();
    }
  }

  private show(): void {
    this.clearClassToggleTimeout();
    this.updatePosition();
    this.trigger.setAttribute('active', '');
    this.element.classList.remove('is-hidden');
    this.timeoutForClassToggle = setTimeout(() => {
      this.element.classList.add('is-visible');
    });
  }

  private hide(): void {
    this.clearClassToggleTimeout();
    this.trigger.removeAttribute('active');
    this.element.classList.remove('is-visible');
    this.timeoutForClassToggle = setTimeout(() => {
      this.element.classList.add('is-hidden');
    }, DROPDOWN_ANIMATION_DURATION_MS);
  }

  private updatePosition(): void {
    if (this.trigger === undefined) {
      return;
    }
    updatePopupPosition({
      popup: this.element,
      target: this.trigger,
      position: this.position ?? 'bottom',
      align: this.align ?? 'center',
      shouldCheckOutOfBounds: true,
    });
  }

  private clearClassToggleTimeout(): void {
    if (this.timeoutForClassToggle !== null) {
      clearTimeout(this.timeoutForClassToggle);
      this.timeoutForClassToggle = null;
    }
  }

  render() {
    return (
      <Host>
        <slot onSlotchange={this.handleSlotChange}></slot>
      </Host>
    );
  }
}
