import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import useTheme from '../styles/use-theme'
import FieldsetTitle from './fieldset-title'
import FieldsetSubtitle from './fieldset-subtitle'
import FieldsetFooter from './fieldset-footer'
import FieldsetGroup from './fieldset-group'
import FieldsetContent from './fieldset-content'
import { hasChild, pickChild } from '../utils/collections'
import { useFieldset } from './fieldset-context'
import useWarning from '../utils/use-warning'

interface Props {
  value?: string
  label?: string
  title?: string | ReactNode
  subtitle?: string | ReactNode
  className?: string
}

const defaultProps = {
  value: '',
  label: '',
  disabled: false,
  title: '' as string | ReactNode,
  subtitle: '' as string | ReactNode,
  className: '',
}

type NativeAttrs = Omit<React.FieldsetHTMLAttributes<any>, keyof Props>
export type FieldsetProps = Props & typeof defaultProps & NativeAttrs

const Fieldset: React.FC<React.PropsWithChildren<FieldsetProps>> = ({
  className,
  title,
  subtitle,
  children,
  value,
  label,
  ...props
}) => {
  const theme = useTheme()
  const { inGroup, currentValue, register } = useFieldset()
  const [hidden, setHidden] = useState<boolean>(inGroup)

  const [withoutFooterChildren, FooterChildren] = pickChild(children, FieldsetFooter)
  const hasTitle = hasChild(withoutFooterChildren, FieldsetTitle)
  const hasSubtitle = hasChild(withoutFooterChildren, FieldsetSubtitle)
  const hasContent = hasChild(withoutFooterChildren, FieldsetContent)

  if (inGroup) {
    if (!label) {
      useWarning('Props "label" is required when in a group.', 'Fieldset Group')
    }
    if (!value || value === '') {
      value = label
    }

    useEffect(() => {
      register && register({ value, label })
    }, [])

    useEffect(() => {
      // In a few cases, the user will set Fieldset state manually.
      // If the user incorrectly set the state, Group component should ignore it.
      /* istanbul ignore if */
      if (!currentValue || currentValue === '') return
      setHidden(currentValue !== value)
    }, [currentValue])
  }

  const content = useMemo(
    () => (
      <>
        {withoutFooterChildren}
        {!hasTitle && title && <FieldsetTitle>{title}</FieldsetTitle>}
        {!hasSubtitle && subtitle && <FieldsetSubtitle>{subtitle}</FieldsetSubtitle>}
      </>
    ),
    [withoutFooterChildren, hasTitle, hasSubtitle, title, subtitle],
  )

  return (
    <div className={`fieldset ${className}`} {...props}>
      {hasContent ? content : <FieldsetContent>{content}</FieldsetContent>}
      {FooterChildren && FooterChildren}
      <style jsx>{`
        .fieldset {
          background-color: ${theme.palette.background};
          border: 1px solid ${theme.palette.border};
          border-radius: ${theme.layout.radius};
          overflow: hidden;
          display: ${hidden ? 'none' : 'block'};
        }
      `}</style>
    </div>
  )
}

Fieldset.defaultProps = defaultProps

type FieldsetComponent<P = {}> = React.FC<P> & {
  Title: typeof FieldsetTitle
  Subtitle: typeof FieldsetSubtitle
  Footer: typeof FieldsetFooter
  Group: typeof FieldsetGroup
  Content: typeof FieldsetContent
  Body: typeof FieldsetContent
}

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs

export default Fieldset as FieldsetComponent<ComponentProps>
