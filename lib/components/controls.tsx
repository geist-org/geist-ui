import React, { useCallback, useMemo, useRef, useState } from 'react'
import useTheme from 'components/styles/use-theme'
import { Button, Col, Image } from 'components'
import useConfigs from 'lib/states/use-config'
import MoonIcon from './icons/moon'
import SunIcon from './icons/sun'
import GithubIcon from './icons/github'

const Controls: React.FC<{}> = React.memo(({
}) => {
  const theme = useTheme()
  const config = useConfigs()
  const timer = useRef<number>()
  const [hover, setHover] = useState<boolean>(false)
  const isDark = useMemo(() => theme.type === 'dark', [theme.type])
  const hideLogo = useMemo(() => isDark || hover, [isDark, hover])
  const switchThemes = useCallback(() => {
    const isDark = theme.type === 'dark'
    config.onChange && config.onChange(!isDark)
  }, [theme.type])
  
  const redirectGithub = () => {
    if (typeof window !== 'undefined') {
      window.open('https://github.com/zeit-ui/react')
    }
  }
  
  const hoverHandler = (next: boolean) => {
    if (typeof window === 'undefined') return
    if (next) {
      timer.current && clearTimeout(timer.current)
      return setHover(true)
    }
  
    timer.current = window.setTimeout(() => {
      setHover(false)
      clearTimeout(timer.current)
    }, 300)
  }
  
  return (
    <div className="controls">
      <Col className="line" span={18}
        onMouseEnter={() => hoverHandler(true)}
        onMouseLeave={() => hoverHandler(false)}>
        <Image draggable={false} width={150} height={55} src="/images/zeit-react-logo.png" />
      </Col>
      <div className="tools"
        onMouseEnter={() => hoverHandler(true)}
        onMouseLeave={() => hoverHandler(false)}>
        <Button className="button" auto type="abort"
          onClick={switchThemes}>
          {isDark ? <SunIcon width={16} height={16} /> : <MoonIcon width={16} height={16} />}
        </Button>
        <Button className="button" auto type="abort"
          onClick={redirectGithub}>
          <GithubIcon width={16} height={16} />
        </Button>
      </div>
      <style jsx>{`
        .controls {
          height: 110px;
          display: flex;
          align-items: center;
          flex-direction: column-reverse;
          margin: 0;
          position: relative;
          padding-right: 30px;
        }
        
        .controls :global(.button) {
          width: 40px;
          height: 40px;
          padding: 0;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin-right: 5px;
        }
        
        .tools {
          display: flex;
          padding: 7px 0;
          height: 54px;
          box-sizing: border-box;
          margin-bottom: 0;
          position: absolute;
          bottom: 0;
          right: 50%;
          transform: translateX(50%);
        }
        
        .controls :global(.line) {
          width: 150px;
          height: ${hideLogo ? 0 : '55px'};
          opacity: ${hideLogo ? 0 : 1};
          cursor: pointer;
          background-color: ${theme.palette.background};
          position: relative;
          z-index: 100;
          transition: all 200ms ease;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
})

export default Controls
