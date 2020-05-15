import useBodyScroll from '../use-body-scroll'
import useClipboard from '../use-clipboard'
import useCurrentState from '../use-current-state'
import useClickAway from '../use-click-away'
import useMediaQuery from '../use-media-query'
import useWarning from '../utils/use-warning'

useWarning(
  'Module "Utils" is deprecated. All hooks are now exported directly from the main module.',
  'Utils',
)

export default {
  useBodyScroll,
  useClipboard,
  useCurrentState,
  useClickAway,
  useMediaQuery,
}
