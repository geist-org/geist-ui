import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Controls } from 'lib/components/pures'
import { useConfigs } from 'lib/config-context'
import { useBodyScroll, useTheme, Button, Image, useMediaQuery, Tabs } from 'components'
import { addColorAlpha } from 'components/utils/color'
import MenuIcon from '@geist-ui/icons/menu'
import MenuMobile from './menu-mobile'
import Metadata from 'lib/data'
import useLocale from 'lib/use-locale'

const Menu: React.FC<unknown> = () => {
  const router = useRouter()
  const theme = useTheme()
  const { isChinese } = useConfigs()
  const { tabbar: currentUrlTabValue, locale } = useLocale()
  const [expanded, setExpanded] = useState<boolean>(false)
  const [, setBodyHidden] = useBodyScroll(null, { delayReset: 300 })
  const isMobile = useMediaQuery('xs', { match: 'down' })
  const allSides = useMemo(() => Metadata[locale], [locale])

  useEffect(() => {
    const prefetch = async () => {
      const urls = isChinese
        ? ['/zh-cn/guide/introduction', '/zh-cn/components/text', '/zh-cn/customization']
        : ['/en-us/guide/introduction', '/en-us/components/text', '/en-us/customization']
      await Promise.all(
        urls.map(async url => {
          await router.prefetch(url)
        }),
      )
    }
    prefetch()
      .then()
      .catch(err => console.log(err))
  }, [isChinese])

  useEffect(() => {
    setBodyHidden(expanded)
  }, [expanded])

  useEffect(() => {
    if (!isMobile) {
      setExpanded(false)
    }
  }, [isMobile])

  useEffect(() => {
    const handleRouteChange = () => {
      setExpanded(false)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  const handleTabChange = useCallback(
    (tab: string) => {
      const shouldRedirectDefaultPage = currentUrlTabValue !== tab
      if (!shouldRedirectDefaultPage) return
      const defaultPath = `/${locale}/${tab}`
      router.push(defaultPath)
    },
    [currentUrlTabValue, locale],
  )
  const [isLocked, setIsLocked] = useState<boolean>(false)

  useEffect(() => {
    const handler = () => {
      const isLocked = document.body.style.overflow === 'hidden'
      setIsLocked(last => (last !== isLocked ? isLocked : last))
    }
    const observer = new MutationObserver(mutations => {
      mutations.forEach(function (mutation) {
        if (mutation.type !== 'attributes') return
        handler()
      })
    })

    observer.observe(document.body, {
      attributes: true,
    })
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div className="menu-wrapper">
        <nav className="menu">
          <div className="content">
            <div className="logo">
              <NextLink href={`/${locale}`}>
                <a aria-label="Go Home">
                  <Image
                    src="/images/logo.png"
                    width="20px"
                    height="20px"
                    mr={0.5}
                    draggable={false}
                    title="Logo"
                  />
                  Geist
                </a>
              </NextLink>
            </div>

            <div className="tabs">
              <Tabs
                value={currentUrlTabValue}
                leftSpace={0}
                activeClassName="current"
                align="center"
                hideDivider
                hideBorder
                onChange={handleTabChange}>
                <Tabs.Item font="14px" label={isChinese ? '主页' : 'Home'} value="" />
                {allSides.map((tab, index) => (
                  <Tabs.Item
                    font="14px"
                    label={tab.localeName || tab.name}
                    value={tab.name}
                    key={`${tab.localeName || tab.name}-${index}`}
                  />
                ))}
              </Tabs>
            </div>

            <div className="controls">
              {isMobile ? (
                <Button
                  className="menu-toggle"
                  auto
                  type="abort"
                  onClick={() => setExpanded(!expanded)}>
                  <MenuIcon size="1.125rem" />
                </Button>
              ) : (
                <Controls />
              )}
            </div>
          </div>
        </nav>
      </div>
      <MenuMobile expanded={expanded} />

      <style jsx>{`
        .menu-wrapper {
          height: var(--geist-page-nav-height);
        }
        .menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          padding-right: ${isLocked ? 'var(--geist-page-scrollbar-width)' : 0};
          height: var(--geist-page-nav-height);
          //width: 100%;
          backdrop-filter: saturate(180%) blur(5px);
          background-color: ${addColorAlpha(theme.palette.background, 0.8)};
          box-shadow: ${theme.type === 'dark'
            ? '0 0 0 1px #333'
            : '0 0 15px 0 rgba(0, 0, 0, 0.1)'};
          z-index: 999;
        }
        nav .content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1000px;
          height: 100%;
          margin: 0 auto;
          user-select: none;
          padding: 0 ${theme.layout.gap};
        }
        .logo {
          flex: 1 1;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        .logo a {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          font-size: 1.125rem;
          font-weight: 500;
          color: inherit;
          height: 28px;
        }
        .logo :global(.image) {
          border: 1px solid ${theme.palette.border};
          border-radius: 2rem;
        }
        .tabs {
          flex: 1 1;
          padding: 0 ${theme.layout.gap};
        }
        .tabs :global(.content) {
          display: none;
        }
        @media only screen and (max-width: ${theme.breakpoints.xs.max}) {
          .tabs {
            display: none;
          }
        }
        .controls {
          flex: 1 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .controls :global(.menu-toggle) {
          display: flex;
          align-items: center;
          min-width: 40px;
          height: 40px;
          padding: 0;
        }
      `}</style>
    </>
  )
}

export default Menu
