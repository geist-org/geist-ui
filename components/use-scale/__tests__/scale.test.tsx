import React from 'react'
import useScale, { ScaleProps, ScaleConfig, withScale } from '../index'
import { renderHook } from '@testing-library/react-hooks'
import { mount } from 'enzyme'

const BaseComponent: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <div>{children}</div>
)
const ScaleComponent = withScale(BaseComponent)

describe('UseScale', () => {
  it('should work correctly', () => {
    const { result } = renderHook<void, ScaleConfig>(() => useScale())
    const { SCALES, getScaleProps } = result.current
    expect(typeof SCALES).toEqual('object')
    expect(typeof getScaleProps).toEqual('function')
    expect(getScaleProps('font')).toBeUndefined()
    expect(SCALES.font(1)).not.toBeUndefined()
  })

  it('should work correctly with HOC', () => {
    const wrapper: React.FC<{ width: string }> = ({ width, children }) => (
      <ScaleComponent width={width}>{children}</ScaleComponent>
    )
    const { result, rerender } = renderHook<{ width: string }, ScaleConfig>(
      () => useScale(),
      {
        wrapper,
        initialProps: { width: '20px' },
      },
    )
    let { SCALES, getScaleProps } = result.current
    expect(typeof SCALES).toEqual('object')
    expect(typeof getScaleProps).toEqual('function')
    expect(getScaleProps('font')).toBeUndefined()
    expect(getScaleProps('width')).toEqual('20px')
    rerender({ width: '1rem' })
    getScaleProps = result.current.getScaleProps
    expect(getScaleProps('width')).toEqual('1rem')
  })

  it('should work correctly with SCALES', () => {
    const wrapper: React.FC<ScaleProps> = ({ children, ...props }) => (
      <ScaleComponent {...props}>{children}</ScaleComponent>
    )
    const { result, rerender } = renderHook<ScaleProps, ScaleConfig>(() => useScale(), {
      wrapper,
      initialProps: {},
    })
    let SCALES = result.current.SCALES
    expect(SCALES.font(1)).toEqual('calc(1 * 16px)')
    expect(SCALES.font(1, 'auto')).toEqual('auto')

    rerender({ font: '20px' })
    SCALES = result.current.SCALES
    expect(SCALES.font(1)).toEqual('20px')
    expect(SCALES.font(1, 'auto')).toEqual('20px')

    rerender({ scale: 2 })
    SCALES = result.current.SCALES
    expect(SCALES.font(1)).toContain('calc')
    expect(SCALES.font(1, 'auto')).toEqual('auto')

    rerender({ scale: 0 })
    SCALES = result.current.SCALES
    expect(SCALES.font(1)).toContain('calc')
    expect(SCALES.font(0)).toEqual('0')

    rerender({ unit: '100px' })
    SCALES = result.current.SCALES
    expect(SCALES.font(1)).toContain('100px')
    expect(SCALES.font(10, 'auto')).toEqual('auto')
  })

  it('aliases should be allowed', () => {
    const wrapper: React.FC<ScaleProps> = ({ children, ...props }) => (
      <ScaleComponent {...props}>{children}</ScaleComponent>
    )
    const { result, rerender } = renderHook<ScaleProps, ScaleConfig>(() => useScale(), {
      wrapper,
      initialProps: { w: '200px' },
    })
    let SCALES = result.current.SCALES
    expect(SCALES.width(2)).toEqual('200px')
    expect(SCALES.width(0, 'auto')).toEqual('200px')

    rerender({ ml: '10px', mb: '10px', pl: '20px', pt: '20px' })
    SCALES = result.current.SCALES
    expect(SCALES.ml(1)).toEqual('10px')
    expect(SCALES.mx(1)).toEqual('10px')
    expect(SCALES.my(1)).toEqual('10px')
    expect(SCALES.px(1)).toEqual('20px')
    expect(SCALES.py(1)).toEqual('20px')

    rerender({ margin: '20px', padding: '10px', h: '100px' })
    SCALES = result.current.SCALES
    expect(SCALES.ml(1)).toEqual('20px')
    expect(SCALES.mx(1)).toEqual('20px')
    expect(SCALES.my(1)).toEqual('20px')
    expect(SCALES.px(1)).toEqual('10px')
    expect(SCALES.py(1)).toEqual('10px')
    expect(SCALES.height(1)).toEqual('100px')
  })

  it('should work correctly with different unit', () => {
    const wrapper: React.FC<ScaleProps> = ({ children, ...props }) => (
      <ScaleComponent {...props}>{children}</ScaleComponent>
    )
    const { result, rerender } = renderHook<ScaleProps, ScaleConfig>(() => useScale(), {
      wrapper,
      initialProps: { unit: '19px' },
    })
    let SCALES = result.current.SCALES
    let width = SCALES.width(2)
    expect(width).toContain('19px')
    expect(width).toContain('calc')
    rerender({ unit: '3px' })
    SCALES = result.current.SCALES
    width = SCALES.width(10)
    expect(width).toContain('3px')
    expect(width).toContain('calc')
  })

  it('should work correctly with multiple values', () => {
    const wrapper: React.FC<ScaleProps> = ({ children, ...props }) => (
      <ScaleComponent {...props}>{children}</ScaleComponent>
    )
    const { result, rerender } = renderHook<ScaleProps, ScaleConfig>(() => useScale(), {
      wrapper,
      initialProps: { height: '2', width: 2 },
    })
    let { SCALES, getScaleProps } = result.current
    let hasWidthOrHeight = getScaleProps(['width', 'height'])
    expect(hasWidthOrHeight).not.toBeUndefined()
    const hasMargin = getScaleProps(['margin', 'mx', 'my'])
    expect(hasMargin).toBeUndefined()
    expect(SCALES.width(1)).toContain('calc')
    expect(SCALES.height(1)).toContain('calc')

    rerender({ height: undefined, width: undefined })
    hasWidthOrHeight = result.current.getScaleProps(['width', 'height'])
    expect(hasWidthOrHeight).toBeUndefined()
  })

  it('scale related props should be filtered out', () => {
    const PassedComponent: React.FC<
      React.PropsWithChildren<React.HTMLAttributes<any>>
    > = ({ children, ...props }) => (
      <div id="inner" {...props}>
        {children}
      </div>
    )
    let Component = withScale(PassedComponent)
    let wrapper = mount(<Component scale={2} />)
    let inner = wrapper.find('#inner').getDOMNode()
    expect(inner.hasAttribute('scale')).toBe(false)

    const FilteredComponent: React.FC<
      React.PropsWithChildren<React.HTMLAttributes<any>>
    > = ({ children, ...props }) => (
      <div id="inner" {...props}>
        {children}
      </div>
    )
    Component = withScale(FilteredComponent)
    wrapper = mount(<Component scale={2} />)
    inner = wrapper.find('#inner').getDOMNode()
    expect(inner.hasAttribute('scale')).not.toBe(true)
  })

  it('should be update all native scale props', () => {
    const wrapper: React.FC<any> = ({ children, ...props }) => (
      <ScaleComponent {...props}>{children}</ScaleComponent>
    )
    const { result, rerender } = renderHook<any, ScaleConfig>(() => useScale(), {
      wrapper,
      initialProps: {},
    })
    let { SCALES, getAllScaleProps } = result.current
    expect(typeof SCALES).toEqual('object')
    expect(typeof getAllScaleProps).toEqual('function')
    expect(typeof getAllScaleProps()).toEqual('object')

    rerender({ width: '1em', height: '2em' })
    getAllScaleProps = result.current.getAllScaleProps
    expect(getAllScaleProps().width).toEqual('1em')
    expect(getAllScaleProps().height).toEqual('2em')
    expect(typeof getAllScaleProps().font).toEqual('undefined')

    rerender({ px: '10px', mx: '20px' })
    getAllScaleProps = result.current.getAllScaleProps
    expect(getAllScaleProps().px).toEqual('10px')
    expect(getAllScaleProps().mx).toEqual('20px')
    expect(typeof getAllScaleProps().paddingTop).toEqual('undefined')
  })
})
