import React, { useEffect, useMemo } from 'react'
import { useTabsContext, TabsConfig } from './tabs-context'

interface Props {
  label: string | React.ReactNode
  value: string
  disabled?: boolean
}

const defaultProps = {
  disabled: false,
}

const TabsItem: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  value,
  label,
  disabled,
}: React.PropsWithChildren<Props & typeof defaultProps>) => {
  const { register, currentValue } = useTabsContext() as TabsConfig
  const isActive = useMemo(() => currentValue === value, [currentValue, value])

  useEffect(() => {
    register && register({ value, label, disabled })
  }, [value, label, disabled])

  //remove corresponding data model when unmount
  useEffect(() => {
    return () => {
      register && register({ remove: value })
    }
  }, [])

  /* eslint-disable react/jsx-no-useless-fragment */
  return isActive ? <>{children}</> : null
}

TabsItem.defaultProps = defaultProps

export default TabsItem
