import { Tabs, Spacer, Button } from 'components'

function App() {
  const idx = React.useRef(3)
  const [tabs, setTabs] = React.useState([
    {
      label: 'evil rabbit',
      value: '1',
      deletable: true,
      content: 'The Evil Rabbit Jumped over the Fence.',
    },
    {
      label: 'jumped',
      value: '2',
      content: 'The Fence Jumped over The Evil Rabbit.',
    },
  ])

  return (
    <div>
      <Button
        onClick={() => {
          setTabs(tabs => {
            return tabs.concat([
              {
                label: `new staff ${idx.current}`,
                value: idx.current++ + '',
                deletable: true,
                content: `Content of new staff ${idx.current - 1}`,
              },
            ])
          })
        }}>
        Add New Staff
      </Button>
      <Spacer y={1} />
      <Tabs initialValue="1">
        {tabs.map(({ label, content, value, deletable }) => (
          <Tabs.Item
            key={value}
            label={
              deletable ? (
                <div>
                  {label}{' '}
                  <span
                    onClick={e => {
                      e.stopPropagation()
                      setTabs(tabs => tabs.filter(x => x.value !== value))
                    }}>
                    x
                  </span>
                </div>
              ) : (
                label
              )
            }
            value={value}>
            {content}
          </Tabs.Item>
        ))}
      </Tabs>
    </div>
  )
}

export const titleEN = `Dynamic Tab content`
export const titleZH = `动态选显卡内容`
export const descEN = `Tab content can be controlled by user`
export const descZH = `选显卡内容可以由用户控制`

export default App
