import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  ComponentInterface,
  Element,
} from '@stencil/core';
import { SimpleUser } from '../../../models/user.model';

@Component({
  tag: 'sgc-session-info',
  styleUrl: 'sgc-session-info.css',
  shadow: true,
})
export class SgcSessionInfo implements ComponentInterface {
  @Prop()
  user!: SimpleUser;

  @Event({ eventName: 'sgcSignOut' })
  signOutEvent: EventEmitter<SimpleUser>;

  @Element()
  element!: HTMLElement;

  connectedCallback(): void {
    this.element.setAttribute('noninteractive', 'true');
  }

  render() {
    return (
      <Host>
        <span class="name">
          {this.user.firstName} {this.user.lastName}
        </span>
        <sgc-button color="secondary">Logout</sgc-button>
      </Host>
    );
  }
}
