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
  return (
    <div {...props}>
      <h3 onClick={() => setExpand(!expand)}>{title}</h3>
      <ul>{children}</ul>

      <style jsx>{`
        div{
          margin-bottom:20px;
        }
        h3 {
          font-weight: 400;
          font-size: 0.875rem;
          margin: ${theme.layout.gapHalf} 0;
        }
        ul {
          list-style-type: none !important;
          margin: 0;
          padding: 0;
        }
        @media screen and (max-width: ${breakPoint}) {
          div{
            margin-right: 0;
            margin-bottom:0px;
            border-bottom: 1px solid ${theme.palette.accents_2};
          }
          h3{
            cursor:pointer;
          }
          h3:after {
            content: '${expand ? '-' : '+'}';
            float: right;
            transition: transform .15s ease;
          }
          ul{
            display:${expand ? 'block' : 'none'};
          }
        }
        }
      `}</style>
    </div>
  )
}

const MemoFooterGroup = React.memo(FooterGroup)

export default MemoFooterGroup
