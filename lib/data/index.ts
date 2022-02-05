import enUS from './metadata-en-us.json'
import zhCN from './metadata-zh-cn.json'
import type { Sides } from 'lib/components/layout/sidebar/side-item'

export interface MultipleLocaleMetaInformation {
  [key: string]: Sides[]
}

const Metadata: MultipleLocaleMetaInformation = {
  'en-us': enUS,
  'zh-cn': zhCN,
}

export default Metadata
