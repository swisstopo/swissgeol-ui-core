import { newSpecPage } from '@stencil/core/testing';
import { SgcButton } from '../sgc-button';

describe('sgc-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SgcButton],
      html: '<sgc-button></sgc-button>',
    });
    expect(page.root).toEqualHtml(`
      <sgc-button color="primary" justify="center" variant="default" size="normal">
        <mock:shadow-root>
          <button class="button" part="button">
            <slot></slot>
          </button>
        </mock:shadow-root>
      </sgc-button>
    `);
  });
});
