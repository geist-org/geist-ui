
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

export type ButtonTypes = typeof buttonTypes[number]

export type NormalSizes = typeof normalSizes[number]

export type NormalTypes = typeof normalTypes[number]

export type ThemeTypes = typeof themeTypes[number]

export type SnippetTypes = typeof snippetTypes[number]

export type CopyTypes = typeof copyTypes[number]
