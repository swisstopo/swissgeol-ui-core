[![release](https://img.shields.io/github/actions/workflow/status/swisstopo/swissgeol-ui-core/publish.yml?branch=main&label=release)](https://github.com/swisstopo/swissgeol-ui-core/actions/workflows/publish.yml?query=branch%3Amain)
[![develop](https://img.shields.io/github/actions/workflow/status/swisstopo/swissgeol-ui-core/publish.yml?branch=develop&label=dev)](https://github.com/swisstopo/swissgeol-ui-core/actions/workflows/publish.yml?query=branch%3Adevelop)

# swissgeol UI Core

This is the swissgeol UI Core Library. It implements components and behavior shared between web-based [swissgeol](https://www.swissgeol.ch) applications.
This library mainly provides [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) built on [Stencil](https://stenciljs.com/),
but also generates wrappers for [Angular](https://angular.dev/) and [React](https://react.dev/).

## Getting Started

The library's npm packages are hosted in swisstopo's [GitHub registry](https://github.com/orgs/swisstopo/packages?ecosystem=npm).
These packages are publicly available, but GitHub still enforces the need for an authentication token to be present when downloading them.
To configure this token, first head to your [person access tokens](https://github.com/settings/tokens) and generate a \*classic" token with `read:packages` permissions.
Afterward, at the following to the `.npmrc` file in your home or project directory:

```
@swisstopo:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken={your-github-token}
```

> You may also set `{your-github-token}` with an environment variable like `${GITHUB_TOKEN}.

You may now proceed to any of the following sections depending on how you want to use the library:

- [Getting Started: Web Components](#getting-started-web-components) if you want to use plain web components.
- [Getting Started: Angular](#getting-started-angular) if you want to use the Angular wrappers.
- [Getting Started: React](#getting-started-react) if you want to use the React wrappers.
  Afterward, make sure to have a look at [Styling](#styling) and [Internationalization](#internationalization-i18n).

## Getting Started: Web Components

To use swissgeol UI Core with plain web components, simply install the core library:

```bash
npm install @swisstopo/swissgeol-ui-core
```

Then, make sure to include the CSS at `@swisstopo/swissgeol-ui-core/styles.css` into your build process.

Also, the library expects the Inter font to be served at `/assets/fonts/`.
You can find all required font files at `@swisstopo/swissgeol-ui-core/dist/swissgeol-ui-core/assets/fonts/`.
You can simply copy these assets into your build folder, for example with [Vite](https://vite.dev/):

```js
viteStaticCopy({
  targets: [
    {
      src: "node_modules/@swisstopo/swissgeol-ui-core/dist/swissgeol-ui-core/assets/*",
      dest: "assets",
    },
  ],
});
```

At startup, you will have to register the components:

```js
import { defineCustomElements } from "@swisstopo/swissgeol-ui-core/loader";

defineCustomElements();
```

You can now use the web components in HTML.

### Getting Started: Angular

To use swissgeol UI Core with Angular, install the core library and Angular extension:

```bash
npm install @swisstopo/swissgeol-ui-core
npm install @swisstopo/swissgeol-ui-core-angular
```

First, add the library's CSS and fonts to your build:

```json
{
  "targets": {
    "build": {
      "options": {
        "assets": [
          {
            "glob": "**/*",
            "input": "node_modules/@swisstopo/swissgeol-ui-core/dist/swissgeol-ui-core/assets/fonts",
            "output": "/assets/fonts"
          }
        ],
        "styles": [
          "node_modules/@swisstopo/swissgeol-ui-core/dist/swissgeol-ui-core/swissgeol-ui-core.css"
        ]
      }
    }
  }
}
```

Then import the `SwissgeolCoreModule` whenever you want to use a wrapper component:

```ts
@NgModule({
  imports: [
    SwissgeolCoreModule,
    // ...
  ],
  // ...
})
export class AppModule {}
```

> Note that as of now, we do not support standalone components / non-module-based applications
> due to issues with compiling Stencil to the Angular component target.
>
> Also, the type checking for the wrapper components is as-of-yet very rudimentary,
> so you have to manually ensure that you conform to the library's interface.

### Getting Started: React

To use swissgeol UI Core with React, install the core library and React extension:

```bash
npm install @swisstopo/swissgeol-ui-core
npm install @swisstopo/swissgeol-ui-core-react
```

Then, make sure to include the CSS at `@swisstopo/swissgeol-ui-core/styles.css` into your build process.
You may simply import them in your code if your bundlers supports that:

```js
import "@swisstopo/swissgeol-ui-core/styles.css";
```

Also, the library expects the Inter font to be served at `/assets/fonts/`.
You can find all required font files at `@swisstopo/swissgeol-ui-core/dist/swissgeol-ui-core/assets/fonts/`.
You can simply copy these assets into your build folder, for example with [Vite](https://vite.dev/):

```js
viteStaticCopy({
  targets: [
    {
      src: "node_modules/@swisstopo/swissgeol-ui-core/dist/swissgeol-ui-core/assets/*",
      dest: "assets",
    },
  ],
});
```

You can now use the JSX components by importing from `@swisstopo/swissgeol-ui-core-react`.

> The type checking for the wrapper components is as-of-yet very rudimentary,
> so you have to manually ensure that you conform to the library's interface.

## Styling

All colors and font stlyes used within the library are fully backed by CSS variables.
You can find them at [src/theme/index.css](./src/theme/index.css)

Most of the variables should be the same across all swissgeol applications.
However, some colors, such as the branding, may differ between projects.
To configure them simply add a `:root` block to your CSS:

```css
/* Assets */
:root {
  --sgc-color-brand: #2e859d;
  --sgc-color-primary--active: #2e859d;
  --sgc-color-secondary--active: #bed7df;
}

/* Boreholes */
:root {
  --sgc-color-brand: #a65462;
  --sgc-color-primary--active: #a65462;
  --sgc-color-secondary--active: #ffd6dc;
}

/* Viewer (default) */
:root {
  --sgc-color-brand: #607d52;
  --sgc-color-primary--active: #607d52;
  --sgc-color-secondary--active: #b2d2a2;
}
```

## Internationalization (i18n)

To enable the implementation of locale-dependent features,
the swissgeol UI Core library internally uses a simple i18n service which handles translations.
This service is mostly standalone and doesn't need any further configuration.

However, you will probably want to synchronize the library's translation language with your application.
To do so, you can use the `SwissgeolCoreI18n` object:

```js
import { SwissgeolCoreI18n, Language } from "@swisstopo/swissgeol-ui-core";

SwissgeolCoreI18n.setLanguage(Language.German);
```

> The library's locale is as-of-yet never changed from within the library itself.
> This means that you are simply responsible for configuring the correct locale,
> but do not need to react to it being changed by anything else.

You can find the library's translations in the subfolders of [src/locales/](./src/locales).

## Development

In local development, a simple server is available:

```bash
npm run start
```

This will expose all HTML files in `src/`.
This way, we are able to develop and test our components directly inside the library itself.

To build the library, run:

```bash
npm run build
```

This will compile all available output targets, including the Angular und React wrapper libraries.

### Angular & React

To test the compiled wrapper components, there are two simple client projects at
[packages/angular-client](./packages/angular-client/) and [packages/react-client](./packages/react-client/).
These two libraries automatically integrate with the latest output of `npm run build`.
