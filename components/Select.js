import styled from 'styled-components'
import { PowerSelect } from 'react-power-select'

const Select = styled(PowerSelect)`
  ::before {
    content: "${(props) => props.label || ''}";
    display: flex;
    font-size: 12px;
    color: var(--night-gray);
  }
`

Select.HiddenOption = styled.span`
  display: none;
`

export default Select
