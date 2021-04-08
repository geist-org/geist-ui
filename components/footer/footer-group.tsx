import React from 'react'
import useTheme from '../use-theme'
import { useFooterContext } from './footer-context'

interface Props {
  title: string | React.ReactNode
}

const defaultProps = {
  title: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type FooterGroupProps = Props & typeof defaultProps & NativeAttrs

const FooterGroup: React.FC<React.PropsWithChildren<FooterGroupProps>> = ({
  title,
  children,
  ...props
}) => {
  const theme = useTheme()
  const { breakPoint } = useFooterContext()
  const [expand, setExpand] = React.useState(false)
  let titleProps = undefined
  if (React.isValidElement(title)) {
    titleProps = React.cloneElement(title, {
      className: 'footer-text',
      onClick: () => setExpand(!expand),
    })
  }
  return (
    <div {...props}>
      {titleProps || (
        <p onClick={() => setExpand(!expand)} className="footer-text">
          {title}
        </p>
      )}
      <ul>{children}</ul>

      <style jsx>{`
        div{
          margin-bottom:20px;
        }
        :global(.footer-text) {
          font-weight: 400;
          font-size: 0.875rem;
          margin: ${theme.layout.gap} 0;
        }
        ul {
          margin: 0;
        }
        @media screen and (max-width: ${breakPoint}) {
          div{
            border-bottom: 1px solid ${theme.palette.accents_2};
          }
          .footer-text {
            cursor:pointer;
          }
          .footer-text :after {
            content: '${expand ? '-' : '+'}';
            float: right;
            transition: transform .15s ease;
          }
          ul{
            display: ${expand ? 'block' : 'none'};
          }
        }
        }
      `}</style>
    </div>
  )
}

const MemoFooterGroup = React.memo(FooterGroup)

export default MemoFooterGroup
