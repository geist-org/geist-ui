import * as React from 'react'
import Tag, { Props } from '../tag'

// tag style for range picker `ranges` prop
export default function PickerTag(props: Partial<Props>) {
  return <Tag type="default" className="tag" {...props} />
}
