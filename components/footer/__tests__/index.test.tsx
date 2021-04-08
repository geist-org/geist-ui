import React from 'react'
import { mount, render } from 'enzyme'
import { Footer, Text } from 'components'

describe('should render basic footer', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Footer>
        <Footer.Group title="Company">
          <Footer.Link href="#">Home</Footer.Link>
        </Footer.Group>
        <Footer.Group title="Product">
          <Footer.Link href="#">Pricing</Footer.Link>
        </Footer.Group>
      </Footer>,
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should support custom breakpoint , maxWidth', () => {
    const wrapper = render(
      <Footer breakPoint="800px" maxWidth="900px">
        <Footer.Group title="Education">
          <Footer.Link href="#">Documentation</Footer.Link>
        </Footer.Group>
        <Footer.Group title="More">
          <Footer.Link href="#">Open Source Software</Footer.Link>
        </Footer.Group>
      </Footer>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should support footer type', () => {
    const wrapper = mount(
      <Footer reverse>
        <Footer.Group title="Education">
          <Footer.Link href="#">Support</Footer.Link>
        </Footer.Group>
        <Footer.Group title="More">
          <Footer.Link href="#">Open Source Software</Footer.Link>
        </Footer.Group>
      </Footer>,
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render subFooter', () => {
    const wrapper = render(
      <Footer reverse subFooter="<h1>Sub-Footer</h1>">
        <Footer.Group title="Education">
          <Footer.Link href="#">Documentation</Footer.Link>
        </Footer.Group>
        <Footer.Group title="More">
          <Footer.Link href="#">Open Source Software</Footer.Link>
        </Footer.Group>
      </Footer>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render multi-group columns', () => {
    const wrapper = render(
      <Footer subFooter={<Text h6>Copyright © Geist React. All rights reserved.</Text>}>
        <Footer.Group title="Product">
          <Footer.Link href="#">Pricing</Footer.Link>
        </Footer.Group>
        <Footer.Column>
          <Footer.Group title="Education">
            <Footer.Link href="#">Documentation</Footer.Link>
          </Footer.Group>
          <Footer.Group title="More">
            <Footer.Link href="#">Open Source Software</Footer.Link>
          </Footer.Group>
        </Footer.Column>
      </Footer>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
