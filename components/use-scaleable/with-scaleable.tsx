import React, { forwardRef } from 'react'
import {
  DynamicLayoutPipe,
  GetScaleablePropsFunction,
  ScaleableConfig,
  ScaleableContext,
  ScaleableProps,
} from './scaleable-context'
import useTheme from '../use-theme'
import { isCSSNumberValue } from '../utils/collections'

const reduceScaleCoefficient = (scale: number) => {
  if (scale === 1) return scale
  const diff = Math.abs((scale - 1) / 2)
  return scale > 1 ? 1 + diff : 1 - diff
}

const withScaleable = <T, P = {}>(
  Render: React.ComponentType<P & { ref?: React.Ref<T> }>,
) => {
  const ScaleableFC = forwardRef<T, P & ScaleableProps>(({ children, ...props }, ref) => {
    const { layout } = useTheme()
    const {
      paddingLeft,
      pl,
      paddingRight,
      pr,
      paddingTop,
      pt,
      paddingBottom,
      pb,
      marginTop,
      mt,
      marginRight,
      mr,
      marginBottom,
      mb,
      marginLeft,
      ml,
      px,
      py,
      mx,
      my,
      width,
      height,
      font,
      w,
      h,
      margin,
      padding,
      unit = layout.unit,
      scale = 1,
    } = props
    const makeScaleHandler =
      (attrValue: string | number | undefined): DynamicLayoutPipe =>
      (scale1x, defaultValue) => {
        // 0 means disable scale and the default value is 0
        if (scale1x === 0) {
          scale1x = 1
          defaultValue = defaultValue || 0
        }
        const factor = reduceScaleCoefficient(scale) * scale1x
        if (typeof attrValue === 'undefined') {
          if (typeof defaultValue !== 'undefined') return `${defaultValue}`
          return `calc(${factor} * ${unit})`
        }

        if (!isCSSNumberValue(attrValue)) return `${attrValue}`
        const customFactor = factor * Number(attrValue)
        return `calc(${customFactor} * ${unit})`
      }
    const getScaleableProps: GetScaleablePropsFunction = keyOrKeys => {
      if (!Array.isArray(keyOrKeys)) return props[keyOrKeys as keyof ScaleableProps]
      let value = undefined
      for (const key of keyOrKeys) {
        const currentValue = props[key]
        if (typeof currentValue !== 'undefined') {
          value = currentValue
        }
      }
      return value
    }

    const value: ScaleableConfig = {
      unit,
      SCALES: {
        pt: makeScaleHandler(paddingTop ?? pt ?? py ?? padding),
        pr: makeScaleHandler(paddingRight ?? pr ?? px ?? padding),
        pb: makeScaleHandler(paddingBottom ?? pb ?? py ?? padding),
        pl: makeScaleHandler(paddingLeft ?? pl ?? px ?? padding),
        px: makeScaleHandler(px ?? paddingLeft ?? paddingRight ?? pl ?? pr ?? padding),
        py: makeScaleHandler(py ?? paddingTop ?? paddingBottom ?? pt ?? pb ?? padding),
        mt: makeScaleHandler(marginTop ?? mt ?? my ?? margin),
        mr: makeScaleHandler(marginRight ?? mr ?? mx ?? margin),
        mb: makeScaleHandler(marginBottom ?? mb ?? my ?? margin),
        ml: makeScaleHandler(marginLeft ?? ml ?? mx ?? margin),
        mx: makeScaleHandler(mx ?? marginLeft ?? marginRight ?? ml ?? mr ?? margin),
        my: makeScaleHandler(my ?? marginTop ?? marginBottom ?? mt ?? mb ?? margin),
        width: makeScaleHandler(width ?? w),
        height: makeScaleHandler(height ?? h),
        font: makeScaleHandler(font),
      },
      getScaleableProps,
    }

    return (
      <ScaleableContext.Provider value={value}>
        <Render {...(props as P)} ref={ref}>
          {children}
        </Render>
      </ScaleableContext.Provider>
    )
  })
  ScaleableFC.displayName = `Scaleable${Render.displayName || 'Wrapper'}`
  return ScaleableFC
}

export default withScaleable
