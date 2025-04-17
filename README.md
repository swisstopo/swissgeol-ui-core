# Poc with NX

The dependencies are not yet properly set up; if they are wired up correctly, you could run `nx run-many --target=build`; but right now, we do it step-by-step due to the hack for angular components :)

To install, run the following:

```sh
nx build core-components
nx build core-components-react
# go to core-components-angular/src/lib/stencil-generated/components.ts and change the components to "standalone: false" -> workaround currently needed

nx build core-components-angular

# now, the apps may be served
nx serve angular-app
nx serve react-app

```

## Current issues
- [ ] Typehinting _within_ the apps is not working, i.e. props are not typehinted properly (this seems to be an nx configuration issue, however, because if you import the app in a standalone angular project, typehints are working)
- [ ] For react, there is an issue that components are not exposed/typehinted as well (https://github.com/stenciljs/output-targets/issues/600)
- [ ] `dist` folders are still all over the place; the angular-components do it properly (using root dist)
- [ ] React generation has a warning for the event type, in that it is not known - however, the events work (but they are as well not typehinted)
- [ ] Angular and nx currently relies on a workaround in tsconfig -> see here: https://github.com/nrwl/nx/issues/28322 (will be fixed in angular 20: https://github.com/nrwl/nx/issues/29940#issuecomment-2801217584)

- In general, most seems to be connected to NX not being properly set up right now.