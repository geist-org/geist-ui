import React from 'react'
import Loading from '../loading'

interface Props {
  color: string
}

const ButtonLoading: React.FC<React.PropsWithChildren<Props>> = ({ color }) => {
  return (
    <div className="btn-loading">
      <Loading color={color} />
      <style jsx>{`
        .btn-loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          background-color: var(--zeit-ui-button-bg);
        }
      `}</style>
    </div>
  )
}

export default React.memo(ButtonLoading)
