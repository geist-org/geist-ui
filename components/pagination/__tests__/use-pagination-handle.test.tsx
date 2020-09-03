import React, { useEffect } from 'react'
import { mount } from 'enzyme'
import Pagination from '../'
import { updateWrapper } from 'tests/utils'

describe('usePaginationHanlde', () => {
  it('should follow setPage with use-imperative-pagination', async () => {
    const MockPagination: React.FC<{ page?: number }> = ({ page }) => {
      const { setPage, ref } = Pagination.usePaginationHandle()
      useEffect(() => {
        if (page !== undefined) setPage(page)
      }, [page])
      return <Pagination ref={ref} total={100}></Pagination>
    }

    const wrapper = mount(<MockPagination />)
    wrapper.setProps({ page: 2 })
    await updateWrapper(wrapper, 300)
    expect(wrapper.find('.active').text()).toEqual('2')

    wrapper.setProps({ page: 3 })
    await updateWrapper(wrapper, 500)
    expect(wrapper.find('.active').text()).toEqual('3')
  })

  it('should follow getPage with use-imperative-pagination', async () => {
    let currentPage = 0
    jest.spyOn(console, 'log').mockImplementation(msg => (currentPage = msg))
    const MockPagination: React.FC<{ page?: number }> = ({ page }) => {
      const { getPage, ref } = Pagination.usePaginationHandle()
      useEffect(() => {
        setTimeout(() => console.log(getPage()), 0)
      }, [page])
      return <Pagination ref={ref} total={100}></Pagination>
    }

    const wrapper = mount(<MockPagination />)
    await updateWrapper(wrapper, 300)
    expect(currentPage).toEqual(1)
  })

  it('should follow setPageSize with use-imperative-pagination', async () => {
    const MockPagination: React.FC<{ pageSize?: number }> = ({ pageSize }) => {
      const { setPageSize, ref } = Pagination.usePaginationHandle()
      useEffect(() => {
        if (pageSize !== undefined) setPageSize(pageSize)
      }, [pageSize])
      return <Pagination ref={ref} total={100}></Pagination>
    }

    const wrapper = mount(<MockPagination />)
    wrapper.setProps({ pageSize: 20 })
    await updateWrapper(wrapper, 300)
    const btns = wrapper.find('button')
    expect(btns.length).toEqual(7)
  })

  it('should follow getPageSize with use-imperative-pagination', async () => {
    let currentPageSize = 0
    jest.spyOn(console, 'log').mockImplementation(msg => (currentPageSize = msg))
    const MockPagination: React.FC<{ pageSize?: number }> = ({ pageSize }) => {
      const { getPageSize, ref } = Pagination.usePaginationHandle()
      useEffect(() => {
        setTimeout(() => console.log(getPageSize()), 0)
      }, [pageSize])
      return <Pagination ref={ref} total={100}></Pagination>
    }

    const wrapper = mount(<MockPagination />)
    await updateWrapper(wrapper, 300)
    expect(currentPageSize).toEqual(10)
  })
})
