import React from 'react'
import { mount, render } from 'enzyme'
import { Card } from 'components'

describe('Card', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Card>card</Card>)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should support shadow and hoverable', () => {
    const wrapper = render(
      <div>
        <Card hoverable>card</Card>
        <Card shadow>card</Card>
        <Card shadow hoverable>
          card
        </Card>
      </div>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should support card types', () => {
    const wrapper = mount(
      <div>
        <Card type="secondary">card</Card>
        <Card type="success">card</Card>
        <Card type="violet">card</Card>
        <Card type="lite">card</Card>
        <Card type="cyan">card</Card>
        <Card type="secondary">card</Card>
        <Card type="warning">card</Card>
      </div>,
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render correctly when nested', () => {
    const wrapper = render(
      <Card>
        <Card shadow>
          <Card>card</Card>
        </Card>
      </Card>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('the component Card.Content should be injected automatically', () => {
    const card = mount(<Card>test-value</Card>)
    const content = mount(
      <Card>
        <Card.Content>test-value</Card.Content>
      </Card>,
    )
    expect(card.html()).toEqual(content.html())
  })
})
