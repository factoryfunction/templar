import styled from 'styled-components'

const StyledIcon = styled.i`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  display: inline-flex;
  cursor: ${(props) => (props.onClick ? 'pointer' : 'inherit')};

  :after {
    display: flex;
    font-style: normal;
    content: "${(props) => props.text || ''}";
    font-family: var(--mainFont);
    font-size: 12px;
    color: var(--night-gray);
    font-weight: 400;
    margin-left: 2px;
    margin-top: 2px;
  }

  :hover {
    color: ${(props) => props.hoverColor || '#fff'};

    :after {
      color: ${(props) => props.hoverColor || '#fff'};
    }
  }
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
