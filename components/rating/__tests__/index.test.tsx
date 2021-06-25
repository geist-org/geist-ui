import React, { useState } from 'react'
import { Rating } from 'components'
import { mount } from 'enzyme'
import { nativeEvent } from 'tests/utils'

describe('Rating', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Rating />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work with different types', () => {
    const wrapper = mount(
      <div>
        <Rating type="secondary" />
        <Rating type="success" />
        <Rating type="warning" />
        <Rating type="error" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should show different initialization values', () => {
    const wrapper = mount(
      <div>
        <Rating count={10} value={5} />
        <Rating count={2} value={1} />
        <Rating count={10} value={10} />
        <Rating count={2} value={2} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should initialize state and lock value', () => {
    const WrapperRating = () => {
      const [value, setValue] = useState<number>(1)
      const [lock, setLock] = useState<boolean>(false)

      return (
        <div>
          <Rating
            type="success"
            value={value}
            onLockedChange={setLock}
            onValueChange={setValue}
          />
          <div id="valueDiv">{value}</div>
          <div id="lockDiv">{lock ? 'true' : 'false'}</div>
        </div>
      )
    }
    const wrapper = mount(<WrapperRating />)
    expect(wrapper.find('svg').children())
    expect(wrapper.find('#valueDiv').text()).toContain('1')
    expect(wrapper.find('#lockDiv').text()).toContain('false')
  })

  it('should update state and lock value on click', () => {
    const WrapperRating = () => {
      const [value, setValue] = useState<number>(1)
      const [lock, setLock] = useState<boolean>(false)

      return (
        <div>
          <Rating type="success" onLockedChange={setLock} onValueChange={setValue} />
          <div id="valueDiv">{value}</div>
          <div id="lockDiv">{lock ? 'true' : 'false'}</div>
        </div>
      )
    }
    const wrapper = mount(<WrapperRating />)
    expect(wrapper.find('.icon-box').last().simulate('click', nativeEvent))
    expect(wrapper.find('#valueDiv').text()).toContain('5')
    expect(wrapper.find('#lockDiv').text()).toContain('true')
    // unlock again
    expect(wrapper.find('.icon-box').last().simulate('click', nativeEvent))
    expect(wrapper.find('#valueDiv').text()).toContain('5')
    expect(wrapper.find('#lockDiv').text()).toContain('false')
  })

  it('should update snapshot on mouse enter', () => {
    const WrapperRating = () => {
      const [value, setValue] = useState<number>(0)
      const [lock, setLock] = useState<boolean>(false)

      return (
        <div>
          <Rating type="success" onLockedChange={setLock} onValueChange={setValue} />
          <div id="valueDiv">{value}</div>
          <div id="lockDiv">{lock ? 'true' : 'false'}</div>
        </div>
      )
    }
    const wrapper = mount(<WrapperRating />)
    const lastStar = wrapper.find('.icon-box').last()
    const firstStar = wrapper.find('.icon-box').first()
    expect(lastStar.simulate('mouseenter'))
    expect(wrapper.html()).toMatchSnapshot()
    expect(lastStar.simulate('click', nativeEvent))
    expect(firstStar.simulate('mouseenter'))
    expect(wrapper.html()).toMatchSnapshot()
  })
})
