import qs from 'qs'

export const windowLocation = {
  get params() {
    return qs.parse(window.location.search.substr(1))
  },
}
