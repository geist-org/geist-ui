import Table from '../'
import { ColumnsType } from '../table'
import { mount } from 'enzyme'
import React, { useState } from 'react'
import { nativeEvent } from 'tests/utils'

describe('Table', () => {
  it('should render correctly', () => {
    interface Record {
      key?: string | number
      a?: string | number
      b?: string | number
      c?: string | number
      d?: string | number
    }

    const columns: ColumnsType<Record> = [
      { title: 'title1', dataIndex: 'a', key: 'a', width: 100 },
      { title: 'title2', dataIndex: 'b', key: 'b', width: 100, align: 'right' },
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
    const data: Record[] = [
      { a: '123', key: '1' },
      { a: 'cdd', b: 'edd', key: '2' },
      { a: '1333', c: 'eee', d: 2, key: '3' },
    ]

    const wrapper = mount(
      <div>
        <Table<Record> variant="line" columns={columns} data={data} />
        <Table<Record> columns={columns} data={data} />
        <Table<Record> columns={columns} data={data} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render expandAble table correctly', () => {
    interface Record {
      key?: string | number
      a?: string | number
      b?: string | number
      c?: string | number
      d?: string | number
    }

    const MockTable = () => {
      const tableData = [
        { key: 0, a: '123' },
        { key: 1, a: 'cdd', b: 'edd' },
        { key: 2, a: '1333', c: 'eee', d: 2 },
      ]
      const [data] = useState(tableData)
      const columns = [
        { title: 'title 1', dataIndex: 'a', key: 'a', width: 100 },
        { title: 'title 2', dataIndex: 'b', key: 'b', width: 100 },
        { title: 'title 3', dataIndex: 'c', key: 'c', width: 200 },
      ]

      const rowExpandable = (record: Record) => record.key !== 1

      return (
        <div>
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record, _, __, expanded) =>
                expanded ? <p id="test-expandable-row">extra: {record.a}</p> : null,
              rowExpandable,
            }}
            data={data}
          />
          <Table
            variant="line"
            columns={columns}
            expandable={{
              expandedRowRender: (record, _, __, expanded) =>
                expanded ? <p>extra: {record.a}</p> : null,
              rowExpandable,
            }}
            data={data}
          />
        </div>
      )
    }

    const wrapper = mount(<MockTable />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('#test-expandable-row').length).toEqual(0)
    wrapper.find('button.table-row-expand-icon').at(0).simulate('click', nativeEvent)
    expect(wrapper.find('#test-expandable-row').length).toEqual(1)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
