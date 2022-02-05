import dynamic from 'next/dynamic'

const SearchDynamic = dynamic(() => import('./search'), {
  ssr: false,
  loading: () => null,
})

const Search = () => {
  return (
    <div className="search">
      <SearchDynamic />
      <style jsx>{`
        .search {
          visibility: hidden;
        }
      `}</style>
    </div>
  )
}

export default Search
