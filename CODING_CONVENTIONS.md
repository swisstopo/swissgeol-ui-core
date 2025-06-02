# Coding Conventions

1. [Naming](#naming)
2. [Keywords, Syntax and Semantics](#keywords-syntax-and-semantics)
3. [Control Statements](#control-statements)
4. [Stencil Components](#stencil-components)
5. [Stencil Properties](#stencil-properties)
6. [Stencil Events](#stencil-events)
7. [CSS](#css)

## Naming

- **Classes** should be nouns in `PascalCase` (e.g. `Picker`, `MyCoolThing`, `SomeStuffFactory`).
- **Methods** should be verbs / actions in `camelCase` (e.g. `fetchData`, `calculateProgressRightNow`, `enqueue`).
- **Variables** should be nouns in `camelCase` (e.g. `name`, `originalTarget`, `lastKnownPosition`).
  - **Boolean Variables and Methods** should be prefixed by `is`, `has`, `can`, `should`, `will`, `was` or `needs` (e.g. `isActive`, `willUpdate`, `shouldBegin`).

## Keywords, Syntax and Semantics

> These conventions are checked by eslint where possible.

- Prefer `const` over `let`, unless `let` offers clear advantages in terms of brevity and/or performance.
- Mark instance variables as `readonly` wherever possible.
- Do not use the `public` keyword, as it is the default visibility level and can simply be omitted.
- Prefer `null` over `undefined` for representing the absence of a value, as it is more explicit and intentional.
  Reserve `undefined` for uninitialized or missing properties, which reflects the default behavior of JavaScript.
- Prefer arrow functions over `function` expressions or statements, unless you require the ability to bind `this`.
- Always wrap arrow function parameters in parentheses.

## Control Statements

> These conventions are checked by eslint where possible.

- Always use braces in control statements.

  ```ts
  // Do not do this:
  if (shouldReturn) return;

  // Do this:
  if (shouldReturn) {
    return;
  }
  ```

- Prefer `switch` over `else if` where applicable:

  ```ts
  // Do not do this:
  if (myValue == "first") {
    // ...
  } else if (myValue === "second") {
    // ...
  } else {
    // ...
  }

  // Do this:
  switch (myValue) {
    case "first":
    // ..
    case "second":
    // ..
    default:
    // ..
  }
  ```

- Do not nest the ternary operator `?:` inside itself.

## Stencil Components

- Generate new component using the `stencil g` command.
  - Always prefix components with `sgc-`.
  - Always use the Shadow DOM.
- Place components in [`src/components`](./src/components).
  - You may nest components within other component directories, as long as the nested component is prefixed by the outer component's tag.
    E.g. you may nest `sgc-list-item` in the directory of `sgc-list`.
- After generating a new component, remove its `styleUrl` and replace it with a JS import of the `styles` field.
  `styleUrl` does not offer hot reloading, and has issues with `@import` statements.

  ```ts
  // Replace this:
  @Component({
    styleUrl: 'sgc-component.css',
  })

  // With this:
  import styles from './sgc-component.css';

  @Component({
    styles,
  })
  ```

- Always import `global/base.css` into your component CSS:
  ```css
  @import "../../global/base.css";
  ```
- All fields annotated with a Stencil decorator (e.g. `Property`, `Watch`) should be public.
  Every other field that is not explicitly used outside the component should be private.

## Stencil Properties

- Use the [default variable naming](#naming) for properties.
- If a property value should influence styling, reflect it to an attribute, and use that attribute in your CSS.
  The reflected attribute should be in `snake-case`, and drop any boolean prefixes.

  ```ts
  @Property({ reflect: true, attribute: 'disabled' })
  isDisabled: boolean

  @Property({ reflect: true })
  align: 'left' | 'center' | 'right'
  ```

- Use sensible defaults where applicable.

  - Do not use `true` as default value for boolean fields. Negate the field name instead if you really need to:

    ```ts
    // Do not do this:
    @Property()
    isStatic = true

    // Do this instead:
    @Property()
    isNotStatic = false

    // Or just choose a better name:
    @Property()
    isDynamic = false
    ```

  - Use `null` to signal absence of a value. Do not use default empty values such as the empty string or zero.

  ```ts
  // Do not do this:
  @Property()
  choice: string = ''

  // Do this instead:
  @Property()
  choice: string | null = null
  ```

- Avoid the use of mutable properties, as this feature can't be fully mapped for compilation targets like Angular and React.

## Stencil Events

This section defines how our events and event handlers are supposed to be implemented.

### Event Names

- Event names should be nouns in `PascalCase`
- They should be prefixed by `sgc`.
- They should be written in the present tense.

Examples:
`sgcClick`, `sgcChangeRequest`, `sgcCreateDialogLaunch`

### Event Emitters

Event emitters should be named like their event, minus the `sgc` prefix, and with an additional `Event` suffix.

Example:

```ts
@Event({ eventName: 'sgcStateChange', composed: true })
stateChangeEvent: EventEmitter<State>;
```

### Event Handlers

- Prefer inline event bindings over `@Listen` methods.
- Use inline event handler functions only if the function contains a single statement.
  Otherwise, use a named event handler method.
- Event handlers should be prefixed by `handle`, followed by the event name that they are handling, minus the `sgc` prefix.
- If you have multiple event handlers for the same event, or just want to be more specific,
  you can add additional words between `handle` and the event name (e.g. `handleLoginButtonClick`).
- Event handlers should be arrow functions to have `this` bound to the component instance.
- The parameter containing the event should always be called `event` (_do not_ use `e`, `evt` or similar).

Example for an event handler method:

```ts
private readonly handleStateChange = (event: CustomEvent<State>) => {
  // handle event
};
```

Example for inline event bindings:

```tsx
// With an inline event handler:
<MyComponent onSgcStateChange={(event) => console.log(`State has been changed to ${event.detail}`)} />

// With an event handler method:
<MyComponent onSgcStateChange={this.handleStateChange} />
```

### Event Types

- Prefer emitting simple, existing types from your event handlers.
- If you need a new complex type, name it the same as the event, but suffixed by `Detail`.
- Make sure to export the type so it is available in user code.

Example:

```ts
export interface SgcComplicatedUpdateEventDetail {
  // define your fields
}

@Event({ eventName: 'sgcComplicatedUpdate', composed: true })
complicatedUpdateEvent: EventEmitter<SgcComplicatedUpdateEventDetail>;
```

## CSS

This section defines how we want our stylesheets to be structured.

### CSS Selector Preferences

- Prefer styling via [semantic elements](https://www.w3schools.com/html/html5_semantic_elements.asp) over styling via attributes.
- Prefer styling via attributes (e.g. `[disabled]`, `[aria-selected]`, `[some-custom-attribute]`) over styling via nested selectors.
- Prefer _simple_ nested selectors (e.g. `ul.usernames > li`) over classes.
- Use classes for complex styling concerns, reusability, or when other approaches aren't sufficient.

> Note that these are simply guidelines to keep our CSS clean and simple.
> You are expected to deviate from these if results in cleaner and more maintainable styles.

### CSS Class Names

- Class names should be in `.kebap-case`.
- Use a main class as the base (e.g. `.submit-button`) to define the core styling of an element.
- Add modifier classes (e.g. `.is-large`, `.will-change`, `.has-content`) to alter appearance or behavior.

### CSS Variables

- CSS Variables should be nouns in `kebap-case`, prefixed by `--sgc`.
- If a variable is scoped to a specific component, prefix it by that components tag (e.g. `sgc-button` has the variable `--sgc-button-padding`).
- If a variable should be globally available, place it in [`src/theme`](./src/theme/index.css).

### Nesting of CSS Blocks

- Do not nest CSS more than one level deep.
- `@`-rules, such as `@media`, are an exception to this, and allow an additional level of nesting.
- Do not nest child selectors.

Examples:

```css
ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  /* This is okay. */
  &.is-large {
    gap: 1rem;
  }

  /* This is okay. */
  &[aria-disabled] {
    cursor: not-allowed;
  }

  /* This is not okay, and should be its own top-level block. */
  > li {
    padding: 6px;
  }

  &.is-small {
    gap: 0.25rem;

    /* This is not okay, and should be its own top-level block. */
    li {
      padding: 4px;
    }
  }
}

@media (min-width: 1200px) {
  ul {
    gap: 0.75rem;

    /* This is okay, as we're in an at-rule. */
    &.is-large {
      gap: 1.25rem;
    }
  }
}
```

## Quality Assurance

The following section describes how we ensure the quality of the library code.

### Testing

- Test any component using E2E and unit tests.
- As a general rule of thumb, ensure that each property, event and public method is covered by at least one test.
- You may test nested components within the tests of their parent component.

### Documentation

- Write JSDoc comments for every property, event or public method whose use and behavior is not clearly understandable by itself.
- Write an example page in [src/examples](./src/examples) for every component.
  - Nested components don't need their own example page and can instead be included in their parent component's example page.
