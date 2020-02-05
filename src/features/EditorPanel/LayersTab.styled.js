import styled, { css } from 'styled-components'
import Icon from '#components/Icon'
import { ColorSwatch } from '#components/ColorSwatch'

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

export const LayerList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const LayerNameText = styled.p`
  font-family: var(--mainFont);

  font-size: 14px;
  margin-left: 8px;
  margin-bottom: 1px;
  cursor: pointer;
  max-width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  position: relative;
`

export const LayerIconContainer = styled.div`
  width: 24px;
  display: flex;
  justify-content: center;
`

export const LayerEditIcon = styled(Icon)`
  margin-left: auto;
  transition: transform 0.23s;
  transform: ${(props) => (props.isEditing ? 'rotate(180deg)' : 'rotate(0deg)')};
`

export const LayerDeleteIcon = styled(Icon)``

export const LayerEditorIconsContainer = styled.div`
  padding-top: 2px;
  display: flex;
  align-items: center;
`

const selectedLayerRowStyles = css`
  ${LayerNameText}, ${LayerIconContainer} i {
    color: var(--night-white);
  }

  ${LayerIconContainer} i {
    color: var(--secondary);
  }
`

export const LayerRow = styled.div`
  font-family: var(--mainFont);
  font-size: 14px;
  font-weight: 400;
  width: 90%;
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: none;
  margin-bottom: 8px;
  padding: 0px 24px;
  z-index: 60;
  color: var(--night-gray);

  min-height: ${(props) => (props.isEditorOpen ? 'fit-content' : '40px')};

  :hover {
    ${LayerNameText} {
      color: var(--night-white);
    }

    i {
      color: #fff;
    }
  }

  ${(props) => (props.isSelected ? selectedLayerRowStyles : '')};
`

export const LayerEditorContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 18px 36px 12px;
  background: var(--night-black1);
  border-radius: 3px;
  margin-bottom: 12px;
  --sliderLabel: 'Opacity';
`

export const DisplayColorSwatch = styled(ColorSwatch)`
  width: 40px;
  height: 40px;
  top: -3px;
  position: absolute;
  left: -2px;
  border: 1px solid var(--night-black1);
`

export const DisplayColorValue = styled.span`
  position: absolute;
  top: 9px;
  left: 51px;
`
