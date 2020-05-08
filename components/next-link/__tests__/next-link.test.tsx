import React from 'react'
import { mount } from 'enzyme'
import { NextLink } from 'components'

describe('NextLink', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <div>
        <NextLink href="https://react.zeit-ui.co">link</NextLink>
        <NextLink href="https://react.zeit-ui.co" icon>
          link
        </NextLink>
        <NextLink href="https://react.zeit-ui.co" underline>
          link
        </NextLink>
        <NextLink href="https://react.zeit-ui.co" block>
          link
        </NextLink>
      </div>,
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should no error when set next-link props', () => {
    const wrapper = mount(
      <NextLink href="/test" as="test">
        test
      </NextLink>,
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
