import React from 'react'

interface DefaultExpandIconProps<RecordType> {
  onExpand: (record: RecordType, e: React.MouseEvent<HTMLElement>) => void
  record: RecordType
  expanded: boolean
  expandable: boolean
}

function ExpandIcon<RecordType>({
  onExpand,
  record,
  expanded,
  expandable,
}: DefaultExpandIconProps<RecordType>) {
  const iconPrefix = `table-row-expand-icon`

  return (
    <button
      type="button"
      onClick={e => {
        onExpand(record, e!)
        e.stopPropagation()
      }}
      className={`${iconPrefix} ${!expandable ? iconPrefix + '-spaced' : ''} ${
        expandable && expanded ? iconPrefix + '-expanded' : ''
      } ${expandable && !expanded ? iconPrefix + '-collapsed' : ''}`}
    />
  )
}

export default ExpandIcon
