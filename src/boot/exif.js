import { EXIF as exifShim } from 'exif-js/exif'
const EXIF = exifShim

window.EXIF = exifShim

export default async ({ Vue }) => {
  Vue.prototype.$EXIF = EXIF
}
