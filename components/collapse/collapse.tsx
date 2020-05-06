import React, { useEffect } from 'react'
import CollapseIcon from './collapse-icon'
import useTheme from '../styles/use-theme'
import Expand from '../shared/expand'
import { useCollapseContext } from './collapse-context'
import useCurrentState from '../utils/use-current-state'
import CollapseGroup from './collapse-group'
import useWarning from '../utils/use-warning'

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
export type CollapseProps = Props & typeof defaultProps & NativeAttrs

const Collapse: React.FC<React.PropsWithChildren<CollapseProps>> = ({
  children,
  title,
  subtitle,
  initialVisible,
  shadow,
  className,
  index,
  ...props
}) => {
  const theme = useTheme()
  const [visible, setVisible, visibleRef] = useCurrentState<boolean>(initialVisible)
  const { values, updateValues } = useCollapseContext()

  if (!title) {
    useWarning('"title" is required.', 'Collapse')
  }

  useEffect(() => {
    if (!values.length) return
    const isActive = !!values.find((item) => item === index)
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
          padding: ${theme.layout.gap} 0;
          border-top: 1px solid ${theme.palette.border};
          border-bottom: 1px solid ${theme.palette.border};
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
        }

        .subtitle {
          color: ${theme.palette.accents_5};
          margin: 0;
        }

        .subtitle > :global(*) {
          margin: 0;
        }

        .content {
          font-size: 1rem;
          line-height: 1.625rem;
          padding: ${theme.layout.gap} 0;
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

Collapse.defaultProps = defaultProps

type CollapseComponent<P = {}> = React.FC<P> & {
  Group: typeof CollapseGroup
}

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs

export default Collapse as CollapseComponent<ComponentProps>
