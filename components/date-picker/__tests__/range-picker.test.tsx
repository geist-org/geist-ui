import React from 'react'
import { mount } from 'enzyme'
import moment from 'moment'
import { DatePicker } from 'components'
import { Wifi } from '@zeit-ui/react-icons'
import { clearInput, nextMonth, nextYear, openPicker, selectCell } from './utils'

const { RangePicker } = DatePicker

// ensure that the snapshots does not mismatch due to the changes of test date
const defaultValue = moment('2020-07-01')

describe('RangePicker Common', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <RangePicker
        open
        placeholder={['placeholder', 'placeholder']}
        defaultPickerValue={[defaultValue, defaultValue]}
      />,
    )
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
        <RangePicker open variant="solid" defaultPickerValue={[defaultValue, defaultValue]} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should support all colors', () => {
    const wrapper = mount(
      <div>
        <RangePicker open color="primary" defaultPickerValue={[defaultValue, defaultValue]} />
        <RangePicker open color="success" defaultPickerValue={[defaultValue, defaultValue]} />
        <RangePicker open color="warning" defaultPickerValue={[defaultValue, defaultValue]} />
        <RangePicker open color="error" defaultPickerValue={[defaultValue, defaultValue]} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should support all sizes', () => {
    const wrapper = mount(
      <div>
        <RangePicker open size="mini" defaultPickerValue={[defaultValue, defaultValue]} />
        <RangePicker open size="small" defaultPickerValue={[defaultValue, defaultValue]} />
        <RangePicker open size="large" defaultPickerValue={[defaultValue, defaultValue]} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `locale` should works', () => {
    const wrapper = mount(
      <div>
        <RangePicker open locale="zh-CN" defaultPickerValue={[defaultValue, defaultValue]} />
        <RangePicker
          open
          picker="year"
          locale="zh-CN"
          defaultPickerValue={[defaultValue, defaultValue]}
        />
        <RangePicker
          open
          picker="quarter"
          locale="zh-CN"
          defaultPickerValue={[defaultValue, defaultValue]}
        />
        <RangePicker
          open
          picker="month"
          locale="zh-CN"
          defaultPickerValue={[defaultValue, defaultValue]}
        />
        <RangePicker
          open
          picker="week"
          locale="zh-CN"
          defaultPickerValue={[defaultValue, defaultValue]}
        />
        <RangePicker
          open
          picker="time"
          locale="zh-CN"
          defaultPickerValue={[defaultValue, defaultValue]}
        />
        <RangePicker open locale="en-US" defaultPickerValue={[defaultValue, defaultValue]} />
        <RangePicker
          open
          picker="year"
          locale="en-US"
          defaultPickerValue={[defaultValue, defaultValue]}
        />
        <RangePicker
          open
          picker="quarter"
          locale="en-US"
          defaultPickerValue={[defaultValue, defaultValue]}
        />
        <RangePicker
          open
          picker="month"
          locale="en-US"
          defaultPickerValue={[defaultValue, defaultValue]}
        />
        <RangePicker
          open
          picker="week"
          locale="en-US"
          defaultPickerValue={[defaultValue, defaultValue]}
        />
        <RangePicker
          open
          picker="time"
          locale="en-US"
          defaultPickerValue={[defaultValue, defaultValue]}
        />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `locale` should works with compatibility', () => {
    const wrapper = mount(
      <div>
        <RangePicker open locale="zh_CN" defaultPickerValue={[defaultValue, defaultValue]} />
        <RangePicker open locale="zh" defaultPickerValue={[defaultValue, defaultValue]} />
        <RangePicker open locale="en_US" defaultPickerValue={[defaultValue, defaultValue]} />
        <RangePicker open locale="en" defaultPickerValue={[defaultValue, defaultValue]} />
        <RangePicker open locale="xxx" defaultPickerValue={[defaultValue, defaultValue]} />
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
        <RangePicker
          open
          className={customClass}
          defaultPickerValue={[defaultValue, defaultValue]}
        />
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
          defaultPickerValue={[defaultValue, defaultValue]}
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
      <RangePicker
        open
        getPopupContainer={() => element}
        defaultPickerValue={[defaultValue, defaultValue]}
      />,
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
        <RangePicker
          open
          mode={['time', 'time']}
          defaultPickerValue={[defaultValue, defaultValue]}
        />
        <RangePicker
          open
          mode={['date', 'date']}
          defaultPickerValue={[defaultValue, defaultValue]}
        />
        <RangePicker
          open
          mode={['month', 'month']}
          defaultPickerValue={[defaultValue, defaultValue]}
        />
        <RangePicker
          open
          mode={['year', 'year']}
          defaultPickerValue={[defaultValue, defaultValue]}
        />
        <RangePicker
          open
          mode={['week', 'week']}
          defaultPickerValue={[defaultValue, defaultValue]}
        />
        <RangePicker
          open
          mode={['decade', 'decade']}
          defaultPickerValue={[defaultValue, defaultValue]}
        />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `panelRender` should works', () => {
    const wrapper = mount(
      <RangePicker
        open
        panelRender={() => <div>panelRender</div>}
        defaultPickerValue={[defaultValue, defaultValue]}
      />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `picker` should works', () => {
    const wrapper = mount(
      <div>
        <RangePicker open picker="time" defaultPickerValue={[defaultValue, defaultValue]} />
        <RangePicker open picker="date" defaultPickerValue={[defaultValue, defaultValue]} />
        <RangePicker open picker="month" defaultPickerValue={[defaultValue, defaultValue]} />
        <RangePicker open picker="year" defaultPickerValue={[defaultValue, defaultValue]} />
        <RangePicker open picker="week" defaultPickerValue={[defaultValue, defaultValue]} />
        <RangePicker open picker="quarter" defaultPickerValue={[defaultValue, defaultValue]} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `popupStyle` should works', () => {
    const wrapper = mount(
      <RangePicker
        open
        popupStyle={{ color: 'red', background: 'green' }}
        defaultPickerValue={[defaultValue, defaultValue]}
      />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `bordered` should works', () => {
    const wrapper = mount(
      <RangePicker open bordered={false} defaultPickerValue={[defaultValue, defaultValue]} />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `suffixIcon` should works', () => {
    const wrapper = mount(
      <RangePicker open suffixIcon={<Wifi />} defaultPickerValue={[defaultValue, defaultValue]} />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `style` should works', () => {
    const wrapper = mount(
      <RangePicker
        open
        style={{ width: 300, height: 50 }}
        defaultPickerValue={[defaultValue, defaultValue]}
      />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `onOpenChange` should works', () => {
    let state = false
    const callback = jest.fn().mockImplementation(open => (state = open))
    const wrapper = mount(
      <RangePicker onOpenChange={callback} defaultPickerValue={[defaultValue, defaultValue]} />,
    )
    openPicker(wrapper)
    expect(callback).toHaveBeenCalled()
    expect(state).toEqual(true)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `onPanelChange` should works', () => {
    const callback = jest.fn()
    const wrapper = mount(
      <RangePicker
        open
        onPanelChange={callback}
        defaultPickerValue={[defaultValue, defaultValue]}
      />,
    )
    nextMonth(wrapper)
    expect(callback).toHaveBeenCalled()
    nextYear(wrapper)
    expect(callback).toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should trigger event when changed', () => {
    const callback = jest.fn()
    const wrapper = mount(
      <RangePicker open onChange={callback} defaultPickerValue={[defaultValue, defaultValue]} />,
    )
    selectCell(wrapper, 3)
    selectCell(wrapper, 5)
    expect(callback).toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should ignore event when disabled', () => {
    const callback = jest.fn()
    const wrapper = mount(
      <RangePicker
        onChange={callback}
        disabled
        defaultPickerValue={[defaultValue, defaultValue]}
      />,
    )
    openPicker(wrapper)
    expect(callback).not.toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should ignore event when readonly', () => {
    const callback = jest.fn()
    const wrapper = mount(
      <RangePicker
        onChange={callback}
        inputReadOnly
        defaultPickerValue={[defaultValue, defaultValue]}
      />,
    )
    openPicker(wrapper)
    expect(callback).not.toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should clear text', () => {
    let value = ''
    const callback = jest.fn().mockImplementation((_date, dateString) => (value = dateString))
    const wrapper = mount(
      <RangePicker
        open
        onChange={callback}
        allowClear
        defaultPickerValue={[defaultValue, defaultValue]}
      />,
    )

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
    const wrapper = mount(
      <RangePicker
        disabledDate={disabledDate}
        open
        defaultPickerValue={[defaultValue, defaultValue]}
      />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `dropdownClassName` should works', () => {
    const customClass = 'blabla'
    const wrapper = mount(
      <RangePicker
        open
        dropdownClassName={customClass}
        defaultPickerValue={[defaultValue, defaultValue]}
      />,
    )
    expect(document.querySelectorAll(`.cfx-picker-dropdown.${customClass}`).length).toBeGreaterThan(
      0,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it("cannot select a date that doesn't exist", () => {
    const wrapper = mount(<RangePicker open defaultPickerValue={[defaultValue, defaultValue]} />)
    expect(() => selectCell(wrapper, 32)).toThrow('Cell not match in picker panel.')
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
