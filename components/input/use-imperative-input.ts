import { useRef, useMemo } from 'react'

interface GeneralTextField {
  value: string
  focus: () => void
  blur: () => void
}

export const useImperativeTextFieldHandlerGenerator = <T extends GeneralTextField>() => {
  return () => {
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
}

const useInputHandle = useImperativeTextFieldHandlerGenerator<HTMLInputElement>()
const useAutoCompleteHandle = useInputHandle
const useTextareaHandle = useImperativeTextFieldHandlerGenerator<HTMLTextAreaElement>()

export { useInputHandle, useTextareaHandle, useAutoCompleteHandle }
