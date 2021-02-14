import React from 'react'
import VirtualAnchor from 'lib/components/anchor'
import withDefaults from 'components/utils/with-defaults'

interface Props {
  title: React.ReactNode | string
  desc?: React.ReactNode | string
}

const defaultProps = {
  desc: '',
}

export type TitleProps = Props & typeof defaultProps

const replaceCode = (desc: string): string => {
  if (!desc.includes('`')) return desc
  let count = 0
  return desc.replace(/`/g, () => {
    const val = count % 2 === 0 ? '<code>' : '</code>'
    count++
    return val
  })
}

const Title: React.FC<TitleProps> = React.memo(({ title, desc }) => {
  const isStringDesc = typeof desc === 'string'
  return (
    <>
      <h3>
        <VirtualAnchor>{title}</VirtualAnchor>
      </h3>
      {desc && isStringDesc && (
        <p dangerouslySetInnerHTML={{ __html: replaceCode(desc) }} />
      )}
      {desc && !isStringDesc && <p>{desc}</p>}
      <style jsx>{`
        h3 {
          margin-bottom: ${desc ? 0 : '30px'};
          line-height: 1;
          font-size: 1.3rem;
          margin-top: 75px;
          text-transform: capitalize;
          position: relative;
        }

        h3 > p {
          margin: 0;
        }

        h3 > :global(code),
        h3 > :global(pre) {
          text-transform: none;
        }
      `}</style>
    </>
  )
})

export default withDefaults(Title, defaultProps)
