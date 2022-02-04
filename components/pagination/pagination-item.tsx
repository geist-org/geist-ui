import React, { useMemo } from 'react'
import useTheme from '../use-theme'
import { addColorAlpha } from '../utils/color'
import useClasses from '../use-classes'

interface Props {
  active?: boolean
  disabled?: boolean
  onClick?: (e: React.MouseEvent) => void
}

type NativeAttrs = Omit<React.ButtonHTMLAttributes<any>, keyof Props>
export type PaginationItemProps = Props & NativeAttrs

const PaginationItem: React.FC<React.PropsWithChildren<PaginationItemProps>> = ({
  active,
  children,
  disabled,
  onClick,
  ...props
}) => {
  const theme = useTheme()
  const [hover, activeHover] = useMemo(
    () => [
      addColorAlpha(theme.palette.success, 0.1),
      addColorAlpha(theme.palette.success, 0.8),
    ],
    [theme.palette.success],
  )
  const classes = useClasses({
    active,
    disabled,
  })

  const clickHandler = (event: React.MouseEvent) => {
    if (disabled) return
    onClick && onClick(event)
  }

  return (
    <li>
      <button className={classes} onClick={clickHandler} {...props}>
        {children}
      </button>
      <style jsx>{`
        li {
          margin-right: 0.428em;
          display: inline-block;
        }
        button {
          border: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          text-transform: capitalize;
          user-select: none;
          white-space: nowrap;
          text-align: center;
          vertical-align: middle;
          box-shadow: none;
          outline: none;
          height: var(--pagination-size);
          min-width: var(--pagination-size);
          font-size: inherit;
          cursor: pointer;
          color: ${theme.palette.success};
          border-radius: ${theme.layout.radius};
          background-color: ${theme.palette.background};
          transition: all linear 200ms 0ms;
        }

        button:hover {
          background-color: ${hover};
        }

        .active {
          font-weight: bold;
          background-color: ${theme.palette.success};
          color: ${theme.palette.background};
          box-shadow: ${theme.expressiveness.shadowSmall};
        }

        .active:hover {
          background-color: ${activeHover};
          box-shadow: ${theme.expressiveness.shadowMedium};
        }

        .disabled {
          color: ${theme.palette.accents_4};
          cursor: not-allowed;
        }

        .disabled:hover {
          background-color: ${theme.palette.accents_2};
        }

        button :global(svg) {
          width: 1.3em;
          height: 1.3em;
        }
      `}</style>
    </li>
  )
}

PaginationItem.displayName = 'GeistPaginationItem'
export default PaginationItem
