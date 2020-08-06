import React from 'react'
import { mount } from 'enzyme'
import moment from 'moment'
import { DatePicker } from 'components'
import { selectCell } from './utils'

// ensure that the snapshots does not mismatch due to the changes of test date
const defaultValue = moment('2020-05-01')

describe('DatePicker[picker=`year`]', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <DatePicker picker="year" open placeholder="placeholder" defaultPickerValue={defaultValue} />,
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `defaultValue` should works', () => {
    const date = moment('2020-01-01', 'YYYY-MM-DD')
    const wrapper = mount(
      <div>
        <DatePicker picker="year" open defaultValue={date} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `defaultPickerValue` should works', () => {
    const date = moment('2020-01-01', 'YYYY-MM-DD')
    const wrapper = mount(
      <div>
        <DatePicker picker="year" open defaultPickerValue={date} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `format` should works', () => {
    const wrapper = mount(
      <DatePicker picker="year" open format="YY" defaultPickerValue={defaultValue} />,
    )
    selectCell(wrapper, 2023)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `value` should works', () => {
    const date = moment('2020-01-01', 'YYYY-MM-DD')
    const wrapper = mount(
      <DatePicker picker="year" open value={date} defaultPickerValue={defaultValue} />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `onChange` should works', () => {
    const callback = jest.fn()
    const wrapper = mount(
      <DatePicker picker="year" open onChange={callback} defaultPickerValue={defaultValue} />,
    )
    selectCell(wrapper, 2023)
    expect(callback).toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
