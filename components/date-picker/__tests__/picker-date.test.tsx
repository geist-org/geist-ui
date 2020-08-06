import React from 'react'
import { mount } from 'enzyme'
import moment from 'moment'
import { DatePicker } from 'components'
import { range, selectCell } from './utils'

// ensure that the snapshots does not mismatch due to the changes of test date
const defaultValue = moment('2020-08-01 12:00:00')

describe('DatePicker[picker=`date`]', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <DatePicker picker="date" open placeholder="placeholder" defaultPickerValue={defaultValue} />,
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `defaultValue` should works', () => {
    const date = moment('2020-01-01', 'YYYY-MM-DD')
    const wrapper = mount(
      <div>
        <DatePicker picker="date" open defaultValue={date} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `defaultPickerValue` should works', () => {
    const date = moment('2020-01-01', 'YYYY-MM-DD')
    const wrapper = mount(
      <div>
        <DatePicker picker="date" open defaultPickerValue={date} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `disabledTime` should works', () => {
    const wrapper = mount(
      <DatePicker
        picker="date"
        open
        showTime
        defaultPickerValue={defaultValue}
        disabledTime={() => ({
          disabledHours: () => range(0, 24).splice(4, 20),
          disabledMinutes: () => range(30, 60),
          disabledSeconds: () => [55, 56],
        })}
      />,
    )
    expect(
      wrapper
        .find('.cfx-picker-time-panel-column')
        .at(0)
        .find('.cfx-picker-time-panel-cell')
        .at(4)
        .hasClass('cfx-picker-time-panel-cell-disabled'),
    ).toBe(true) // disabledHours
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `format` should works', () => {
    const wrapper = mount(
      <DatePicker picker="date" open format="YYYY/MM/DD" defaultPickerValue={defaultValue} />,
    )
    selectCell(wrapper, 3)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `renderExtraFooter` should works', () => {
    const wrapper = mount(
      <DatePicker
        picker="date"
        open
        defaultPickerValue={defaultValue}
        renderExtraFooter={() => <span id="renderExtraFooter">renderExtraFooter</span>}
      />,
    )
    expect(wrapper.find('.cfx-picker-footer-extra').at(0).exists('#renderExtraFooter')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `showTime` should works', () => {
    const wrapper = mount(
      <DatePicker picker="date" open showTime defaultPickerValue={defaultValue} />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `showToday` should works', () => {
    const wrapper = mount(
      <DatePicker picker="date" open showToday defaultPickerValue={defaultValue} />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `value` should works', () => {
    const date = moment('2020-01-01', 'YYYY-MM-DD')
    const wrapper = mount(<DatePicker picker="date" open value={date} />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `onChange` should works', () => {
    const callback = jest.fn()
    const wrapper = mount(
      <DatePicker picker="date" open onChange={callback} defaultPickerValue={defaultValue} />,
    )
    selectCell(wrapper, 3)
    expect(callback).toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `onOk` should works', () => {
    const callback = jest.fn()
    const wrapper = mount(
      <DatePicker picker="date" open onOk={callback} showTime defaultPickerValue={defaultValue} />,
    )
    selectCell(wrapper, 3)
    wrapper.find('.cfx-picker-ok button').at(0).simulate('click')
    expect(callback).toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `showNow` should works', () => {
    const wrapper = mount(
      <DatePicker picker="date" open showTime showNow defaultPickerValue={defaultValue} />,
    )
    expect(wrapper.exists('.cfx-picker-now-btn')).toBe(true)
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
