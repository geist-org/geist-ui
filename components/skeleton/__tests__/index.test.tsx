import React from 'react'
import { mount } from 'enzyme'
import { Skeleton, Button } from 'components'

describe('Skeleton', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Skeleton />)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render all variant correctly', () => {
    const wrapperOne = mount(<Skeleton variant="rect" />)
    const wrapperTwo = mount(<Skeleton variant="circle" />)
    expect(wrapperOne.html()).toMatchSnapshot()
    expect(wrapperTwo.html()).toMatchSnapshot()
  })

  it('should render correctly with children', () => {
    const wrapper = mount(
      <Skeleton>
        <Button>Button</Button>
      </Skeleton>,
    )
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly width custom with and height', () => {
    const wrapperOne = mount(<Skeleton width="100px" />)
    const wrapperTwo = mount(<Skeleton height="100px" />)
    const wrapperThree = mount(<Skeleton width="100px" height="100px" />)
    expect(wrapperOne.html()).toMatchSnapshot()
    expect(wrapperTwo.html()).toMatchSnapshot()
    expect(wrapperThree.html()).toMatchSnapshot()
  })
})
