import * as React from 'react'
import Loader from 'react-loader-spinner'

export const LoaderTriangle = (props) => {
  return (
    <Loader
      type='Triangle'
      color={props.color}
      height={props.size}
      width={props.size}
      timeout={5000}
    />
  )
}

LoaderTriangle.defaultProps = {
  color: '#000',
  size: '64px',
}

LoaderTriangle.Overlay = (props) => {
  return (
    <If condition={props.visible}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#ececed',
          zIndex: 99999,
          position: 'absolute',
          transition: 'opacity 0.5s',
          opacity: props.opacity,
          top: 0,
          right: 0,
        }}
      >
        <LoaderTriangle size='100px' />
      </div>
    </If>
  )
}
