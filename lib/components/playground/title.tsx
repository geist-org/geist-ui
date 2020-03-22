import React from 'react'
import withDefaults from 'components/utils/with-defaults'

interface Props {
  title: React.ReactNode | string
  desc?: string
}

const defaultProps = {
  desc: '',
}

export type TitleProps = Props & typeof defaultProps

const replaceCode = (desc: string) => {
  if (!desc.includes('`')) return desc
  let count = 0
  return desc.replace(/`/g, () => {
    const val = count % 2 === 0 ? '<code>' : '</code>'
    count ++
    return val
  })
}

const Title: React.FC<TitleProps> = React.memo(props => {
  
  return (
    <>
      <h3>{props.title}</h3>
      {props.desc && <p dangerouslySetInnerHTML={{ __html: replaceCode(props.desc) }} />}
  
      <style jsx>{`
        h3 {
          margin-bottom: ${props.desc ? 0 : '30px'};
          line-height: 1;
          font-size: 1.3rem;
          margin-top: 75px;
          text-transform: capitalize;
        }
        
        h3 > p {
          margin: 0;
        }
        
        h3 > :global(code), h3 > :global(pre) {
          text-transform: none;
        }
      `}</style>
    </>
  )
})

export default withDefaults(Title, defaultProps)
