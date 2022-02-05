export type classNamesObject = Record<
  string,
  boolean | string | number | null | undefined
>
export type className = string | classNamesObject | null | undefined | boolean | number

const classObjectToString = (className: classNamesObject) => {
  const keys = Object.keys(className)
  const len = keys.length
  let str = ''
  for (let index = 0; index < len; index++) {
    const key = keys[index]
    const val = className[keys[index]]
    if (!val) continue
    str = str ? `${str} ${String(key)}` : String(key)
  }
  return str
}

const isObjectClassName = (value: className): value is classNamesObject =>
  typeof value === 'object' && !Array.isArray(value)

const useClasses = (...classNames: Array<className>): string => {
  const len = classNames.length
  let classes = ''
  if (len === 0) return classes
  for (let index = 0; index < len; index++) {
    const val = classNames[index]
    if (!val) continue
    if (isObjectClassName(val)) {
      classes += ` ${classObjectToString(val)}`
    } else {
      classes += ` ${String(val).trim()}`
    }
  }
  return classes.trim()
}

export default useClasses
