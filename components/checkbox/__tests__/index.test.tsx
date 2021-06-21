import React from 'react'
import { mount, render } from 'enzyme'
import { Checkbox } from 'components'

describe('Checkbox', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Checkbox checked={true}>Sydney</Checkbox>)
    expect(() => wrapper.unmount()).not.toThrow()
    const rendered = render(<Checkbox>Sydney</Checkbox>)
    expect(rendered).toMatchSnapshot()
  })

  it('should work with different status', () => {
    const wrapper = mount(
      <div>
        <Checkbox type="secondary" />
        <Checkbox type="success" />
        <Checkbox type="warning" />
        <Checkbox type="error" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should work correctly with initial value', () => {
    let wrapper = mount(<Checkbox checked={true}>Sydney</Checkbox>)
    let input = wrapper.find('input').getDOMNode()
    expect((input as HTMLInputElement).checked).toBeTruthy()

    wrapper = mount(<Checkbox checked={false}>Sydney</Checkbox>)
    input = wrapper.find('input').getDOMNode()
    expect((input as HTMLInputElement).checked).not.toBeTruthy()

    wrapper = mount(<Checkbox initialChecked>Sydney</Checkbox>)
    input = wrapper.find('input').getDOMNode()
    expect((input as HTMLInputElement).checked).toBeTruthy()

    wrapper = mount(<Checkbox initialChecked={false}>Sydney</Checkbox>)
    input = wrapper.find('input').getDOMNode()
    expect((input as HTMLInputElement).checked).not.toBeTruthy()
  })

  it('should change value after click', () => {
    const Wrapper = () => {
      const [state, setState] = React.useState<string>('state1')

      return (
        <Checkbox initialChecked onChange={() => setState('state2')}>
          {state}
        </Checkbox>
      )
    }
    const wrapper = mount(<Wrapper />)
    const input = wrapper.find('input').at(0)
    input.simulate('change')
    expect(wrapper.find('.text').text()).toContain('state2')
  })

  it('should ignore events when disabled', () => {
    const Wrapper = () => {
      const [state, setState] = React.useState<string>('state1')

      return (
        <Checkbox disabled onChange={() => setState('state2')}>
          {state}
        </Checkbox>
      )
    }
    const wrapper = mount(<Wrapper />)
    const input = wrapper.find('input').at(0)
    input.simulate('change')
    expect(wrapper.find('.text').text()).not.toContain('state2')
  })
})
