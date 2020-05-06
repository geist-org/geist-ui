import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useCurrentState from 'components/utils/use-current-state'

const DEFAULT_LOCALE = 'en-us'
const DEFAULT_TAB = 'guide'

export type LocaleTypes = {
  locale: string
  tabbar: string
}

const useLocale = (): LocaleTypes => {
  const { pathname } = useRouter()
  const [locale, setLocale, localeRef] = useCurrentState<string>(DEFAULT_LOCALE)
  const [tabbar, setTab, tabRef] = useCurrentState<string>(DEFAULT_TAB)

  useEffect(() => {
    const names = pathname.split('/').filter(r => !!r)
    const currentLocale = names[0] || DEFAULT_LOCALE
    const currentTabbar = names[1] || DEFAULT_TAB

    if (currentLocale !== localeRef.current) {
      setLocale(currentLocale)
    }

    if (currentTabbar !== tabRef.current) {
      setTab(currentTabbar)
    }
  }, [pathname])

  return {
    locale,
    tabbar,
  }
}

export default useLocale
