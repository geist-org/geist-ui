import React from 'react'
import withDefaults from '../utils/with-defaults'
import AutoCompleteSearch from './auto-complete-searching'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

export type AutoCompleteEmptyProps = Props & typeof defaultProps & React.HTMLAttributes<any>

const AutoCompleteEmpty: React.FC<React.PropsWithChildren<AutoCompleteEmptyProps>> = ({
  children, className,
}) => {

  return <AutoCompleteSearch className={className}>{children}</AutoCompleteSearch>
}

export default withDefaults(AutoCompleteEmpty, defaultProps)
