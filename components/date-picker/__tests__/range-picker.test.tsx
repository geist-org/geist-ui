import React from 'react'
import { mount } from 'enzyme'
import moment from 'moment'
import { DatePicker } from 'components'
import { Wifi } from '@zeit-ui/react-icons'
import { clearInput, nextMonth, nextYear, openPicker, selectCell } from './utils'

const { RangePicker } = DatePicker

describe('RangePicker Common', () => {
  it('should render correctly', () => {
    const wrapper = mount(<RangePicker open placeholder={['placeholder', 'placeholder']} />)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render correct placeholder', () => {
    const wrapper = mount(<RangePicker placeholder={undefined} />)
    expect(wrapper.find('input').at(0).props().placeholder).toEqual('Start date')
    expect(wrapper.find('input').at(1).props().placeholder).toEqual('End date')
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should support all variants', () => {
    const wrapper = mount(
      <div>
        <RangePicker open variant="solid" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should support all colors', () => {
    const wrapper = mount(
      <div>
        <RangePicker open color="primary" />
        <RangePicker open color="success" />
        <RangePicker open color="warning" />
        <RangePicker open color="error" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should support all sizes', () => {
    const wrapper = mount(
      <div>
        <RangePicker open size="mini" />
        <RangePicker open size="small" />
        <RangePicker open size="large" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `locale` should works', () => {
    const wrapper = mount(
      <div>
        <RangePicker open locale="zh-CN" />
        <RangePicker open picker="year" locale="zh-CN" />
        <RangePicker open picker="quarter" locale="zh-CN" />
        <RangePicker open picker="month" locale="zh-CN" />
        <RangePicker open picker="week" locale="zh-CN" />
        <RangePicker open picker="time" locale="zh-CN" />
        <RangePicker open locale="en-US" />
        <RangePicker open picker="year" locale="en-US" />
        <RangePicker open picker="quarter" locale="en-US" />
        <RangePicker open picker="month" locale="en-US" />
        <RangePicker open picker="week" locale="en-US" />
        <RangePicker open picker="time" locale="en-US" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `locale` should works with compatibility', () => {
    const wrapper = mount(
      <div>
        <RangePicker open locale="zh_CN" />
        <RangePicker open locale="zh" />
        <RangePicker open locale="en_US" />
        <RangePicker open locale="en" />
        <RangePicker open locale="xxx" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `value` should works', () => {
    const dateStart = moment('2020-01-01', 'YYYY-MM-DD')
    const dateEnd = moment('2020-02-01', 'YYYY-MM-DD')
    const wrapper = mount(
      <div>
        <RangePicker open value={[dateStart, dateEnd]} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `className` should works', () => {
    const customClass = 'blabla'
    const wrapper = mount(
      <div>
        <RangePicker open className={customClass} />
      </div>,
    )
    expect(wrapper.find('.cfx-picker').hasClass(customClass)).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `dateRender` should works', () => {
    const wrapper = mount(
      <div>
        <RangePicker
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
        <RangePicker open getPopupContainer={() => element} />
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
        <RangePicker open mode={['time', 'time']} />
        <RangePicker open mode={['date', 'date']} />
        <RangePicker open mode={['month', 'month']} />
        <RangePicker open mode={['year', 'year']} />
        <RangePicker open mode={['week', 'week']} />
        <RangePicker open mode={['decade', 'decade']} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `panelRender` should works', () => {
    const wrapper = mount(
      <div>
        <RangePicker open panelRender={() => <div>panelRender</div>} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `picker` should works', () => {
    const wrapper = mount(
      <div>
        <RangePicker open picker="time" />
        <RangePicker open picker="date" />
        <RangePicker open picker="month" />
        <RangePicker open picker="year" />
        <RangePicker open picker="week" />
        <RangePicker open picker="quarter" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `popupStyle` should works', () => {
    const wrapper = mount(
      <div>
        <RangePicker open popupStyle={{ color: 'red', background: 'green' }} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `bordered` should works', () => {
    const wrapper = mount(
      <div>
        <RangePicker open bordered={false} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `suffixIcon` should works', () => {
    const wrapper = mount(
      <div>
        <RangePicker open suffixIcon={<Wifi />} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `style` should works', () => {
    const wrapper = mount(
      <div>
        <RangePicker open style={{ width: 300, height: 50 }} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `onOpenChange` should works', () => {
    let state = false
    const callback = jest.fn().mockImplementation(open => (state = open))
    const wrapper = mount(<RangePicker onOpenChange={callback} />)
    openPicker(wrapper)
    expect(callback).toHaveBeenCalled()
    expect(state).toEqual(true)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `onPanelChange` should works', () => {
    const callback = jest.fn()
    const wrapper = mount(<RangePicker open onPanelChange={callback} />)
    nextMonth(wrapper)
    expect(callback).toHaveBeenCalled()
    nextYear(wrapper)
    expect(callback).toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should trigger event when changed', () => {
    const callback = jest.fn()
    const wrapper = mount(<RangePicker open onChange={callback} />)
    selectCell(wrapper, 3)
    selectCell(wrapper, 5)
    expect(callback).toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should ignore event when disabled', () => {
    const callback = jest.fn()
    const wrapper = mount(<RangePicker onChange={callback} disabled />)
    openPicker(wrapper)
    expect(callback).not.toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should ignore event when readonly', () => {
    const callback = jest.fn()
    const wrapper = mount(<RangePicker onChange={callback} inputReadOnly />)
    openPicker(wrapper)
    expect(callback).not.toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should clear text', () => {
    let value = ''
    const callback = jest.fn().mockImplementation((_date, dateString) => (value = dateString))
    const wrapper = mount(<RangePicker open onChange={callback} allowClear />)

    selectCell(wrapper, 3)
    selectCell(wrapper, 5)
    expect(callback).toHaveBeenCalled()
    expect(value[0]).toContain('-03')
    expect(value[1]).toContain('-05')

    clearInput(wrapper)
    expect(callback).toHaveBeenCalled()
    expect(value).toEqual(['', ''])
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `disabledDate` should works', () => {
    function disabledDate(current: any) {
      return current && current < moment().endOf('day')
    }
    const wrapper = mount(<RangePicker disabledDate={disabledDate} open />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `dropdownClassName` should works', () => {
    const customClass = 'blabla'
    const wrapper = mount(<RangePicker open dropdownClassName={customClass} />)
    expect(document.querySelectorAll(`.cfx-picker-dropdown.${customClass}`).length).toBeGreaterThan(
      0,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it("cannot select a date that doesn't exist", () => {
    const wrapper = mount(<RangePicker open />)
    expect(() => selectCell(wrapper, 32)).toThrow('Cell not match in picker panel.')
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
