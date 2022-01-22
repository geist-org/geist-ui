'use strict'

var React = require('react')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e }
}

var React__default = /*#__PURE__*/ _interopDefaultLegacy(React)

var style$1 = {}

var stylesheetRegistry = {}

function hash(str) {
  var hash = 5381,
    i = str.length

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  return hash >>> 0
}

var stringHash = hash

var stylesheet = {}

;(function (exports) {
  exports.__esModule = true
  exports['default'] = void 0

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps)
    if (staticProps) _defineProperties(Constructor, staticProps)
    return Constructor
  }

  /*
Based on Glamor's sheet
https://github.com/threepointone/glamor/blob/667b480d31b3721a905021b26e1290ce92ca2879/src/sheet.js
*/
  var isProd =
    typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production'

  var isString = function isString(o) {
    return Object.prototype.toString.call(o) === '[object String]'
  }

  var StyleSheet = /*#__PURE__*/ (function () {
    function StyleSheet(_temp) {
      var _ref = _temp === void 0 ? {} : _temp,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'stylesheet' : _ref$name,
        _ref$optimizeForSpeed = _ref.optimizeForSpeed,
        optimizeForSpeed =
          _ref$optimizeForSpeed === void 0 ? isProd : _ref$optimizeForSpeed,
        _ref$isBrowser = _ref.isBrowser,
        isBrowser =
          _ref$isBrowser === void 0 ? typeof window !== 'undefined' : _ref$isBrowser

      invariant(isString(name), '`name` must be a string')
      this._name = name
      this._deletedRulePlaceholder = '#' + name + '-deleted-rule____{}'
      invariant(
        typeof optimizeForSpeed === 'boolean',
        '`optimizeForSpeed` must be a boolean',
      )
      this._optimizeForSpeed = optimizeForSpeed
      this._isBrowser = isBrowser
      this._serverSheet = undefined
      this._tags = []
      this._injected = false
      this._rulesCount = 0
      var node = this._isBrowser && document.querySelector('meta[property="csp-nonce"]')
      this._nonce = node ? node.getAttribute('content') : null
    }

    var _proto = StyleSheet.prototype

    _proto.setOptimizeForSpeed = function setOptimizeForSpeed(bool) {
      invariant(typeof bool === 'boolean', '`setOptimizeForSpeed` accepts a boolean')
      invariant(
        this._rulesCount === 0,
        'optimizeForSpeed cannot be when rules have already been inserted',
      )
      this.flush()
      this._optimizeForSpeed = bool
      this.inject()
    }

    _proto.isOptimizeForSpeed = function isOptimizeForSpeed() {
      return this._optimizeForSpeed
    }

    _proto.inject = function inject() {
      var _this = this

      invariant(!this._injected, 'sheet already injected')
      this._injected = true

      if (this._isBrowser && this._optimizeForSpeed) {
        this._tags[0] = this.makeStyleTag(this._name)
        this._optimizeForSpeed = 'insertRule' in this.getSheet()

        if (!this._optimizeForSpeed) {
          if (!isProd) {
            console.warn(
              'StyleSheet: optimizeForSpeed mode not supported falling back to standard mode.',
            )
          }

          this.flush()
          this._injected = true
        }

        return
      }

      this._serverSheet = {
        cssRules: [],
        insertRule: function insertRule(rule, index) {
          if (typeof index === 'number') {
            _this._serverSheet.cssRules[index] = {
              cssText: rule,
            }
          } else {
            _this._serverSheet.cssRules.push({
              cssText: rule,
            })
          }

          return index
        },
        deleteRule: function deleteRule(index) {
          _this._serverSheet.cssRules[index] = null
        },
      }
    }

    _proto.getSheetForTag = function getSheetForTag(tag) {
      if (tag.sheet) {
        return tag.sheet
      } // this weirdness brought to you by firefox

      for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].ownerNode === tag) {
          return document.styleSheets[i]
        }
      }
    }

    _proto.getSheet = function getSheet() {
      return this.getSheetForTag(this._tags[this._tags.length - 1])
    }

    _proto.insertRule = function insertRule(rule, index) {
      invariant(isString(rule), '`insertRule` accepts only strings')

      if (!this._isBrowser) {
        if (typeof index !== 'number') {
          index = this._serverSheet.cssRules.length
        }

        this._serverSheet.insertRule(rule, index)

        return this._rulesCount++
      }

      if (this._optimizeForSpeed) {
        var sheet = this.getSheet()

        if (typeof index !== 'number') {
          index = sheet.cssRules.length
        } // this weirdness for perf, and chrome's weird bug
        // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule

        try {
          sheet.insertRule(rule, index)
        } catch (error) {
          if (!isProd) {
            console.warn(
              'StyleSheet: illegal rule: \n\n' +
                rule +
                '\n\nSee https://stackoverflow.com/q/20007992 for more info',
            )
          }

          return -1
        }
      } else {
        var insertionPoint = this._tags[index]

        this._tags.push(this.makeStyleTag(this._name, rule, insertionPoint))
      }

      return this._rulesCount++
    }

    _proto.replaceRule = function replaceRule(index, rule) {
      if (this._optimizeForSpeed || !this._isBrowser) {
        var sheet = this._isBrowser ? this.getSheet() : this._serverSheet

        if (!rule.trim()) {
          rule = this._deletedRulePlaceholder
        }

        if (!sheet.cssRules[index]) {
          // @TBD Should we throw an error?
          return index
        }

        sheet.deleteRule(index)

        try {
          sheet.insertRule(rule, index)
        } catch (error) {
          if (!isProd) {
            console.warn(
              'StyleSheet: illegal rule: \n\n' +
                rule +
                '\n\nSee https://stackoverflow.com/q/20007992 for more info',
            )
          } // In order to preserve the indices we insert a deleteRulePlaceholder

          sheet.insertRule(this._deletedRulePlaceholder, index)
        }
      } else {
        var tag = this._tags[index]
        invariant(tag, 'old rule at index `' + index + '` not found')
        tag.textContent = rule
      }

      return index
    }

    _proto.deleteRule = function deleteRule(index) {
      if (!this._isBrowser) {
        this._serverSheet.deleteRule(index)

        return
      }

      if (this._optimizeForSpeed) {
        this.replaceRule(index, '')
      } else {
        var tag = this._tags[index]
        invariant(tag, 'rule at index `' + index + '` not found')
        tag.parentNode.removeChild(tag)
        this._tags[index] = null
      }
    }

    _proto.flush = function flush() {
      this._injected = false
      this._rulesCount = 0

      if (this._isBrowser) {
        this._tags.forEach(function (tag) {
          return tag && tag.parentNode.removeChild(tag)
        })

        this._tags = []
      } else {
        // simpler on server
        this._serverSheet.cssRules = []
      }
    }

    _proto.cssRules = function cssRules() {
      var _this2 = this

      if (!this._isBrowser) {
        return this._serverSheet.cssRules
      }

      return this._tags.reduce(function (rules, tag) {
        if (tag) {
          rules = rules.concat(
            Array.prototype.map.call(
              _this2.getSheetForTag(tag).cssRules,
              function (rule) {
                return rule.cssText === _this2._deletedRulePlaceholder ? null : rule
              },
            ),
          )
        } else {
          rules.push(null)
        }

        return rules
      }, [])
    }

    _proto.makeStyleTag = function makeStyleTag(name, cssString, relativeToTag) {
      if (cssString) {
        invariant(
          isString(cssString),
          'makeStyleTag acceps only strings as second parameter',
        )
      }

      var tag = document.createElement('style')
      if (this._nonce) tag.setAttribute('nonce', this._nonce)
      tag.type = 'text/css'
      tag.setAttribute('data-' + name, '')

      if (cssString) {
        tag.appendChild(document.createTextNode(cssString))
      }

      var head = document.head || document.getElementsByTagName('head')[0]

      if (relativeToTag) {
        head.insertBefore(tag, relativeToTag)
      } else {
        head.appendChild(tag)
      }

      return tag
    }

    _createClass(StyleSheet, [
      {
        key: 'length',
        get: function get() {
          return this._rulesCount
        },
      },
    ])

    return StyleSheet
  })()

  exports['default'] = StyleSheet

  function invariant(condition, message) {
    if (!condition) {
      throw new Error('StyleSheet: ' + message + '.')
    }
  }
})(stylesheet)

