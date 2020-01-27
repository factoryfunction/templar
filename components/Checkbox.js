import styled from 'styled-components'
import RCCheckbox from 'rc-checkbox'
import Small from './Small'
import Spacer from './Spacer'
import Icon from './Icon'

const StyledCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`

const StyledIcon = styled(Icon)`
  margin-top: 2px;
`

const Checkbox = (props) => {
  const iconColor = props.isChecked ? 'var(--mainPurple)' : 'var(--dark0)'
  const iconName = props.isChecked ? 'check-circle' : 'circle'

  return (
    <StyledCheckboxContainer onClick={props.onClick}>
      <StyledIcon size='18px' color={iconColor} name={iconName} />
      <Spacer size='8px' />
      <Small>{props.text}</Small>
    </StyledCheckboxContainer>
  )
}

export default Checkbox
