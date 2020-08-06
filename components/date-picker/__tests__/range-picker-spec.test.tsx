import React from 'react'
import { mount } from 'enzyme'
import moment from 'moment'
import { DatePicker } from 'components'
import { openPicker, selectCell } from './utils'

const { RangePicker } = DatePicker

// ensure that the snapshots does not mismatch due to the changes of test date
const defaultValue = moment('2020-01-01')

describe('RangePicker Spec Props', () => {
  it('prop `allowEmpty` should works', () => {
    const wrapper = mount(
      <RangePicker
        open
        showTime
        allowEmpty={[true, true]}
        defaultPickerValue={[defaultValue, defaultValue]}
      />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    selectCell(wrapper, 3)
    expect(wrapper.find('.cfx-picker-ok button').prop('disabled')).toBe(false)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `defaultValue` should works', () => {
    const dateStart = moment('2020-01-01', 'YYYY-MM-DD')
    const dateEnd = moment('2020-02-01', 'YYYY-MM-DD')
    const wrapper = mount(<RangePicker open defaultValue={[dateStart, dateEnd]} />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `defaultPickerValue` should works', () => {
    const dateStart = moment('2020-01-01', 'YYYY-MM-DD')
    const dateEnd = moment('2020-02-01', 'YYYY-MM-DD')
    const wrapper = mount(<RangePicker open defaultPickerValue={[dateStart, dateEnd]} />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `value` should works', () => {
    const dateStart = moment('2020-01-01', 'YYYY-MM-DD')
    const dateEnd = moment('2020-02-01', 'YYYY-MM-DD')
    const wrapper = mount(<RangePicker open value={[dateStart, dateEnd]} />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `disabled` should works', () => {
    const wrapper = mount(
      <RangePicker disabled={[true, false]} defaultPickerValue={[defaultValue, defaultValue]} />,
    )
    openPicker(wrapper, 0)
    expect(() => selectCell(wrapper, 3)).toThrow('Cell not match in picker panel.')
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `format` should works', () => {
    const wrapper = mount(
      <RangePicker open format="YYYY-MM" defaultPickerValue={[defaultValue, defaultValue]} />,
    )
    selectCell(wrapper, 3)
    selectCell(wrapper, 4)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `ranges` should works', () => {
    const wrapper = mount(
      <RangePicker
        open
        defaultPickerValue={[defaultValue, defaultValue]}
        ranges={{
          Today: [moment(), moment()],
        }}
      />,
    )
    expect(wrapper.exists('.cfx-picker-footer .tag')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `renderExtraFooter` should works', () => {
    const wrapper = mount(
      <RangePicker
        open
        defaultPickerValue={[defaultValue, defaultValue]}
        renderExtraFooter={() => <span id="renderExtraFooter">renderExtraFooter</span>}
      />,
    )
    expect(wrapper.find('.cfx-picker-footer-extra').at(0).exists('#renderExtraFooter')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `separator` should works', () => {
    const wrapper = mount(
      <RangePicker open separator="-->" defaultPickerValue={[defaultValue, defaultValue]} />,
    )
    expect(wrapper.find('.cfx-picker-range-separator').at(0).text()).toBe('-->')
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `showTime` should works', () => {
    const wrapper = mount(
      <RangePicker open showTime defaultPickerValue={[defaultValue, defaultValue]} />,
    )
    expect(wrapper.exists('.cfx-picker-time-panel-column')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `onCalendarChange` should works', () => {
    const callback = jest.fn()
    const wrapper = mount(
      <RangePicker
        open
        onCalendarChange={callback}
        defaultPickerValue={[defaultValue, defaultValue]}
      />,
    )
    selectCell(wrapper, 3)
    expect(callback).toHaveBeenCalled()
    selectCell(wrapper, 5)
    expect(callback).toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `onChange` should works', () => {
    const callback = jest.fn()
    const wrapper = mount(
      <RangePicker open onChange={callback} defaultPickerValue={[defaultValue, defaultValue]} />,
    )
    selectCell(wrapper, 3)
    selectCell(wrapper, 5)
    expect(callback).toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