;(function (exports) {
  exports.__esModule = true
  exports['default'] = void 0

  var _stringHash = _interopRequireDefault(stringHash)

  var _stylesheet = _interopRequireDefault(stylesheet)

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
  }

  var sanitize = function sanitize(rule) {
    return rule.replace(/\/style/gi, '\\/style')
  }

  var StyleSheetRegistry = /*#__PURE__*/ (function () {
    function StyleSheetRegistry(_temp) {
      var _ref = _temp === void 0 ? {} : _temp,
        _ref$styleSheet = _ref.styleSheet,
        styleSheet = _ref$styleSheet === void 0 ? null : _ref$styleSheet,
        _ref$optimizeForSpeed = _ref.optimizeForSpeed,
        optimizeForSpeed =
          _ref$optimizeForSpeed === void 0 ? false : _ref$optimizeForSpeed,
        _ref$isBrowser = _ref.isBrowser,
        isBrowser =
          _ref$isBrowser === void 0 ? typeof window !== 'undefined' : _ref$isBrowser

      this._sheet =
        styleSheet ||
        new _stylesheet['default']({
          name: 'styled-jsx',
          optimizeForSpeed: optimizeForSpeed,
        })

      this._sheet.inject()

      if (styleSheet && typeof optimizeForSpeed === 'boolean') {
        this._sheet.setOptimizeForSpeed(optimizeForSpeed)

        this._optimizeForSpeed = this._sheet.isOptimizeForSpeed()
      }

      this._isBrowser = isBrowser
      this._fromServer = undefined
      this._indices = {}
      this._instancesCounts = {}
      this.computeId = this.createComputeId()
      this.computeSelector = this.createComputeSelector()
    }

    var _proto = StyleSheetRegistry.prototype

    _proto.add = function add(props) {
      var _this = this

      if (undefined === this._optimizeForSpeed) {
        this._optimizeForSpeed = Array.isArray(props.children)

        this._sheet.setOptimizeForSpeed(this._optimizeForSpeed)

        this._optimizeForSpeed = this._sheet.isOptimizeForSpeed()
      }

      if (this._isBrowser && !this._fromServer) {
        this._fromServer = this.selectFromServer()
        this._instancesCounts = Object.keys(this._fromServer).reduce(function (
          acc,
          tagName,
        ) {
          acc[tagName] = 0
          return acc
        },
        {})
      }

      var _this$getIdAndRules = this.getIdAndRules(props),
        styleId = _this$getIdAndRules.styleId,
        rules = _this$getIdAndRules.rules // Deduping: just increase the instances count.

      if (styleId in this._instancesCounts) {
        this._instancesCounts[styleId] += 1
        return
      }

      var indices = rules
        .map(function (rule) {
          return _this._sheet.insertRule(rule)
        }) // Filter out invalid rules
        .filter(function (index) {
          return index !== -1
        })
      this._indices[styleId] = indices
      this._instancesCounts[styleId] = 1
    }

    _proto.remove = function remove(props) {
      var _this2 = this

      var _this$getIdAndRules2 = this.getIdAndRules(props),
        styleId = _this$getIdAndRules2.styleId

      invariant(styleId in this._instancesCounts, 'styleId: `' + styleId + '` not found')
      this._instancesCounts[styleId] -= 1

      if (this._instancesCounts[styleId] < 1) {
        var tagFromServer = this._fromServer && this._fromServer[styleId]

        if (tagFromServer) {
          tagFromServer.parentNode.removeChild(tagFromServer)
          delete this._fromServer[styleId]
        } else {
          this._indices[styleId].forEach(function (index) {
            return _this2._sheet.deleteRule(index)
          })

          delete this._indices[styleId]
        }

        delete this._instancesCounts[styleId]
      }
    }

    _proto.update = function update(props, nextProps) {
      this.add(nextProps)
      this.remove(props)
    }

    _proto.flush = function flush() {
      this._sheet.flush()

      this._sheet.inject()

      this._fromServer = undefined
      this._indices = {}
      this._instancesCounts = {}
      this.computeId = this.createComputeId()
      this.computeSelector = this.createComputeSelector()
    }

    _proto.cssRules = function cssRules() {
      var _this3 = this

      var fromServer = this._fromServer
        ? Object.keys(this._fromServer).map(function (styleId) {
            return [styleId, _this3._fromServer[styleId]]
          })
        : []

      var cssRules = this._sheet.cssRules()

      return fromServer.concat(
        Object.keys(this._indices)
          .map(function (styleId) {
            return [
              styleId,
              _this3._indices[styleId]
                .map(function (index) {
                  return cssRules[index].cssText
                })
                .join(_this3._optimizeForSpeed ? '' : '\n'),
            ]
          }) // filter out empty rules
          .filter(function (rule) {
            return Boolean(rule[1])
          }),
      )
    }
    /**
     * createComputeId
     *
     * Creates a function to compute and memoize a jsx id from a basedId and optionally props.
     */

    _proto.createComputeId = function createComputeId() {
      var cache = {}
      return function (baseId, props) {
        if (!props) {
          return 'jsx-' + baseId
        }

        var propsToString = String(props)
        var key = baseId + propsToString // return `jsx-${hashString(`${baseId}-${propsToString}`)}`

        if (!cache[key]) {
          cache[key] = 'jsx-' + (0, _stringHash['default'])(baseId + '-' + propsToString)
        }

        return cache[key]
      }
    }
    /**
     * createComputeSelector
     *
     * Creates a function to compute and memoize dynamic selectors.
     */

    _proto.createComputeSelector = function createComputeSelector(
      selectoPlaceholderRegexp,
    ) {
      if (selectoPlaceholderRegexp === void 0) {
        selectoPlaceholderRegexp = /__jsx-style-dynamic-selector/g
      }

      var cache = {}
      return function (id, css) {
        // Sanitize SSR-ed CSS.
        // Client side code doesn't need to be sanitized since we use
        // document.createTextNode (dev) and the CSSOM api sheet.insertRule (prod).
        if (!this._isBrowser) {
          css = sanitize(css)
        }

        var idcss = id + css

        if (!cache[idcss]) {
          cache[idcss] = css.replace(selectoPlaceholderRegexp, id)
        }

        return cache[idcss]
      }
    }

    _proto.getIdAndRules = function getIdAndRules(props) {
      var _this4 = this

      var css = props.children,
        dynamic = props.dynamic,
        id = props.id

      if (dynamic) {
        var styleId = this.computeId(id, dynamic)
        return {
          styleId: styleId,
          rules: Array.isArray(css)
            ? css.map(function (rule) {
                return _this4.computeSelector(styleId, rule)
              })
            : [this.computeSelector(styleId, css)],
        }
      }

      return {
        styleId: this.computeId(id),
        rules: Array.isArray(css) ? css : [css],
      }
    }
    /**
     * selectFromServer
     *
     * Collects style tags from the document with id __jsx-XXX
     */

    _proto.selectFromServer = function selectFromServer() {
      var elements = Array.prototype.slice.call(
        document.querySelectorAll('[id^="__jsx-"]'),
      )
      return elements.reduce(function (acc, element) {
        var id = element.id.slice(2)
        acc[id] = element
        return acc
      }, {})
    }

    return StyleSheetRegistry
  })()

  exports['default'] = StyleSheetRegistry

  function invariant(condition, message) {
    if (!condition) {
      throw new Error('StyleSheetRegistry: ' + message + '.')
    }
  }
})(stylesheetRegistry)

