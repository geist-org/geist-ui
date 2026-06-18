import React, { forwardRef } from 'react'
import { ScaleConfig, ScaleContext, ScaleProps } from './scale-context'
import useTheme from '../use-theme'
import {
  generateGetAllScaleProps,
  generateGetScaleProps,
  makeScaleHandler,
} from './utils'

const withScale = <T, P = {}>(
  Render: React.ComponentType<P & { ref?: React.Ref<T> }>,
) => {
  const ScaleFC = forwardRef<T, P & ScaleProps>(({ children, ...props }, ref) => {
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
      ...innerProps
    } = props

    const value: ScaleConfig = {
      unit: unit,
      SCALES: {
        pt: makeScaleHandler(paddingTop ?? pt ?? py ?? padding, scale, unit),
        pr: makeScaleHandler(paddingRight ?? pr ?? px ?? padding, scale, unit),
        pb: makeScaleHandler(paddingBottom ?? pb ?? py ?? padding, scale, unit),
        pl: makeScaleHandler(paddingLeft ?? pl ?? px ?? padding, scale, unit),
        px: makeScaleHandler(
          px ?? paddingLeft ?? paddingRight ?? pl ?? pr ?? padding,
          scale,
          unit,
        ),
        py: makeScaleHandler(
          py ?? paddingTop ?? paddingBottom ?? pt ?? pb ?? padding,
          scale,
          unit,
        ),
        mt: makeScaleHandler(marginTop ?? mt ?? my ?? margin, scale, unit),
        mr: makeScaleHandler(marginRight ?? mr ?? mx ?? margin, scale, unit),
        mb: makeScaleHandler(marginBottom ?? mb ?? my ?? margin, scale, unit),
        ml: makeScaleHandler(marginLeft ?? ml ?? mx ?? margin, scale, unit),
        mx: makeScaleHandler(
          mx ?? marginLeft ?? marginRight ?? ml ?? mr ?? margin,
          scale,
          unit,
        ),
        my: makeScaleHandler(
          my ?? marginTop ?? marginBottom ?? mt ?? mb ?? margin,
          scale,
          unit,
        ),
        width: makeScaleHandler(width ?? w, scale, unit),
        height: makeScaleHandler(height ?? h, scale, unit),
        font: makeScaleHandler(font, scale, unit),
      },
      getScaleProps: generateGetScaleProps(props),
      getAllScaleProps: generateGetAllScaleProps(props),
    }

    return (
      <ScaleContext.Provider value={value}>
        <Render {...(innerProps as P)} ref={ref}>
          {children}
        </Render>
      </ScaleContext.Provider>
    )
  })
  ScaleFC.displayName = `Scale${Render.displayName || 'Wrapper'}`
  return ScaleFC
}

export default withScale
