import React from 'react'
import { mount, render } from 'enzyme'
import { ButtonDropdown } from 'components'
import { mockNativeEvent, nativeEvent } from 'tests/utils'

describe('Button Dropdown', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <ButtonDropdown>
        <ButtonDropdown.Item main>Default Action</ButtonDropdown.Item>
        <ButtonDropdown.Item>Secondary Action</ButtonDropdown.Item>
        <ButtonDropdown.Item>Tertiary Action</ButtonDropdown.Item>
      </ButtonDropdown>
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })
  
  it('should support types and sizes', () => {
    const wrapper = render(
      <div>
        <ButtonDropdown size="mini" auto>
          <ButtonDropdown.Item main>Auto Mini</ButtonDropdown.Item>
        </ButtonDropdown>
        <ButtonDropdown size="large">
          <ButtonDropdown.Item main>Auto Mini</ButtonDropdown.Item>
        </ButtonDropdown>
        <ButtonDropdown type="secondary">
          <ButtonDropdown.Item main>Secondary Action</ButtonDropdown.Item>
        </ButtonDropdown>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })
  
  it('should trigger callback function', () => {
    const Wrapper = () => {
      const [state, setState] = React.useState<string>('state1')
      
      return (
        <ButtonDropdown type="secondary">
          <ButtonDropdown.Item main onClick={() => setState('state2')}>
            {state}
          </ButtonDropdown.Item>
        </ButtonDropdown>
      )
    }
    const wrapper = mount(<Wrapper />)
    expect(wrapper.text()).toContain('state1')
    wrapper.find('button').simulate('click', nativeEvent)
    expect(wrapper.text()).toContain('state2')
  })
  
  it('should work correctly when callback missing', () => {
    const wrapper = mount(
      <ButtonDropdown type="secondary">
        <ButtonDropdown.Item main>
        </ButtonDropdown.Item>
      </ButtonDropdown>
    )
    wrapper.find('button').simulate('click', nativeEvent)
    expect(() => wrapper.unmount()).not.toThrow()
  })
  
  it('should ignore all events when loading', () => {
    const Wrapper = () => {
      const [state, setState] = React.useState<string>('state1')
    
      return (
        <ButtonDropdown type="secondary" loading>
          <ButtonDropdown.Item main onClick={() => setState('state2')}>
            {state}
          </ButtonDropdown.Item>
        </ButtonDropdown>
      )
    }
    const wrapper = mount(<Wrapper />)
    wrapper.find('button').simulate('click', nativeEvent)
    expect(wrapper.text()).not.toContain('state2')
  })
  
  it('should ignore all events when disabled', () => {
    const Wrapper = () => {
      const [state, setState] = React.useState<string>('state1')
      
      return (
        <ButtonDropdown type="secondary" disabled>
          <ButtonDropdown.Item main onClick={() => setState('state2')}>
            {state}
          </ButtonDropdown.Item>
        </ButtonDropdown>
      )
    }
    const wrapper = mount(<Wrapper />)
    wrapper.find('summary').simulate('click', nativeEvent)
    wrapper.find('button').simulate('click', nativeEvent)
    expect(wrapper.text()).not.toContain('state2')
  })
  
  it('should render multiple types', () => {
    const wrapper = render(
      <ButtonDropdown size="medium" auto>
        <ButtonDropdown.Item main type="success">Auto Mini</ButtonDropdown.Item>
        <ButtonDropdown.Item type="warning">Auto Mini</ButtonDropdown.Item>
        <ButtonDropdown.Item type="error">Auto Mini</ButtonDropdown.Item>
      </ButtonDropdown>
    )
    expect(wrapper).toMatchSnapshot()
  })
  
  it('should expand after click', () => {
    const wrapper = mount(
      <ButtonDropdown>
        <ButtonDropdown.Item main>Default Action</ButtonDropdown.Item>
        <ButtonDropdown.Item>Secondary Action</ButtonDropdown.Item>
        <ButtonDropdown.Item>Tertiary Action</ButtonDropdown.Item>
      </ButtonDropdown>
    )
    
    wrapper.find('summary').simulate('click', nativeEvent)
    const open = wrapper.find('details').prop('open')
    expect(open).toBeTruthy()
  })
  
  it('should stop propagation', () => {
    let stopped = false
    const nativeEvent = mockNativeEvent(() => stopped = true)
    const wrapper = mount(
      <ButtonDropdown>
        <ButtonDropdown.Item main>Default Action</ButtonDropdown.Item>
        <ButtonDropdown.Item>Secondary Action</ButtonDropdown.Item>
        <ButtonDropdown.Item>Tertiary Action</ButtonDropdown.Item>
      </ButtonDropdown>
    )
    
    wrapper.find('summary').simulate('click', nativeEvent)
    expect(stopped).toBeTruthy()
  })
})
