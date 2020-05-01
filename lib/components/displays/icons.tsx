import React from 'react'
import { Card, Input, Text, useInput, useTheme } from 'components'
import * as Icon from '@zeit-ui/react-icons'

const Icons: React.FC = () => {
  const theme = useTheme()
  const { state: query, bindings } = useInput('')
  const icons = Object.entries(Icon).filter(
    ([name]) => !query || name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      <h3 className="title">Icons Gallery</h3>
      <Card>
        <Input width="100%" icon={<Icon.Search />} placeholder="Search" {...bindings} />
        <div className="icons-grid">
          {icons.map(([name, Component]) => (
            <div className="icon-item" key={name}>
              <Component />
              <Text type="secondary" small>
                {name}
              </Text>
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
        }

        .icon-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          flex-grow: 0;
          flex-basis: 25%;
          min-width: 0px;
          height: 100px;
        }
        @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
          .icon-item {
            flex-basis: 33%;
          }
        }
      `}</style>
    </>
  )
}

export default Icons
