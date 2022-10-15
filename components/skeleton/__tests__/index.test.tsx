import React from 'react'
import { mount } from 'enzyme'
import Skeleton from '../index'

describe('Skeleton', () => {
  it('should render correctly when nested', () => {
    const wrapper = mount(
      <Skeleton>
        <Skeleton>
          <Skeleton />
          col
        </Skeleton>
      </Skeleton>,
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should ignore height and width when children are shown', () => {
    const wrapper = mount(<Skeleton width={50} height={50} show />);

    const rendered = wrapper.find('.skeleton').html();
    expect(rendered).not.toContain('width: 50px;');
    expect(rendered).not.toContain('height: 50px;');
  })

  it('should render different components', () => {
    let wrapper = mount(<Skeleton component="p" />)
    expect(wrapper.find('p').length).not.toBe(0)

    wrapper = mount(<Skeleton component="details" />)
    expect(wrapper.find('details').length).not.toBe(0)

    wrapper = mount(<Skeleton component="h1" />)
    expect(wrapper.find('h1').length).not.toBe(0)
  })
})
