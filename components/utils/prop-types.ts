export const tuple = <T extends string[]>(...args: T) => args
//todo better syntax related to tuple?
export const variantsTuple = <T extends ('solid' | 'line' | 'text')[]>(...args: T) => args
export const statusTuple = <T extends ('default' | 'hover' | 'active' | 'disabled')[]>(
  ...args: T
) => args

const buttonVariants = variantsTuple('solid', 'line', 'text')
const tabVariants = variantsTuple('solid', 'line')
const inputVariants = tuple('solid', 'line')

const buttonColors = tuple('default', 'primary', 'secondary', 'success', 'warning', 'error')

const tagColors = tuple('default', 'primary', 'secondary', 'success', 'warning', 'error')

const buttonStatus = tuple('default', 'hover', 'active', 'disabled')
const tabStatus = statusTuple('default', 'hover', 'active', 'disabled')

const messageColors = tuple('default', 'primary', 'success', 'warning', 'error')

const selectVariants = tuple('line', 'text')

const normalSizes = tuple('mini', 'small', 'medium', 'large')

const tagSizes = tuple('small', 'medium', 'large')

const normalTypes = tuple('default', 'primary', 'secondary', 'success', 'warning', 'error')

const inputColors = tuple('default', 'primary', 'success', 'warning', 'error')

const themeTypes = tuple('dark', 'light')

const snippetColors = tuple('default', 'secondary', 'success', 'warning', 'error', 'dark', 'lite')

const cardVariants = tuple('solid', 'line')

const cardColors = tuple('default', 'primary', 'success', 'warning', 'error')

const copyTypes = tuple('default', 'slient', 'prevent')

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

export type ButtonColors = typeof buttonColors[number]

export type TagColors = typeof tagColors[number]

export type ButtonVariants = typeof buttonVariants[number]
export type TabVarient = typeof tabVariants[number]

export type TagVariants = ButtonVariants

export type ButtonStatus = typeof buttonStatus[number]
export type TabStatus = typeof tabStatus[number]

export type MessageColors = typeof messageColors[number]

export type NormalSizes = typeof normalSizes[number]

export type TagSizes = typeof tagSizes[number]

export type SelectVariants = typeof selectVariants[number]

export type NormalTypes = typeof normalTypes[number]

export type InputColors = typeof inputColors[number]

export type InputVariantTypes = typeof inputVariants[number]

export type ThemeTypes = typeof themeTypes[number]

export type SnippetColors = typeof snippetColors[number]

export type CardColors = typeof cardColors[number]

export type CardVariants = typeof cardVariants[number]

export type CopyTypes = typeof copyTypes[number]

export type TriggerTypes = typeof triggerTypes[number]

export type Placement = typeof placement[number]

export type DividerAlign = typeof dividerAlign[number]
