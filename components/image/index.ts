import Image from './image'
import ImageBrowser from './image-browser'

export type ImageComponentType = typeof Image & {
  Browser: typeof ImageBrowser
}
;(Image as ImageComponentType).Browser = ImageBrowser

export type { ImageProps } from './image'
export type { ImageBrowserProps, ImageAnchorProps } from './image-browser'
export default Image as ImageComponentType
