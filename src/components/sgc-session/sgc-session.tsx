import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import styles from './sgc-session.css';
import { SimpleUser } from '../../models/user.model';

@Component({
  tag: 'sgc-session',
  styles,
  shadow: true,
})
export class SgcSession {
  @Prop()
  user: SimpleUser | null = null;

  @Event({ eventName: 'sgcSignIn' })
  signInEvent: EventEmitter<void>;

  @Event({ eventName: 'sgcSignOut' })
  signOutEvent: EventEmitter<SimpleUser>;

  private readonly handleSignIn = () => {
    this.signInEvent.emit();
  };

  private readonly handleSignOut = () => {
    if (this.user !== null) {
      this.signOutEvent.emit(this.user);
    }
  };

  render() {
    return (
      <Host>
        {this.user === null ? (
          this.renderButton()
        ) : (
          <sgc-dropdown>
            {this.renderButton()}
            <sgc-session-info
              user={this.user}
              onSgcSignOut={this.handleSignOut}
            ></sgc-session-info>
          </sgc-dropdown>
        )}
      </Host>
    );
  }

  private readonly renderButton = () => (
    <sgc-button
      variant="icon-round"
      onClick={this.user === null && this.handleSignIn}
    >
      <sgc-icon name="profile" />
    </sgc-button>
  );
}
