import React from 'react'
import { Text, Spacer } from 'components'
import CustomizationLayout from 'lib/components/customization/layout'
import CustomizationEditor from 'lib/components/customization/editor'
import PageHeader from 'lib/components/header'
const meta = {
  title: 'Customization',
}

const Customization = () => {
  return (
    <CustomizationLayout>
      <PageHeader meta={meta} />
      <Spacer y={1.2} />
      <Text h2>Customization</Text>
      <Text>
        Custom themes is a very simple thing in Geist UI, click change, copy or share.
      </Text>
      <CustomizationEditor />
      <Spacer y={2} />
    </CustomizationLayout>
  )
}

export default Customization
