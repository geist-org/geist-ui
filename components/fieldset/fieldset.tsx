import React, { ReactNode, useEffect, useState } from 'react'
import useTheme from '../styles/use-theme'
import FieldsetTitle from './fieldset-title'
import FieldsetSubtitle from './fieldset-subtitle'
import FieldsetFooter from './fieldset-footer'
import FieldsetGroup from './fieldset-group'
import { hasChild, pickChild } from '../utils/collections'
import { useFieldset } from './fieldset-context'

interface Props {
  value?: string
  label?: string
  disabled?: boolean
  title?: string | ReactNode
  subtitle?: string | ReactNode
  className?: string
}

const defaultProps = {
  value: '',
  label: '',
  disabled: false,
  title: '',
  subtitle: '',
  className: '',
}

export type FieldsetProps = Props & typeof defaultProps & React.FieldsetHTMLAttributes<any>

const Fieldset: React.FC<React.PropsWithChildren<FieldsetProps>> = React.memo(({
  className, title, subtitle, children, value, label,
}) => {
  const theme = useTheme()
  const { inGroup, currentValue, register } = useFieldset()
  const [hidden, setHidden] = useState<boolean>(inGroup)
  const hasTitle = hasChild(children, FieldsetTitle)
  const hasSubtitle = hasChild(children, FieldsetSubtitle)
  const [withoutFooterChildren, FooterChildren] = pickChild(children, FieldsetFooter)
  
  if (inGroup) {
    if (!label) {
      console.error('[Fieldset Group]: Props "label" is required when in a group.')
    }
    if (!value || value === '') {
      value = label
    }
    
    useEffect(() => {
      const r: any = register({ value, label })
      r({ value, label })
    }, [])
    
    useEffect(() => {
      if (!currentValue || currentValue === '') return
      setHidden(currentValue !== value)
    }, [currentValue])
  }
  
  return (
    <div className={`fieldset ${className}`}>
      <div className="content">
        {withoutFooterChildren}
        {!hasTitle && <FieldsetTitle>{title}</FieldsetTitle>}
        {!hasSubtitle && <FieldsetSubtitle>{subtitle}</FieldsetSubtitle>}
      </div>
      {FooterChildren && <>{FooterChildren}</>}
      <style jsx>{`
        .fieldset {
          background-color: ${theme.palette.background};
          border: 1px solid ${theme.palette.border};
          border-radius: ${theme.layout.radius};
          overflow: hidden;
          display: ${hidden ? 'none' : 'block'};
        }
        
        .content {
          padding: ${theme.layout.gap};
        }
      `}</style>
    </div>
  )
})

Fieldset.defaultProps = defaultProps

type FieldsetComponent<P = {}> = React.FC<P> & {
  Title: typeof FieldsetTitle
  Subtitle: typeof FieldsetSubtitle
  Footer: typeof FieldsetFooter
  Group: typeof FieldsetGroup
}

type ComponentProps = Partial<typeof defaultProps> & Omit<Props, keyof typeof defaultProps>

export default Fieldset as FieldsetComponent<ComponentProps>
