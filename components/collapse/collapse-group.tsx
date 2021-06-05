import React, { useMemo } from 'react'
import Collapse from './collapse'
import useCurrentState from '../utils/use-current-state'
import { setChildrenIndex } from '../utils/collections'
import { CollapseContext, CollapseConfig } from './collapse-context'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  accordion?: boolean
  className?: string
}

const defaultProps = {
  accordion: true,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type CollapseGroupProps = Props & NativeAttrs

const CollapseGroupComponent: React.FC<React.PropsWithChildren<CollapseGroupProps>> = ({
  children,
  accordion,
  className,
  ...props
}: React.PropsWithChildren<CollapseGroupProps> & typeof defaultProps) => {
  const { SCALES } = useScaleable()
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

  const hasIndexChildren = useMemo(() => setChildrenIndex(children, [Collapse]), [
    children,
  ])

  return (
    <CollapseContext.Provider value={initialValue}>
      <div className={`collapse-group ${className}`} {...props}>
        {hasIndexChildren}
        <style jsx>{`
          .collapse-group {
            width: ${SCALES.width(1, 'auto')};
            height: ${SCALES.height(1, 'auto')};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0.6)} ${SCALES.pb(0)} ${SCALES.pl(0.6)};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
          }

          .collapse-group > :global(div + div) {
            border-top: none;
          }
        `}</style>
      </div>
    </CollapseContext.Provider>
  )
}

CollapseGroupComponent.defaultProps = defaultProps
CollapseGroupComponent.displayName = 'GeistCollapseGroup'
const CollapseGroup = withScaleable(CollapseGroupComponent)
export default CollapseGroup
