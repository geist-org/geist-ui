import dynamic from 'next/dynamic'

const Aligolia = dynamic(() => import('./algolia'), {
  ssr: false,
  loading: () => null,
})

const Search = () => {
  return (
    <div className="search">
      <Aligolia />
      <style jsx>{`
        .search {
          visibility: hidden;
        }
      `}</style>
    </div>
  )
}

export default Search
