import { Tabs, Divider, Spacer } from 'components'
function App() {
  const [value, setValue] = React.useState('1')
  return (
    <div>
      <Tabs value="1">
        <Tabs.Item label="You can not change me!" value="1">
          The Evil Rabbit Jumped over the Fence.
        </Tabs.Item>
        <Tabs.Item label="jumped" value="2">
          The Fence Jumped over The Evil Rabbit.
        </Tabs.Item>
        <Tabs.Item label="disable" value="3" disabled>
          Hello disable
        </Tabs.Item>
      </Tabs>
      <Spacer y="0.5" />
      <Divider />
      <Spacer y="0.5" />
      <Tabs value={value} onChange={setValue}>
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
    </div>
  )
}
export const titleEN = `Controlled Component`
export const titleZH = `受控组件`
export const descEN = `Controlled style is also support`
export const descZH = `支持受控组件写法`
export default App
