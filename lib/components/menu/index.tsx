import React, { useEffect, useState } from 'react'
import MenuLinks from './menu-links'
import MenuSticker from './menu-sticker'

const Menu: React.FC<{}> = () => {
  const [showAfterRender, setShowAfterRender] = useState<boolean>(false)
  useEffect(() => setShowAfterRender(true), [])
  
  if (!showAfterRender) return null
  return (
    <div>
      <MenuLinks />
      <MenuSticker />
    </div>
  )
}

export default Menu
