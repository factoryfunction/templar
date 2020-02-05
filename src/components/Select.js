import styled from 'styled-components'
import { PowerSelect } from 'react-power-select'

import './styles/Select.css'

const Select = styled(PowerSelect)`
width: ${(props) => props.width || 'auto'};
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
