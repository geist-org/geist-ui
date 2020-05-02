import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import MenuLinks from './menu-links'
import MenuSticker from './menu-sticker'
import { useConfigs } from 'lib/config-context'

const Menu: React.FC<{}> = () => {
  const router = useRouter()
  const { isChinese } = useConfigs()
  const [showAfterRender, setShowAfterRender] = useState<boolean>(false)
  useEffect(() => setShowAfterRender(true), [])
  useEffect(() => {
    const prefetch = async () => {
      const urls = isChinese ? [
        '/zh-cn/guide/introduction',
        '/zh-cn/components/text',
        '/zh-cn/customization',
      ] : [
        '/en-us/guide/introduction',
        '/en-us/components/text',
        '/en-us/customization',
      ]
      await Promise.all(urls.map(async (url) => {
        await router.prefetch(url)
      }))
    }
    prefetch()
      .then()
      .catch(err => console.log(err))
  }, [isChinese])
  
  if (!showAfterRender) return null
  return (
    <div>
      <MenuLinks />
      <MenuSticker />
    </div>
  )
}

export default Menu
