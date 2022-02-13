import React, { ReactElement } from 'react'
import useTheme from '../use-theme'
import flush, { flushToHTML } from 'styled-jsx/server'

export type FlushToReact = <T>(opts?: { nonce?: string }) => Array<ReactElement<T>>
export type FlushToHTML = (opts?: { nonce?: string }) => string

const CssBaseline: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const theme = useTheme()

  return (
    <>
      {children}
      <style global jsx>{`
        html,
        body {
          background-color: ${theme.palette.background};
          color: ${theme.palette.foreground};
        }

        html {
          font-size: 16px;
          --geist-icons-background: ${theme.palette.background};
        }

        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          font-size: 1rem;
          line-height: 1.5;
          margin: 0;
          padding: 0;
          min-height: 100%;
          position: relative;
          overflow-x: hidden;
          font-family: ${theme.font.sans};
        }

        #__next {
          overflow-x: hidden;
        }

        *,
        *:before,
        *:after {
          box-sizing: inherit;
          text-rendering: geometricPrecision;
          -webkit-tap-highlight-color: transparent;
        }

        p,
        small {
          font-weight: 400;
          color: inherit;
          letter-spacing: -0.005625em;
          font-family: ${theme.font.sans};
        }

        p {
          margin: 1em 0;
          font-size: 1em;
          line-height: 1.625em;
        }

        small {
          margin: 0;
          line-height: 1.5;
          font-size: 0.875em;
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
          color: ${theme.palette.link};
          text-decoration: ${theme.expressiveness.linkStyle};
        }

        a:hover {
          text-decoration: ${theme.expressiveness.linkHoverStyle};
        }

        ul,
        ol {
          padding: 0;
          list-style-type: none;
          margin: ${theme.layout.gapHalf} ${theme.layout.gapHalf} ${theme.layout.gapHalf}
            ${theme.layout.gap};
          color: ${theme.palette.foreground};
        }

        ol {
          list-style-type: decimal;
        }

        li {
          margin-bottom: 0.625em;
          font-size: 1em;
          line-height: 1.625em;
        }

        ul li:before {
          content: '–';
          display: inline-block;
          color: ${theme.palette.accents_4};
          position: absolute;
          margin-left: -0.9375em;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          color: inherit;
          margin: 0 0 0.7rem 0;
        }

        h1 {
          font-size: 3rem;
          letter-spacing: -0.02em;
          line-height: 1.5;
          font-weight: 700;
        }

        h2 {
          font-size: 2.25rem;
          letter-spacing: -0.02em;
          font-weight: 600;
        }

        h3 {
          font-size: 1.5rem;
          letter-spacing: -0.02em;
          font-weight: 600;
        }

        h4 {
          font-size: 1.25rem;
          letter-spacing: -0.02em;
          font-weight: 600;
        }

        h5 {
          font-size: 1rem;
          letter-spacing: -0.01em;
          font-weight: 600;
        }

        h6 {
          font-size: 0.875rem;
          letter-spacing: -0.005em;
          font-weight: 600;
        }

        button,
        input,
        select,
        textarea {
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
          color: inherit;
          margin: 0;
        }

        button:focus,
        input:focus,
        select:focus,
        textarea:focus {
          outline: none;
        }

        code {
          color: ${theme.palette.code};
          font-family: ${theme.font.mono};
          font-size: 0.9em;
          white-space: pre-wrap;
        }

        code:before,
        code:after {
          content: '\`';
        }

        pre {
          padding: calc(${theme.layout.gap} * 0.9) ${theme.layout.gap};
          margin: ${theme.layout.gap} 0;
          border: 1px solid ${theme.palette.accents_2};
          border-radius: ${theme.layout.radius};
          font-family: ${theme.font.mono};
          white-space: pre;
          overflow: auto;
          line-height: 1.5;
          text-align: left;
          font-size: 14px;
          -webkit-overflow-scrolling: touch;
        }

        pre code {
          color: ${theme.palette.foreground};
          font-size: 1em;
          line-height: 1.25em;
          white-space: pre;
        }

        pre code:before,
        pre code:after {
          display: none;
        }

        pre :global(p) {
          margin: 0;
        }

        pre::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
          background: transparent;
        }

        hr {
          border-color: ${theme.palette.accents_2};
        }

        details {
          background-color: ${theme.palette.accents_1};
          border: none;
        }

        details:focus,
        details:hover,
        details:active {
          outline: none;
        }

        summary {
          cursor: pointer;
          user-select: none;
          list-style: none;
          outline: none;
        }

        summary::marker,
        summary::before,
        summary::-webkit-details-marker {
          display: none;
        }

        summary::-moz-list-bullet {
          font-size: 0;
        }

        summary:focus,
        summary:hover,
        summary:active {
          outline: none;
          list-style: none;
        }

        blockquote {
          padding: calc(0.667 * ${theme.layout.gap}) ${theme.layout.gap};
          color: ${theme.palette.accents_5};
          background-color: ${theme.palette.accents_1};
          border-radius: ${theme.layout.radius};
          margin: 1.5em 0;
          border: 1px solid ${theme.palette.border};
        }

        blockquote :global(*:first-child) {
          margin-top: 0;
        }

        blockquote :global(*:last-child) {
          margin-bottom: 0;
        }

        ::selection {
          background-color: ${theme.palette.selection};
          color: ${theme.palette.foreground};
        }
      `}</style>
    </>
  )
}

type MemoCssBaselineComponent<P = {}> = React.NamedExoticComponent<P> & {
  flush: FlushToReact
  flushToHTML: FlushToHTML
}

const MemoCssBaseline = React.memo(CssBaseline) as MemoCssBaselineComponent<
  React.PropsWithChildren<unknown>
>
MemoCssBaseline.flush = flush
MemoCssBaseline.flushToHTML = flushToHTML

export default MemoCssBaseline
