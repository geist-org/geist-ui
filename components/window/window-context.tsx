import { createContext, useContext } from 'react'

type WindowConfig = {
  height: number | string
  width: number | string
  headerHeight: number | string
}

export const defaultWindowContext = { headerHeight: 40, width: '100%', height: 240 }
export const WindowContext = createContext<WindowConfig>(defaultWindowContext)
export const useWindowContext = () => useContext<WindowConfig>(WindowContext)
