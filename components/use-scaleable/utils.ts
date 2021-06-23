import { ScaleableProps } from './scaleable-context'

export type ScaleablePropsAndInvalid = keyof ScaleableProps | 'size'

export const ScaleablePropKeys: Array<ScaleablePropsAndInvalid> = [
  'paddingLeft',
  'pl',
  'paddingRight',
  'pr',
  'paddingTop',
  'pt',
  'paddingBottom',
  'pb',
  'marginTop',
  'mt',
  'marginRight',
  'mr',
  'marginBottom',
  'mb',
  'marginLeft',
  'ml',
  'px',
  'py',
  'mx',
  'my',
  'width',
  'height',
  'font',
  'unit',
  'scale',
  'size',
]

export const filterScaleableProps = <T extends Record<any, any>>(props: T) => {
  const keys = Object.keys(props).filter(key => key !== '')
  const nextProps: any = {}
  for (const key of keys) {
    if (!(ScaleablePropKeys as string[]).includes(key)) {
      nextProps[key] = props[key]
    }
  }
  return nextProps as Omit<T, ScaleablePropsAndInvalid>
}
