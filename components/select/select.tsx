import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  RefObject,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { NormalSizes, SelectVariants } from '../utils/prop-types'
import useTheme from '../styles/use-theme'
import useClickAway from '../utils/use-click-away'
import { pickChildByProps } from '../utils/collections'
import SelectIcon from './select-icon'
import SelectOption from './select-option'
import SelectMultipleValue from './select-multiple-value'
import Grid from '../grid'
import { SelectContext, SelectConfig, SelectHandles } from './select-context'
import { getSizes, getSelectColors } from './styles'
import Ellipsis from '../shared/ellipsis'
import useMergedState from '../utils/use-merged-state'
import useSelectHandle from './use-select-handle'
import Dropdown from '../shared/dropdown'

interface Props {
  disabled?: boolean
  size?: NormalSizes
  value?: string | string[]
  defaultValue?: string | string[]
  placeholder?: React.ReactNode | string
  icon?: React.ComponentType
  onChange?: (value: string | string[]) => void
  pure?: boolean
  multiple?: boolean
  className?: string
  width?: string
  variant?: SelectVariants
  dropdownClassName?: string
  dropdownStyle?: object
  disableMatchWidth?: boolean
}

const defaultProps = {
  disabled: false,
  size: 'medium' as NormalSizes,
  icon: SelectIcon as React.ComponentType,
  pure: false,
  multiple: false,
  width: 'initial',
  className: '',
  variant: 'line' as SelectVariants,
  disableMatchWidth: false,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type SelectProps = React.PropsWithChildren<Props & NativeAttrs>
type SelectPropsWithDefault = SelectProps & typeof defaultProps

const Select = forwardRef<SelectHandles, SelectProps>(
  (
    {
      children,
      size,
      disabled,
      defaultValue,
      value,
      icon: Icon,
      onChange,
      pure,
      multiple,
      placeholder,
      width,
      variant,
      className,
      dropdownClassName,
      dropdownStyle,
      disableMatchWidth,
      ...props
    }: SelectPropsWithDefault,
    ref: RefObject<SelectHandles>,
  ) => {
    const theme = useTheme()
    const domRef = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState<boolean>(false)

    const [mergedValue, setMergedValue] = useMergedState(defaultValue, {
      value,
      onChange,
      postState: (value: string | string[] = '') => {
        if (!multiple) return value
        if (Array.isArray(value)) return value
        return typeof value === 'undefined' || value === '' ? [] : [value]
      },
    })

    const isEmpty = useMemo(() => {
      if (!Array.isArray(mergedValue)) {
        return !mergedValue
      }
      return mergedValue.length === 0
    }, [mergedValue])

    const sizes = useMemo(() => getSizes(theme, size), [theme, size])

    const colors = useMemo(() => {
      return getSelectColors(disabled, theme.palette, variant)
    }, [disabled, theme.palette, variant])

    const updateValue = (next: string) => {
      const setNewValue = () => {
        if (!Array.isArray(mergedValue)) return next
        if (!mergedValue.includes(next)) return [...mergedValue, next]
        return mergedValue.filter(item => item !== next)
      }
      const newValue = setNewValue()
      setMergedValue(newValue as string | string[])
      if (!multiple) {
        setVisible(false)
      }
    }

    useImperativeHandle(ref, () => ({
      setValue: (value: string | string[] = '') => {
        setMergedValue(value)
      },
      getValue: () => mergedValue,
    }))

    const initialValue: SelectConfig = useMemo(
      () => ({
        value: mergedValue,
        variant,
        updateValue,
        size,
        disableAll: disabled,
      }),
      [size, disabled, variant, mergedValue, updateValue],
    )

    const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation()
      event.nativeEvent.stopImmediatePropagation()
      event.preventDefault()
      if (disabled) return
      setVisible(!visible)
    }

    const clickawayHandler = useCallback(() => setVisible(false), [])
    useClickAway(domRef, clickawayHandler)

    const selectedChild = useMemo(() => {
      const [, optionChildren] = pickChildByProps(children, 'value', mergedValue)
      return React.Children.map(optionChildren, child => {
        if (!React.isValidElement(child)) return null
        const el = React.cloneElement(child, { preventAllEvents: true })
        if (!multiple) return el
        return (
          <SelectMultipleValue size={sizes.fontSize} disabled={disabled}>
            {el}
          </SelectMultipleValue>
        )
      })
    }, [mergedValue, children, multiple])

    return (
      <SelectContext.Provider value={initialValue}>
        <div
          className={`select ${multiple ? 'multiple' : ''} ${className}`}
          ref={domRef}
          onClick={clickHandler}
          {...props}>
          {isEmpty && (
            <span className="value placeholder">
              <Ellipsis height={sizes.height}>{placeholder}</Ellipsis>
            </span>
          )}
          {mergedValue && !multiple && <span className="value">{selectedChild}</span>}
          {mergedValue && multiple && <Grid.Container gap={0.5}>{selectedChild}</Grid.Container>}
          <Dropdown parent={domRef} visible={visible} disableMatchWidth={disableMatchWidth}>
            <div className={`select-dropdown ${dropdownClassName}`} style={dropdownStyle}>
              {children}
            </div>
          </Dropdown>

          {!pure && (
            <div className="icon">
              <Icon />
            </div>
          )}
          <style jsx>{`
            .select {
              display: inline-flex;
              align-items: center;
              user-select: none;
              white-space: nowrap;
              position: relative;
              cursor: ${disabled ? 'not-allowed' : 'pointer'};
              max-width: 80vw;
              width: ${width};
              overflow: hidden;
              transition: border 0.2s ease 0s, color 0.2s ease-out 0s, box-shadow 0.2s ease 0s;
              border: ${theme.expressiveness.L1} ${theme.expressiveness.cLineStyle1}
                ${colors.border};
              border-radius: ${theme.expressiveness.R2};
              padding: 0 calc(${theme.layout.gapHalf} * 1.5) 0 ${theme.layout.gap};
              height: ${sizes.height};
              background-color: ${colors.bgColor};
            }
            .select-dropdown {
              border-radius: ${theme.expressiveness.R2};
              box-shadow: ${theme.expressiveness.D2};
              background-color: ${theme.palette.cNeutral8};
              max-height: 15rem;
              overflow-y: auto;
              overflow-anchor: none;
              padding: ${theme.layout.gapHalf} 0;
            }

            .multiple {
              height: auto;
              min-height: ${sizes.height};
              padding: ${theme.layout.gapQuarter} calc(${sizes.fontSize} * 2)
                ${theme.layout.gapQuarter} ${theme.layout.gapHalf};
            }

            .select:hover {
              border-color: ${colors.hoverBorder};
              background-color: ${colors.hoverBgColor};
            }

            .select:hover .icon,
            .select:hover .value {
              color: ${colors.hoverColor};
            }
            .select:hover .placeholder {
              color: ${colors.placeholderColor};
            }

            .value {
              display: inline-flex;
              flex: 1;
              height: 100%;
              align-items: center;
              line-height: 1;
              font-weight: 500;
              padding: 0;
              margin-right: calc(${sizes.fontSize} * 1.5);
              font-size: ${sizes.fontSize};
              color: ${colors.color};
              width: calc(100% - ${sizes.fontSize} * 1.5);
            }

            .value :global(svg),
            .multiple :global(svg) {
              display: none;
            }
            .value :global(.option),
            .multiple :global(.option) {
              border: ${theme.expressiveness.L1} ${theme.expressiveness.cLineStyle1} transparent;
            }

            .value > :global(div),
            .value > :global(div:hover) {
              border-radius: 0;
              background-color: transparent;
              padding: 0;
              margin: 0;
              color: inherit;
            }

            .placeholder {
              color: ${colors.placeholderColor};
            }

            .icon {
              position: absolute;
              right: calc(${theme.layout.gapHalf} * 1.5);
              font-size: ${sizes.fontSize};
              top: 50%;
              bottom: 0;
              transform: translateY(-50%) rotate(${visible ? '180' : '0'}deg);
              pointer-events: none;
              transition: transform 200ms ease;
              display: flex;
              align-items: center;
              color: ${colors.color};
            }
          `}</style>
        </div>
      </SelectContext.Provider>
    )
  },
)

Select.defaultProps = defaultProps

export default Select as typeof Select & {
  Option: typeof SelectOption
  useSelectHandle: typeof useSelectHandle
}
