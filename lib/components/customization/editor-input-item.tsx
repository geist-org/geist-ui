import React, { useMemo } from 'react'
import { useTheme, Input, ZeitUIThemes } from 'components'
import { useConfigs } from 'lib/config-context'

type Props = {
  value?: string
  groupName: keyof ZeitUIThemes
  keyName: string
}

const EditorInputItem: React.FC<React.PropsWithChildren<Props>> = ({ groupName, keyName }) => {
  const theme = useTheme()
  const { updateCustomTheme } = useConfigs()
  const currentVal = useMemo(() => {
    const group = theme[groupName]
    const key = keyName as keyof typeof group
    return theme[groupName][key]
  }, [theme.expressiveness, keyName])
  const width = useMemo(() => (`${currentVal}`.length > 15 ? '350px' : 'auto'), [])

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCustomTheme({
      [groupName]: { [keyName]: event.target.value },
    })
  }

  return (
    <div className="editor-item">
      <Input
        value={currentVal as string}
        label={keyName}
        onChange={changeHandler}
        className="editor-input"
      />
      <style jsx>{`
        .editor-item {
          background-color: transparent;
          width: auto;
          padding: 0;
          line-height: 2rem;
          display: inline-flex;
          align-items: center;
          color: ${theme.palette.accents_5};
          margin-right: 0.75rem;
          margin-bottom: 0.5rem;
          cursor: pointer;
          transition: color 200ms ease;
        }

        .editor-item :global(.editor-input) {
          width: ${width};
        }
      `}</style>
    </div>
  )
}

export default EditorInputItem
