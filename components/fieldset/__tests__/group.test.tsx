import React from 'react'
import { mount } from 'enzyme'
import { Fieldset } from 'components'

describe('Fieldset Group', () => {
  it('should trigger callback when tab clicked', () => {
    const callbcak = jest.fn()
    const wrapper = mount(
      <Fieldset.Group value="two" onChange={callbcak}>
        <Fieldset label="one" value="one">
          one
        </Fieldset>
        <Fieldset label="two" value="two">
          two
        </Fieldset>
      </Fieldset.Group>,
    )

    let active = wrapper.find('.group').find('.active')
    expect(active.length).not.toBe(0)
    expect(active.text()).toContain('two')

    const firstBtn = wrapper.find('.group').find('button').at(0)
    firstBtn.simulate('click')
    active = wrapper.find('.group').find('.active')
    expect(active.length).not.toBe(0)
    expect(active.text()).toContain('one')

    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should throw error when value duplicated', () => {
    let errorMessage = ''
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(msg => (errorMessage = msg))

    mount(
      <Fieldset.Group value="two">
        <Fieldset label="one" value="one">
          one
        </Fieldset>
        <Fieldset label="two" value="one">
          two
        </Fieldset>
      </Fieldset.Group>,
    )

    expect(errorMessage).not.toBe('')
    errorSpy.mockRestore()
  })

  it('should throw error when label missing', () => {
    let errorMessage = ''
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(msg => (errorMessage = msg))

    mount(
      <Fieldset.Group value="one">
        <Fieldset>one</Fieldset>
      </Fieldset.Group>,
    )

    expect(errorMessage).not.toBe('')
    errorSpy.mockRestore()
  })
})
