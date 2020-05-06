import dynamic from 'next/dynamic'

const DynamicPlaygroundWithNoSSR = dynamic(() => import('./playground'), { ssr: false })

export default DynamicPlaygroundWithNoSSR
