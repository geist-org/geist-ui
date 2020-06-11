export const formatTime = (seconds: number) => {
  const hh = Math.floor(seconds / 3600)
  const mm = Math.floor(seconds / 60) % 60
  const ss = Math.floor(seconds) % 60
  const pad = (num: number) => (num < 10 ? '0' + num : num)
  return `${hh ? pad(hh) + ':' : ''}${pad(mm)}:${pad(ss)}`
}

export const isFullscreenEnabled = () => {
  const elem = document as any
  return (
    elem.fullscreenEnabled ||
    elem.webkitFullscreenEnabled ||
    elem.mozFullScreenEnabled ||
    elem.msFullscreenEnabled
  )
}

export const openFullscreen = (element: HTMLElement) => {
  const elem = element as any
  if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen()
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen()
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen()
  }
}

export const closeFullscreen = () => {
  const elem = document as any
  if (elem.exitFullscreen) {
    elem.exitFullscreen()
  } else if (elem.mozCancelFullScreen) {
    elem.mozCancelFullScreen()
  } else if (elem.webkitExitFullscreen) {
    elem.webkitExitFullscreen()
  } else if (elem.msExitFullscreen) {
    elem.msExitFullscreen()
  }
}

export const onFullscreenChange = (func: (state: boolean) => void) => {
  const doc = document as any
  doc.addEventListener('fullscreenchange', () => func(!!doc.fullscreen), true)
  doc.addEventListener('mozfullscreenchange', () => func(!!doc.mozFullScreen), true)
  doc.addEventListener('webkitfullscreenchange', () => func(!!doc.webkitIsFullScreen), true)
  doc.addEventListener('msfullscreenchange', () => func(!!doc.msFullscreenElement), true)
}

export const isSafari = () =>
  navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')
