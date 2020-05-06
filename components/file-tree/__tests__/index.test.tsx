import React from 'react'
import { mount } from 'enzyme'
import { Tree } from 'components'
import { nativeEvent } from 'tests/utils'
import { FileTreeValue } from 'components/file-tree/tree'

const mockFiles: Array<FileTreeValue> = [
  {
    type: 'file',
    name: 'cs.js',
  },
  {
    type: 'directory',
    name: 'bin',
    files: [
      {
        type: 'file',
        name: 'cs.js',
      },
    ],
  },
  {
    type: 'directory',
    name: 'docs',
    files: [
      {
        type: 'file',
        name: 'controllers.md',
      },
      {
        type: 'file',
        name: 'es6.md',
      },
      {
        type: 'file',
        name: 'production.md',
      },
      {
        type: 'file',
        name: 'views.md',
      },
    ],
  },
  {
    type: 'file',
    name: 'views.md',
  },
]

describe('Tree', () => {
  it('should mount correctly', () => {
    const wrapper = mount(
      <Tree>
        <Tree.File name="package.json" />
        <Tree.Folder name="components">
          <Tree.File name="layout.js" />
          <Tree.File name="header.js" />
        </Tree.Folder>
        <Tree.File name="readme.md" />
      </Tree>,
    )
    expect(<Tree.File name="package.json" />).toMatchSnapshot()
    expect(<Tree.Folder name="components" />).toMatchSnapshot()
    expect(wrapper).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should show extra messages', () => {
    const files = mockFiles.map(item => ({ ...item, extra: 'extra' }))
    const wrapper = mount(<Tree value={files} />)
    const firstName = wrapper.find('.name').at(0)
    expect(firstName.text()).toContain('extra')
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should trigger event when file clicked', () => {
    const callback = jest.fn()
    const wrapper = mount(<Tree value={mockFiles} onClick={callback} />)
    wrapper.find('.file').at(0).simulate('click', nativeEvent)
    expect(callback).toHaveBeenCalled()
  })

  it('should be work when value is empty', () => {
    const wrapper = mount(<Tree value={[]} />)
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
