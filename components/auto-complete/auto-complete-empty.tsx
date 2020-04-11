import React from 'react'
import withDefaults from '../utils/with-defaults'
import AutoCompleteSearch from './auto-complete-searching'

interface Props {
  hidden?: boolean
  className?: string
}

const defaultProps = {
  hidden: false,
  className: '',
}

export type AutoCompleteEmptyProps = Props & typeof defaultProps & React.HTMLAttributes<any>

const AutoCompleteEmpty: React.FC<React.PropsWithChildren<AutoCompleteEmptyProps>> = ({
  children, hidden, className,
}) => {
  if (hidden) return null
  return <AutoCompleteSearch className={className}>{children}</AutoCompleteSearch>
}

export default withDefaults(AutoCompleteEmpty, defaultProps)
