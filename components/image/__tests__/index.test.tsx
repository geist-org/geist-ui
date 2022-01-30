import React from 'react'
import { mount } from 'enzyme'
import { Image } from 'components'
import { updateWrapper } from 'tests/utils'

const url =
  'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA' +
  'AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO' +
  '9TXL0Y4OHwAAAABJRU5ErkJggg=='

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 15 15" fill="none">
      <path d="M12.5 8V7.83333C12.5 7.09695 11.903 6.5 11.1667 6.5H10C9.17157 6.5 8.5 7.17157 8.5 8C8.5 8.82843 9.17157 9.5 10 9.5H11C11.8284 9.5 12.5 10.1716 12.5 11C12.5 11.8284 11.8284 12.5 11 12.5H10C9.17157 12.5 8.5 11.8284 8.5 11M8 6.5H3M5.5 6.5V13M0.5 0.5H14.5V14.5H0.5V0.5Z" stroke="black"/></svg>`

describe('Image', () => {
  it('should render correctly', async () => {
    let wrapper = mount(<Image src={url} />)
    expect(wrapper).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()

    wrapper = mount(<Image src={url} width={20} height={20} />)
    wrapper.find('img').at(0).simulate('load')
    expect(wrapper).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()

    wrapper = mount(<Image src={url} width={20} height={20} disableSkeleton />)
    wrapper.find('img').at(0).simulate('load')
    expect(wrapper).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render correctly with svg string', () => {
    let wrapper = mount(<Image src={svg} />)
    expect(wrapper).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()

    wrapper = mount(<Image src={svg} width={20} height={20} />)
    wrapper.find('img').at(0).simulate('load')
    expect(wrapper).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()

    wrapper = mount(<Image src={svg} width={20} height={20} disableSkeleton />)
    wrapper.find('img').at(0).simulate('load')
    expect(wrapper).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work correctly with skeleton', async () => {
    let wrapper = mount(<Image src={url} width={20} height={20} />)
    expect(wrapper.find('.skeleton').length).not.toBe(0)

    wrapper = mount(<Image src={url} width={20} height={20} />)
    wrapper.find('img').at(0).simulate('load')
    await updateWrapper(wrapper)
    expect(wrapper.find('.skeleton').length).not.toBe(0)

    wrapper = mount(<Image src={url} width={20} />)
    expect(wrapper.find('.skeleton').length).toBe(0)

    mount(<Image src={url} width={20} height={20} disableSkeleton />)
    expect(wrapper.find('.skeleton').length).toBe(0)
  })

  it('should remove skeleton when timeout', async () => {
    const animation = mount(<Image src={url} width={20} height={20} maxDelay={100} />)
    const NoAnimation = mount(
      <Image src={url} width={20} height={20} maxDelay={100} disableSkeleton />,
    )
    expect(animation.find('.skeleton').length).not.toBe(0)
    await updateWrapper(animation, 300)
    await updateWrapper(NoAnimation, 300)
    expect(animation.find('.skeleton').length).toBe(0)
    expect(NoAnimation.find('.skeleton').length).toBe(0)
  })

  it('should remove skeleton when image completed', async () => {
    Object.defineProperty((global as any).Image.prototype, 'complete', {
      get() {
        return true
      },
    })
    const wrapper = mount(<Image src={url} width={20} height={20} />)
    const img = wrapper.find('img').at(0)
    img.simulate('load')
    await updateWrapper(wrapper)
    expect((img.getDOMNode() as HTMLImageElement).complete).toEqual(true)
    expect(wrapper.find('.skeleton').length).toBe(0)
  })
})
