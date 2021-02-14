import React from 'react'
import { mount } from 'enzyme'
import { Table, Code } from 'components'
import { cellActions } from 'components/table/table-cell'
import { nativeEvent, updateWrapper } from 'tests/utils'
import { act } from 'react-dom/test-utils'

const data = [
  { property: 'type', description: 'Content type', default: '-' },
  { property: 'Component', description: 'DOM element to use', default: '-' },
  { property: 'bold', description: 'Bold style', default: 'true' },
]

describe('Table', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Table data={data}>
        <Table.Column prop="property" label="property" />
        <Table.Column prop="description" label="description" />
        <Table.Column prop="default" label="default" />
      </Table>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should re-render when data changed', async () => {
    const wrapper = mount(
      <Table data={data}>
        <Table.Column prop="property" label="property" />
        <Table.Column prop="description" label="description" />
        <Table.Column prop="default" label="default" />
      </Table>,
    )
    expect(wrapper.find('tbody').find('tr').length).toBe(data.length)
    wrapper.setProps({ data: [] })
    await updateWrapper(wrapper, 350)
    expect(wrapper.find('tbody').find('tr').length).toBe(0)
  })

  it('should set width automatically', () => {
    window.getComputedStyle = jest.fn().mockImplementation(() => ({
      width: '100px',
    }))
    const wrapper = mount(
      <Table data={data}>
        <Table.Column prop="property" label="property" />
        <Table.Column prop="description" label="description" />
        <Table.Column prop="default" label="default" width={50} />
      </Table>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
    ;(window.getComputedStyle as jest.Mock).mockClear()
  })

  it('should be no erros when width is too large', () => {
    window.getComputedStyle = jest.fn().mockImplementation(() => ({
      width: '10px',
    }))
    const wrapper = mount(
      <Table data={data}>
        <Table.Column prop="property" label="property" />
        <Table.Column prop="description" label="description" />
        <Table.Column prop="default" label="default" width={50} />
      </Table>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
    ;(window.getComputedStyle as jest.Mock).mockClear()
  })

  it('should work with other components', () => {
    const dataWithNodes = [
      ...data,
      { property: 'bold', description: <Code>boolean</Code>, default: 'true' },
    ]
    const wrapper = mount(
      <Table data={dataWithNodes}>
        <Table.Column prop="property" label="property" />
        <Table.Column prop="description" label="description" />
        <Table.Column prop="default" label="default" />
      </Table>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('code').length).not.toBe(0)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work without hover effect', () => {
    const wrapper = mount(
      <Table data={data} hover={false}>
        <Table.Column prop="property" label="property" />
        <Table.Column prop="description" label="description" />
        <Table.Column prop="default" label="default" />
      </Table>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should be possible to remove the row', () => {
    const operation = (actions: cellActions) => {
      return <button onClick={() => actions.remove()}>Remove</button>
    }
    const data = [{ property: 'bold', description: 'boolean', operation }]
    const wrapper = mount(
      <Table data={data}>
        <Table.Column prop="property" label="property" />
        <Table.Column prop="description" label="description" />
        <Table.Column prop="operation" label="operation" />
      </Table>,
    )
    expect(wrapper.find('tbody').find('tr').length).toBe(1)
    wrapper.find('tbody').find('button').simulate('click')
    expect(wrapper.find('tbody').find('tr').length).toBe(0)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should be possible to update the row', () => {
    const operation = (actions: cellActions) => {
      return (
        <button
          onClick={() =>
            actions.update({ property: 'test', description: 'test', operation })
          }>
          Update
        </button>
      )
    }
    const data = [{ property: 'bold', description: 'boolean', operation }]
    const wrapper = mount(
      <Table data={data}>
        <Table.Column prop="property" label="property" />
        <Table.Column prop="description" label="description" />
        <Table.Column prop="operation" label="operation" />
      </Table>,
    )
    expect(wrapper.find('tbody').find('tr').length).toBe(1)
    wrapper.find('tbody').find('button').simulate('click')
    expect(wrapper.find('tbody').find('tr').find('td').first().text()).toContain('test')
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render emptyText when data missing', () => {
    const data = [{ property: 'bold', description: 'boolean' }]
    const wrapper = mount(
      <Table data={data} emptyText="test-not-found">
        <Table.Column prop="property" label="property" />
        <Table.Column prop="description" label="description" />
        <Table.Column prop="operation" label="operation" />
      </Table>,
    )
    expect(wrapper.find('tbody').text()).toContain('test-not-found')
  })

  it('should trigger events when cell clicked', () => {
    const rowHandler = jest.fn()
    const cellHandler = jest.fn()
    const data = [{ property: 'bold', description: 'boolean' }]
    const wrapper = mount(
      <Table
        data={data}
        emptyText="test-not-found"
        onRow={rowHandler}
        onCell={cellHandler}>
        <Table.Column prop="property" label="property" />
        <Table.Column prop="description" label="description" />
      </Table>,
    )
    wrapper.find('tbody').find('tr').find('td').at(0).simulate('click', nativeEvent)
    expect(rowHandler).toHaveBeenCalled()
    expect(cellHandler).toHaveBeenCalled()
  })

  it('should wraning when prop missing', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    mount(
      <Table data={data}>
        <Table.Column prop="" label="property" />
        <Table.Column prop="description" label="description" />
      </Table>,
    )
    expect(errorSpy).toHaveBeenCalled()
    errorSpy.mockRestore()
  })

  it('should render children for table head', () => {
    const wrapper = mount(
      <Table data={data}>
        <Table.Column prop="property">
          <Code>property</Code>
        </Table.Column>
      </Table>,
    )
    expect(wrapper.find('thead').find('code').length).not.toBe(0)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('the changes of column should be tracked', () => {
    const Mock = ({ label }: { label: string }) => {
      return (
        <Table data={data}>
          <Table.Column prop="description" label={label} />
        </Table>
      )
    }
    const wrapper = mount(<Mock label="test1" />)
    expect(wrapper.find('thead').find('tr').at(0).text()).toBe('test1')

    act(() => {
      wrapper.setProps({ label: 'test2' })
    })
    expect(wrapper.find('thead').find('tr').at(0).text()).toBe('test2')
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('the changes of children should be tracked', () => {
    const Mock = ({ label }: { label: string }) => {
      return (
        <Table data={data}>
          <Table.Column prop="description">{label}</Table.Column>
        </Table>
      )
    }
    const wrapper = mount(<Mock label="test1" />)
    expect(wrapper.find('thead').find('tr').at(0).text()).toBe('test1')

    act(() => {
      wrapper.setProps({ label: 'test2' })
    })
    expect(wrapper.find('thead').find('tr').at(0).text()).toBe('test2')
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
