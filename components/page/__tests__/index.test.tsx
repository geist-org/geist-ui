import React from 'react'
import ReactDom from 'react-dom/server'
import { mount } from 'enzyme'
import { Page, GeistProvider } from 'components'

describe('Page', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Page>test-value</Page>)
    expect(wrapper.text()).toContain('test-value')
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('the first page should not contain content', () => {
    const html = ReactDom.renderToString(<Page render="effect">test-value</Page>)
    expect(html).not.toContain('test-value')

    const wrapper = mount(<Page render="effect">test-value</Page>)
    expect(wrapper.html()).toContain('test-value')
  })

  it('the first page should contain seo string', () => {
    const html = ReactDom.renderToString(<Page render="effect-seo">test-value</Page>)
    expect(html).toContain('test-value')
    expect(html).toContain('hidden')

    const wrapper = mount(<Page render="effect">test-value</Page>)
    expect(wrapper.html()).toContain('test-value')
  })

  it('should work with different size', () => {
    const wrapper = mount(
      <div>
        <Page size="mini" />
        <Page size="small" />
        <Page size="large" />
        <Page size="100%" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('the global styles should be added to body element', () => {
    const wrapper = mount(<Page dotBackdrop />)
    expect(wrapper.html()).toContain('global(body)')
  })

  it('should disable dot style when in dark mode', () => {
    const wrapper = mount(
      <GeistProvider themeType="dark">
        <Page dotBackdrop />
      </GeistProvider>,
    )
    expect(wrapper.html()).not.toContain('global(body)')
  })
})
