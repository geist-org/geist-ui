import { Tabs } from 'components'
function App() {
  return (
    <Tabs initialValue="1">
      <Tabs.Item label="Evil Rabbit" value="1">
        The Evil Rabbit Jumped over the Fence.
      </Tabs.Item>
      <Tabs.Item label="jumped" value="2">
        The Fence Jumped over The Evil Rabbit.
      </Tabs.Item>
      <Tabs.Item label="disable" value="3" disabled>
        Hello disable
      </Tabs.Item>
    </Tabs>
  )
}
export default App

export const titleEN = `Default`
export const titleZH = `默认`
export const descEN = `Toggle display of different tabs. without caring about the component state`
export const descZH = `切换不同选项卡，使用者无需管理状态`
