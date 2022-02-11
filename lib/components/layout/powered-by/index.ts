import dynamic from 'next/dynamic'

const PoweredBy = dynamic(import('./powered-by'), { ssr: false, loading: () => null })

export default PoweredBy
