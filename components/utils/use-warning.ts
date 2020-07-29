const warningStack: { [key: string]: boolean } = {}

const useWarning = (
  message: string,
  component?: string,
  level?: 'error' | 'warn' | 'info' | 'log',
) => {
  const tag = component ? ` [${component}]` : ' '
  const log = `[@cfxjs/react-ui]${tag}: ${message}`

  if (typeof console === 'undefined') return
  if (warningStack[log]) return
  warningStack[log] = true

  if (level) return console[level](log)

  if (process.env.NODE_ENV !== 'production') {
    return console.error(log)
  }

  console.warn(log)
}

export default useWarning
