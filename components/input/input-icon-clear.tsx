import React, { useMemo } from 'react'
import useTheme from '../styles/use-theme'

interface Props {
  visible: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  heightRatio?: string | undefined
  disabled?: boolean
}

const InputIconClear: React.FC<Props> = ({ onClick, heightRatio, disabled, visible }) => {
  const theme = useTheme()
  const width = useMemo(() => {
    return `calc(${theme.layout.gap} * ${heightRatio} * .46)`
  }, [heightRatio])
  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    onClick && onClick(event)
  }
  return (
    <div onClick={clickHandler} className={`clear-icon ${visible ? 'visible' : ''}`}>
      <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 1.75C4.1125 1.75 1.75 4.1125 1.75 7C1.75 9.8875 4.1125 12.25 7 12.25C9.8875 12.25 12.25 9.8875 12.25 7C12.25 4.1125 9.8875 1.75 7 1.75ZM9.29688 8.37812L8.37812 9.29688L7 7.91875L5.62188 9.29688L4.70312 8.37812L6.08125 7L4.70312 5.62188L5.62188 4.70312L7 6.08125L8.37812 4.70312L9.29688 5.62188L7.91875 7L9.29688 8.37812Z"
          fill="currentColor"
        />
      </svg>
      <style jsx>{`
        .clear-icon {
          padding: 0 ${theme.layout.gapHalf};
          margin: 0;
          display: inline-flex;
          align-items: center;
          height: 100%;
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          box-sizing: border-box;
          transition: color 150ms ease 0s;
          color: ${theme.palette.cNeutral2};
          visibility: hidden;
          opacity: 0;
        }

        .visible {
          visibility: visible;
          opacity: 1;
        }

        .clear-icon:hover {
          color: ${disabled ? theme.palette.cNeutral2 : theme.palette.cNeutral7};
        }

        svg {
          color: currentColor;
          width: ${width};
          height: ${width};
        }
      `}</style>
    </div>
  )
}

const MemoInputIconClear = React.memo(InputIconClear)

export default MemoInputIconClear
