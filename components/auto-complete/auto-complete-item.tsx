import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import { useAutoCompleteContext } from './auto-complete-context'
import { NormalSizes } from '../utils/prop-types'
import Ellipsis from '../shared/ellipsis'

interface Props {
  value: string
}

const defaultProps = {}

export type AutoCompleteItemProps = Props & typeof defaultProps & React.HTMLAttributes<any>

const getSizes = (size: NormalSizes) => {
  const fontSizes: { [key in NormalSizes]: string } = {
    mini: '.7rem',
    small: '.75rem',
    medium: '.875rem',
    large: '1rem',
  }
  return fontSizes[size]
}

const AutoCompleteItem: React.FC<React.PropsWithChildren<AutoCompleteItemProps>> = ({
  value: identValue,
  children,
}) => {
  const theme = useTheme()
  const { value, updateValue, size } = useAutoCompleteContext()
  const selectHandler = () => {
    updateValue && updateValue(identValue)
  }

  const isActive = useMemo(() => value === identValue, [identValue, value])
  const fontSize = useMemo(() => getSizes(size), [size])

  return (
    <div className={`item ${isActive ? 'active' : ''}`} onClick={selectHandler}>
      <Ellipsis>{children}</Ellipsis>
      <style jsx>{`
        .item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-weight: normal;
          white-space: pre;
          font-size: ${fontSize};
          padding: ${theme.layout.gapHalf};
          line-height: 1.2;
          background-color: ${theme.palette.background};
          color: ${theme.palette.foreground};
          user-select: none;
          border: 0;
          cursor: pointer;
          transition: background 0.2s ease 0s, border-color 0.2s ease 0s;
        }

        .item:first-of-type {
          border-top-left-radius: ${theme.layout.radius};
          border-top-right-radius: ${theme.layout.radius};
        }

        .item:last-of-type {
          border-bottom-left-radius: ${theme.layout.radius};
          border-bottom-right-radius: ${theme.layout.radius};
        }

        .item:hover {
          background-color: ${theme.palette.accents_1};
        }

        .item.active {
          background-color: ${theme.palette.accents_1};
          color: ${theme.palette.success};
        }
      `}</style>
    </div>
  )
}

export default withDefaults(AutoCompleteItem, defaultProps)
