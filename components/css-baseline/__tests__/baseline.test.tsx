import React from 'react'
import { render } from 'enzyme'
import { CssBaseline, CfxProvider } from 'components'

describe('CSSBaseline', () => {
  it('should render correctly', () => {
    const wrapper = render(
      <CfxProvider>
        <CssBaseline />
      </CfxProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render dark mode correctly', () => {
    const wrapper = render(
      <CfxProvider theme={{ type: 'dark' }}>
        <CssBaseline />
      </CfxProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
