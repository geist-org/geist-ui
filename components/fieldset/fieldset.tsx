import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import useTheme from '../use-theme'
import FieldsetTitle from './fieldset-title'
import FieldsetSubtitle from './fieldset-subtitle'
import FieldsetFooter from './fieldset-footer'
import FieldsetContent from './fieldset-content'
import { hasChild, pickChild } from '../utils/collections'
import { useFieldset } from './fieldset-context'
import useWarning from '../utils/use-warning'
import useScaleable, { withScaleable } from '../use-scaleable'

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
export type FieldsetProps = Props & NativeAttrs

const FieldsetComponent: React.FC<React.PropsWithChildren<FieldsetProps>> = ({
  className,
  title,
  subtitle,
  children,
  value,
  label,
  ...props
}: React.PropsWithChildren<FieldsetProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
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
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
      `}</style>
    </div>
  )
}

FieldsetComponent.defaultProps = defaultProps
FieldsetComponent.displayName = 'GeistFieldset'
const Fieldset = withScaleable(FieldsetComponent)
export default Fieldset
