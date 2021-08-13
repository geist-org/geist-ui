import React, { useMemo } from 'react'
import useTheme from '../use-theme'

interface Props {
  disabled?: boolean
  checked?: boolean
  fill?: string
  bg?: string
}

const CheckboxIconComponent: React.FC<Props> = ({ fill, bg, disabled, checked }) => {
  const theme = useTheme()

  const { propsFill, propsBg } = useMemo(() => {
    return {
      propsFill: fill,
      propsBg: bg,
    }
  }, [theme.palette])

  return (
    <>
      {checked ? (
        <svg viewBox="0 0 17 16" fill="none">
          <path
            d="M12.1429 0H3.85714C1.7269 0 0 1.79086 0 4V12C0 14.2091 1.7269 16 3.85714 16H12.1429C14.2731 16 16 14.2091 16 12V4C16 1.79086 14.2731 0 12.1429 0Z"
            fill={propsFill}
          />
          <path d="M16 3L7.72491 11L5 8" stroke={propsBg} strokeWidth="1.5" />
        </svg>
      ) : (
        <svg viewBox="0 0 12 12" fill="none">
          <path
            d="M8.5 0.5H3.5C1.84315 0.5 0.5 1.84315 0.5 3.5V8.5C0.5 10.1569 1.84315 11.5 3.5 11.5H8.5C10.1569 11.5 11.5 10.1569 11.5 8.5V3.5C11.5 1.84315 10.1569 0.5 8.5 0.5Z"
            stroke={theme.palette.accents_5}
          />
        </svg>
      )}
      <style jsx>{`
        svg {
          display: inline-flex;
          width: calc(0.86 * var(--checkbox-size));
          height: calc(0.86 * var(--checkbox-size));
          user-select: none;
          opacity: ${disabled ? 0.4 : 1};
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
        }
      `}</style>
    </>
  )
}

CheckboxIconComponent.displayName = 'GeistCheckboxIcon'
const CheckboxIcon = React.memo(CheckboxIconComponent)

export default CheckboxIcon
