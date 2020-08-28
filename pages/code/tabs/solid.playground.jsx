import { Tabs } from 'components'
function ___App() {
  return (
    <Tabs initialValue="1" varient="solid">
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

export const titleEN = `Solid`
export const titleZH = `Solid`
export const descEN = `This is a solid varient`
export const descZH = `Solid 的展现形式`
