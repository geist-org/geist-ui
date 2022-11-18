import React from 'react'
import { mount } from 'enzyme'
import { Box } from 'components'

describe('Button', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Box>Box</Box>)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render as the provided element', async () => {
    const wrapper = mount(
      <Box as="a" href="https://geist.com">
        Box
      </Box>,
    )

    expect(wrapper.exists('a[href="https://geist.com"]')).toBe(true)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render with provided styles', async () => {
    document.body.innerHTML = '<div id="root"></div>'
    const wrapper = mount(
      <Box px="2rem" w="300px" h="100px" my="2rem">
        Box
      </Box>,
      {
        attachTo: document.querySelector('#root') as HTMLDivElement,
      },
    )

    expect(wrapper.find('div').getDOMNode()).toHaveStyle({
      display: 'block',
      lineHeight: '100px',
      fontSize: 'calc(1 * 16px)',
      width: '300px',
      height: '100px',
      margin: '2rem 0px 2rem 0px',
      visibility: 'visible',
      padding: '0px 2rem 0px 2rem',
    })
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('filter out scale related props', () => {
    const wrapper = mount(<Box px="2rem">Box</Box>)

    expect(wrapper.exists('div')).toBe(true)
    expect(wrapper.getDOMNode().hasAttribute('px')).toBe(false)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should forward the provided ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    const wrapper = mount(<Box ref={ref}>Box</Box>)
    expect(wrapper.find('div').getDOMNode()).toEqual(ref.current)
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
