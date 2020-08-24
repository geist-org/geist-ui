import React from 'react'
import { Text, Spacer } from 'components'
import CustomizationLayout from 'lib/components/customization/layout'
import CustomizationEditor from 'lib/components/customization/editor'
import PageHeader from 'lib/components/header'
const meta = {
  title: '定制化',
}

const Customization = () => {
  return (
    <CustomizationLayout>
      <PageHeader meta={meta} />
      <Spacer y={1.2} />
      <Text h2>定制化</Text>
      <Text>在 Geist UI 中自定义主题非常简单，点击更改，然后拷贝或是分享。</Text>
      <CustomizationEditor />
      <Spacer y={2} />
    </CustomizationLayout>
  )
}

export default Customization
