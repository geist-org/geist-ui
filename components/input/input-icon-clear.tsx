import React from 'react'
import useTheme from '../use-theme'

interface Props {
  visible: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  disabled?: boolean
}

const InputIconClear: React.FC<Props> = ({ onClick, disabled, visible }) => {
  const theme = useTheme()
  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    onClick && onClick(event)
  }
  return (
    <div onClick={clickHandler} className={`clear-icon ${visible ? 'visible' : ''}`}>
      <svg
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        shapeRendering="geometricPrecision">
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </svg>

      <style jsx>{`
        .clear-icon {
          box-sizing: border-box;
          display: inline-flex;
          width: calc(var(--input-height) - 2px);
          flex-shrink: 0;
          height: 100%;
          align-items: center;
          justify-content: center;
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          transition: color 150ms ease 0s;
          margin: 0;
          padding: 0;
          color: ${theme.palette.accents_3};
          visibility: hidden;
          opacity: 0;
        }

        .visible {
          visibility: visible;
          opacity: 1;
        }

        .clear-icon:hover {
          color: ${disabled ? theme.palette.accents_3 : theme.palette.foreground};
        }

        svg {
          color: currentColor;
          width: calc(var(--input-height) - 2px);
          height: calc(var(--input-height) - 2px);
          transform: scale(0.44);
        }
      `}</style>
    </div>
  )
}

const MemoInputIconClear = React.memo(InputIconClear)

export default MemoInputIconClear
