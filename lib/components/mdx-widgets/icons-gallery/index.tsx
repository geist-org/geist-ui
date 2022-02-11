import dynamic from 'next/dynamic'

const IconsGallery = dynamic(() => import('./icons-gallery'), {
  ssr: false,
  loading: () => null,
})

export default IconsGallery
