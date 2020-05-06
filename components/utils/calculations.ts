import { useMemo } from 'react'

/**
 * Calculate the ratio of two numbers, maximum decimal length can be specified.
 *
 * (0, 100) => 0
 * (50, 100) => 50
 * (11.22, 100) => 11.22
 * (11.22, 100, 4) => 11.2200
 */
export const getProportions = (value: number, max: number, maxFixed: number = 2): number => {
  const val = value / max
  const couldBeDecimalValue = (Number.isNaN(val) ? 0 : val) * 100
  if (couldBeDecimalValue > 100) return 100
  if (couldBeDecimalValue < 0) return 0
  if (!`${couldBeDecimalValue}`.includes('.')) return couldBeDecimalValue

  const decimal = `${couldBeDecimalValue}`.split('.')[1]
  if (decimal.length < maxFixed) return couldBeDecimalValue

  return +couldBeDecimalValue.toFixed(maxFixed)
}

export const useProportions = (value: number, max: number, maxFixed: number = 2) =>
  useMemo(() => getProportions(value, max, maxFixed), [value, max, maxFixed])
