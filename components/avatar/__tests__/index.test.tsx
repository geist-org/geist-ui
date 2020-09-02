import React from 'react'
import { mount, render, shallow } from 'enzyme'
import { Avatar } from 'components'

describe('Avatar', () => {
  it('should support square and circle', () => {
    const circle = shallow(<Avatar />)
    expect(() => circle.unmount()).not.toThrow()
    const square = shallow(<Avatar isSquare />)
    expect(() => square.unmount()).not.toThrow()
  })

  it('should render text element', () => {
    const imageAvatar = render(<Avatar />)
    expect(imageAvatar).toMatchSnapshot()
    const textAvatar = render(<Avatar text="text" />)
    expect(textAvatar).toMatchSnapshot()
  })

  it('should omit long chars automatically', () => {
    const avatar = mount(<Avatar text="texttexttexttext" />)
    const text = avatar.find('.avatar-text').text()
    expect(text.length).toBeLessThan(4)
  })

  it('stacked should be work', () => {
    const avatar = shallow(<Avatar src="/images/avatar.png" stacked />)
    expect(() => avatar.unmount()).not.toThrow()
  })

  it('should render component of a specified size', () => {
    const avatar = render(<Avatar size={20} />)
    expect(avatar).toMatchSnapshot()
  })

  it('group component should render all children', () => {
    const group = mount(
      <Avatar.Group>
        <Avatar />
        <Avatar />
      </Avatar.Group>,
    )
    expect(group.find('.avatar')).toHaveLength(2)
  })

  it('should stacked when avatars are in a group', () => {
    const group = render(
      <Avatar.Group>
        <Avatar />
        <Avatar />
      </Avatar.Group>,
    )
    expect(group).toMatchSnapshot()
  })

  it('should show count in group', () => {
    const count = 20
    const group = shallow(<Avatar.Group count={count} />)
    const text = group.find('.count').text()
    expect(text).toContain(count)
  })
})
