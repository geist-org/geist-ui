import { ScaleProps } from './scale-context'

export type ScalePropsAndInvalid = keyof ScaleProps | 'size'

export const ScalePropKeys: Array<ScalePropsAndInvalid> = [
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

// export const withPureProps = <T extends Record<any, any>>(
//   props: T,
// ): Omit<T, ScalePropsAndInvalid> => {
//   if (!props) return {} as Omit<T, ScalePropsAndInvalid>
//   const keys = Object.keys(props).filter(key => key !== '')
//   const nextProps: any = {}
//   for (const key of keys) {
//     if (!(ScalePropKeys as string[]).includes(key)) {
//       nextProps[key] = props[key]
//     }
//   }
//   return nextProps
// }
