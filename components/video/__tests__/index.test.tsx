import React from 'react'
import { mount, render } from 'enzyme'
import { Video } from 'components'

describe('Video', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Video />)
    expect(wrapper).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should supports fullscreenable', () => {
    const wrapper = render(
      <div>
        <Video fullscreenable={true} />
        <Video fullscreenable={false} />
      </div>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should supports size', () => {
    const wrapper = render(
      <div>
        <Video width={200} height={100} />
        <Video width={200} />
        <Video height={100} />
      </div>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
