export const transformDataSource = (src: string) => {
  const left = `${src}`.slice(0, 4)
  if (encodeURIComponent(left) === '%3Csvg') {
    return `data:image/svg+xml;utf8,${src}`
  }
  return src
}

export const getHostFromUrl = (url: string) => {
  try {
    return new URL(url).host
  } catch (e) {
    return url
  }
}
