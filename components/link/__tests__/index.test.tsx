import React from 'react'
import { mount } from 'enzyme'
import { ExternalLink } from '@zeit-ui/react-icons'
import { Link } from 'components'

describe('Link', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <div>
        <Link href="https://react.zeit-ui.co">link</Link>
        <Link href="https://react.zeit-ui.co" underline>
          link
        </Link>
        <Link href="https://react.zeit-ui.co" block>
          link
        </Link>
        <Link href="https://react.zeit-ui.co" disabled>
          link
        </Link>
        <Link href="https://react.zeit-ui.co" plain>
          link
        </Link>
        <Link href="https://react.zeit-ui.co" iconLeft={<ExternalLink />}>
          link
        </Link>
        <Link href="https://react.zeit-ui.co" iconRight={<ExternalLink />}>
          link
        </Link>
        <Link
          href="https://react.zeit-ui.co"
          iconLeft={<ExternalLink />}
          iconRight={<ExternalLink />}>
          link
        </Link>
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should be no errors when href missing', () => {
    const errorSpy = jest.spyOn(console, 'error')
    const wrapper = mount(<Link />)
    expect(errorSpy).not.toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
    errorSpy.mockRestore()
  })

  it('should forward ref', () => {
    let ref = React.createRef<HTMLAnchorElement>()
    const errorSpy = jest.spyOn(console, 'error')
    const wrapper = mount(<Link ref={ref} />)

    expect(errorSpy).not.toHaveBeenCalled()
    expect(ref.current).not.toBeNull()
    expect(() => wrapper.unmount()).not.toThrow()
    errorSpy.mockRestore()
  })

  it('an warning should be thrown when using the pure prop', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const link = mount(<Link pure />)
    expect(errorSpy).toHaveBeenCalled()
    expect(() => link.unmount()).not.toThrow()
    errorSpy.mockRestore()
  })

  it('an info should be shown when using the color prop', () => {
    const errorSpy = jest.spyOn(console, 'info').mockImplementation(() => {})
    const link = mount(<Link color />)
    expect(errorSpy).toHaveBeenCalled()
    expect(() => link.unmount()).not.toThrow()
    errorSpy.mockRestore()
  })

  it('an info should be shown when using the icon prop', () => {
    const errorSpy = jest.spyOn(console, 'info').mockImplementation(() => {})
    const link = mount(<Link icon />)
    expect(errorSpy).toHaveBeenCalled()
    expect(() => link.unmount()).not.toThrow()
    errorSpy.mockRestore()
  })
})
