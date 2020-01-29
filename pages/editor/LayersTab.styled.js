import styled from 'styled-components'
import Icon from '../../components/Icon'

export const AddLayerActions = styled.div`
  display: flex;
  width: 100%;
  padding-left: 36px;
  align-items: center;
  justify-content: flex-end;

  i {
    margin-left: 24px;
    cursor: pointer;

    :hover {
      color: var(--highlight);
    }
  }

  :before {
    content: 'Add Layers: ';
    font-size: 12px;
    color: var(--night-gray);
  }
`

export const LayerNameText = styled.p`
  font-family: var(--mainFont);
  color: var(--night-white);
  font-size: 14px;
  margin-left: 8px;
  margin-bottom: 1px;
  cursor: pointer;
  width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
`

export const LayerIconContainer = styled.div`
  width: 24px;
  display: flex;
  justify-content: center;
`

export const LayerRow = styled.div`
  font-family: var(--mainFont);
  font-size: 14px;
  font-weight: 400;
  height: 36px;
  width: 90%;
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: none;
  margin-bottom: 8px;
  width: 90%;
  padding: 0px 24px;

  :hover {
    ${LayerNameText}, ${LayerIconContainer} i {
      color: var(--secondary);
      font-weight: 600;
    }
  }

  ${(props) =>
    props.isSelected
      ? `
  ${LayerNameText}, ${LayerIconContainer} i {
      color: var(--secondary);
      font-weight: 600;
    }
  
  `
      : ''};
`

export const LayerRemoveIcon = styled(Icon)`
  margin-left: auto;

  :hover {
    color: #fff;
  }
`
