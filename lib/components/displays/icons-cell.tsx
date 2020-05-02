import React from 'react'
import { Text, useTheme } from 'components'

export const getFileName = (name: string): string => {
  return name.replace(/^(.)/, g => g.toLowerCase())
}

export const getImportString = (name: string) => {
  const fileName = getFileName(name)
  const single = `import ${name} from '@zeit-ui/react-icons/${fileName}'`
  const normal = `import { ${name} } from '@zeit-ui/react-icons'`
  return {
    single, normal,
  }
}

interface Props {
  component: React.ComponentType<any>
  name: string
  onClick: (name: string) => void
}

const IconsCell: React.FC<Props> = ({
  component: Component, name, onClick
}) => {
  const theme = useTheme()
  return (
    <div className="icon-item" key={name} onClick={() => onClick(name)}>
      <Component />
      <Text type="secondary" small>{name}</Text>
      <style jsx>{`
        .icon-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          flex-grow: 0;
          flex-basis: 125px;
          min-width: 0px;
          height: 95px;
          margin: 12px 5px;
          border-radius: ${theme.layout.radius};
          box-sizing: border-box;
          cursor: pointer;
          user-select: none;
          transition: all 150ms ease-in-out;
        }
        
        .icon-item > :global(small) {
          display: inline-block;
          width: 90%;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .icon-item:hover {
          box-shadow: ${theme.expressiveness.shadowMedium};
        }
        
        @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
          .icon-item {
            flex-basis: 30%;
          }
        }
      `}</style>
    </div>
  )
}

export default React.memo(IconsCell)
