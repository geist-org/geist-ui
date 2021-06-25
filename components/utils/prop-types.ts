export const tuple = <T extends string[]>(...args: T) => args

export const tupleNumber = <T extends number[]>(...args: T) => args

const buttonTypes = tuple(
  'default',
  'secondary',
  'success',
  'warning',
  'error',
  'abort',
  'secondary-light',
  'success-light',
  'warning-light',
  'error-light',
)

const normalTypes = tuple('default', 'secondary', 'success', 'warning', 'error')

const snippetTypes = tuple(
  'default',
  'secondary',
  'success',
  'warning',
  'error',
  'dark',
  'lite',
)

const cardTypes = tuple(
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

const copyTypes = tuple('default', 'silent', 'prevent')

const triggerTypes = tuple('hover', 'click')

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

const dividerAlign = tuple('start', 'center', 'end', 'left', 'right')

export type ButtonTypes = typeof buttonTypes[number]

export type NormalTypes = typeof normalTypes[number]

export type SnippetTypes = typeof snippetTypes[number]

export type CardTypes = typeof cardTypes[number]

export type CopyTypes = typeof copyTypes[number]

export type TriggerTypes = typeof triggerTypes[number]

export type Placement = typeof placement[number]

export type DividerAlign = typeof dividerAlign[number]
