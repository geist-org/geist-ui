import React from 'react'
import { mount } from 'enzyme'
import moment from 'moment'
import { DatePicker } from 'components'
import { openPicker, range } from './utils'

// ensure that the snapshots does not mismatch due to the changes of test date
const defaultValue = moment('2020-08-01 12:00:00')

describe('DatePicker[picker=`time`]', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <DatePicker picker="time" open placeholder="placeholder" defaultPickerValue={defaultValue} />,
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `defaultValue` should works', () => {
    const date = moment('2020-01-01', 'YYYY-MM-DD HH:mm:ss')
    const wrapper = mount(
      <div>
        <DatePicker picker="time" open defaultValue={date} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `disabledHours` should works', () => {
    const wrapper = mount(
      <DatePicker
        picker="time"
        open
        disabledHours={() => range(0, 24).splice(4, 20)}
        defaultPickerValue={defaultValue}
      />,
    )
    expect(
      wrapper
        .find('.cfx-picker-time-panel-column')
        .at(0)
        .find('.cfx-picker-time-panel-cell')
        .at(4)
        .hasClass('cfx-picker-time-panel-cell-disabled'),
    ).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `disabledMinutes` should works', () => {
    const wrapper = mount(
      <DatePicker
        picker="time"
        open
        disabledMinutes={() => range(30, 60)}
        defaultPickerValue={defaultValue}
      />,
    )
    expect(
      wrapper
        .find('.cfx-picker-time-panel-column')
        .at(1)
        .find('.cfx-picker-time-panel-cell')
        .at(34)
        .hasClass('cfx-picker-time-panel-cell-disabled'),
    ).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `disabledSeconds` should works', () => {
    const wrapper = mount(
      <DatePicker
        picker="time"
        open
        disabledSeconds={() => range(20, 56)}
        defaultPickerValue={defaultValue}
      />,
    )
    expect(
      wrapper
        .find('.cfx-picker-time-panel-column')
        .at(2)
        .find('.cfx-picker-time-panel-cell')
        .at(24)
        .hasClass('cfx-picker-time-panel-cell-disabled'),
    ).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `format` should works', () => {
    const wrapper = mount(
      <DatePicker picker="time" open format="YYYY/MM/DD hh:mm" defaultPickerValue={defaultValue} />,
    )
    expect(wrapper.find('.cfx-picker-time-panel-column').length).toBe(2)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `hideDisabledOptions` should works', () => {
    const wrapper = mount(
      <DatePicker
        picker="time"
        open
        defaultPickerValue={defaultValue}
        disabledHours={() => range(0, 24).splice(4, 20)}
        disabledMinutes={() => range(30, 60)}
        disabledSeconds={() => [20, 56]}
      />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `hourStep` should works', () => {
    const wrapper = mount(
      <DatePicker picker="time" open hourStep={3} defaultPickerValue={defaultValue} />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `minuteStep` should works', () => {
    const wrapper = mount(
      <DatePicker picker="time" open minuteStep={3} defaultPickerValue={defaultValue} />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `secondStep` should works', () => {
    const wrapper = mount(
      <DatePicker picker="time" open secondStep={3} defaultPickerValue={defaultValue} />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `renderExtraFooter` should works', () => {
    const wrapper = mount(
      <DatePicker
        picker="time"
        open
        defaultPickerValue={defaultValue}
        renderExtraFooter={() => <span id="renderExtraFooter">renderExtraFooter</span>}
      />,
    )
    expect(wrapper.find('.cfx-picker-footer-extra').at(0).exists('#renderExtraFooter')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `use12Hours` should works', () => {
    const wrapper = mount(
      <DatePicker picker="time" open use12Hours defaultPickerValue={defaultValue} />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `value` should works', () => {
    const date = moment('2020-01-01', 'YYYY-MM-DD HH:mm:ss')
    const wrapper = mount(<DatePicker picker="time" open value={date} />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `onChange` should works', () => {
    const callback = jest.fn()
    const wrapper = mount(
      <DatePicker picker="time" open onChange={callback} defaultPickerValue={defaultValue} />,
    )
    wrapper
      .find('.cfx-picker-time-panel-column')
      .at(0)
      .find('.cfx-picker-time-panel-cell')
      .at(2)
      .simulate('click')
    wrapper.find('.cfx-picker-ok button').at(0).simulate('click')
    expect(callback).toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `onOpenChange` should works', () => {
    const callback = jest.fn()
    const wrapper = mount(
      <DatePicker
        picker="time"
        onOpenChange={callback}
        showTime
        defaultPickerValue={defaultValue}
      />,
    )
    openPicker(wrapper)
    expect(callback).toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `showNow` should works', () => {
    const wrapper = mount(
      <DatePicker picker="time" open showNow defaultPickerValue={defaultValue} />,
    )
    expect(wrapper.exists('.cfx-picker-now-btn')).toBe(true)
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
