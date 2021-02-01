import React from 'react'
import { render } from 'enzyme'
import { CssBaseline, GeistProvider } from 'components'

describe('CSSBaseline', () => {
  it('should render correctly', () => {
    const wrapper = render(
      <GeistProvider>
        <CssBaseline />
      </GeistProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render dark mode correctly', () => {
    const wrapper = render(
      <GeistProvider themeType="dark">
        <CssBaseline />
      </GeistProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
