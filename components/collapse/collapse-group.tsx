import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import { CollapseContext, CollapseConfig } from './collapse-context'
import useCurrentState from '../utils/use-current-state'
import { setChildrenIndex } from '../utils/collections'
import Collapse from './collapse'

interface Props {
  accordion?: boolean
  className?: string
}

const defaultProps = {
  accordion: true,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type CollapseGroupProps = Props & typeof defaultProps & NativeAttrs

const CollapseGroup: React.FC<React.PropsWithChildren<CollapseGroupProps>> = ({
  children,
  accordion,
  className,
  ...props
}) => {
  const theme = useTheme()
  const [state, setState, stateRef] = useCurrentState<Array<number>>([])
  const updateValues = (currentIndex: number, nextState: boolean) => {
    const hasChild = stateRef.current.find(val => val === currentIndex)
    if (accordion) {
      if (nextState) return setState([currentIndex])
      return setState([])
    }

    if (nextState) {
      // In a few cases, the user will set Collapse Component state manually.
      // If the user incorrectly set the state, Group component should ignore it.
      /* istanbul ignore if */
      if (hasChild) return
      return setState([...stateRef.current, currentIndex])
    }
    setState(stateRef.current.filter(item => item !== currentIndex))
  }

  const initialValue = useMemo<CollapseConfig>(
    () => ({
      values: state,
      updateValues,
    }),
    [state.join(',')],
  )

  const hasIndexChildren = useMemo(() => setChildrenIndex(children, [Collapse]), [children])

  return (
    <CollapseContext.Provider value={initialValue}>
      <div className={`collapse-group ${className}`} {...props}>
        {hasIndexChildren}
        <style jsx>{`
          .collapse-group {
            width: auto;
            padding: 0 ${theme.layout.gapHalf};
          }

          .collapse-group > :global(div + div) {
            border-top: none;
          }
        `}</style>
      </div>
    </CollapseContext.Provider>
  )
}

export default withDefaults(CollapseGroup, defaultProps)
