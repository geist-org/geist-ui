import React, { forwardRef } from 'react'
import { DynamicLayoutPipe, ScaleableConfig, ScaleableContext } from './scaleable-context'
import useTheme from '../use-theme'
import { isCSSNumberValue } from '../utils/collections'

export type ScaleableProps = {
  width?: string | number
  height?: string | number
  padding?: string | number
  margin?: string | number
  w?: string | number
  h?: string | number
  p?: string | number
  m?: string | number
  paddingLeft?: string | number
  paddingRight?: string | number
  paddingTop?: string | number
  paddingBottom?: string | number
  pl?: string | number
  pr?: string | number
  pt?: string | number
  pb?: string | number
  marginLeft?: string | number
  marginRight?: string | number
  marginTop?: string | number
  marginBottom?: string | number
  ml?: string | number
  mr?: string | number
  mt?: string | number
  mb?: string | number
  px?: string | number
  py?: string | number
  mx?: string | number
  my?: string | number
  font?: string | number
  unit?: string
  scale?: number
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
      unit = layout.unit,
      scale = 1,
    } = props
    const makeScaleHandler = (
      attrValue: string | number | undefined,
    ): DynamicLayoutPipe => (scale1x = 1, scale2x = scale1x) => {
      const isEmptyInital = scale1x === 0
      const factor = isEmptyInital ? 0 : scale * (scale1x / scale2x) * scale1x
      if (attrValue === undefined) return `calc(${factor} * ${unit})`
      if (!isCSSNumberValue(attrValue)) return `${attrValue}`
      const customFactor = factor * Number(attrValue)
      return `calc(${customFactor} * ${unit})`
    }
    const value: ScaleableConfig = {
      SCALES: {
        pt: makeScaleHandler(paddingTop ?? pt ?? py),
        pr: makeScaleHandler(paddingRight ?? pr ?? px),
        pb: makeScaleHandler(paddingBottom ?? pb ?? py),
        pl: makeScaleHandler(paddingLeft ?? pl ?? px),
        mt: makeScaleHandler(marginTop || mt || my),
        mr: makeScaleHandler(marginRight || mr || mx),
        mb: makeScaleHandler(marginBottom || mb || my),
        ml: makeScaleHandler(marginLeft || ml || mx),
        width: makeScaleHandler(width),
        height: makeScaleHandler(height),
        font: makeScaleHandler(font),
      },
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
