import {
  GetAllScalePropsFunction,
  GetScalePropsFunction,
  ScaleProps,
  ScalePropKeys,
} from './scale-context'

export const generateGetScaleProps = <P>(
  props: P & ScaleProps,
): GetScalePropsFunction => {
  const getScaleProps: GetScalePropsFunction = keyOrKeys => {
    if (!Array.isArray(keyOrKeys)) return props[keyOrKeys as keyof ScaleProps]
    let value = undefined
    for (const key of keyOrKeys) {
      const currentValue = props[key]
      if (typeof currentValue !== 'undefined') {
        value = currentValue
      }
    }
    return value
  }
  return getScaleProps
}

export const generateGetAllScaleProps = <P>(
  props: P & ScaleProps,
): GetAllScalePropsFunction => {
  const getAllScaleProps: GetAllScalePropsFunction = () => {
    let scaleProps: ScaleProps = {}
    for (const key of ScalePropKeys) {
      const value = props[key as keyof ScaleProps]
      if (typeof value !== 'undefined') {
        scaleProps[key as keyof ScaleProps] = value as any
      }
    }
    return scaleProps
  }
  return getAllScaleProps
}
