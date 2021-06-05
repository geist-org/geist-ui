import React, { useState } from 'react'
import { LiveEditor } from 'react-live'
import { useConfigs } from 'lib/config-context'
import { useTheme, useToasts, useClipboard } from 'components'
import CopyIcon from '@geist-ui/react-icons/copy'
import RightIcon from '@geist-ui/react-icons/chevronRight'

interface Props {
  code: string
}

const Editor: React.FC<Props> = ({ code }) => {
  const theme = useTheme()
  const { copy } = useClipboard()
  const { isChinese } = useConfigs()
  const [visible, setVisible] = useState(false)
  const [, setToast] = useToasts()
  const clickHandler = (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    setVisible(!visible)
  }

  const copyHandler = (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    copy(code)
    setToast({ text: isChinese ? '代码已拷贝至剪切板。' : 'code copied.' })
  }

  return (
    <div className="editor">
      <details open={visible}>
        <summary onClick={clickHandler}>
          <div className="summary-safari">
            <div className="action">
              <span className="arrow">
                <RightIcon size={16} />
              </span>
              <span>{isChinese ? '编辑代码' : 'Code Editor'}</span>
            </div>
            <div className="action">
              {visible && (
                <span
                  className="copy"
                  onClick={copyHandler}
                  title={isChinese ? '拷贝代码' : 'Copy Code'}>
                  <CopyIcon size={18} />
                </span>
              )}
            </div>
          </div>
        </summary>
        <div className="area">
          <LiveEditor />
        </div>
      </details>

      <style jsx>{`
        .editor {
          border-bottom-left-radius: ${theme.layout.radius};
          border-bottom-right-radius: ${theme.layout.radius};
        }

        details {
          transition: all 0.2s ease;
          overflow: hidden;
          border-bottom-left-radius: ${theme.layout.radius};
          border-bottom-right-radius: ${theme.layout.radius};
        }

        summary {
          box-sizing: border-box;
          border-top: 1px solid ${theme.palette.accents_2};
          color: ${theme.palette.accents_5};
          width: 100%;
          list-style: none;
          user-select: none;
          outline: none;
        }

        .summary-safari {
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 2.875rem;
          padding: 0 ${theme.layout.gap};
        }

        summary :global(svg) {
          cursor: pointer;
        }

        .action {
          width: auto;
          display: flex;
          align-items: center;
          font-size: 0.8rem;
        }

        .area {
          position: relative;
          box-sizing: border-box;
          white-space: pre;
          font-family: ${theme.font.mono};
          color: ${theme.palette.foreground};
          background-color: ${theme.palette.background};
          font-size: 1em;
          overflow: hidden;
          border-top: 1px solid ${theme.palette.accents_2};
          padding: ${theme.layout.gapHalf};
        }

        .arrow {
          transition: all 0.2s ease;
          transform: rotate(${visible ? 90 : 0}deg);
          display: inline-flex;
          align-items: center;
          width: 1rem;
          height: 1rem;
          margin-right: 0.5rem;
        }

        .copy {
          display: inline-flex;
          align-items: center;
          color: ${theme.palette.accents_4};
          transition: color 0.2s ease;
        }

        .copy:hover {
          color: ${theme.palette.accents_6};
        }
      `}</style>
    </div>
  )
}

export default Editor
