const useDefaultProps = <T extends Record<string | number, any>, D extends Partial<T>>(
  props: T,
  defaultProps: D,
): T & Required<D> => {
  let nextProps = {} as T
  const propsKeys: Array<keyof T> = Object.keys(props || {})
  const defaultKeys: Array<keyof T> = Object.keys(defaultProps || {})

  for (const propsName of propsKeys) {
    nextProps[propsName] = props[propsName] as T[keyof T]
  }

  for (const defaultName of defaultKeys) {
    if (props[defaultName] === undefined) {
      nextProps[defaultName] = defaultProps[defaultName] as T[keyof T]
    }
  }
  return nextProps as T & Required<D>
}

export default useDefaultProps
