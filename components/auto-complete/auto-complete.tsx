import React, { useEffect, useMemo, useRef, useState, useImperativeHandle } from 'react'
import Input, { InputProps, defaultProps as inputDefaultProps } from '../input/input'
import { useAutoCompleteHandle } from '../input/use-input-handle'
import Loading from '../loading'
import CSSTransition, { defaultProps as CSSTransitionDefaultProps } from '../shared/css-transition'
import { pickChild } from '../utils/collections'
import { InputVariantTypes } from '../utils/prop-types'
import useClickAway from '../utils/use-click-away'
import { AutoCompleteConfig, AutoCompleteContext } from './auto-complete-context'
import AutoCompleteDropdown from './auto-complete-dropdown'
import AutoCompleteEmpty from './auto-complete-empty'
import AutoCompleteItem from './auto-complete-item'
import AutoCompleteSearching from './auto-complete-searching'

const DEFAULT_CSS_TRANSITION_LEAVE_TIME =
  CSSTransitionDefaultProps.leaveTime + CSSTransitionDefaultProps.clearTime

export type AutoCompleteOption = {
  label: string
}

export type AutoCompleteOptions = Array<typeof AutoCompleteItem | AutoCompleteOption>

interface Props
  extends Omit<
    InputProps,
    'onBlur' | 'onChange' | 'onFocus' | 'onSelect' | 'value' | 'defaultValue'
  > {
  defaultValue: string
  value: string
  options: AutoCompleteOptions
  width?: string
  onFocus?: React.EventHandler<
    React.MouseEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>
  >
  onBlur?: (event: Event) => void
  onChange?: (value: InputProps['value']) => void
  onSearch?: (value: string) => void
  onSelect?: (value: string) => void
  onClearClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>
  searching?: boolean
  clearable?: boolean
  dropdownClassName?: string
  dropdownStyle?: object
  disableMatchWidth?: boolean
  disableFreeSolo?: boolean
  className?: string
  defaultOpen?: boolean
  open?: boolean
}

export const defaultProps = Object.assign({}, inputDefaultProps, {
  defaultOpen: false,
  options: [] as AutoCompleteOptions,
  disableMatchWidth: false,
  disableFreeSolo: false,
})

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof Props>
export type AutoCompleteProps = React.PropsWithChildren<Props & NativeAttrs>

const childrenToOptionsNode = (options: Array<AutoCompleteOption>, variant: InputVariantTypes) =>
  options.map((item, index) => {
    const key = `auto-complete-item-${index}`
    if (React.isValidElement(item)) return React.cloneElement(item, { key })
    const validItem = item
    return <AutoCompleteItem variant={variant} key={key} label={validItem.label} isLabelOnly />
  })

// When the search is not set, the "clearable" icon can be displayed in the original location.
// When the search is set, at least one element should exist to avoid re-render.
const getSearchIcon = (searching?: boolean) => {
  if (searching === undefined) return null
  return searching ? <Loading size="small" /> : <span />
}

