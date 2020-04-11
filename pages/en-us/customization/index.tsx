import React from 'react'
import { Text, Spacer } from 'components'
import CustomizationLayout from 'lib/components/customization/layout'
import CustomizationEditor from 'lib/components/customization/editor'

const Customization = () => {
  return (
    <CustomizationLayout>
      <Spacer y={1.2} />
      <Text h2>Customization</Text>
      <Text>Custom themes is a very simple thing in ZEIT UI, click change, copy or share.</Text>
      <CustomizationEditor />
      <Spacer y={2} />
    </CustomizationLayout>
  )
}

export default Customization
