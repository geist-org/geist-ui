import enUS from './metadata-en-us.json'
import zhCN from './metadata-zh-cn.json'
import { Sides } from 'lib/components/sidebar/side-item'

export interface MultilLocaleMetaInformation {
  [key: string]: Sides[]
}

const Metadatas: MultilLocaleMetaInformation = {
  'en-us': enUS,
  'zh-cn': zhCN,
}

export default Metadatas
