import React, { useMemo, useState } from 'react'
import withDefaults from 'components/utils/with-defaults'
import { ConfigContext, Configs } from 'lib/config-context'
import { useRouter } from 'next/router'

interface Props {
  onChange?: Function
}

const defaultProps = {
}

export type ConfigProviderProps = Props & typeof defaultProps

const ConfigProvider: React.FC<React.PropsWithChildren<ConfigProviderProps>> = React.memo(({
  onChange, children,
}) => {
  const { pathname } = useRouter()
  const [isChinese, setIsChinese] = useState<boolean>(() => pathname.includes('zh-cn'))
  const [scrollHeight, setScrollHeight] = useState<number>(0)
  const updateSidebarScrollHeight = (height: number) => setScrollHeight(height)
  const updateChineseState = (state: boolean) => setIsChinese(state)

  const initialValue = useMemo<Configs>(() => ({
    onChange,
    isChinese,
    updateChineseState,
    sidebarScrollHeight: scrollHeight,
    updateSidebarScrollHeight,
  }), [onChange, scrollHeight])

  return (
    <ConfigContext.Provider value={initialValue}>
      {children}
    </ConfigContext.Provider>
  )
})

export default withDefaults(ConfigProvider, defaultProps)
