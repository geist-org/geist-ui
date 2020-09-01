import React, { useMemo, useState } from 'react'
import { StatusMap, reduceStatus } from './style'
import { TabVarient } from 'components/utils/prop-types'
import { defaultGetColor } from './style'
import useTheme from '../styles/use-theme'

export interface NavCptProps {
  varient: TabVarient
  status: StatusMap
  label: string
}

const Nav: React.FC<NavCptProps> = ({ label, status, varient }) => {
  const [hover, setHover] = useState(false)
  const reducedStatus = useMemo(() => reduceStatus({ ...status, hover }), [status, hover])
  const { palette, layout, expressiveness } = useTheme()
  const colors = useMemo(() => defaultGetColor(palette, varient, reducedStatus), [
    varient,
    reducedStatus,
  ])
  return (
    <div className="nav" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div style={{ ...colors }} className="label">
        {label}
      </div>
      {varient === 'line' ? <div className="bottom"></div> : null}

      <style jsx>
        {`
          .nav {
            display: flex;
            flex-direction: column;
            position: relative;
          }
          .label {
            cursor: ${reducedStatus === 'disabled' ? 'not-allowed' : ''};
            font-weight: ${reducedStatus === 'active' ? '500' : '400'};
            white-space: nowrap;
            line-height: 22px;
            padding: ${layout.gapHalf} ${layout.gap};
            border-radius: ${expressiveness.R2} ${expressiveness.R2} 0px 0px;
            text-align: center;
          }
          .bottom {
            background-color: ${palette.cTheme5};
            transition: all 200ms ease;
            opacity: ${reducedStatus === 'active' ? '1' : '0'};
            transform: scale(${reducedStatus === 'active' ? '1' : '0.75'});
            height: 4px;
            width: 100%;
          }
        `}
      </style>
    </div>
  )
}

export default Nav
