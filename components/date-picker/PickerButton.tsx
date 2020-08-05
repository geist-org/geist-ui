import * as React from 'react'
import Button from '../button'
import { ButtonProps } from '../button/button'

// confirm button for time picker
export default function PickerButton(props: Partial<ButtonProps>) {
  return <Button size="small" color="primary" {...props} />
}
