import React from 'react'
import { mount, render } from 'enzyme'
import { Checkbox } from 'components'

describe('Checkbox Group', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Checkbox.Group value={[]}>
        <Checkbox value="sydney">Sydney</Checkbox>
      </Checkbox.Group>,
    )
    expect(() => wrapper.unmount()).not.toThrow()
    const rendered = render(
      <Checkbox.Group value={[]}>
        <Checkbox value="sydney">Sydney</Checkbox>
      </Checkbox.Group>,
    )
    expect(rendered).toMatchSnapshot()
  })

  it('should work correctly with initial value', () => {
    let wrapper = mount(
      <Checkbox.Group value={['sydney']}>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="beijing">BeiJing</Checkbox>
      </Checkbox.Group>,
    )
    const sydney = wrapper.find('input').at(0).getDOMNode()
    expect((sydney as HTMLInputElement).checked).toBeTruthy()
    const beijing = wrapper.find('input').at(1).getDOMNode()
    expect((beijing as HTMLInputElement).checked).not.toBeTruthy()
  })

  it('should change value after click', () => {
    let value = ['sydney']
    const wrapper = mount(
      <Checkbox.Group value={['sydney']} onChange={val => (value = val)}>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="beijing">BeiJing</Checkbox>
      </Checkbox.Group>,
    )
    const sydney = wrapper.find('input').at(0)
    sydney.simulate('change')
    expect(value.length).toBe(0)

    const beijing = wrapper.find('input').at(1)
    beijing.simulate('change')
    expect(value).toEqual(expect.arrayContaining(['beijing']))
  })

  it('should ignore events when disabled', () => {
    let value = ['sydney']
    const wrapper = mount(
      <Checkbox.Group disabled value={['sydney']} onChange={val => (value = val)}>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="beijing">BeiJing</Checkbox>
      </Checkbox.Group>,
    )
    const sydney = wrapper.find('input').at(0)
    sydney.simulate('change')
    expect(value.length).not.toBe(0)

    const beijing = wrapper.find('input').at(1)
    beijing.simulate('change')
    expect(value).not.toEqual(expect.arrayContaining(['beijing']))
  })

  it('should throw error when value missing', () => {
    let errorMessage = ''
    const Group = Checkbox.Group as any
    const errorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(msg => (errorMessage = msg))
    mount(
      <Group>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="beijing">BeiJing</Checkbox>
      </Group>,
    )

    expect(errorMessage).toContain('required')
    errorSpy.mockRestore()
  })

  it('should throw error when set check prop in group', () => {
    let errorMessage = ''
    const errorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(msg => (errorMessage = msg))
    mount(
      <Checkbox.Group value={[]}>
        <Checkbox value="sydney" checked>
          Sydney
        </Checkbox>
        <Checkbox value="beijing">BeiJing</Checkbox>
      </Checkbox.Group>,
    )

    expect(errorMessage.toLowerCase()).toContain('remove props')
    errorSpy.mockRestore()
  })
})
