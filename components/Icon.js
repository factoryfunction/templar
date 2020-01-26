import styled from 'styled-components'

const StyledIcon = styled.i`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
`

const Icon = (props) => {
  const { name, className, ...otherProps } = props
  const classNames = `uil uil-${props.name} ${className || ''}`

  return <StyledIcon className={classNames} {...otherProps} />
}

Icon.defaultProps = {
  color: 'var(--dark0)',
  size: '24px',
}

export default Icon
