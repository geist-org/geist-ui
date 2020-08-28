import React, { useEffect, useRef, useState } from 'react'

export default function useDOMDimension<E extends HTMLElement>(
  property: 'clientWidth' | 'offsetWidth' = 'clientWidth', //more to come
  ...gurads: any[]
): [number, React.RefObject<E>] {
  const ref = useRef<E>(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current[property])
    }
  }, [...gurads])
  return [width, ref]
}
