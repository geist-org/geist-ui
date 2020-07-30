import React, { useEffect, useMemo, useRef, useState } from 'react'
import Input from '../input'
import Loading from '../loading'
import CSSTransition, { defaultProps as CSSTransitionDefaultProps } from '../shared/css-transition'
import { pickChild } from '../utils/collections'
import { InputTypes, NormalSizes } from '../utils/prop-types'
import useClickAway from '../utils/use-click-away'
import useCurrentState from '../utils/use-current-state'
import { AutoCompleteConfig, AutoCompleteContext } from './auto-complete-context'
import AutoCompleteDropdown from './auto-complete-dropdown'
import AutoCompleteEmpty from './auto-complete-empty'
import AutoCompleteItem from './auto-complete-item'
import AutoCompleteSearching from './auto-complete-searching'

const DEFAULT_CSS_TRANSITION_LEAVE_TIME =
  CSSTransitionDefaultProps.leaveTime + CSSTransitionDefaultProps.clearTime

export type AutoCompleteOption = {
  label: string
  value: string
}

export type AutoCompleteOptions = Array<typeof AutoCompleteItem | AutoCompleteOption>

interface Props {
  solid?: boolean
  options: AutoCompleteOptions
  size?: NormalSizes
  status?: InputTypes
  initialValue?: string
  value?: string
  width?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  onSelect?: (value: string) => void
  searching?: boolean
  clearable?: boolean
  dropdownClassName?: string
  dropdownStyle?: object
  disableMatchWidth?: boolean
  disableFreeSolo?: boolean
  className?: string
}

const defaultProps = {
  solid: false,
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
    const validItem = item
    return (
      <AutoCompleteItem key={key} value={validItem.value} isLabelOnly>
        {validItem.label}
      </AutoCompleteItem>
    )
  })

// When the search is not set, the "clearable" icon can be displayed in the original location.
// When the search is set, at least one element should exist to avoid re-render.
const getSearchIcon = (searching?: boolean) => {
  if (searching === undefined) return null
  return searching ? <Loading size="medium" /> : <span />
}

const AutoComplete: React.FC<React.PropsWithChildren<AutoCompleteProps>> = ({
  solid,
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
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const resetTimer = useRef<number>()
  const [state, setState, stateRef] = useCurrentState<string>(customInitialValue)
  const [selectVal, setSelectVal] = useState<string>(customInitialValue)
  const [visible, setVisible] = useState<boolean>(false)
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
      if (state === '') return null
      return hasEmptyChild ? emptyChild : <AutoCompleteEmpty>No Options</AutoCompleteEmpty>
    }
    return childrenToOptionsNode(options as Array<AutoCompleteOption>)
  }, [searching, options])

  const showClearIcon = useMemo(() => clearable && searching === undefined, [clearable, searching])

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
      ref,
      size,
      value: state,
      updateValue,
      visible,
      updateVisible,
    }),
    [state, visible, size],
  )

  const onInputFocus: React.EventHandler<
    React.FocusEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>
  > = () => {
    setFocus(true)
    setVisible(true)
    onSearch && onSearch(stateRef.current)
    clearTimeout(resetTimer.current)
  }

  useClickAway(ref, () => {
    setVisible(false)
    resetTimer.current = window.setTimeout(() => {
      resetInputValue()
      clearTimeout(resetTimer.current)
      setFocus(false)
    }, DEFAULT_CSS_TRANSITION_LEAVE_TIME)
  })

  const inputProps = {
    ...props,
    width,
    disabled,
    value: state,
  }

  const dropdownVisible = visible && Boolean(autoCompleteItems)

  return (
    <AutoCompleteContext.Provider value={initialValue}>
      <div ref={ref} className={`auto-complete ${solid ? 'solid' : 'lined'}`}>
        <CSSTransition
          renderable
          visible={dropdownVisible}
          className={`in-auto-complete ${focus ? 'auto-complete-focus' : ''}`}>
          <Input
            solid={solid}
            ref={inputRef}
            size={size}
            status={status}
            onChange={onInputChange}
            onFocus={onInputFocus}
            onClick={onInputFocus}
            clearable={showClearIcon}
            iconRight={getSearchIcon(searching)}
            {...inputProps}
          />
        </CSSTransition>
        <AutoCompleteDropdown
          solid={solid}
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
        `}</style>
      </div>
    </AutoCompleteContext.Provider>
  )
}

type AutoCompleteComponent<P = {}> = React.FC<P> & {
  Item: typeof AutoCompleteItem
  Option: typeof AutoCompleteItem
  Searching: typeof AutoCompleteSearching
  Empty: typeof AutoCompleteEmpty
}

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs
;(AutoComplete as AutoCompleteComponent<ComponentProps>).defaultProps = defaultProps

export default AutoComplete as AutoCompleteComponent<ComponentProps>
