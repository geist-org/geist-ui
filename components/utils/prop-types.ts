export const tuple = <T extends string[]>(...args: T) => args

export const inputVariants = tuple('solid', 'line')

export const buttonVariants = tuple('solid', 'line', 'text')

const buttonColors = tuple('default', 'primary', 'secondary', 'success', 'warning', 'error')

export const buttonStatus = tuple('default', 'hover', 'active', 'disabled')

// const buttonColors = tuple(
//   'default',
//   'secondary',
//   'success',
//   'warning',
//   'error',
//   'abort',
//   'secondary-light',
//   'success-light',
//   'warning-light',
//   'error-light',
// )


const selectVariants = tuple('line', 'text')

export const normalSizes = tuple('mini', 'small', 'medium', 'large')

export const normalTypes = tuple('default', 'primary', 'secondary', 'success', 'warning', 'error')

export const inputColors = tuple('default', 'primary', 'success', 'warning', 'error')

export const themeTypes = tuple('dark', 'light')

export const snippetColors = tuple(
  'default',
  'secondary',
  'success',
  'warning',
  'error',
  'dark',
  'lite',
)

export const cardTypes = tuple(
  'default',
  'secondary',
  'success',
  'warning',
  'error',
  'dark',
  'lite',
  'alert',
  'purple',
  'violet',
  'cyan',
)

export const copyTypes = tuple('default', 'slient', 'prevent')

export const triggerTypes = tuple('hover', 'click')

export const placement = tuple(
  'top',
  'topStart',
  'topEnd',
  'left',
  'leftStart',
  'leftEnd',
  'bottom',
  'bottomStart',
  'bottomEnd',
  'right',
  'rightStart',
  'rightEnd',
)

export const dividerAlign = tuple('start', 'center', 'end', 'left', 'right')

export type ButtonColors = typeof buttonColors[number]

export type ButtonVariants = typeof buttonVariants[number]

export type ButtonStatus = typeof buttonStatus[number]

export type NormalSizes = typeof normalSizes[number]

export type SelectVariants = typeof selectVariants[number]

export type NormalTypes = typeof normalTypes[number]

export type InputColors = typeof inputColors[number]

export type InputVariantTypes = typeof inputVariants[number]

export type ThemeTypes = typeof themeTypes[number]

export type SnippetColors = typeof snippetColors[number]

export type CardTypes = typeof cardTypes[number]

export type CopyTypes = typeof copyTypes[number]

export type TriggerTypes = typeof triggerTypes[number]

export type Placement = typeof placement[number]

export type DividerAlign = typeof dividerAlign[number]
