import React from 'react'
import useTheme from '../use-theme'
import flush from 'styled-jsx/server'
import flushToReact from 'styled-jsx/server'

const CSSBaseline: React.FC<React.PropsWithChildren<{}>> = React.memo(({
  children,
}) => {
  const theme = useTheme()
  
  return (
    <>
      {children}
      <style global jsx>{`
        html, body {
          background-color: ${theme.palette.background};
          color: ${theme.palette.foreground};
        }
        
        html {
          font-size: 16px;
        }
        
        body {
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
          font-size: 1rem;
          line-height: 1.5;
          margin: 0;
          padding: 0;
          min-height: 100%;
          position: relative;
          font-family: ${theme.font.sans};
        }
        
        *, *:before, *:after {
          box-sizing: inherit;
          text-rendering: geometricPrecision;
          -webkit-tap-highlight-color: transparent;
        }
        
        p, small {
          font-weight: 400;
          color: inherit;
          letter-spacing: -0.005625rem;
          font-family: ${theme.font.sans};
        }
        
        p {
          margin: 1rem 0;
          font-size: 1em;
          line-height: 1.625em;
        }
        
        small {
          margin: 0;
          line-height: 1.5;
          font-size: 14px;
        }
        
        b {
          font-weight: 600;
        }
        
        span {
          font-size: inherit;
          color: inherit;
          font-weight: inherit;
        }
        
        img {
          max-width: 100%;
        }
        
        a {
          cursor: pointer;
          font-size: inherit;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          -webkit-box-align: center;
          align-items: center;
          color: ${theme.expressiveness.linkColor};
          text-decoration: ${theme.expressiveness.linkStyle};
        }
        
        a:hover {
          text-decoration: ${theme.expressiveness.linkHoverStyle};
        }
        
        ul, ol {
          padding: 0 0 0 10px;
          list-style-type: none;
          margin: 1rem 0 1rem 0.9375rem;
          color: ${theme.palette.foreground};
        }
        
        ol {
          list-style-type: decimal;
        }
        
        li {
          margin-bottom: .625rem;
          font-size: 1em;
          line-height: 1.625em;
        }
        
        ul li:before {
          content: '–';
          display: inline-block;
          color: ${theme.palette.accents_4};
          position: absolute;
          margin-left: -0.9375rem;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: ${theme.font.sans};
          color: inherit;
          margin: 0 0 .625rem 0;
        }
        
        h1 {
          font-size: 3rem;
          letter-spacing: -.066875rem;
          line-height: 1.5;
          font-weight: 700;
        }
        
        h2 {
          font-size: 2.25rem;
          letter-spacing: -.020625rem;
          font-weight: 600;
        }
        
        h3 {
          font-size: 1.5rem;
          letter-spacing: -.029375rem;
          font-weight: 600;
        }
        
        h4 {
          font-size: 1.25rem;
          letter-spacing: -.020625rem;
          font-weight: 600;
        }
        
        h5 {
          font-size: 1rem;
          letter-spacing: -.01125rem;
          font-weight: 600;
        }
        
        h6 {
          font-size: .875rem;
          letter-spacing: -.005625rem;
          font-weight: 600;
        }
        
        selection {
          background-color: ${theme.palette.background};
          color: ${theme.palette.foreground};
        }
        
        input-webkit-autofill {
          box-shadow: 0 0 0 100px var(--geist-background) inset;
        }
        
        button, input, select, textarea {
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
          color: inherit;
          margin: 0;
        }
        
        button:focus, input:focus, select:focus, textarea:focus {
          outline: none;
        }
        
        code {
          color: ${theme.palette.code};
          font-family: ${theme.font.mono};
          font-size: 0.9em;
          white-space: pre-wrap;
        }
        
        code:before, code:after {
          content: '\`';
        }
        
        pre {
          border: 1px solid ${theme.palette.accents_2};
          border-radius: ${theme.layout.radius};
          padding: ${theme.layout.gap};
          margin: ${theme.layout.gap} 0;
          white-space: pre;
          overflow: auto;
          font-size: 0.875rem;
          -webkit-overflow-scrolling: touch;
        }
        
        pre code {
          color: ${theme.palette.foreground};
          font-size: 0.75rem;
          line-height: 1.25rem;
        }
        
        pre code:before, pre code:after {
          display: none;
        }
        
        hr {
          border-color: ${theme.palette.accents_2};
        }
        
        details {
          background-color: ${theme.palette.accents_1};
          border: none;
        }
        
        details:focus, details:hover, details:active {
          outline: none;
        }
        
        summary {
          cursor: pointer;
          user-select: none;
          list-style: none;
          outline: none;
        }
        
        summary::-webkit-details-marker, summary::before {
          display: none;
        }
        
        summary::-moz-list-bullet {
          font-size: 0;
        }

        summary:focus, summary:hover, summary:active {
          outline: none;
          list-style: none;
        }
      `}</style>
    </>
  )
})

type CssBaselineComponent<P = {}> = React.FC<P> & {
  flush: typeof flushToReact
}

(CSSBaseline as CssBaselineComponent<React.PropsWithChildren<{}>>).flush = flush

export default CSSBaseline as CssBaselineComponent<React.PropsWithChildren<{}>>
