import styled from 'styled-components'

const StyledContainer = styled.span`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width || '100%'};

  ::before {
    content: "${(props) => props.label || ''}";
    display: flex;
    font-size: 12px;
    color: var(--night-gray);
    font-family: var(--mainFont);
  }
`

export const StyledInput = styled.input`
  margin-top: 6px;
  background: var(--night-black2);
  border-radius: 3px;
  border: none;
  outline: none;
  color: var(--night-white);
  font-size: 14px;
  letter-spacing: 0.5px;
  font-family: var(--mainFont);
  color: var(--night-white);

  padding: 6px 8px 6px 12px;

  width: 100%;
  height: 34px;
`

export const TextField = (props) => {
  return (
    <StyledContainer label={props.label} width={props.width}>
      <StyledInput {...props} />
    </StyledContainer>
  )
}
