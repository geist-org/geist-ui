import React, { useEffect, useState } from 'react'
import { mount } from 'enzyme'
import moment from 'moment'
import { DatePicker } from 'components'
import { Wifi } from '@zeit-ui/react-icons'
import { nativeEvent } from '../../../tests/utils'
import { clearInput, nextMonth, nextYear, openPicker, selectCell } from './utils'

describe('DatePicker', () => {
  it('should render correctly', () => {
    const wrapper = mount(<DatePicker open placeholder="placeholder" />)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render correct placeholder', () => {
    const wrapper = mount(<DatePicker placeholder={undefined} />)
    expect(wrapper.find('input').props().placeholder).toEqual('Select date')
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should support all variants', () => {
    const wrapper = mount(
      <div>
        <DatePicker open variant="solid" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should support all colors', () => {
    const wrapper = mount(
      <div>
        <DatePicker open color="primary" />
        <DatePicker open color="success" />
        <DatePicker open color="warning" />
        <DatePicker open color="error" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should support all sizes', () => {
    const wrapper = mount(
      <div>
        <DatePicker open size="mini" />
        <DatePicker open size="small" />
        <DatePicker open size="large" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `locale` should works', () => {
    const wrapper = mount(
      <div>
        <DatePicker open locale="zh-CN" />
        <DatePicker open picker="year" locale="zh-CN" />
        <DatePicker open picker="quarter" locale="zh-CN" />
        <DatePicker open picker="month" locale="zh-CN" />
        <DatePicker open picker="week" locale="zh-CN" />
        <DatePicker open picker="time" locale="zh-CN" />
        <DatePicker open locale="en-US" />
        <DatePicker open picker="year" locale="en-US" />
        <DatePicker open picker="quarter" locale="en-US" />
        <DatePicker open picker="month" locale="en-US" />
        <DatePicker open picker="week" locale="en-US" />
        <DatePicker open picker="time" locale="en-US" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `locale` should works with compatibility', () => {
    const wrapper = mount(
      <div>
        <DatePicker open locale="zh_CN" />
        <DatePicker open locale="zh" />
        <DatePicker open locale="en_US" />
        <DatePicker open locale="en" />
        <DatePicker open locale="xxx" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `value` should works', () => {
    const date = moment('2020-01-01', 'YYYY-MM-DD')
    const wrapper = mount(
      <div>
        <DatePicker open value={date} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `className` should works', () => {
    const customClass = 'blabla'
    const wrapper = mount(
      <div>
        <DatePicker open className={customClass} />
      </div>,
    )
    expect(wrapper.find('.cfx-picker').hasClass(customClass)).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `dateRender` should works', () => {
    const wrapper = mount(
      <div>
        <DatePicker
          open
          dateRender={(current: any) => {
            const style: any = {}
            if (current.date() === 1) {
              style.border = '1px solid red'
              style.borderRadius = '50%'
            }
            return (
              <div className="cfx-picker-cell-inner" style={style}>
                {current.date()}
              </div>
            )
          }}
        />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `getPopupContainer` should works', () => {
    const customClass = 'blabla'
    let element = document.createElement('article')
    element.className = customClass
    document.body.appendChild(element)
    const wrapper = mount(
      <div>
        <DatePicker open getPopupContainer={() => element} />
      </div>,
    )
    expect(
      document.querySelectorAll(`.${customClass} .cfx-picker-dropdown`).length,
    ).toBeGreaterThan(0)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `mode` should works', () => {
    const wrapper = mount(
      <div>
        <DatePicker open mode="time" />
        <DatePicker open mode="date" />
        <DatePicker open mode="month" />
        <DatePicker open mode="year" />
        <DatePicker open mode="week" />
        <DatePicker open mode="decade" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `panelRender` should works', () => {
    const wrapper = mount(
      <div>
        <DatePicker open panelRender={() => <div>panelRender</div>} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `picker` should works', () => {
    const wrapper = mount(
      <div>
        <DatePicker open picker="time" />
        <DatePicker open picker="date" />
        <DatePicker open picker="month" />
        <DatePicker open picker="year" />
        <DatePicker open picker="week" />
        <DatePicker open picker="quarter" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `popupStyle` should works', () => {
    const wrapper = mount(
      <div>
        <DatePicker open popupStyle={{ color: 'red', background: 'green' }} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `bordered` should works', () => {
    const wrapper = mount(
      <div>
        <DatePicker open bordered={false} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `suffixIcon` should works', () => {
    const wrapper = mount(
      <div>
        <DatePicker open suffixIcon={<Wifi />} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `style` should works', () => {
    const wrapper = mount(
      <div>
        <DatePicker open style={{ width: 300, height: 50 }} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `onOpenChange` should works', () => {
    let state = false
    const callback = jest.fn().mockImplementation(open => (state = open))
    const wrapper = mount(<DatePicker onOpenChange={callback} />)
    openPicker(wrapper)
    expect(callback).toHaveBeenCalled()
    expect(state).toEqual(true)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `onPanelChange` should works', () => {
    const callback = jest.fn()
    const wrapper = mount(<DatePicker open onPanelChange={callback} />)
    nextMonth(wrapper)
    expect(callback).toHaveBeenCalled()
    nextYear(wrapper)
    expect(callback).toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should trigger event when changed', () => {
    const callback = jest.fn()
    const wrapper = mount(<DatePicker open onChange={callback} />)
    selectCell(wrapper, 3)
    expect(callback).toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should ignore event when disabled', () => {
    const callback = jest.fn()
    const wrapper = mount(<DatePicker onChange={callback} disabled />)
    openPicker(wrapper)
    expect(callback).not.toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should ignore event when readonly', () => {
    const callback = jest.fn()
    const wrapper = mount(<DatePicker onChange={callback} inputReadOnly />)
    openPicker(wrapper)
    expect(callback).not.toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should clear text', () => {
    let value = ''
    const callback = jest.fn().mockImplementation((_date, dateString) => (value = dateString))
    const wrapper = mount(<DatePicker open onChange={callback} allowClear />)

    selectCell(wrapper, 3)
    expect(callback).toHaveBeenCalled()
    expect(value).toContain('-03')

    clearInput(wrapper)
    expect(callback).toHaveBeenCalled()
    expect(value).toEqual('')
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `disabledDate` should works', () => {
    function disabledDate(current: any) {
      return current && current < moment().endOf('day')
    }
    const wrapper = mount(<DatePicker disabledDate={disabledDate} open />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `dropdownClassName` should works', () => {
    const customClass = 'blabla'
    const wrapper = mount(<DatePicker open dropdownClassName={customClass} />)
    expect(document.querySelectorAll(`.cfx-picker-dropdown.${customClass}`).length).toBeGreaterThan(
      0,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it("cannot select a date that doesn't exist", () => {
    const wrapper = mount(<DatePicker open />)
    expect(() => selectCell(wrapper, 32)).toThrow('Cell not match in picker panel.')
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
