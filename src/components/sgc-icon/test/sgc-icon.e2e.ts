import { newE2EPage } from '@stencil/core/testing';

describe('sgc-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sgc-icon></sgc-icon>');

    const element = await page.find('sgc-icon');
    expect(element).toHaveClass('hydrated');
  });
});
