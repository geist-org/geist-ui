import React, { useMemo } from 'react'
import useTheme from '../use-theme'
import { useAutoCompleteContext } from './auto-complete-context'
import Ellipsis from '../shared/ellipsis'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  value: string
  // The 'isLabelOnly' is only used inside the component,
  // Automatically adjust width when only label children is included.
  isLabelOnly?: boolean
}

const defaultProps = {}

export type AutoCompleteItemProps = Props & React.HTMLAttributes<any>

const AutoCompleteItemComponent: React.FC<
  React.PropsWithChildren<AutoCompleteItemProps>
> = ({
  value: identValue,
  children,
  isLabelOnly,
}: React.PropsWithChildren<AutoCompleteItemProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  const { value, updateValue, updateVisible } = useAutoCompleteContext()
  const selectHandler = () => {
    updateValue && updateValue(identValue)
    updateVisible && updateVisible(false)
  }
  const isActive = useMemo(() => value === identValue, [identValue, value])

  return (
    <div className={`item ${isActive ? 'active' : ''}`} onClick={selectHandler}>
      {isLabelOnly ? <Ellipsis height={SCALES.height(2)}>{children}</Ellipsis> : children}
      <style jsx>{`
        .item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-weight: normal;
          white-space: pre;
          background-color: ${theme.palette.background};
          color: ${theme.palette.foreground};
          user-select: none;
          border: 0;
          cursor: pointer;
          transition: background 0.2s ease 0s, border-color 0.2s ease 0s;
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, 'auto')};
          height: ${isLabelOnly ? SCALES.height(2.5) : SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0.75)} ${SCALES.pb(0)} ${SCALES.pl(0.75)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
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

AutoCompleteItemComponent.defaultProps = defaultProps
AutoCompleteItemComponent.displayName = 'GeistAutoCompleteItem'
const AutoCompleteItem = withScaleable(AutoCompleteItemComponent)
export default AutoCompleteItem
