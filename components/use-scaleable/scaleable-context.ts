import React from 'react'

export type ScaleableProps = {
  width?: string | number
  height?: string | number
  padding?: string | number
  margin?: string | number
  w?: string | number
  h?: string | number
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

export type DynamicLayoutPipe = (
  scale1x: number,
  defaultValue?: string | number,
) => string

export type ScaleableInputKeys =
  | 'pl'
  | 'pr'
  | 'pt'
  | 'pb'
  | 'px'
  | 'py'
  | 'ml'
  | 'mr'
  | 'mt'
  | 'mb'
  | 'mx'
  | 'my'
  | 'width'
  | 'height'
  | 'font'

export type DynamicScales = {
  [key in ScaleableInputKeys]: DynamicLayoutPipe
}

export type GetScaleablePropsFunction = (
  key: keyof ScaleableProps | Array<keyof ScaleableProps>,
) => ScaleableProps[keyof ScaleableProps]

export interface ScaleableConfig {
  SCALES: DynamicScales
  getScaleableProps: GetScaleablePropsFunction
  unit: string
}

const defaultDynamicLayoutPipe: DynamicLayoutPipe = scale1x => {
  return `${scale1x}`
}

const defaultContext: ScaleableConfig = {
  getScaleableProps: () => undefined,
  SCALES: {
    pl: defaultDynamicLayoutPipe,
    pr: defaultDynamicLayoutPipe,
    pb: defaultDynamicLayoutPipe,
    pt: defaultDynamicLayoutPipe,
    px: defaultDynamicLayoutPipe,
    py: defaultDynamicLayoutPipe,
    mb: defaultDynamicLayoutPipe,
    ml: defaultDynamicLayoutPipe,
    mr: defaultDynamicLayoutPipe,
    mt: defaultDynamicLayoutPipe,
    mx: defaultDynamicLayoutPipe,
    my: defaultDynamicLayoutPipe,
    width: defaultDynamicLayoutPipe,
    height: defaultDynamicLayoutPipe,
    font: defaultDynamicLayoutPipe,
  },
  unit: '16px',
}

export const ScaleableContext = React.createContext<ScaleableConfig>(defaultContext)

export const useScaleable = (): ScaleableConfig =>
  React.useContext<ScaleableConfig>(ScaleableContext)
