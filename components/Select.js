import styled from 'styled-components'
import { PowerSelect } from 'react-power-select'

const Select = styled(PowerSelect)`
  border: 1px solid var(--whiteBorderColor);
  border-radius: 4px;
  background-color: #fff;

  .PowerSelect__TriggerLabel {
    padding-left: 12px;
    font-size: 14px;
    letter-spacing: 0.5px;
    font-family: var(--mainFont);
  }
`

export default Select
