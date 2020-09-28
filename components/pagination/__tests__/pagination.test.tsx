import React from 'react'
import { mount } from 'enzyme'
import { Pagination } from 'components'
import { act } from 'react-dom/test-utils'
import { updateWrapper, nativeEvent } from 'tests/utils'
// @ts-ignore
import mediaQuery from 'css-mediaquery'

const mediaListMock = (width: number) => {
  ;(window as any).listeners = [] as Array<Function>
  return (query: string) => {
    return {
      matches: mediaQuery.match(query, { width }),
      addListener: (fn: Function) => (window as any).listeners.push(fn),
      removeListener: () => {},
    }
  }
}

describe('Pagination', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Pagination total={50} />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should set pageSize', () => {
    const wrapper = mount(<Pagination total={50} pageSize={12} />)
    expect(wrapper.html()).toMatchSnapshot()
    const btns = wrapper.find('button')
    expect(btns.length).toEqual(7)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('the specified page should be activated', async () => {
    const wrapper = mount(<Pagination total={100} defaultPage={2} />)
    expect(wrapper.find('.active').text()).toEqual('2')
    await act(async () => {
      wrapper.setProps({ page: 10 })
    })
    await updateWrapper(wrapper, 200)
    expect(wrapper.find('.active').text()).toEqual('10')
  })

  it('should trigger change event when click the prev button', async () => {
    let current = 0
    const handler = jest.fn().mockImplementation(val => (current = val))
    const wrapper = mount(<Pagination total={100} defaultPage={10} onPageChange={handler} />)
    const btns = wrapper.find('button')
    btns.at(0).simulate('click')
    expect(handler).toHaveBeenCalled()
    await updateWrapper(wrapper, 200)
    expect(current).toEqual(9)
    handler.mockRestore()
  })

  it('should trigger change event when click the next button', async () => {
    let current = 0
    const handler = jest.fn().mockImplementation(val => (current = val))
    const wrapper = mount(<Pagination total={100} defaultPage={2} onPageChange={handler} />)
    const btns = wrapper.find('button')
    btns.at(btns.length - 1).simulate('click')
    await updateWrapper(wrapper, 200)
    expect(current).toEqual(3)
    handler.mockRestore()
  })

  it('should disabled when the current is last', async () => {
    let current = 1
    const handler = jest.fn().mockImplementation(val => (current = val))
    const wrapper = mount(<Pagination total={100} defaultPage={2} onPageChange={handler} />)
    await act(async () => {
      wrapper.setProps({ page: 10 })
    })
    const btns = wrapper.find('button')
    btns.at(btns.length - 1).simulate('click')
    await updateWrapper(wrapper, 200)
    expect(current).toEqual(1)
    handler.mockRestore()
  })

  it('the page should be rendered to follow the specified limit', async () => {
    const wrapper = mount(<Pagination total={200} limit={20} />)
    expect(wrapper.find('button').length).toBeGreaterThanOrEqual(20)
    await act(async () => {
      wrapper.setProps({ limit: 5 })
    })
    await updateWrapper(wrapper, 200)
    expect(wrapper.find('button').length).toBeLessThanOrEqual(8)
  })

  it('should be render all pages when limit is greater than the total', async () => {
    const handler = jest.fn()
    const wrapper = mount(<Pagination total={150} limit={40} onPageChange={handler} />)
    expect(wrapper.find('button').length).toBeGreaterThanOrEqual(15)
    wrapper.find('button').at(10).simulate('click')
    await updateWrapper(wrapper, 200)
    expect(handler).toHaveBeenCalled()
    handler.mockRestore()
  })

  it('omit pages by limit value', async () => {
    const wrapper = mount(<Pagination total={200} limit={5} />)
    const btn4 = wrapper.find('button').at(4)
    expect(btn4.text()).toEqual('4')
    btn4.simulate('click')
    await updateWrapper(wrapper, 200)
    let btns = wrapper.find('button').map(btn => btn.text())
    expect(btns.includes('2')).not.toBeTruthy()
    expect(btns.includes('1')).toBeTruthy()
    expect(btns.includes('3')).toBeTruthy()
    expect(btns.includes('4')).toBeTruthy()
    expect(btns.includes('5')).toBeTruthy()
    expect(btns.includes('6')).not.toBeTruthy()
    expect(btns.includes('20')).toBeTruthy()

    const btn5 = wrapper.find('button').at(5)
    expect(btn5.text()).toEqual('5')
    btn5.simulate('click')
    await updateWrapper(wrapper, 200)
    btns = wrapper.find('button').map(btn => btn.text())
    expect(btns.includes('1')).toBeTruthy()
    expect(btns.includes('2')).not.toBeTruthy()
    expect(btns.includes('3')).not.toBeTruthy()
    expect(btns.includes('4')).toBeTruthy()
    expect(btns.includes('5')).toBeTruthy()
    expect(btns.includes('6')).toBeTruthy()
    expect(btns.includes('7')).not.toBeTruthy()
    expect(btns.includes('8')).not.toBeTruthy()
    expect(btns.includes('20')).toBeTruthy()
  })

  it('should trigger change event when ellipsis clicked', async () => {
    let current = 20
    const handler = jest.fn().mockImplementation(val => {
      current = val
    })
    const wrapper = mount(<Pagination total={200} defaultPage={10} onPageChange={handler} />)
    const btn = wrapper.find('svg').at(1).parents('button')
    btn.at(0).simulate('click', nativeEvent)
    await updateWrapper(wrapper, 200)
    expect(handler).toHaveBeenCalled()
    expect(current).toEqual(5)
  })

  it('should set the current page to first page when before-ellipsis clicked multiple times', async () => {
    let current = 11
    const handler = jest.fn().mockImplementation(val => {
      current = val
    })
    const wrapper = mount(<Pagination total={200} defaultPage={10} onPageChange={handler} />)
    const btn = wrapper.find('svg').at(1).parents('button')
    btn.at(0).simulate('click', nativeEvent)
    await updateWrapper(wrapper, 200)
    expect(handler).toHaveBeenCalled()
    expect(current).toEqual(5)
    btn.at(0).simulate('click', nativeEvent)
    await updateWrapper(wrapper, 200)
    expect(handler).toHaveBeenCalled()
    expect(current).toEqual(1)
  })

  it('should set the current page to last page when after-ellipsis clicked multiple times', async () => {
    let current = 1
    const handler = jest.fn().mockImplementation(val => {
      current = val
    })
    const wrapper = mount(<Pagination total={200} defaultPage={11} onPageChange={handler} />)
    const lastBtn = wrapper.find('svg').at(2).parents('button')
    lastBtn.at(0).simulate('click', nativeEvent)
    await updateWrapper(wrapper, 200)
    expect(handler).toHaveBeenCalled()
    expect(current).toEqual(16)
    lastBtn.at(0).simulate('click', nativeEvent)
    await updateWrapper(wrapper, 200)
    expect(handler).toHaveBeenCalled()
    expect(current).toEqual(20)
  })

  it('another SVG should be displayed when the mouse is moved in', async () => {
    const wrapper = mount(<Pagination total={200} defaultPage={20} />)
    const svg = wrapper.find('svg').at(1)
    const btn = svg.parents('button')

    const html = svg.html()
    btn.simulate('mouseEnter')
    await updateWrapper(wrapper)
    expect(html).not.toEqual(wrapper.find('svg').at(1).html())

    btn.simulate('mouseLeave')
    await updateWrapper(wrapper)
    expect(html).toEqual(wrapper.find('svg').at(1).html())
  })

  it('custom buttons should be display', () => {
    const wrapper = mount(
      <Pagination total={200}>
        <Pagination.Previous>custom-prev</Pagination.Previous>
        <Pagination.Next>custom-next</Pagination.Next>
      </Pagination>,
    )
    const btns = wrapper.find('button')
    expect(btns.at(0).text()).toEqual('custom-prev')
    expect(btns.at(btns.length - 1).text()).toEqual('custom-next')
  })

  /**
   * tests for sub component: quickjumper
   */
  it('should work with showQuickJumper', async () => {
    const wrapper = mount(<Pagination total={200} showQuickJumper />)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should no change when you trigger other events', async () => {
    let current = 2
    const onChangehandler = jest.fn().mockImplementation(val => (current = val))
    const wrapper = mount(
      <Pagination defaultPage={2} total={200} onPageChange={onChangehandler} showQuickJumper />,
    )
    await updateWrapper(wrapper, 200)
    let input = wrapper.find('input').getDOMNode() as HTMLInputElement
    input.value = '5'
    wrapper.find('input').at(0).simulate('keydown', { keyCode: 38 })
    expect(current).toEqual(2)
  })

  it('should no change when you type a non-integer value', async () => {
    let current = 3
    const onChangehandler = jest.fn().mockImplementation(val => (current = val))
    const wrapper = mount(
      <Pagination defaultPage={2} total={200} onPageChange={onChangehandler} showQuickJumper />,
    )
    await updateWrapper(wrapper, 200)
    let input = wrapper.find('input').getDOMNode() as HTMLInputElement
    input.value = 'test'
    wrapper.find('input').at(0).simulate('blur', nativeEvent)
    // expect(onChangehandler).toHaveBeenCalled()
    expect(current).toEqual(3)
    expect(input.value).toEqual('')
  })

  it('should no change when you type a null value', async () => {
    let current = 3
    const onChangehandler = jest.fn().mockImplementation(val => (current = val))
    const wrapper = mount(
      <Pagination defaultPage={2} total={200} onPageChange={onChangehandler} showQuickJumper />,
    )
    await updateWrapper(wrapper, 200)
    let input = wrapper.find('input').getDOMNode() as HTMLInputElement
    input.value = ''
    wrapper.find('input').at(0).simulate('blur', nativeEvent)
    expect(current).toEqual(3)
    expect(input.value).toEqual('')
  })

  it('should trigger change event when you type a page number', async () => {
    let current = ''
    const handler = jest.fn().mockImplementation(val => (current = val))
    const wrapper = mount(<Pagination total={200} onPageChange={handler} showQuickJumper />)
    let input = wrapper.find('input').getDOMNode() as HTMLInputElement
    input.value = '5'
    wrapper.find('input').at(0).simulate('blur', nativeEvent)
    expect(handler).toHaveBeenCalled()
    expect(current).toEqual(5)
  })

  it('should set the page to max page  when you type a page  greater than the max page', async () => {
    let current = ''
    const handler = jest.fn().mockImplementation(val => (current = val))
    const wrapper = mount(
      <Pagination defaultPage={19} total={200} onPageChange={handler} showQuickJumper />,
    )
    let input = wrapper.find('input').getDOMNode() as HTMLInputElement
    input.value = '21'
    wrapper.find('input').at(0).simulate('blur', nativeEvent)
    expect(handler).toHaveBeenCalled()
    expect(current).toEqual(20)
  })

  /**
   * tests for sub component: pageSizeChanger
   */
  it('should work with pageSizeChanger', async () => {
    const wrapper = mount(<Pagination total={200} showPageSizeChanger />)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should trigger onPageSizeChange event ', async () => {
    let value
    const pageSizeChangeHandler = jest.fn().mockImplementation((page, pageSize) => {
      value = pageSize
    })
    const wrapper = mount(
      <Pagination total={200} showPageSizeChanger onPageSizeChange={pageSizeChangeHandler} />,
    )
    wrapper.find('.select').simulate('click', nativeEvent)
    wrapper.find('.select-dropdown').find('.option').at(1).simulate('click', nativeEvent)
    await updateWrapper(wrapper, 350)
    expect(pageSizeChangeHandler).toHaveBeenCalled()
    expect(value).toEqual(20)
  })

  it('should set the new current val to current page when you change the pageSize val', async () => {
    let pageSizeVal
    let pageVal
    const pageSizeChangeHandler = jest.fn().mockImplementation((page, pageSize) => {
      pageVal = page
      pageSizeVal = pageSize
    })
    const changeHandler = jest.fn().mockImplementation(val => {
      pageVal = val
    })
    const wrapper = mount(
      <Pagination
        total={200}
        defaultPage={20}
        onPageSizeChange={pageSizeChangeHandler}
        onPageChange={changeHandler}
        showPageSizeChanger
      />,
    )
    wrapper.find('.select').simulate('click', nativeEvent)
    wrapper.find('.select-dropdown').find('.option').at(1).simulate('click', nativeEvent)
    await updateWrapper(wrapper, 350)
    expect(pageSizeChangeHandler).toHaveBeenCalled()
    expect(pageSizeVal).toEqual(20)
    expect(pageVal).toEqual(10)
  })

  it('should set pageSize value to default value of pageSizeOptions', async () => {
    const wrapper = mount(<Pagination total={200} pageSize={8} showPageSizeChanger />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.value').text()).toContain('8')
  })

  it('should set string value to dropdownlist', async () => {
    const wrapper = mount(
      <Pagination total={200} pageSizeOptions={['test1', 'test2']} showPageSizeChanger />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.value').text()).toContain('10')
    wrapper.find('.select').simulate('click', nativeEvent)
    const options = wrapper.find('.select-dropdown').find('.option')
    expect(options.at(0).text().includes('test1')).toBeTruthy
    expect(
      options
        .at(options.length - 1)
        .text()
        .includes('10'),
    ).toBeTruthy
  })
})

describe('pagination on mobile', () => {
  beforeAll(() => {
    ;(window as any).matchMedia = mediaListMock(500)
  })

  it('should render correctly on mobile', async () => {
    const wrapper = mount(<Pagination total={200} showQuickJumper simple />)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
