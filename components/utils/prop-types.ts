
export const tuple = <T extends string[]>(...args: T) => args

const buttonTypes = tuple(
  'default',
  'secondary',
  'success',
  'warning',
  'error',
  'abort',
)

const normalSizes = tuple(
  'mini',
  'small',
  'medium',
  'large',
)

const normalTypes = tuple(
  'default',
  'secondary',
  'success',
  'warning',
  'error',
)

const themeTypes = tuple(
  'dark',
  'light',
)

const snippetTypes = tuple(
  'default',
  'secondary',
  'success',
  'warning',
  'error',
  'dark',
  'lite',
)

const copyTypes = tuple(
  'default',
  'slient',
  'prevent',
)

const triggerTypes = tuple(
  'hover',
  'click',
)

const placement = tuple(
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

export type ButtonTypes = typeof buttonTypes[number]

export type NormalSizes = typeof normalSizes[number]

export type NormalTypes = typeof normalTypes[number]

export type ThemeTypes = typeof themeTypes[number]

export type SnippetTypes = typeof snippetTypes[number]

export type CopyTypes = typeof copyTypes[number]

export type TriggerTypes = typeof triggerTypes[number]

export type Placement = typeof placement[number]
