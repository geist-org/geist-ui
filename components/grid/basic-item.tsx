import React, { useMemo } from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'
import { Justify, Direction, AlignItems, AlignContent } from './grid-props'

type BreakpointsValue = number | boolean
interface Props {
  xs?: BreakpointsValue
  sm?: BreakpointsValue
  md?: BreakpointsValue
  lg?: BreakpointsValue
  xl?: BreakpointsValue
  justify?: Justify
  direction?: Direction
  alignItems?: AlignItems
  alignContent?: AlignContent
  className?: string
}

const defaultProps = {
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type GridBasicItemProps = Props & typeof defaultProps & NativeAttrs

type ItemLayoutValue = {
  grow: number
  width: string
  basis: string
}
const getItemLayout = (val: BreakpointsValue): ItemLayoutValue => {
  if (typeof val === 'number') {
    const widthRatio = `${(100 / 24) * val}%`
    return {
      grow: 0,
      width: widthRatio,
      basis: widthRatio,
    }
  }
  return {
    grow: 1,
    width: '100%',
    basis: '0',
  }
}

const GridBasicItem: React.FC<React.PropsWithChildren<GridBasicItemProps>> = ({
  xs,
  sm,
  md,
  lg,
  xl,
  justify,
  direction,
  alignItems,
  alignContent,
  children,
  className,
}) => {
  const theme = useTheme()
  const classes = useMemo(() => {
    const aligns: { [key: string]: any } = {
      justify,
      direction,
      alignItems,
      alignContent,
      xs,
      sm,
      md,
      lg,
      xl,
    }
    const classString = Object.keys(aligns).reduce((pre, name) => {
      if (Boolean(aligns[name]) && aligns[name] !== 0) return `${pre} ${name}`
      return pre
    }, '')
    return classString.trim()
  }, [justify, direction, alignItems, alignContent])

  const layout = useMemo<
    {
      [key in ['xs', 'sm', 'md', 'lg', 'xl'][number]]: ItemLayoutValue
    }
  >(
    () => ({
      xs: getItemLayout(xs),
      sm: getItemLayout(sm),
      md: getItemLayout(md),
      lg: getItemLayout(lg),
      xl: getItemLayout(xl),
    }),
    [xs, sm, md, lg, xl],
  )

  return (
    <div className={`item ${classes} ${className}`}>
      {children}
      <style jsx>{`
        .item {
        }

        .justify {
          justify-content: ${justify};
        }

        .direction {
          flex-direction: ${direction};
        }

        .alignContent {
          align-content: ${alignContent};
        }

        .alignItems {
          align-items: ${alignItems};
        }

        .xs {
          flex-grow: ${layout.xs.grow};
          max-width: ${layout.xs.width};
          flex-basis: ${layout.xs.basis};
        }

        @media only screen and (max-width: ${theme.breakpoints.xs.max}) {
          .xs {
            flex-grow: ${layout.xs.grow};
            max-width: ${layout.xs.width};
            flex-basis: ${layout.xs.basis};
          }
        }

        @media only screen and (min-width: ${theme.breakpoints.sm.min}) {
          .sm {
            flex-grow: ${layout.sm.grow};
            max-width: ${layout.sm.width};
            flex-basis: ${layout.sm.basis};
          }
        }

        @media only screen and (min-width: ${theme.breakpoints.md.min}) {
          .md {
            flex-grow: ${layout.md.grow};
            max-width: ${layout.md.width};
            flex-basis: ${layout.md.basis};
          }
        }

        @media only screen and (min-width: ${theme.breakpoints.lg.min}) {
          .lg {
            flex-grow: ${layout.lg.grow};
            max-width: ${layout.lg.width};
            flex-basis: ${layout.lg.basis};
          }
        }

        @media only screen and (min-width: ${theme.breakpoints.xl.min}) {
          .xl {
            flex-grow: ${layout.xl.grow};
            max-width: ${layout.xl.width};
            flex-basis: ${layout.xl.basis};
          }
        }
      `}</style>
    </div>
  )
}

const MemoBasicItem = React.memo(GridBasicItem)

export default withDefaults(MemoBasicItem, defaultProps)
