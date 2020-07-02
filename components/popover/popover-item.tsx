import React from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'

interface Props {
  line?: boolean
  title?: boolean
}

const defaultProps = {
  line: false,
  title: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type PopoverItemProps = Props & typeof defaultProps & NativeAttrs

const PopoverItem: React.FC<React.PropsWithChildren<PopoverItemProps>> = ({
  children,
  line,
  title,
  className,
  ...props
}) => {
  const theme = useTheme()
  return (
    <>
      <div className={`item ${line ? 'line' : ''} ${title ? 'title' : ''} ${className}`} {...props}>
        {children}
        <style jsx>{`
          .item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0.5rem ${theme.layout.gap};
            color: ${theme.palette.accents_5};
            font-size: 0.875rem;
            line-height: 1.25rem;
            text-align: left;
            transition: color 0.1s ease 0s, background-color 0.1s ease 0s;
            width: max-content;
          }

          .item:hover {
            color: ${theme.palette.foreground};
          }

          .item > :global(*) {
            margin: 0;
          }

          .item.line {
            line-height: 0;
            height: 0;
            padding: 0;
            border-top: 1px solid ${theme.palette.border};
            margin: 0.5rem 0;
            width: 100%;
          }

          .item.title {
            padding: 1.15rem;
            font-weight: 500;
            font-size: 0.83rem;
            color: ${theme.palette.foreground};
          }

          .item.title:first-of-type {
            padding-top: 0.6rem;
            padding-bottom: 0.6rem;
          }
        `}</style>
      </div>
      {title && <PopoverItem line title={false} className="" />}
    </>
  )
}

const MemoPopoverItem = React.memo(PopoverItem)

export default withDefaults(MemoPopoverItem, defaultProps)
