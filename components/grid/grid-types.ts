import { tuple } from '../utils/prop-types'

const justify = tuple(
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
)

export type GridJustify = typeof justify[number]

const alignItems = tuple('flex-start', 'center', 'flex-end', 'stretch', 'baseline')

export type GridAlignItems = typeof alignItems[number]

const alignContent = tuple(
  'stretch',
  'center',
  'flex-start',
  'flex-end',
  'space-between',
  'space-around',
)

export type GridAlignContent = typeof alignContent[number]

const direction = tuple('row', 'row-reverse', 'column', 'column-reverse')

export type GridDirection = typeof direction[number]

const wrap = tuple('nowrap', 'wrap', 'wrap-reverse')

export type GridWrap = typeof wrap[number]
