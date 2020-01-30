import styled from 'styled-components'

export const StyledTextField = styled.input`
  padding: 8px 12px;
  background: transparent;
  border-radius: 2px;
  border: 1px solid var(--night-gray);
  color: var(--night-white);
  font-family: var(--mainFont);
  font-size: 13px;
  letter-spacing: 0.5px;
  outline: none;
  margin-top: 8px;

  :focus {
    outline: none;
    border-color: var(--night-white);
    box-shadow: 0px 1px 8px -2px rgba(255, 255, 255, 0.3);
  }
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledLabel = styled.label`
  font-size: 12px;
  letter-spacing: 0.5px;
  color: var(--night-gray);
`

export const TextField = (props) => {
  return (
    <StyledContainer>
      <StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
      <StyledTextField {...props} />
    </StyledContainer>
  )
}
