import * as React from 'react'
import Tag, { Props } from '../tag'

// tag style for range picker `ranges` prop
export default function PickerTag(props: Partial<Props>) {
  return <Tag color="default" className="tag" {...props} />
}
