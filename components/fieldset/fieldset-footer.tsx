import React from 'react'
import useTheme from '../styles/use-theme'
import FieldsetFooterStatus from './fieldset-footer-status'
import FieldsetFooterActions from './fieldset-footer-actions'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type FieldsetFooterProps = Props & typeof defaultProps & NativeAttrs

const FieldsetFooter: React.FC<React.PropsWithChildren<FieldsetFooterProps>> = React.memo(({
  className, children, ...props
}) => {
  const theme = useTheme()
  
  return (
    <footer className={className} {...props}>
      {children}
      <style jsx>{`
        footer {
          background-color: ${theme.palette.accents_1};
          border-top: 1px solid ${theme.palette.border};
          border-bottom-left-radius: ${theme.layout.radius};
          border-bottom-right-radius: ${theme.layout.radius};
          display: flex;
          justify-content: space-between;
          align-items: center;
          overflow: hidden;
          color: ${theme.palette.accents_6};
          padding: ${theme.layout.gapHalf} ${theme.layout.gap};
          font-size: .875rem;
          box-sizing: border-box;
        }
      `}</style>
    </footer>
  )
})

FieldsetFooter.defaultProps = defaultProps

type FieldsetFooterComponent<P = {}> = React.FC<P> & {
  Status: typeof FieldsetFooterStatus
  Actions: typeof FieldsetFooterActions
}

type ComponentProps = Partial<typeof defaultProps> & Omit<Props, keyof typeof defaultProps>

export default FieldsetFooter as FieldsetFooterComponent<ComponentProps>
