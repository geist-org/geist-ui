import React from 'react'
import useTheme from '../styles/use-theme'

const ButtonLoading: React.FC<{}> = React.memo(() => {
  const theme = useTheme()
  return (
    <span className="loading">
      <i />
      <i />
      <i />
      
      <style jsx>{`
        .loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: ${theme.palette.accents_1};
        }

        i {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: ${theme.palette.accents_6};
          margin: 0 1px;
          display: inline-block;
          animation: loading-blink 1.4s infinite both;
        }
        
        i:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        i:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes loading-blink {
          0% {
            opacity: 0.2;
          }
          
          20% {
            opacity: 1;
          }
          
          100% {
            opacity: 0.2;
          }
        }
      `}</style>
    </span>
  )
})

export default ButtonLoading
