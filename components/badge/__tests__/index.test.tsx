import React from 'react'
import { mount, render, shallow } from 'enzyme'
import Badge from '../badge'

describe('Badge', () => {
  it('should supoort text', () => {
    const html = render(<Badge>count</Badge>)
    expect(html).toMatchSnapshot()
    const badge = mount(<Badge>count</Badge>)
    expect(() => badge.unmount()).not.toThrow()
  })
  
  it('should support baisc sizes', () => {
    const mini = shallow(<Badge size="mini">mini</Badge>)
    expect(() => mini.unmount()).not.toThrow()
  
    const small = shallow(<Badge size="small">small</Badge>)
    expect(() => small.unmount()).not.toThrow()
  
    const medium = shallow(<Badge size="medium">medium</Badge>)
    expect(() => medium.unmount()).not.toThrow()
  
    const large = shallow(<Badge size="large">large</Badge>)
    expect(() => large.unmount()).not.toThrow()
  })
  
  it('should re-render when size changed', () => {
    const badge = mount(<Badge>size</Badge>)
    badge.setProps({ size: 'small' })
    expect(badge).toMatchSnapshot()
  
    badge.setProps({ size: 'mini' })
    expect(badge).toMatchSnapshot()
  })
  
  it('should render different types', () => {
    const wrapper = render(
      <div>
        <Badge type="success">badge</Badge>
        <Badge type="secondary">badge</Badge>
        <Badge type="warning">badge</Badge>
        <Badge type="error">badge</Badge>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })
  
  it('should overwrite style by inline-style', () => {
    const badge = mount(<Badge style={{ background: 'white' }} type="success">badge</Badge>)
    const span = badge.find('span')
    expect(span).not.toBeUndefined()
    expect(span.props().style).not.toBeUndefined()
    expect((span.props().style as any).background).toBe('white')
  })
  
  it('should hide content when in dot mode', () => {
    const wrapper = mount(<Badge dot>test-value</Badge>)
    expect(wrapper.html()).not.toContain('test-value')
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
