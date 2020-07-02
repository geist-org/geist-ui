## Tree shaking for create react app

This is example of `tree-shaking` for [create-react-app](https://github.com/facebook/create-react-app).
By default, we do not `eject` configs from `create-react-app`, in this example,
we use [react-app-rewired](https://github.com/timarney/react-app-rewired) to change the default configs.

### About

- Add `config-overrides.js` to your root folder.
- Add deps: `yarn add babel-plugin-import customize-cra react-app-rewired -D`
- Replace your default scripts(`react-scripts`) with `react-app-rewired`.

### Previews

**Before:**

![before](public/esm-1.png)

<br />

**After:**

![after](public/esm-2.png)
