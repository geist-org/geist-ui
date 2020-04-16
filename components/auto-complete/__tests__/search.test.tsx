import React from 'react'
import { mount, render } from 'enzyme'
import { AutoComplete } from '../../index'
import { nativeEvent } from '../../../tests/utils'
const mockOptions = [
  { label: 'London', value: 'london' },
]

describe('AutoComplete Search', () => {
  it('should render options element', () => {
    const wrapper = mount(<AutoComplete options={mockOptions} />)
    wrapper.find('input').at(0).simulate('focus')
    let dropdown = wrapper.find('.auto-complete-dropdown').children()
    expect(dropdown.length).not.toBe(0)
    
    wrapper.find('input').at(0).simulate('blur')
    expect(() => wrapper.unmount()).not.toThrow()
  })
  
  it('should update value when dropdown clicked', () => {
    let value = ''
    const wrapper = mount(<AutoComplete options={mockOptions} onChange={val => value = val} />)
    wrapper.find('input').at(0).simulate('focus')
    wrapper.find('.item').at(0).simulate('click', nativeEvent)
    expect(value).toEqual('london')
  })
  
  it('should ignore events when disabled', () => {
    let value = ''
    const wrapper = mount(
      <AutoComplete disabled options={mockOptions}
        onChange={val => value = val} />
    )
    wrapper.find('input').at(0).simulate('focus')
    wrapper.find('.item').at(0).simulate('click', nativeEvent)
    expect(value).not.toEqual('london')
  })
  
  it('should render searching component', () => {
    let wrapper = mount(
      <AutoComplete searching={false} options={mockOptions}/>
    )
    wrapper.setProps({ searching: true })
    wrapper.find('input').at(0).simulate('focus')
    let dropdown = wrapper.find('.auto-complete-dropdown')
    expect(dropdown.text()).not.toContain('london')
    
    const loading = wrapper.find('.loading')
    expect(loading.length).not.toBe(0)
  
    wrapper = mount(
      <AutoComplete searching options={mockOptions}>
        <AutoComplete.Searching>
          <span>waiting...</span>
        </AutoComplete.Searching>
      </AutoComplete>
    )
    wrapper.find('input').at(0).simulate('focus')
    dropdown = wrapper.find('.auto-complete-dropdown')
    expect(dropdown.text()).toContain('waiting')
  })
  
  it('should hide empty component', () => {
    let wrapper = render(
      <AutoComplete placeholder="Enter here">
        <AutoComplete.Empty hidden />
      </AutoComplete>
    )
    expect(wrapper).toMatchSnapshot()
  
    wrapper = render(
      <AutoComplete placeholder="Enter here">
        <AutoComplete.Empty>empty</AutoComplete.Empty>
      </AutoComplete>
    )
    expect(wrapper).toMatchSnapshot()
  
    const mountWrapper = mount(
      <AutoComplete placeholder="Enter here" initialValue="value">
        <AutoComplete.Empty>empty</AutoComplete.Empty>
      </AutoComplete>
    )
    mountWrapper.find('input').at(0).simulate('focus')
    const text = mountWrapper.find('.auto-complete-dropdown').text()
    expect(text).toContain('empty')
    
    const mountWrapper2 = mount(
      <AutoComplete placeholder="Enter here" initialValue="value">
        <AutoComplete.Empty hidden>empty</AutoComplete.Empty>
      </AutoComplete>
    )
    mountWrapper2.find('input').at(0).simulate('focus')
    const text2 = mountWrapper2.find('.auto-complete-dropdown').text()
    expect(text2).not.toContain('empty')
  })
  
  it('should trigger search handler', () => {
    const handler = jest.fn()
    const wrapper = mount(<AutoComplete initialValue="value" onSearch={handler} />)
    const input = wrapper.find('input').at(0)
    input.simulate('focus')
    input.simulate('change')
    ;(input.getDOMNode() as HTMLInputElement).value = 'value'
    expect(handler).toHaveBeenCalled()
  })
  
  it('should trigger select and change handler', () => {
    const selectHandler = jest.fn()
    const changeHandler = jest.fn()
    const wrapper = mount(
      <AutoComplete options={mockOptions} initialValue="value"
        onSelect={selectHandler} onChange={changeHandler} />
    )
    wrapper.find('input').at(0).simulate('focus')
    wrapper.find('.item').at(0).simulate('click', nativeEvent)
    expect(selectHandler).toHaveBeenCalled()
    expect(changeHandler).toHaveBeenCalled()
  })
  
  it('should work with custom options', () => {
    const changeHandler = jest.fn()
    const makeOption = (label: string, value: string): any => (
      <AutoComplete.Option value={value}>
        <span>{label}</span>
      </AutoComplete.Option>
    )
    const options = mockOptions
      .map(({ label, value }) => makeOption(label, value) as typeof AutoComplete.Option)
    const wrapper = mount(
      <AutoComplete options={options} onChange={changeHandler} />
    )
    wrapper.find('input').at(0).simulate('focus')
    wrapper.find('.item').at(0).simulate('click', nativeEvent)
    expect(changeHandler).toHaveBeenCalled()
  })
  
  it('should work correctly without options', () => {
    const wrapper = mount(<AutoComplete options={[]} />)
    expect(() => wrapper.unmount()).not.toThrow()
  })

})
