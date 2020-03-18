import React from 'react'
import { ConfigContext, Configs } from './config-context'

const useConfigs = (): Configs => React.useContext(ConfigContext)

export default useConfigs
