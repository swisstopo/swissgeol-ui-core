import { newSpecPage } from '@stencil/core/testing';
import { SgcSession } from '../sgc-session';

describe('sgc-session', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SgcSession],
      html: `<sgc-session></sgc-session>`,
    });
    expect(page.root).toEqualHtml(`
      <sgc-session>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sgc-session>
    `);
  });
});
