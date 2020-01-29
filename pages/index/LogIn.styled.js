import styled from 'styled-components'

export const LogInContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  padding-top: 96px;
`

export const LogInFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  margin-bottom: 12px;
`

export const LogInField = styled.input`
  padding: 8px 12px;
  background: #fff;
  border: 1px solid var(--whiteBorderColor);
  margin-top: 12px;
  outline: none;
  height: 40px;
`

export const LogInButton = styled.button`
  border: none;
  outline: none;
  background: var(--highlight);
  color: var(--night-white);
  padding: 12px;
  font-size: 14px;
  height: 40px;
`
