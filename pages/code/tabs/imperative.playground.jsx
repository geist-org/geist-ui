import { Tabs, Spacer, Button } from 'components'

function App() {
  const { setCurrentTab, getCurrentTab, ref } = Tabs.useTabsHandle()
  return (
    <div>
      <Button onClick={() => alert('current tab:' + getCurrentTab())}>Alert current tab</Button>
      <Spacer x={1} inline />
      <Button onClick={() => setCurrentTab('2')}>Set second tab imperatively</Button>
      <Spacer y={1} />
      <Tabs initialValue="1" ref={ref}>
        <Tabs.Item label="evil rabbit" value="1">
          The Evil Rabbit Jumped over the Fence.
        </Tabs.Item>
        <Tabs.Item label="jumped" value="2">
          The Fence Jumped over The Evil Rabbit.
        </Tabs.Item>
      </Tabs>
    </div>
  )
}

export const titleEN = `Imperative API`
export const titleZH = `Imperative 接口`
export const descEN = `The current tab can be set imperatively `
export const descZH = `可以使用imperative的方法来控制当前选项卡`

export default App
