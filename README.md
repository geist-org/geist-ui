<p align="center" height="370">
<img align="center" height="370" src="https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png">
</p>

> @zeit-ui/react -- Modern and minimalist React UI library, originating from Vercel's design.

<br/>

## Quick Start

1. run `yarn add @zeit-ui/react` or `npm i @zeit-ui/react` install it.

2. import into project:

```jsx
import { CSSBaseline, ZEITUIProvider } from '@zeit-ui/react'

const Application = () => (
  <ZEITUIProvider>      //  ---> Base provider
    <CSSBaseline />     //  ---> normalize styles
    <AppComponent />    //  ---> Your App Component
  </ZEITUIProvider>
)
```

<br/>

## Documentation

- [Document Site](https://react.zeit-ui.co)
- [中文文档](https://react.zeit-ui.co/zh-cn)

<br/>

## Development

1. fork and clone.
2. start: `yarn && yarn dev`

<br/>

## Showcases

- [Article view count](https://docs.views.show/)
- [Tree viewer for CDN](https://cdn.unix.bio/)
- [Better social image](https://img.unix.bio/)
- [Implement of ZEIT's Dashboard](https://github.com/ofekashery/zeit-dashboard-template)
- [Blog of ZEIT's design](https://github.com/unix/unix.bio)
- [Add here](https://github.com/zeit-ui/react/issues/new)

<br/>

## LICENSE
[MIT](./LICENSE)
