import * as React from 'react'

export const withPureComponent = (Component, comparer) => {
  return class WithPureComponent extends React.Component {
    shouldComponentUpdate(newProps) {
      return comparer(this.props, newProps)
    }

    render() {
      // console.log('SCU RENDER')
      return <Component {...this.props} />
    }
  }
}
