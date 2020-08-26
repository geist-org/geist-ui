import AutoComplete, { useAutoCompleteHandle } from '../'
import { mount, render } from 'enzyme'
import React, { useEffect } from 'react'
import { act } from 'react-dom/test-utils'
import { nativeEvent, updateWrapper } from 'tests/utils'

const simulateNativeClick = (el: Element) => {
  el.dispatchEvent(
    new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    }),
  )
}

const typeWrapper = mount(<AutoComplete />)
typeWrapper.unmount()
const clickAway = async (wrapper: typeof typeWrapper) => {
  await act(async () => {
    simulateNativeClick(document.body)
  })
  await updateWrapper(wrapper, 150)
}
const changeTo = async (wrapper: typeof typeWrapper, value: string) => {
  wrapper
    .find('input')
    .at(0)
    .simulate('change', { ...nativeEvent, target: { value } })
}

describe('AutoComplete', () => {
  describe('Style', () => {
    it('should render correctly', () => {
      const wrapper = mount(<AutoComplete />)
      expect(() => wrapper.unmount()).not.toThrow()
      expect(
        render(
          <div>
            <AutoComplete />
            <AutoComplete variant="solid" />
            <AutoComplete clearable />
            <AutoComplete disabled />
          </div>,
        ),
      ).toMatchSnapshot()
    })

    it('should render with right variants, sizes and color', () => {
      const wrapper = mount(
        <div>
          <AutoComplete variant="solid" />
          <AutoComplete color="primary" />
          <AutoComplete color="success" />
          <AutoComplete size="mini" />
          <AutoComplete size="large" />
        </div>,
      )
      expect(() => wrapper.unmount()).not.toThrow()
    })

    it('should response width change', async () => {
      const wrapper = mount(<AutoComplete defaultValue="value" width="100px" />)
      expect(wrapper.prop('width')).toEqual('100px')
      await act(async () => {
        wrapper.setProps({ width: '200px' })
      })

      expect(wrapper.prop('width')).toEqual('200px')
    })
  })

  describe('Value uncontrolled', () => {
    it('should set input value from initial value', () => {
      let wrapper = mount(<AutoComplete defaultValue="value" />)
      let input = wrapper.find('input').at(0).getDOMNode()
      expect((input as HTMLInputElement).value).toEqual('value')

      wrapper = mount(<AutoComplete value="value2" />)
      input = wrapper.find('input').at(0).getDOMNode()
      expect((input as HTMLInputElement).value).toEqual('value2')
    })

    it('should work with useAutoCompleteHandle', () => {
      let log = ''
      jest.spyOn(console, 'log').mockImplementation(msg => (log = msg))
      function MockAutoComplete({ testSetValue = false, testGetValue = false }) {
        const { ref, getValue, setValue } = useAutoCompleteHandle()
        useEffect(() => {
          testGetValue && console.log(getValue())
        }, [testGetValue])
        useEffect(() => {
          testSetValue && setValue('foo')
        }, [testSetValue])
        return <AutoComplete ref={ref} defaultValue="value" />
      }

      const wrapper = mount(<MockAutoComplete />)
      wrapper.setProps({ testGetValue: true })
      expect(log).toEqual('value')
      wrapper.setProps({ testSetValue: true })
      expect((wrapper.find('input').at(0).getDOMNode() as HTMLInputElement).value).toEqual('foo')
    })

    it('should set input value by select', () => {
      const focusHandler = jest.fn()
      let wrapper = mount(<AutoComplete options={[{ label: 'foo' }]} onFocus={focusHandler} />)
      wrapper.find('input').at(0).simulate('focus', nativeEvent)
      expect(focusHandler).toBeCalledTimes(1)
      wrapper.find('.auto-complete-dropdown .item').at(0).simulate('click', nativeEvent)
      expect((wrapper.find('input').at(0).getDOMNode() as HTMLInputElement).value).toEqual('foo')
    })

    it('should work with prop clearable', async () => {
      const onClear = jest.fn()
      const wrapper = mount(<AutoComplete defaultValue="value" />)
      expect(wrapper.find('svg').length).toBe(0)

      await act(async () => {
        wrapper.setProps({ clearable: true, onClearClick: onClear })
      })
      expect(wrapper.find('svg').length).toBe(1)

      wrapper.find('svg').simulate('click', nativeEvent)
      expect(onClear).toBeCalledTimes(1)
      const input = wrapper.find('input').at(0).getDOMNode()
      expect((input as HTMLInputElement).value).toEqual('')
    })

    it('should reset the value when clicked away', async () => {
      const blurHandler = jest.fn()
      const wrapper = mount(
        <AutoComplete
          defaultValue="foo"
          disableFreeSolo
          onBlur={blurHandler}
          options={[{ label: 'foo' }, { label: 'bar' }]}
        />,
      )

      changeTo(wrapper, 'value')
      expect((wrapper.find('input').at(0).getDOMNode() as HTMLInputElement).value).toEqual('value')

      await clickAway(wrapper)
      expect(blurHandler).toBeCalledTimes(1)

      expect((wrapper.find('input').at(0).getDOMNode() as HTMLInputElement).value).toEqual('foo')
    })

    it('should remain blank when clicked away', async () => {
      const wrapper = mount(
        <AutoComplete
          defaultValue="foo"
          disableFreeSolo
          options={[{ label: 'foo' }, { label: 'bar' }]}
        />,
      )

      changeTo(wrapper, '')
      expect((wrapper.find('input').at(0).getDOMNode() as HTMLInputElement).value).toEqual('')

      await clickAway(wrapper)

      expect((wrapper.find('input').at(0).getDOMNode() as HTMLInputElement).value).toEqual('')
    })
  })

  describe('Value controlled', () => {
    it('should be render the controlled value', () => {
      const wrapper = mount(<AutoComplete value="value" />)
      expect((wrapper.find('input').at(0).getDOMNode() as HTMLInputElement).value).toEqual('value')
      wrapper.setProps({ value: 'foo' })
      expect((wrapper.find('input').at(0).getDOMNode() as HTMLInputElement).value).toEqual('foo')
    })

    it('should not set input value by select', () => {
      let wrapper = mount(<AutoComplete variant="solid" value="bar" options={[{ label: 'foo' }]} />)
      wrapper.find('input').at(0).simulate('focus', nativeEvent)
      wrapper.find('.auto-complete-dropdown .item').at(0).simulate('click', nativeEvent)
      expect((wrapper.find('input').at(0).getDOMNode() as HTMLInputElement).value).toEqual('bar')
    })

    it('should not clear the input with prop clearable', async () => {
      const wrapper = mount(<AutoComplete value="value" clearable />)
      wrapper.find('svg').simulate('click', nativeEvent)
      expect((wrapper.find('input').at(0).getDOMNode() as HTMLInputElement).value).toEqual('value')
    })

    it('should not reset input value when clicked away', async () => {
      const wrapper = mount(<AutoComplete value="value" />)

      wrapper.find('input').at(0).simulate('focus', nativeEvent)
      changeTo(wrapper, 'foo')
      expect((wrapper.find('input').at(0).getDOMNode() as HTMLInputElement).value).toEqual('value')

      await clickAway(wrapper)
      expect((wrapper.find('input').at(0).getDOMNode() as HTMLInputElement).value).toEqual('value')
    })
  })

  describe('Open uncontrolled', () => {
    it('should dropdown visible logic should be uncontrolled', async () => {
      // default close
      let wrapper = mount(<AutoComplete options={[{ label: 'foo' }]} />)
      expect(wrapper.find('.auto-complete-dropdown .item').length).toEqual(0)
      // focus to open
      wrapper.find('input').at(0).simulate('focus', nativeEvent)
      expect(wrapper.find('.auto-complete-dropdown .item').length).toEqual(1)
      // click away to close
      await clickAway(wrapper)
      expect(wrapper.find('.auto-complete-dropdown .item').length).toEqual(0)
      // change to open
      changeTo(wrapper, 'bar')
      expect(wrapper.find('.auto-complete-dropdown .item').length).toEqual(1)
      // click away to close
      await clickAway(wrapper)
      expect(wrapper.find('.auto-complete-dropdown .item').length).toEqual(0)
      // click to open
      wrapper.find('input').at(0).simulate('click', nativeEvent)
      expect(wrapper.find('.auto-complete-dropdown .item').length).toEqual(1)
      wrapper.unmount()
    })

    it('should close the dropdown when select', async () => {
      let wrapper = mount(<AutoComplete options={[{ label: 'foo' }]} />)
      wrapper.find('input').at(0).simulate('focus', nativeEvent)
      expect(wrapper.find('.auto-complete-dropdown .item').length).toEqual(1)
      wrapper.find('.auto-complete-dropdown .item').at(0).simulate('click', nativeEvent)
      await updateWrapper(wrapper, 150)
      expect(wrapper.find('.auto-complete-dropdown .item').length).toEqual(0)
    })
  })

  describe('Open controlled', () => {
    it('should remain open', async () => {
      let wrapper = mount(<AutoComplete open options={[{ label: 'foo' }]} />)
      expect(wrapper.find('.auto-complete-dropdown .item').length).toEqual(1)
      await clickAway(wrapper)
      expect(wrapper.find('.auto-complete-dropdown .item').length).toEqual(1)
      wrapper.find('input').at(0).simulate('blur', nativeEvent)
      expect(wrapper.find('.auto-complete-dropdown .item').length).toEqual(1)
      wrapper.setProps({ open: false })
      await updateWrapper(wrapper, 150)
      expect(wrapper.find('.auto-complete-dropdown .item').length).toEqual(0)
      changeTo(wrapper, 'bar')
      expect(wrapper.find('.auto-complete-dropdown .item').length).toEqual(0)
      wrapper.find('input').at(0).simulate('click', nativeEvent)
      expect(wrapper.find('.auto-complete-dropdown .item').length).toEqual(0)
      wrapper.find('input').at(0).simulate('focus', nativeEvent)
      expect(wrapper.find('.auto-complete-dropdown .item').length).toEqual(0)
    })

    it('should not close the dropdown when select', () => {
      let wrapper = mount(<AutoComplete open options={[{ label: 'foo' }]} />)
      wrapper.find('input').at(0).simulate('focus', nativeEvent)
      wrapper.find('.auto-complete-dropdown .item').at(0).simulate('click', nativeEvent)
      expect(wrapper.find('.auto-complete-dropdown .item').length).toEqual(1)
    })
  })
})
