import { CSS_PROPERTIES } from '../consts/cssProperties'

export const extractStyleProps = (props) => {
  return Object.entries(props).reduce((final, [key, value]) => {
    if (CSS_PROPERTIES.has(key)) {
      final.foo
    }
  }, {})
}