;(function (exports) {
  exports.__esModule = true
  exports['default'] = JSXStyle
  exports.flush = flush

  var _react = React__default['default']

  var _stylesheetRegistry = _interopRequireDefault(stylesheetRegistry)

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
  }

  var styleSheetRegistry = new _stylesheetRegistry['default']()

  function JSXStyle(props) {
    if (typeof window === 'undefined') {
      styleSheetRegistry.add(props)
      return null
    }

    ;(0, _react.useLayoutEffect)(
      function () {
        styleSheetRegistry.add(props)
        return function () {
          styleSheetRegistry.remove(props)
        } // props.children can be string[], will be striped since id is identical
      },
      [props.id, String(props.dynamic)],
    )
    return null
  }

  JSXStyle.dynamic = function (info) {
    return info
      .map(function (tagInfo) {
        var baseId = tagInfo[0]
        var props = tagInfo[1]
        return styleSheetRegistry.computeId(baseId, props)
      })
      .join(' ')
  }

  function flush() {
    var cssRules = styleSheetRegistry.cssRules()
    styleSheetRegistry.flush()
    return cssRules
  }
})(style$1)

var style = style$1.default || style$1
style.flush = style$1.flush

var server$1 = {}

;(function (exports) {
  exports.__esModule = true
  exports['default'] = flushToReact
  exports.flushToHTML = flushToHTML

  var _react = _interopRequireDefault(React__default['default'])

  var _style = style$1.default || style$1
  _style.flush = style$1.flush

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
  }

  function flushToReact(options) {
    if (options === void 0) {
      options = {}
    }

    return (0, _style.flush)().map(function (args) {
      var id = args[0]
      var css = args[1]
      return _react['default'].createElement('style', {
        id: '__' + id,
        // Avoid warnings upon render with a key
        key: '__' + id,
        nonce: options.nonce ? options.nonce : undefined,
        dangerouslySetInnerHTML: {
          __html: css,
        },
      })
    })
  }

  function flushToHTML(options) {
    if (options === void 0) {
      options = {}
    }

    return (0, _style.flush)().reduce(function (html, args) {
      var id = args[0]
      var css = args[1]
      html +=
        '<style id="__' +
        id +
        '"' +
        (options.nonce ? ' nonce="' + options.nonce + '"' : '') +
        '>' +
        css +
        '</style>'
      return html
    }, '')
  }
})(server$1)

var server = server$1.default || server$1
server.flushToHTML = server$1.flushToHTML

exports.server = server
exports.style = style
