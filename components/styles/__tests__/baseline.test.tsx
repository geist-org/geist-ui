import React from 'react'
import { render } from 'enzyme'
import { CSSBaseline, ZEITUIProvider } from 'components'

describe('CSSBaseline', () => {
  it('should render correctly', () => {
    const wrapper = render(
      <ZEITUIProvider>
        <CSSBaseline />
      </ZEITUIProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render dark mode correctly', () => {
    const wrapper = render(
      <ZEITUIProvider theme={{ type: 'dark' }}>
        <CSSBaseline />
      </ZEITUIProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
