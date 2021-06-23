import React, { useEffect } from 'react'
import CollapseIcon from './collapse-icon'
import useTheme from '../use-theme'
import Expand from '../shared/expand'
import { useCollapseContext } from './collapse-context'
import useCurrentState from '../utils/use-current-state'
import useWarning from '../utils/use-warning'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  title: string
  subtitle?: React.ReactNode | string
  initialVisible?: boolean
  shadow?: boolean
  className?: string
  index?: number
}

const defaultProps = {
  className: '',
  shadow: false,
  initialVisible: false,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type CollapseProps = Props & NativeAttrs

const CollapseComponent: React.FC<React.PropsWithChildren<CollapseProps>> = ({
  children,
  title,
  subtitle,
  initialVisible,
  shadow,
  className,
  index,
  ...props
}: React.PropsWithChildren<CollapseProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  const { values, updateValues } = useCollapseContext()
  const [visible, setVisible, visibleRef] = useCurrentState<boolean>(initialVisible)

  if (!title) {
    useWarning('"title" is required.', 'Collapse')
  }

  useEffect(() => {
    if (!values.length) return
    const isActive = !!values.find(item => item === index)
    setVisible(isActive)
  }, [values.join(',')])

  const clickHandler = () => {
    const next = !visibleRef.current
    setVisible(next)
    updateValues && updateValues(index, next)
  }

  return (
    <div className={`collapse ${shadow ? 'shadow' : ''} ${className}`} {...props}>
      <div className="view" role="button" onClick={clickHandler}>
        <div className="title">
          <h3>{title}</h3> <CollapseIcon active={visible} />
        </div>
        {subtitle && <div className="subtitle">{subtitle}</div>}
      </div>
      <Expand isExpanded={visible}>
        <div className="content">{children}</div>
      </Expand>
      <style jsx>{`
        .collapse {
          border-top: 1px solid ${theme.palette.border};
          border-bottom: 1px solid ${theme.palette.border};
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(1.2)} ${SCALES.pr(0)} ${SCALES.pb(1.2)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        .shadow {
          box-shadow: ${theme.expressiveness.shadowSmall};
          border: none;
          border-radius: ${theme.layout.radius};
          padding: ${theme.layout.gap};
        }

        .view {
          cursor: pointer;
          outline: none;
        }

        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: ${theme.palette.foreground};
        }

        .title h3 {
          margin: 0;
          font-size: 1.5em;
        }

        .subtitle {
          color: ${theme.palette.accents_5};
          margin: 0;
        }

        .subtitle > :global(*) {
          margin: 0;
        }

        .content {
          font-size: inherit;
          line-height: 1.6em;
          padding: ${SCALES.pt(1.2)} ${SCALES.pr(0)} ${SCALES.pb(1.2)} ${SCALES.pl(0)};
        }

        .content > :global(*:first-child) {
          margin-top: 0;
        }

        .content > :global(*:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  )
}

CollapseComponent.defaultProps = defaultProps
CollapseComponent.displayName = 'GeistCollapse'
const Collapse = withScaleable(CollapseComponent)
export default Collapse
