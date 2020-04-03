import React, { useCallback, useMemo } from 'react'
import { Button, useTheme, Spacer } from 'components'
import { useConfigs } from './config-context'
import MoonIcon from './icons/moon'
import SunIcon from './icons/sun'
import GithubIcon from './icons/github'

const Controls: React.FC<{}> = React.memo(({
}) => {
  const theme = useTheme()
  const config = useConfigs()
  const isDark = useMemo(() => theme.type === 'dark', [theme.type])
  const switchThemes = useCallback(() => {
    const isDark = theme.type === 'dark'
    config.onChange && config.onChange(!isDark)
  }, [theme.type])
  
  const redirectGithub = () => {
    if (typeof window !== 'undefined') {
      window.open('https://github.com/zeit-ui/react')
    }
  }
  
  return (
    <div className="controls">
      <div className="tools">
        <Spacer x={.5} />
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
          align-items: flex-start;
          flex-direction: column-reverse;
          margin: 0;
          padding-bottom: ${theme.layout.gapHalf};
          position: relative;
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
          height: 2.5rem;
          box-sizing: border-box;
          align-items: center;
        }
        
        .tools:before {
          content: "";
          display: inline-block;
          height: 1.25rem;
          width: .3125rem;
          background-color: ${theme.palette.accents_2};
        }
        
        .controls :global(.line) {
          width: 150px;
          height: 55px;
          cursor: pointer;
          background-color: ${theme.palette.background};
          position: relative;
          z-index: 100;
          transition: all 200ms ease;
          overflow: hidden;
        }
        
        @media only screen and (max-width: 767px) {
          .controls {
            display: none;
            pointer-events: none;
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  )
})

export default Controls
