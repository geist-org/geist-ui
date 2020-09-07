import React, { useMemo } from 'react'
import useTheme from '../styles/use-theme'
import { getColors } from './styles'
import { usePaginationContext } from './pagination-context'

interface Props {
  active?: boolean
  disabled?: boolean
  onClick?: (e: React.MouseEvent) => void
}

type NativeAttrs = Omit<React.ButtonHTMLAttributes<any>, keyof Props>
export type PaginationItemProps = React.PropsWithChildren<Props & NativeAttrs>

const PaginationItem: React.FC<PaginationItemProps> = ({
  active,
  children,
  disabled,
  onClick,
  ...props
}) => {
  const theme = useTheme()
  const { variant } = usePaginationContext()
  const paginationColors = useMemo(() => {
    return getColors(theme.palette, variant, active)
  }, [theme.palette, variant, active])
  const clickHandler = (event: React.MouseEvent) => {
    if (disabled) return
    onClick && onClick(event)
  }

  return (
    <li>
      <button
        className={`${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
        onClick={clickHandler}
        {...props}>
        {children}
      </button>
      <style jsx>{`
        li {
          margin-right: ${theme.layout.gapHalf};
          margin-bottom: initial;
          display: inline-block;
        }
        button {
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
          color: ${paginationColors.color};
          border: ${theme.expressiveness.L2} ${theme.expressiveness.cLineStyle1}
            ${paginationColors.borderColor};
          border-radius: ${theme.expressiveness.R1};
          background-color: ${paginationColors.bgColor};
          transition: all linear 200ms 0ms;
          font-weight: 500;
        }

        button:hover {
          color: ${paginationColors.hoverColor};
          background-color: ${paginationColors.hoverBgColor};
          border: ${theme.expressiveness.L2} ${theme.expressiveness.cLineStyle1}
            ${paginationColors.hoverBorderColor};
        }

        .active {
          font-weight: bold;
          color: ${paginationColors.color};
          background-color: ${paginationColors.bgColor};
          border: ${theme.expressiveness.L2} ${theme.expressiveness.cLineStyle1}
            ${paginationColors.borderColor};
        }

        .active:hover {
          color: ${paginationColors.color};
          background-color: ${paginationColors.bgColor};
          border: ${theme.expressiveness.L2} ${theme.expressiveness.cLineStyle1}
            ${paginationColors.borderColor};
        }

        .disabled {
          color: ${paginationColors.color};
          background-color: ${paginationColors.bgColor};
          border: ${theme.expressiveness.L2} ${theme.expressiveness.cLineStyle1}
            ${paginationColors.borderColor};
          cursor: not-allowed;
        }

        .disabled:hover {
          color: ${paginationColors.color};
          background-color: ${paginationColors.bgColor};
          border: ${theme.expressiveness.L2} ${theme.expressiveness.cLineStyle1}
            ${paginationColors.borderColor};
        }

        button :global(svg) {
          width: 1.3em;
          height: 1.3em;
        }
      `}</style>
    </li>
  )
}

export default PaginationItem
