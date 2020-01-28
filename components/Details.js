import styled from 'styled-components'

export const Details = styled.details`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  width: 90%;
  padding: 0px 24px;
`

Details.Summary = styled.summary`
  font-family: var(--mainFont);
  letter-spacing: 0.5px;
  font-size: 16px;
  height: 36px;
  width: 90%;
  display: flex;
  align-items: center;
  cursor: pointer;
  list-style: none;
  outline: none;

  ::-webkit-details-marker {
    display: none;
  }
`

Details.Contents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  width: 90%;

  > * {
    margin-bottom: 12px;
  }
`
