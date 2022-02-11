import dynamic from 'next/dynamic'
import SidebarSkeleton from './sidebar-skeleton'

const Sidebar = dynamic(import('./sidebar'), {
  ssr: false,
  loading: () => <SidebarSkeleton />,
})

export default Sidebar
