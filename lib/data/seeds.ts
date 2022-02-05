import enUS from './seeds-en-us.json'
import zhCN from './seeds-zh-cn.json'

export type Seed = {
  name: string
  url: string
  group?: string
}

export type Seeds = Array<Seed>

const SEEDS = {
  'en-us': enUS as Seeds,
  'zh-cn': zhCN as Seeds,
}

export default SEEDS
