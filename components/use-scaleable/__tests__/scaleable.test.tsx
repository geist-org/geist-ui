import React from 'react'
import useScaleable, {
  ScaleableProps,
  ScaleableConfig,
  withScaleable,
  filterScaleableProps,
} from '../index'
import { renderHook } from '@testing-library/react-hooks'
import { mount } from 'enzyme'

const BaseComponent: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <div>{children}</div>
)
const ScaleComponent = withScaleable(BaseComponent)

describe('UseScaleable', () => {
  it('should work correctly', () => {
    const { result } = renderHook<void, ScaleableConfig>(() => useScaleable())
    const { SCALES, getScaleableProps } = result.current
    expect(typeof SCALES).toEqual('object')
    expect(typeof getScaleableProps).toEqual('function')
    expect(getScaleableProps('font')).toBeUndefined()
    expect(SCALES.font(1)).not.toBeUndefined()
  })

  it('should work correctly with HOC', () => {
    const wrapper: React.FC<{ width: string }> = ({ width, children }) => (
      <ScaleComponent width={width}>{children}</ScaleComponent>
    )
    const { result, rerender } = renderHook<{ width: string }, ScaleableConfig>(
      () => useScaleable(),
      {
        wrapper,
        initialProps: { width: '20px' },
      },
    )
    let { SCALES, getScaleableProps } = result.current
    expect(typeof SCALES).toEqual('object')
    expect(typeof getScaleableProps).toEqual('function')
    expect(getScaleableProps('font')).toBeUndefined()
    expect(getScaleableProps('width')).toEqual('20px')
    rerender({ width: '1rem' })
    getScaleableProps = result.current.getScaleableProps
    expect(getScaleableProps('width')).toEqual('1rem')
  })

  it('should work correctly with SCALES', () => {
    const wrapper: React.FC<ScaleableProps> = ({ children, ...props }) => (
      <ScaleComponent {...props}>{children}</ScaleComponent>
    )
    const { result, rerender } = renderHook<ScaleableProps, ScaleableConfig>(
      () => useScaleable(),
      {
        wrapper,
        initialProps: {},
      },
    )
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
    const wrapper: React.FC<ScaleableProps> = ({ children, ...props }) => (
      <ScaleComponent {...props}>{children}</ScaleComponent>
    )
    const { result, rerender } = renderHook<ScaleableProps, ScaleableConfig>(
      () => useScaleable(),
      {
        wrapper,
        initialProps: { w: '200px' },
      },
    )
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
    const wrapper: React.FC<ScaleableProps> = ({ children, ...props }) => (
      <ScaleComponent {...props}>{children}</ScaleComponent>
    )
    const { result, rerender } = renderHook<ScaleableProps, ScaleableConfig>(
      () => useScaleable(),
      {
        wrapper,
        initialProps: { unit: '19px' },
      },
    )
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
    const wrapper: React.FC<ScaleableProps> = ({ children, ...props }) => (
      <ScaleComponent {...props}>{children}</ScaleComponent>
    )
    const { result, rerender } = renderHook<ScaleableProps, ScaleableConfig>(
      () => useScaleable(),
      {
        wrapper,
        initialProps: { height: '2', width: 2 },
      },
    )
    let { SCALES, getScaleableProps } = result.current
    let hasWidthOrHeight = getScaleableProps(['width', 'height'])
    expect(hasWidthOrHeight).not.toBeUndefined()
    const hasMargin = getScaleableProps(['margin', 'mx', 'my'])
    expect(hasMargin).toBeUndefined()
    expect(SCALES.width(1)).toContain('calc')
    expect(SCALES.height(1)).toContain('calc')

    rerender({ height: undefined, width: undefined })
    hasWidthOrHeight = result.current.getScaleableProps(['width', 'height'])
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
    let Component = withScaleable(PassedComponent)
    let wrapper = mount(<Component scale={2} />)
    let inner = wrapper.find('#inner').getDOMNode()
    expect(inner.hasAttribute('scale')).toBe(true)

    const FilteredComponent: React.FC<
      React.PropsWithChildren<React.HTMLAttributes<any>>
    > = ({ children, ...props }) => (
      <div id="inner" {...filterScaleableProps(props)}>
        {children}
      </div>
    )
    Component = withScaleable(FilteredComponent)
    wrapper = mount(<Component scale={2} />)
    inner = wrapper.find('#inner').getDOMNode()
    expect(inner.hasAttribute('scale')).not.toBe(true)
  })
})
