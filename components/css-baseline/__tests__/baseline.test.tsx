import React from 'react'
import { render } from 'enzyme'
import { CssBaseline, ZeitProvider } from 'components'

describe('CSSBaseline', () => {
  it('should render correctly', () => {
    const wrapper = render(
      <ZeitProvider>
        <CssBaseline />
      </ZeitProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render dark mode correctly', () => {
    const wrapper = render(
      <ZeitProvider theme={{ type: 'dark' }}>
        <CssBaseline />
      </ZeitProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
