import { NormalSizes } from 'components/utils/prop-types'
import { GeistUIThemes } from 'components/styles/themes'

export interface SelectSize {
  height: string
  fontSize: string
  minWidth: string
}

export const getSizes = (theme: GeistUIThemes, size?: NormalSizes) => {
  const sizes: { [key in NormalSizes]: SelectSize } = {
    medium: {
      height: `calc(1.688 * ${theme.layout.gap})`,
      fontSize: '.875rem',
      minWidth: '10rem',
    },
    small: {
      height: `calc(1.344 * ${theme.layout.gap})`,
      fontSize: '.75rem',
      minWidth: '8rem',
    },
    mini: {
      height: `calc(1 * ${theme.layout.gap})`,
      fontSize: '.75rem',
      minWidth: '6.5rem',
    },
    large: {
      height: `calc(2 * ${theme.layout.gap})`,
      fontSize: '1.225rem',
      minWidth: '12.5rem',
    },
  }

  return size ? sizes[size] : sizes.medium
}
