import Table from '../'
import { mount } from 'enzyme'
import React from 'react'
import { nativeEvent } from 'tests/utils'

describe('Table', () => {
  it('should render correctly', () => {
    const columns = [
      { title: 'title1', dataIndex: 'a', key: 'a', width: 100 },
      { id: '123', title: 'title2', dataIndex: 'b', key: 'b', width: 100, align: 'right' },
      { title: 'title3', dataIndex: 'c', key: 'c', width: 200 },
      {
        title: 'Operations',
        dataIndex: '',
        key: 'd',
        render(_, record) {
          return (
            <a
              onClick={e => {
                e.preventDefault()
                console.log('Operate on:', record)
              }}
              href="#">
              Operations
            </a>
          )
        },
      },
    ]
    const data = [
      { a: '123', key: '1' },
      { a: 'cdd', b: 'edd', key: '2' },
      { a: '1333', c: 'eee', d: 2, key: '3' },
    ]
    const wrapper = mount(
      <div>
        <Table columns={columns} data={data} />
        <Table variant="solid" columns={columns} data={data} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
  })
})
