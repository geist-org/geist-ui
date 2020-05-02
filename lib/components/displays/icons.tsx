import React from 'react'
import { Card, Input, Text, useInput, useTheme } from 'components'
import * as Icon from '@zeit-ui/react-icons'

const Icons: React.FC = () => {
  const theme = useTheme()
  const { state: query, bindings } = useInput('')
  const icons = Object.entries(Icon).filter(
    ([name]) => !query || name.toLowerCase().includes(query.toLowerCase())
  )
  const clickHandler = (name: string) => {
    console.log(name)
  }

  return (
    <>
      <h3 className="title">Icons Gallery</h3>
      <Card>
        <Input width="100%" icon={<Icon.Search />} placeholder="Search" {...bindings} />
        <div className="icons-grid">
          {icons.map(([name, Component]) => (
            <div className="icon-item" key={name} onClick={() => clickHandler(name)}>
              <Component />
              <Text type="secondary" small>{name}</Text>
            </div>
          ))}
        </div>
      </Card>
      <style jsx>{`
        .title {
          line-height: 1;
          margin-top: 75px;
          margin-bottom: 30px;
        }

        :global(input) {
          margin-bottom: 4px !important;
        }

        .icons-grid {
          display: flex;
          flex-wrap: wrap;
          margin-top: 8pt;
          justify-content: space-around;
        }

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
    </>
  )
}

export default Icons