const AutoComplete = React.forwardRef<HTMLInputElement, AutoCompleteProps>(
  (
    {
      variant,
      options,
      defaultValue,
      onSelect,
      onSearch,
      onChange,
      searching,
      onClearClick,
      children,
      size,
      value,
      width,
      clearable,
      disabled,
      dropdownClassName,
      dropdownStyle,
      disableMatchWidth,
      disableFreeSolo,
      open,
      onFocus,
      onBlur,
      defaultOpen,
      ...props
    }: AutoCompleteProps & typeof defaultProps,
    ref: React.RefObject<HTMLInputElement | null>,
  ) => {
    const isValueControlled = value !== undefined
    const isOpenControlled = open !== undefined

    const autoCompleteDivRef = useRef<HTMLDivElement>(null)
    const { ref: inputRef, focus: focusInput } = useAutoCompleteHandle()
    useImperativeHandle(ref, () => inputRef.current)
    const resetTimer = useRef<number>()
    const [inputValue, setInputValue] = useState(defaultValue || '')
    const computedInputValue = isValueControlled ? value : inputValue
    const [selectVal, setSelectVal] = useState(defaultValue || '')
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(defaultOpen)
    const isDropdownOpen = isOpenControlled ? open : dropdownOpen
    const [focus, setFocus] = useState<boolean>(false)

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
        if (computedInputValue === '') return null
        return hasEmptyChild ? emptyChild : <AutoCompleteEmpty>No Options</AutoCompleteEmpty>
      }
      return childrenToOptionsNode(options as Array<AutoCompleteOption>, variant)
    }, [searching, options, variant])

    const showClearIcon = useMemo(() => clearable && searching === undefined, [
      clearable,
      searching,
    ])

    const onSelectHandler = (val: string) => {
      if (disabled) return
      setSelectVal(val)
      onSelect && onSelect(val)
      if (!isValueControlled) setInputValue(val)
      focusInput()
    }
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isOpenControlled) setDropdownOpen(true)
      if (!isValueControlled) setInputValue(event.target.value)
      onSearch && onSearch(event.target.value)
    }

    const resetInputValueOnClickAway = () => {
      if (isValueControlled) return
      if (!disableFreeSolo) return
      if (!computedInputValue || computedInputValue === '') return
      if (computedInputValue !== selectVal) {
        setInputValue(selectVal)
      }
    }

    const defaultContextValue = useMemo<AutoCompleteConfig>(
      () => ({
        ref: autoCompleteDivRef,
        size,
        focus,
        value: computedInputValue,
        onSelect: onSelectHandler,
        visible: isDropdownOpen,
        updateVisible: (open: boolean) => {
          if (!isOpenControlled) setDropdownOpen(open)
        },
      }),
      [computedInputValue, isDropdownOpen, size, focus],
    )

    const onInputFocus: React.EventHandler<
      React.MouseEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>
    > = e => {
      setFocus(true)
      onFocus && onFocus(e)
      if (!isOpenControlled) setDropdownOpen(true)
      clearTimeout(resetTimer.current)
    }

    const onInputClearClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isValueControlled) setInputValue('')
      onClearClick && onClearClick(event)
    }

    useClickAway(autoCompleteDivRef, e => {
      if (!isOpenControlled) setDropdownOpen(false)
      resetTimer.current = window.setTimeout(() => {
        resetInputValueOnClickAway()
        clearTimeout(resetTimer.current)
        onBlur && onBlur(e)
        setFocus(false)
      }, DEFAULT_CSS_TRANSITION_LEAVE_TIME)
    })

    const inputProps = {
      ...props,
      value: computedInputValue,
      defaultValue: undefined,
      width: width || 'initial',
      disabled,
    }

    const dropdownVisible = isOpenControlled
      ? (open as boolean)
      : dropdownOpen && Boolean(autoCompleteItems)

    useEffect(() => {
      onChange && onChange(computedInputValue)
    }, [computedInputValue])

    return (
      <AutoCompleteContext.Provider value={defaultContextValue}>
        <div
          ref={autoCompleteDivRef}
          className={`auto-complete ${variant === 'solid' ? 'solid' : 'line'}`}>
          <CSSTransition
            renderable
            visible={dropdownVisible}
            clearTime={computedInputValue === '' ? 0 : 60}
            leaveTime={computedInputValue === '' ? 0 : 60}
            className={`in-auto-complete ${focus ? 'auto-complete-focus' : ''}`}>
            <Input
              variant={variant}
              ref={inputRef}
              size={size}
              onChange={onInputChange}
              onFocus={onInputFocus}
              onClick={onInputFocus}
              clearable={showClearIcon}
              onClearClick={onInputClearClick}
              iconRight={getSearchIcon(searching)}
              {...inputProps}
            />
          </CSSTransition>
          <AutoCompleteDropdown
            variant={variant}
            visible={dropdownVisible}
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

            .auto-complete :global(.in-auto-complete .input-wrapper) {
              transition: 0s;
            }

            .auto-complete
              :global(.in-auto-complete.transition-leave .input-wrapper.focus:not(.disabled)),
            .auto-complete
              :global(.in-auto-complete.transition-enter .input-wrapper.focus:not(.disabled)) {
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;
              border-bottom-color: transparent;
            }
          `}</style>
        </div>
      </AutoCompleteContext.Provider>
    )
  },
)

const AutoCompleteComponent = AutoComplete as typeof AutoComplete & {
  Item: typeof AutoCompleteItem
  Empty: typeof AutoCompleteEmpty
  Option: typeof AutoCompleteItem
  Searching: typeof AutoCompleteSearching
  useAutoCompleteHandle: typeof useAutoCompleteHandle
}

AutoCompleteComponent.defaultProps = defaultProps
AutoCompleteComponent.Item = AutoCompleteItem
AutoCompleteComponent.Option = AutoCompleteItem
AutoCompleteComponent.Searching = AutoCompleteSearching
AutoCompleteComponent.Empty = AutoCompleteEmpty
AutoCompleteComponent.useAutoCompleteHandle = useAutoCompleteHandle

export { useAutoCompleteHandle }
export default AutoCompleteComponent
