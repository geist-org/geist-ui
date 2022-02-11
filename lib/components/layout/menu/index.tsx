import dynamic from 'next/dynamic'
import MenuSkeleton from './menu-skeleton'

const Menu = dynamic(import('./menu'), {
  ssr: false,
  loading: () => <MenuSkeleton />,
})

export default Menu
