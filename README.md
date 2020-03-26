<p align="center" height="370">
<img align="center" height="370" src="https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png">
</p>

> @zeit-ui/react -- React implementation for [ZEIT Style](https://github.com/zeit-ui/zeit-style), originating from [ZEIT Design](https://zeit.co/design).

> work in progress. version info: [npm/package/@zeit-ui/react](https://www.npmjs.com/package/@zeit-ui/react?activeTab=versions)

<br/>

## Quick Start

1. run `yarn add @zeit-ui/react` or `npm i @zeit-ui/react` install it.

2. import to projcet:

```jsx
import { CSSBaseline, ZEITUIProvider } from '@zeit-ui/react'

const Application = () => {
  return (
    <ZEITUIProvider>      //  ---> Base provider
      <CSSBaseline />     //  ---> normalize styles
      <AppComponent />    //  ---> Your App Component
    </ZEITUIProvider>
  )
}
```

<br/>

## Documentation

- [Document](https://react.zeit-ui.co/)

<br/>

## Development

1. fork and clone.
2. start: `yarn && yarn dev`

<br/>

## Showcases

- [views.show](https://docs.views.show/)
- [tree viewer for cdn](https://cdn.unix.bio/)
- [Add here](https://github.com/zeit-ui/react/issues/new)

<br/>

## LICENSE
[MIT](./LICENSE)
