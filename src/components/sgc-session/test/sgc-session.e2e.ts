import { newE2EPage } from '@stencil/core/testing';

describe('sgc-session', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sgc-session></sgc-session>');

    const element = await page.find('sgc-session');
    expect(element).toHaveClass('hydrated');
  });
});
