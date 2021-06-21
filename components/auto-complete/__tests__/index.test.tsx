import React from 'react'
import { mount } from 'enzyme'
import { AutoComplete } from 'components'
import { nativeEvent } from 'tests/utils'
import { act } from 'react-dom/test-utils'

describe('AutoComplete', () => {
  it('should render correctly', () => {
    const wrapper = mount(<AutoComplete />)
    expect(() => wrapper.unmount()).not.toThrow()
    expect(<AutoComplete />).toMatchSnapshot()
  })

  it('should support sizes and status', () => {
    const wrapper = mount(
      <div>
        <AutoComplete type="secondary" />
        <AutoComplete type="success" />
        <AutoComplete />
        <AutoComplete />
      </div>,
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should set input value from initial value', () => {
    let wrapper = mount(<AutoComplete initialValue="value" />)
    let input = wrapper.find('input').at(0).getDOMNode()
    expect((input as HTMLInputElement).value).toEqual('value')

    wrapper = mount(<AutoComplete value="value2" />)
    input = wrapper.find('input').at(0).getDOMNode()
    expect((input as HTMLInputElement).value).toEqual('value2')
  })

  it('should render clear icon', async () => {
    const wrapper = mount(<AutoComplete initialValue="value" />)
    expect(wrapper.find('svg').length).toBe(0)

    await act(async () => {
      wrapper.setProps({ clearable: true })
    })
    expect(wrapper.find('svg').length).toBe(1)

    wrapper.find('svg').simulate('click', nativeEvent)
    const input = wrapper.find('input').at(0).getDOMNode()
    expect((input as HTMLInputElement).value).toEqual('')
  })

  it('should reponse width change', async () => {
    const wrapper = mount(<AutoComplete initialValue="value" width="100px" />)
    expect(wrapper.prop('width')).toEqual('100px')
    await act(async () => {
      wrapper.setProps({ width: '200px' })
    })

    expect(wrapper.prop('width')).toEqual('200px')
  })

  it('should forward ref by default', () => {
    const ref = React.createRef<HTMLInputElement>()
    const wrapper = mount(<AutoComplete ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
