import React from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'
import { tuple } from '../utils/prop-types'

const colorTypes = tuple('secondary', 'primary')

type Color = typeof colorTypes[number]

interface Props {
  color?: string
  label: string
  query: string
  height: string
}

const defaultProps = {
  color: 'default' as Color,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type FuzzyMatchProps = Props & typeof defaultProps & NativeAttrs

const FuzzyMatchComponent: React.FC<React.PropsWithChildren<FuzzyMatchProps>> = ({
  color: colorType,
  className,
  label,
  query,
  height,
  ...props
}) => {
  const theme = useTheme()
  const color = { secondary: theme.palette.cNeutral5, primary: 'inherit' }[colorType]
  const highlightColor = { secondary: theme.palette.cNeutral7, primary: theme.palette.cTheme5 }[
    colorType
  ]

  query = query
    .trim()
    // https://stackoverflow.com/a/6969486/5671288
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\ /g, '.*')

  let beforeMatched = ''
  let matched = ''
  let afterMatched = ''
  const matchResult = label.match(new RegExp(query, 'i'))
  if (matchResult) {
    beforeMatched = (matchResult.input as string).slice(0, matchResult.index)
    matched = (matchResult as RegExpMatchArray)[0]
    afterMatched = (matchResult.input as string).slice(
      (matchResult.index as number) + matchResult[0].length,
    )
    if (matched === '') afterMatched = ''
  }

  return (
    <span className={`fuzzy-match ${className || ''}`} {...props}>
      {Boolean(beforeMatched) && <span className="before-match">{beforeMatched}</span>}
      {Boolean(matched) && <span className="match">{matched}</span>}
      {Boolean(afterMatched) && <span className="after-match">{afterMatched}</span>}
      {!Boolean(matched) && <span>{label}</span>}
      <style jsx>{`
        .fuzzy-match {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: ${height};
          min-width: 0;
          color: ${color};
        }

        .fuzzy-match span.before-match {
        }
        .fuzzy-match span.match {
          color: ${highlightColor};
        }
        .fuzzy-match span.after-match {
        }
      `}</style>
    </span>
  )
}

const FuzzyMatch = React.memo(FuzzyMatchComponent)

export default withDefaults(FuzzyMatch, defaultProps)
