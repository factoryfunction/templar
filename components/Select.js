import styled from 'styled-components'
import { PowerSelect } from 'react-power-select'

const Select = styled(PowerSelect)`
  border: 1px solid var(--night-gray);
  border-radius: 4px;
  background: transparent !important;

  .PowerSelect__TriggerLabel {
    padding-left: 12px;
    font-size: 14px;
    letter-spacing: 0.5px;
    font-family: var(--mainFont);
    color: var(--night-white);
  }
`

export default Select
