import React, {
  CSSProperties,
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
import { NormalTypes } from '../utils/prop-types'
import Loading from '../loading'
import { pickChild } from '../utils/collections'
import useCurrentState from '../utils/use-current-state'
import useScaleable, { filterScaleableProps, withScaleable } from '../use-scaleable'

export type AutoCompleteTypes = NormalTypes

export type AutoCompleteOption = {
  label: string
  value: string
}

export type AutoCompleteOptions = Array<
  typeof AutoCompleteItem | AutoCompleteOption | React.ReactElement<AutoCompleteItemProps>
>

interface Props {
  options?: AutoCompleteOptions
  type?: AutoCompleteTypes
  initialValue?: string
  value?: string
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
  getPopupContainer?: () => HTMLElement | null
}

const defaultProps = {
  options: [] as AutoCompleteOptions,
  initialValue: '',
  disabled: false,
  clearable: false,
  type: 'default' as AutoCompleteTypes,
  disableMatchWidth: false,
  disableFreeSolo: false,
  className: '',
}

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof Props>
export type AutoCompleteProps = Props & NativeAttrs

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
const getSearchIcon = (searching?: boolean, scale: string | number = 1) => {
  if (searching === undefined) return null
  return searching ? <Loading scale={+scale / 2} /> : <span />
}

const AutoCompleteComponent = React.forwardRef<
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
      type,
      value,
      clearable,
      disabled,
      dropdownClassName,
      dropdownStyle,
      disableMatchWidth,
      disableFreeSolo,
      getPopupContainer,
      ...props
    }: React.PropsWithChildren<AutoCompleteProps> & typeof defaultProps,
    userRef: React.Ref<HTMLInputElement | null>,
  ) => {
    const resetTimer = useRef<number>()
    const { SCALES, getScaleableProps } = useScaleable()
    const ref = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [state, setState, stateRef] = useCurrentState<string>(customInitialValue)
    const [selectVal, setSelectVal] = useState<string>(customInitialValue)
    const [visible, setVisible] = useState<boolean>(false)
    useImperativeHandle(userRef, () => inputRef.current)

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
    const showClearIcon = useMemo(
      () => clearable && searching === undefined,
      [clearable, searching],
    )

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
        value: state,
        updateValue,
        visible,
        updateVisible,
      }),
      [state, visible],
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
      ...filterScaleableProps(props),
      disabled,
      value: state,
    }

    return (
      <AutoCompleteContext.Provider value={initialValue}>
        <div ref={ref} className="auto-complete">
          <Input
            ref={inputRef}
            type={type}
            onChange={onInputChange}
            onFocus={() => toggleFocusHandler(true)}
            onBlur={() => toggleFocusHandler(false)}
            clearable={showClearIcon}
            width={SCALES.width(1, 'initial')}
            height={SCALES.height(2.25)}
            iconRight={getSearchIcon(searching, getScaleableProps('scale'))}
            {...inputProps}
          />
          <AutoCompleteDropdown
            visible={visible}
            disableMatchWidth={disableMatchWidth}
            className={dropdownClassName}
            dropdownStyle={dropdownStyle}
            getPopupContainer={getPopupContainer}>
            {autoCompleteItems}
          </AutoCompleteDropdown>

          <style jsx>{`
            .auto-complete {
              width: ${SCALES.width(1, 'max-content')};
              height: ${SCALES.height(1, 'auto')};
              padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
              margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
            }

            .auto-complete :global(.loading) {
              width: max-content;
            }
          `}</style>
        </div>
      </AutoCompleteContext.Provider>
    )
  },
)

AutoCompleteComponent.defaultProps = defaultProps
AutoCompleteComponent.displayName = 'GeistAutoComplete'
const AutoComplete = withScaleable(AutoCompleteComponent)

export default AutoComplete
