# Angular Client for `swissgeol-ui-core`

## Setup

- Import `SwissgeolCoreModule` into your application.
- Import or load `swissgeol-core/styles.css`.
- Add the following to `angular.json` at `projects.{your-project}.architect.build.options.assets`:
  ```json
  {
    "glob": "**/*",
    "input": "node_modules/@swissgeol/ui-core/assets/fonts",
    "output": "/assets/fonts"
  }
  ```
  This ensures that the library's fonts are served by the application.
