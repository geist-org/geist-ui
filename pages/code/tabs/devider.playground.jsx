import { Tabs } from 'components'
function ___App() {
  return (
    <Tabs initialValue="1" showDivider={true}>
      <Tabs.Item label="evil rabbit" value="1">
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
export default ___App

export const titleEN = `Devider`
export const titleZH = `分割线`
export const descEN = `Choose to show devider`
export const descZH = `是否展示分割线`
