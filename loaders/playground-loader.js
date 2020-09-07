module.exports = function (lang) {
  return function playgroundLoader(source) {
    const { imports, scopes } = parseScope(source)
    const code = JSON.stringify(parseCode(source))
    const desc = parseStringAfterToken(source, lang === 'en' ? 'descEN' : 'descZH')
    const title = parseStringAfterToken(source, lang === 'en' ? 'titleEN' : 'titleZH')
    const s = `
        import { Playground } from 'lib/components'
        ${imports}
        export default function App(){
          return <Playground
          scope={{${scopes}}}
          title={${title}}
          desc={${desc}}
          code={${code}}
        />
        }`
    return s
  }
}

function parseScope(str) {
  const imports = str.split('\n').filter(line => line.startsWith('import'))
  const scopes = imports
    .map(line => {
      const start = line.indexOf('{')
      const end = line.indexOf('}')
      return line.slice(start + 2, end).split(',')
    })
    .flat()
    .join(',')

  return { imports: imports.join('\n'), scopes }
}

function parseCode(str) {
  let cursor = str.indexOf('App')
  let insideSingelQuote = false
  let insideDoubleQuote = false
  let insideBackQuote = false
  let depth = 0
  let code = ''
  let start = false

  let confirmed = false
  let isPure = false
  //match return
  let startToken = ''
  let c
  while ((c = str[cursor++])) {
    if (start) {
      code += c
      if (!confirmed) {
        if (/\s/.test(c)) {
          //skip
        } else {
          startToken += c
          if (startToken === 'return') {
            confirmed = true
            isPure = true
          } else if ('return'.indexOf(startToken) === -1) {
            confirmed = true
            isPure = false
          }
        }
      }
    }

    if (c === "'") {
      insideSingelQuote = !insideSingelQuote
    }
    if (c === '"') {
      insideDoubleQuote = !insideDoubleQuote
    }
    if (c === '`') {
      insideBackQuote = !insideBackQuote
    }

    if (insideSingelQuote || insideDoubleQuote || insideBackQuote) {
      continue //skip matching inside quote
    }

    if (c === '{') {
      if (!start) {
        start = true
        code += c
      }
      depth++
    } else if (c === '}') {
      depth--
      if (depth === 0) {
        break
      }
    }
  }
  if (isPure) {
    str = code.slice(code.indexOf('return') + 'return'.length, code.length - 1)
  } else {
    str = `()=>${code}`
  }

  return str
}

function parseStringAfterToken(source, token) {
  let result = '',
    open = false,
    close = false
  let start = source.indexOf(token)

  while ((c = source[start++]) && !close) {
    if (c === '`') {
      if (!open) {
        open = true
      } else {
        close = true
      }
    }
    if (open) {
      result += c
    }
  }
  return result || "''"
}
