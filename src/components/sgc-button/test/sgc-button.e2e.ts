import { newE2EPage } from '@stencil/core/testing';

describe('sgc-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sgc-button></sgc-button>');

    const element = await page.find('sgc-button');
    expect(element).toHaveClass('hydrated');
  });
});
