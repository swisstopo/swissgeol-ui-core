import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { SgcSession } from '../sgc-session';
import { SgcSessionInfo } from '../sgc-session-info/sgc-session-info';
import { Role, SimpleUser } from '../../../models/user.model';

const USER: SimpleUser = {
  id: 'my-user',
  firstName: 'Guess',
  lastName: 'What',
  role: Role.Reviewer,
};

describe('sgc-session', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SgcSession],
      html: '<sgc-session></sgc-session>',
    });
    expect(page.root).toEqualHtml(`
      <sgc-session>
        <mock:shadow-root>
          <sgc-button variant="icon-round">
            <sgc-icon name="profile"></sgc-icon>
          </sgc-button>
        </mock:shadow-root>
      </sgc-session>
    `);
  });

  it('emits an sgcSignIn events when no user is logged in', async () => {
    //# Given
    const page = await newSpecPage({
      components: [SgcSession],
      html: '<sgc-session></sgc-session>',
    });

    const spy = jest.fn();
    page.root.addEventListener('sgcSignIn', spy);

    //# When
    page.root.shadowRoot.querySelector('sgc-button').click();
    await page.waitForChanges();

    //# Then
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('renders a dropdown when a user is present', async () => {
    //# Given
    const page = await newSpecPage({
      components: [SgcSession],
      template: () => <sgc-session user={USER}></sgc-session>,
    });

    //# When
    await page.waitForChanges();

    //# Then
    const dropdown = page.root.shadowRoot.querySelector('sgc-dropdown');
    expect(dropdown).toEqualHtml(`
      <sgc-dropdown>
        <sgc-button variant="icon-round">
          <sgc-icon name="profile"></sgc-icon>
        </sgc-button>
        <sgc-session-info />
      </sgc-dropdown>
    `);
  });

  it("renders a user's info", async () => {
    //# Given
    const page = await newSpecPage({
      components: [SgcSessionInfo],
      template: () => <sgc-session-info user={USER}></sgc-session-info>,
    });

    //# When
    await page.waitForChanges();

    //# Then
    expect(page.root).toEqualHtml(`
      <sgc-session-info noninteractive="true">
        <mock:shadow-root>
          <span class="name">${USER.firstName} ${USER.lastName}</span>
          <sgc-button color="secondary">
            <sgc-translate ns="general">logout</sgc-translate>
          </sgc-button>
        </mock:shadow-root>
      </sgc-session-info>
    `);
  });
});
