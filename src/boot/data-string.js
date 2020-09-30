function getUrlParameter (name) {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  const results = regex.exec(location.search)
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

export function numericHash (s) {
  let h = 0xdeadbeef

  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 2654435761)
  }

  return (h ^ h >>> 16) >>> 0
}

let dataStringFromUrl = getUrlParameter('data')

if (dataStringFromUrl) {
  window.localStorage.setItem('dataString', dataStringFromUrl)
  window.dataString = dataStringFromUrl
}

export default async ({ Vue }) => {
  Vue.prototype.$dataString = dataStringFromUrl
  Vue.prototype.$numHash = numericHash
}
