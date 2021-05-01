import React, {
  CSSProperties,
  PropsWithoutRef,
  RefAttributes,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import Input from '../input'
import AutoCompleteItem, { AutoCompleteItemProps } from './auto-complete-item'
import AutoCompleteDropdown from './auto-complete-dropdown'
import AutoCompleteSearching from './auto-complete-searching'
import AutoCompleteEmpty from './auto-complete-empty'
import { AutoCompleteContext, AutoCompleteConfig } from './auto-complete-context'
import { NormalSizes, NormalTypes } from '../utils/prop-types'
import Loading from '../loading'
import { pickChild } from '../utils/collections'
import useCurrentState from '../utils/use-current-state'

export type AutoCompleteOption = {
  label: string
  value: string
}

export type AutoCompleteOptions = Array<
  typeof AutoCompleteItem | AutoCompleteOption | React.ReactElement<AutoCompleteItemProps>
>

interface Props {
  options: AutoCompleteOptions
  size?: NormalSizes
  status?: NormalTypes
  initialValue?: string
  value?: string
  width?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  onSelect?: (value: string) => void
  searching?: boolean | undefined
  clearable?: boolean
  dropdownClassName?: string
  dropdownStyle?: CSSProperties
  disableMatchWidth?: boolean
  disableFreeSolo?: boolean
  className?: string
}

const defaultProps = {
  options: [] as AutoCompleteOptions,
  initialValue: '',
  disabled: false,
  clearable: false,
  size: 'medium' as NormalSizes,
  disableMatchWidth: false,
  disableFreeSolo: false,
  className: '',
}

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof Props>
export type AutoCompleteProps = Props & typeof defaultProps & NativeAttrs

const childrenToOptionsNode = (options: Array<AutoCompleteOption>) =>
  options.map((item, index) => {
    const key = `auto-complete-item-${index}`
    if (React.isValidElement(item)) return React.cloneElement(item, { key })
    const validItem = item as AutoCompleteOption
    return (
      <AutoCompleteItem key={key} value={validItem.value} isLabelOnly>
        {validItem.label}
      </AutoCompleteItem>
    )
  })

// When the search is not set, the "clearable" icon can be displayed in the original location.
// When the search is seted, at least one element should exist to avoid re-render.
const getSearchIcon = (searching?: boolean) => {
  if (searching === undefined) return null
  return searching ? <Loading size="medium" /> : <span />
}

const AutoComplete = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<AutoCompleteProps>
>(
  (
    {
      options,
      initialValue: customInitialValue,
      onSelect,
      onSearch,
      onChange,
      searching,
      children,
      size,
      status,
      value,
      width,
      clearable,
      disabled,
      dropdownClassName,
      dropdownStyle,
      disableMatchWidth,
      disableFreeSolo,
      ...props
    },
    ref: React.Ref<HTMLInputElement | null>,
  ) => {
    const divRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const resetTimer = useRef<number>()
    const [state, setState, stateRef] = useCurrentState<string>(customInitialValue)
    const [selectVal, setSelectVal] = useState<string>(customInitialValue)
    const [visible, setVisible] = useState<boolean>(false)
    useImperativeHandle(ref, () => inputRef.current)

    const [, searchChild] = pickChild(children, AutoCompleteSearching)
    const [, emptyChild] = pickChild(children, AutoCompleteEmpty)
    const autoCompleteItems = useMemo(() => {
      const hasSearchChild = searchChild && React.Children.count(searchChild) > 0
      const hasEmptyChild = emptyChild && React.Children.count(emptyChild) > 0
      if (searching) {
        return hasSearchChild ? (
          searchChild
        ) : (
          <AutoCompleteSearching>Searching...</AutoCompleteSearching>
        )
      }
      if (options.length === 0) {
        if (state === '') return null
        return hasEmptyChild ? (
          emptyChild
        ) : (
          <AutoCompleteEmpty>No Options</AutoCompleteEmpty>
        )
      }
      return childrenToOptionsNode(options as Array<AutoCompleteOption>)
    }, [searching, options])
    const showClearIcon = useMemo(() => clearable && searching === undefined, [
      clearable,
      searching,
    ])

    const updateValue = (val: string) => {
      if (disabled) return
      setSelectVal(val)
      onSelect && onSelect(val)
      setState(val)
      inputRef.current && inputRef.current.focus()
    }
    const updateVisible = (next: boolean) => setVisible(next)
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setVisible(true)
      onSearch && onSearch(event.target.value)
      setState(event.target.value)
    }
    const resetInputValue = () => {
      if (!disableFreeSolo) return
      if (!state || state === '') return
      if (state !== selectVal) {
        setState(selectVal)
      }
    }

    useEffect(() => {
      onChange && onChange(state)
    }, [state])
    useEffect(() => {
      if (value === undefined) return
      setState(value)
    }, [value])

    const initialValue = useMemo<AutoCompleteConfig>(
      () => ({
        ref: divRef,
        size,
        value: state,
        updateValue,
        visible,
        updateVisible,
      }),
      [state, visible, size],
    )

    const toggleFocusHandler = (next: boolean) => {
      clearTimeout(resetTimer.current)
      setVisible(next)
      if (next) {
        onSearch && onSearch(stateRef.current)
      } else {
        resetTimer.current = window.setTimeout(() => {
          resetInputValue()
          clearTimeout(resetTimer.current)
        }, 100)
      }
    }

    const inputProps = {
      ...props,
      width,
      disabled,
      value: state,
    }

    return (
      <AutoCompleteContext.Provider value={initialValue}>
        <div ref={divRef} className="auto-complete">
          <Input
            ref={inputRef}
            size={size}
            status={status}
            onChange={onInputChange}
            onFocus={() => toggleFocusHandler(true)}
            onBlur={() => toggleFocusHandler(false)}
            clearable={showClearIcon}
            iconRight={getSearchIcon(searching)}
            {...inputProps}
          />
          <AutoCompleteDropdown
            visible={visible}
            disableMatchWidth={disableMatchWidth}
            className={dropdownClassName}
            dropdownStyle={dropdownStyle}>
            {autoCompleteItems}
          </AutoCompleteDropdown>

          <style jsx>{`
            .auto-complete {
              width: ${width || 'max-content'};
            }

            .auto-complete :global(.loading) {
              left: -3px;
              right: -3px;
              width: max-content;
            }
          `}</style>
        </div>
      </AutoCompleteContext.Provider>
    )
  },
)

type AutoCompleteComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {
  Item: typeof AutoCompleteItem
  Option: typeof AutoCompleteItem
  Searching: typeof AutoCompleteSearching
  Empty: typeof AutoCompleteEmpty
}

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs
;(AutoComplete as AutoCompleteComponent<
  HTMLInputElement,
  ComponentProps
>).defaultProps = defaultProps

export default AutoComplete as AutoCompleteComponent<HTMLInputElement, ComponentProps>
