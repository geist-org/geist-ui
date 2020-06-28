import React from 'react'
import { mount } from 'enzyme'
import { Pagination } from 'components'
import { act } from 'react-dom/test-utils'
import { updateWrapper } from 'tests/utils'

describe('Pagination', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Pagination />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('the specified page should be activated', async () => {
    const wrapper = mount(<Pagination count={10} initialPage={2} />)
    expect(wrapper.find('.active').text()).toEqual('2')
    await act(async () => {
      wrapper.setProps({ page: 10 })
    })
    await updateWrapper(wrapper, 200)
    expect(wrapper.find('.active').text()).toEqual('10')
  })

  it('should trigger change event', async () => {
    let current = 1
    const handler = jest.fn().mockImplementation(val => (current = val))
    const wrapper = mount(<Pagination count={10} initialPage={2} onChange={handler} />)

    await act(async () => {
      wrapper.setProps({ page: 10 })
    })
    await updateWrapper(wrapper, 200)
    expect(handler).toHaveBeenCalled()
    expect(current).toEqual(10)

    const btns = wrapper.find('button')
    btns.at(0).simulate('click')
    await updateWrapper(wrapper, 200)
    expect(current).toEqual(9)

    btns.at(btns.length - 1).simulate('click')
    btns.at(btns.length - 1).simulate('click')
    btns.at(btns.length - 1).simulate('click')
    btns.at(btns.length - 1).simulate('click')
    await updateWrapper(wrapper, 200)
    expect(current).toEqual(10)
    handler.mockRestore()
  })

  it('the page should be rendered to follow the specified limit', async () => {
    const wrapper = mount(<Pagination count={20} limit={20} />)
    expect(wrapper.find('button').length).toBeGreaterThanOrEqual(20)
    await act(async () => {
      wrapper.setProps({ limit: 5 })
    })
    await updateWrapper(wrapper, 200)
    expect(wrapper.find('button').length).toBeLessThanOrEqual(10)
  })

  it('should be render all pages when limit is greater than the total', async () => {
    const handler = jest.fn()
    const wrapper = mount(<Pagination count={15} limit={40} onChange={handler} />)
    expect(wrapper.find('button').length).toBeGreaterThanOrEqual(15)
    wrapper.find('button').at(10).simulate('click')
    await updateWrapper(wrapper, 200)

    expect(handler).toHaveBeenCalled()
    handler.mockRestore()
  })

  it('omit pages by limit value', async () => {
    const wrapper = mount(<Pagination count={20} limit={5} />)
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
    const handler = jest.fn().mockImplementation(val => (current = val))
    const wrapper = mount(<Pagination count={20} initialPage={20} onChange={handler} />)
    const btn = wrapper.find('svg').at(0).parents('button')
    btn.at(0).simulate('click')
    await updateWrapper(wrapper, 200)
    expect(handler).toHaveBeenCalled()
    expect(current).toEqual(15)

    await act(async () => {
      wrapper.setProps({ page: 1 })
    })
    await updateWrapper(wrapper, 200)
    const lastBtn = wrapper.find('svg').at(0).parents('button')
    lastBtn.at(0).simulate('click')
    await updateWrapper(wrapper, 200)
    expect(current).toEqual(1 + 5)
  })

  it('another SVG should be displayed when the mouse is moved in', async () => {
    const wrapper = mount(<Pagination count={20} initialPage={20} />)
    const svg = wrapper.find('svg').at(0)
    const btn = svg.parents('button')

    const html = svg.html()
    btn.simulate('mouseEnter')
    await updateWrapper(wrapper)
    expect(html).not.toEqual(wrapper.find('svg').at(0).html())

    btn.simulate('mouseLeave')
    await updateWrapper(wrapper)
    expect(html).toEqual(wrapper.find('svg').at(0).html())
  })

  it('custom buttons should be display', () => {
    const wrapper = mount(
      <Pagination count={20}>
        <Pagination.Previous>custom-prev</Pagination.Previous>
        <Pagination.Next>custom-next</Pagination.Next>
      </Pagination>,
    )
    const btns = wrapper.find('button')
    expect(btns.at(0).text()).toEqual('custom-prev')
    expect(btns.at(btns.length - 1).text()).toEqual('custom-next')
  })
})
