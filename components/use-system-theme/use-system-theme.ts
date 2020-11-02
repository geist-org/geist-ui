import { useEffect, useState } from 'react'

export type SystemTheme = 'dark' | 'light'

const getMediaQuery = () => {
  if (typeof window === 'undefined') {
    return
  }

  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')
}

const getSystemTheme = (matches: boolean) => (matches ? 'dark' : 'light')

const useSystemTheme = (defaultTheme: SystemTheme = 'light') => {
  const [systemTheme, setSystemTheme] = useState<SystemTheme>(defaultTheme)

  useEffect(() => {
    const mediaQuery = getMediaQuery()
    const mediaQueryChangeHandler = (event: any) => setSystemTheme(getSystemTheme(event.matches))

    if (mediaQuery) {
      setSystemTheme(getSystemTheme(mediaQuery.matches))
      mediaQuery.addListener(mediaQueryChangeHandler)
    }

    return () => mediaQuery && mediaQuery.removeListener(mediaQueryChangeHandler)
  }, [])

  return systemTheme
}

export default useSystemTheme