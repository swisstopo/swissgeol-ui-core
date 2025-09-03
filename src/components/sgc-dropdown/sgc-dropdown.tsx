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

  private timeoutForClassToggle: NodeJS.Timeout = null;

  private trigger!: HTMLElement;
  private container!: HTMLElement;
  private slot!: HTMLSlotElement;

  private shouldClose = false;

  private knownItems = new Set<HTMLElement>();

  connectedCallback(): void {
    document.addEventListener('click', this.handleDocumentClick, {
      capture: true,
    });
  }

  disconnectedCallback(): void {
    if (this.trigger === undefined) {
      return;
    }

    this.container.remove();
    this.element.prepend(this.trigger);

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
    const trigger = this.element.children[0] as HTMLElement;
    if (trigger.tagName === 'SGC-DROPDOWN-ITEM') {
      throw new Error(
        'The first child of a dropdown should be its trigger, not an item.',
      );
    }

    this.slot = this.element.shadowRoot.querySelector('slot');
    this.container = document.createElement('div');
    this.container.classList.add('sgc-dropdown-container', 'is-hidden');
    const shadow = this.container.attachShadow({
      mode: 'open',
    });
    shadow.innerHTML = '<slot></slot>';
    shadow
      .querySelector('slot')
      .addEventListener('slotchange', this.handleSlotChange);

    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(styles);
    shadow.adoptedStyleSheets = [styleSheet];

    document.body.append(this.container);
    this.element.insertAdjacentElement('afterend', trigger);
    this.trigger = trigger;
    trigger.addEventListener('click', () => {
      this.shouldClose = false;
      if (this.isOpen === null) {
        this.isActuallyOpen = !this.isActuallyOpen;
      }
    });

    this.handleSlotChange();
  }

  private handleDocumentClick = () => {
    if (!this.isActuallyOpen) {
      return;
    }
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
    if (this.slot === undefined) {
      return;
    }

    const items = this.slot
      .assignedNodes()
      .filter((it) => it instanceof HTMLElement);

    for (const item of items) {
      this.container.append(item);
    }

    // Make the dropdown temporarily visible so that we can detect the size of our content.
    this.container.style.display = 'block';

    let height = 0;
    for (const item of Array.from(this.container.children) as HTMLElement[]) {
      height += item.getBoundingClientRect().height;
      const isInteractive = !item.hasAttribute('noninteractive');
      if (isInteractive) {
        continue;
      }
      if (this.knownItems.delete(item)) {
        item.removeEventListener('click', this.handleItemClick);
        continue;
      }
      item.addEventListener('click', this.handleItemClick);
    }

    this.container.style.display = '';
    this.container.style.setProperty('--sgc-dropdown-height', `${height}px`);

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
    this.container.classList.remove('is-hidden');
    this.timeoutForClassToggle = setTimeout(() => {
      this.container.classList.add('is-visible');
    });
  }

  private hide(): void {
    this.clearClassToggleTimeout();
    this.trigger.removeAttribute('active');
    this.container.classList.remove('is-visible');
    this.timeoutForClassToggle = setTimeout(() => {
      this.container.classList.add('is-hidden');
    }, DROPDOWN_ANIMATION_DURATION_MS);
  }

  private updatePosition(): void {
    if (this.trigger === undefined) {
      return;
    }
    updatePopupPosition({
      popup: this.container,
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
