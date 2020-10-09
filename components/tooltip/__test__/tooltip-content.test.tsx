import React from 'react'
import { mount } from 'enzyme'
import { CfxProvider } from 'components'
import TooltipContent from '../tooltip-content'

describe('tooltip-content', () => {
  it("should return null when there's no parent", () => {
    const wrapper = mount(
      <CfxProvider theme={{ type: 'dark' }}>
        <TooltipContent color="default" visible hideArrow={false} offset={0} placement="top" />
      </CfxProvider>,
    )
    expect(wrapper.html).toMatchSnapshot()
  })
})
