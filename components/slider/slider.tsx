import React, { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'
import useDrag, { DraggingEvent } from '../utils/use-drag'
import useCurrentState from '../utils/use-current-state'
import SliderDot from './slider-dot'
import SliderMark from './slider-mark'

interface Props {
  value?: number
  initialValue?: number
  step?: number
  max?: number
  min?: number
  disabled?: boolean
  showMarkers?: boolean
  onChange?: (val: number) => void
  className?: string
}

const defaultProps = {
  initialValue: 0,
  step: 1,
  min: 0,
  max: 100,
  disabled: false,
  showMarkers: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type SliderProps = Props & typeof defaultProps & NativeAttrs

const getRefWidth = (elementRef: RefObject<HTMLElement> | null): number => {
  if (!elementRef || !elementRef.current) return 0
  const rect = elementRef.current.getBoundingClientRect()
  return rect.width || (rect.right - rect.left)
}

const getValue = (
  max: number,
  min: number,
  step: number,
  offsetX: number,
  railWidth: number,
): number => {
  if (offsetX < 0) return min
  if (offsetX > railWidth) return max
  const widthForEachStep = railWidth / (max - min) * step
  if (widthForEachStep <= 0) return min
  
  const slideDistance = Math.round(offsetX / widthForEachStep) * step + min
  return Number.isInteger(slideDistance) ? slideDistance : Number.parseFloat(slideDistance.toFixed(1))
}

const Slider: React.FC<React.PropsWithChildren<SliderProps>> = ({
  disabled, step, max, min, initialValue, value: customValue,
  onChange, className, showMarkers, ...props
}) => {
  
  const theme = useTheme()
  const [value, setValue] = useState<number>(initialValue)
  const [, setSliderWidth, sideWidthRef] = useCurrentState<number>(0)
  const [, setLastDargOffset, lastDargOffsetRef] = useCurrentState<number>(0)
  const [isClick, setIsClick] = useState<boolean>(false)
  
  const sliderRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  
  const currentRatio = useMemo(
    () => (value - min) / (max - min) * 100,
    [value, max, min],
  )
  
  const setLastOffsetManually = (val: number) => {
    const width = getRefWidth(sliderRef)
    const shouldOffset = (val - min) / (max - min) * width
    setLastDargOffset(shouldOffset)
  }
  
  const updateValue = useCallback((offset) => {
    const currentValue = getValue(max, min, step, offset, sideWidthRef.current)
    setValue(currentValue)
    onChange && onChange(currentValue)
  }, [max, min, step, sideWidthRef])

  const dragHandler = (event: DraggingEvent) => {
    if (disabled) return
    const currentOffset = event.currentX - event.startX
    const offset = currentOffset + lastDargOffsetRef.current
    updateValue(offset)
  }
  const dragStartHandler = () => setSliderWidth(getRefWidth(sliderRef))
  const dragEndHandler = (event: DraggingEvent) => {
    if (disabled) return
    const offset = event.currentX - event.startX
    const currentOffset = offset + lastDargOffsetRef.current
    setLastDargOffset(currentOffset)
    setIsClick(false)
  }
  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    if (!sliderRef || !sliderRef.current) return
    setIsClick(true)
    setSliderWidth(getRefWidth(sliderRef))
    const clickOffset = event.clientX - sliderRef.current.getBoundingClientRect().x
    updateValue(clickOffset)
  }

  useDrag(dotRef, dragHandler, dragStartHandler, dragEndHandler)

  useEffect(() => {
    if (customValue === undefined) return
    setValue(customValue)
    setLastOffsetManually(customValue)
  }, [customValue])
  
  useEffect(() => {
    initialValue && setLastOffsetManually(initialValue)
  }, [])

  return (
    <div className={`slider ${className}`}
      onClick={clickHandler}
      ref={sliderRef} {...props}>
      <SliderDot disabled={disabled}
        ref={dotRef}
        isClick={isClick}
        left={currentRatio}>{value}</SliderDot>
      {showMarkers && <SliderMark max={max} min={min} step={step} />}
      <style jsx>{`
        .slider {
          width: 100%;
          height: .5rem;
          border-radius: 50px;
          background-color: ${disabled ? theme.palette.accents_2 : theme.palette.accents_8};
          position: relative;
          cursor: ${disabled ? 'not-allow' : 'pointer'};
        }
      `}</style>
    </div>
  )
}

export default withDefaults(Slider, defaultProps)
