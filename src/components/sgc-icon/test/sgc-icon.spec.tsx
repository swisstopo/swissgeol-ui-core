import { newSpecPage } from '@stencil/core/testing';
import { SgcIcon } from '../sgc-icon';

describe('sgc-icon', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SgcIcon],
      html: '<sgc-icon></sgc-icon>',
    });
    expect(page.root).toEqualHtml(`
      <sgc-icon size="normal">
        <mock:shadow-root>
          <span></span>
        </mock:shadow-root>
      </sgc-icon>
    `);
  });
});
