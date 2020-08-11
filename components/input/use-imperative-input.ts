import { useRef, useMemo } from 'react'

// support both input and textarea
interface FakeTextInput {
  value: string
  focus: () => void
  blur: () => void
}

const useImperativeInput = <T extends FakeTextInput>() => {
  const ref = useRef<T>(null)

  return useMemo(
    () => ({
      ref,
      setValue: (value: string = '') => {
        /* istanbul ignore next */
        if (!ref.current) return
        ref.current.value = value
      },
      getValue: () => ref.current?.value,
      focus: () => ref.current?.focus(),
      blur: () => ref.current?.blur(),
    }),
    [],
  )
}

export default useImperativeInput
