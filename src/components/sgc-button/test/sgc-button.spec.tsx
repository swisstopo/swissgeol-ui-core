import { newSpecPage } from "@stencil/core/testing";
import { SgcButton } from "../sgc-button";

describe("sgc-button", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [SgcButton],
      html: `<sgc-button></sgc-button>`,
    });
    expect(page.root).toEqualHtml(`
      <sgc-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sgc-button>
    `);
  });
});
