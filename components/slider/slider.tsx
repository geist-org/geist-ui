import React, {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import useTheme from '../use-theme'
import useDrag, { DraggingEvent } from '../utils/use-drag'
import useCurrentState from '../utils/use-current-state'
import SliderDot from './slider-dot'
import SliderMark from './slider-mark'
import { getColors } from './styles'
import { NormalTypes } from '../utils/prop-types'
import useScaleable, { withScaleable } from '../use-scaleable'

export type SliderTypes = NormalTypes
interface Props {
  hideValue?: boolean
  value?: number
  type?: SliderTypes
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
  hideValue: false,
  type: 'default' as SliderTypes,
  initialValue: 0,
  step: 1,
  min: 0,
  max: 100,
  disabled: false,
  showMarkers: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type SliderProps = Props & NativeAttrs

const getRefWidth = (elementRef: RefObject<HTMLElement> | null): number => {
  if (!elementRef || !elementRef.current) return 0
  const rect = elementRef.current.getBoundingClientRect()
  return rect.width || rect.right - rect.left
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
  const widthForEachStep = (railWidth / (max - min)) * step
  if (widthForEachStep <= 0) return min

  const slideDistance = Math.round(offsetX / widthForEachStep) * step + min
  return Number.isInteger(slideDistance)
    ? slideDistance
    : Number.parseFloat(slideDistance.toFixed(1))
}

const SliderComponent: React.FC<React.PropsWithChildren<SliderProps>> = ({
  hideValue,
  disabled,
  type,
  step,
  max,
  min,
  initialValue,
  value: customValue,
  onChange,
  className,
  showMarkers,
  ...props
}: React.PropsWithChildren<SliderProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  const [value, setValue] = useState<number>(initialValue)
  const [, setSliderWidth, sideWidthRef] = useCurrentState<number>(0)
  const [, setLastDargOffset, lastDargOffsetRef] = useCurrentState<number>(0)
  const [isClick, setIsClick] = useState<boolean>(false)

  const sliderRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  const currentRatio = useMemo(
    () => ((value - min) / (max - min)) * 100,
    [value, max, min],
  )

  const setLastOffsetManually = (val: number) => {
    const width = getRefWidth(sliderRef)
    const shouldOffset = ((val - min) / (max - min)) * width
    setLastDargOffset(shouldOffset)
  }

  const updateValue = useCallback(
    offset => {
      const currentValue = getValue(max, min, step, offset, sideWidthRef.current)
      setValue(currentValue)
      onChange && onChange(currentValue)
    },
    [max, min, step, sideWidthRef],
  )

  const { bg } = useMemo(() => getColors(theme.palette, type), [theme.palette, type])

  const dragHandler = (event: DraggingEvent) => {
    if (disabled) return
    const currentOffset = event.currentX - event.startX
    const offset = currentOffset + lastDargOffsetRef.current
    updateValue(offset)
  }
  const dragStartHandler = () => {
    setIsClick(false)
    setSliderWidth(getRefWidth(sliderRef))
  }
  const dragEndHandler = (event: DraggingEvent) => {
    if (disabled) return
    const offset = event.currentX - event.startX
    const currentOffset = offset + lastDargOffsetRef.current
    const boundOffset =
      currentOffset < 0 ? 0 : Math.min(currentOffset, sideWidthRef.current)
    setLastDargOffset(boundOffset)
  }
  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    if (!sliderRef || !sliderRef.current) return
    setIsClick(true)
    setSliderWidth(getRefWidth(sliderRef))
    const clickOffset = event.clientX - sliderRef.current.getBoundingClientRect().x
    setLastDargOffset(clickOffset)
    updateValue(clickOffset)
  }

  useDrag(dotRef, dragHandler, dragStartHandler, dragEndHandler)

  useEffect(() => {
    if (customValue === undefined) return
    if (customValue === value) return
    setValue(customValue)
  }, [customValue, value])

  useEffect(() => {
    initialValue && setLastOffsetManually(initialValue)
  }, [])

  return (
    <div
      className={`slider ${className}`}
      onClick={clickHandler}
      ref={sliderRef}
      {...props}>
      <SliderDot disabled={disabled} ref={dotRef} isClick={isClick} left={currentRatio}>
        {hideValue || value}
      </SliderDot>
      {showMarkers && <SliderMark max={max} min={min} step={step} />}
      <style jsx>{`
        .slider {
          border-radius: 50px;
          background-color: ${disabled ? theme.palette.accents_2 : bg};
          position: relative;
          cursor: ${disabled ? 'not-allow' : 'pointer'};
          --slider-font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, '100%')};
          height: ${SCALES.height(0.5)};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
      `}</style>
    </div>
  )
}

SliderComponent.defaultProps = defaultProps
SliderComponent.displayName = 'GeistSlider'
const Slider = withScaleable(SliderComponent)
export default Slider
