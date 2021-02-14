import React from 'react'
import Themes from '../themes/themes'
import { GeistUIThemes } from '../themes/presets'

export type AllThemesConfig = {
  themes: Array<GeistUIThemes>
}

const defaultAllThemesConfig = {
  themes: Themes.getPresets(),
}

export const AllThemesContext: React.Context<AllThemesConfig> = React.createContext<AllThemesConfig>(
  defaultAllThemesConfig,
)

export const useAllThemes = (): AllThemesConfig =>
  React.useContext<AllThemesConfig>(AllThemesContext)
