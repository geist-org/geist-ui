import React from 'react'
import { Image } from 'components/index'
import { css } from 'styled-jsx/css'

export const LogoIcon: React.FC<React.ImgHTMLAttributes<any>> = ({ ...props }) => {
  const { className, styles } = css.resolve`
    .image {
      border-radius: 50%;
      cursor: pointer;
    }
  `
  return (
    <>
      <Image
        className={className}
        src="/images/logo.png"
        {...props}
        width={24}
        height={24}
        draggable={false}
        title="GO HOME"
      />
      {styles}
    </>
  )
}

export default React.memo(LogoIcon)
