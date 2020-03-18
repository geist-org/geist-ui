import React, { ReactNode } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'

interface Props {
  title?: ReactNode | string
  content?: ReactNode | string
  className?: string
}

const defaultProps = {
  title: 'Title',
  content: '',
  className: '',
}

export type DescriptionProps = Props & typeof defaultProps & React.HTMLAttributes<any>

const Description: React.FC<DescriptionProps> = React.memo(({
  title, content, className, ...props
}) => {
  const theme = useTheme()
  return (
    <dl className={className} {...props}>
      <dt>{title}</dt>
      <dd>{content}</dd>
  
      <style jsx>{`
        dl {
          margin: 0;
        }
        
        dt {
          height: .875rem;
          line-height: .875rem;
          font-size: .75rem;
          margin-bottom: .5rem;
          text-transform: uppercase;
          white-space: nowrap;
          color: ${theme.palette.accents_5};
          display: flex;
        }
        
        dd {
          margin: 0;
          font-size: .875rem;
          line-height: 1rem;
          color: ${theme.palette.foreground};
          font-weight: 500;
        }
        
        dd :global(p), dt :global(p)  {
          margin: 0;
        }
      `}</style>
    </dl>
  )
})

export default withDefaults(Description, defaultProps)
