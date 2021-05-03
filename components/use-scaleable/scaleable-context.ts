import React from 'react'

export type DynamicLayoutPipe = (scale1x: number, scale2x?: number) => string

export type ScaleableInputKeys =
  | 'pl'
  | 'pr'
  | 'pt'
  | 'pb'
  | 'ml'
  | 'mr'
  | 'mt'
  | 'mb'
  | 'width'
  | 'height'
  | 'font'

export type DynamicScales = {
  [key in ScaleableInputKeys]: DynamicLayoutPipe
}

export interface ScaleableConfig {
  SCALES: DynamicScales
}

const defaultDynamicLayoutPipe: DynamicLayoutPipe = scale1x => {
  return `${scale1x}`
}

const defaultContext: ScaleableConfig = {
  SCALES: {
    pl: defaultDynamicLayoutPipe,
    pr: defaultDynamicLayoutPipe,
    pb: defaultDynamicLayoutPipe,
    pt: defaultDynamicLayoutPipe,
    mb: defaultDynamicLayoutPipe,
    ml: defaultDynamicLayoutPipe,
    mr: defaultDynamicLayoutPipe,
    mt: defaultDynamicLayoutPipe,
    width: defaultDynamicLayoutPipe,
    height: defaultDynamicLayoutPipe,
    font: defaultDynamicLayoutPipe,
  },
}

export const ScaleableContext = React.createContext<ScaleableConfig>(defaultContext)

export const useScaleable = (): ScaleableConfig =>
  React.useContext<ScaleableConfig>(ScaleableContext)
