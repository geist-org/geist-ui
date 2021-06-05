import Image from './image'
import ImageBrowser from './image-browser'

export type ImageComponentType = typeof Image & {
  Browser: typeof ImageBrowser
}
;(Image as ImageComponentType).Browser = ImageBrowser

export default Image as ImageComponentType
