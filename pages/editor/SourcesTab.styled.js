import styled from 'styled-components'

export const SourcesTabContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 36px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`

export const TextField = styled.input`
  padding: 8px 12px;
  background: transparent;
  border-radius: 3px;
  border: 1px solid var(--night-gray);
  color: var(--night-white);
  font-family: var(--mainFont);
  font-size: 14px;
  letter-spacing: 0.5px;
  outline: none;

  :focus {
    outline: none;
    border-color: var(--night-white);
    box-shadow: 0px 1px 8px -2px rgba(255, 255, 255, 0.3);
  }

  :before {
    content: ${(props) => props.label || ''};
    font-size: 12px;
    letter-spacing: 0.5px;
    color: var(--night-gray);
  }
`

export const SourcesConfigurationContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 36px 48px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  transition: opacity 0.23s;

  opacity: ${(props) => (props.isReady ? 1 : 0)};
`
