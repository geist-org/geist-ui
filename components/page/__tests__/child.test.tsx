import React from 'react'
import { mount } from 'enzyme'
import { Page } from 'components'

describe('PageChild', () => {
  it('the component Page.Content should be injected automatically', () => {
    const wrapper = mount(<Page>test-value</Page>)
    const content = mount(
      <Page>
        <Page.Content>test-value</Page.Content>
      </Page>,
    )
    expect(wrapper.html()).toEqual(content.html())
  })

  it('should work with child component', () => {
    const wrapper = mount(
      <Page>
        outside string
        <Page.Header>header</Page.Header>
        <Page.Content>content</Page.Content>
        <Page.Footer>Footer</Page.Footer>
        outside string
      </Page>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('the header should be centered', () => {
    const wrapper = mount(<Page.Header center>header</Page.Header>)
    expect(wrapper.find('.center').length).not.toBe(0)
  })
})
