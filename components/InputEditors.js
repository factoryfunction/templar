import Spacer from './Spacer'
import Icon from './Icon'
import Small from './Small'
import Select from './Select'
import SmallInput from './SmallInput'
import SmallTextArea from './SmallTextArea'

import useAssetsStore from '../stores/assetsStore'
import Checkbox from './Checkbox'
import styled from 'styled-components'

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => props.marginBottom || '16px'};
`

export const SelectedFontEditor = (props) => {
  const assetsStore = useAssetsStore()
  const options = assetsStore.getAssetsByType('font')

  return (
    <EditorContainer marginBottom={props.marginBottom}>
      <Small>Font:</Small>
      <Spacer size='8px' />
      <Select
        showClear={false}
        searchEnabled={false}
        searchInputAutoFocus={false}
        optionLabelPath='name'
        selected={props.layer.fontAsset}
        options={options}
        onChange={({ option }) => {
          props.layersStore.setLayerFontAsset(props.layer.id, option)
        }}
      />
    </EditorContainer>
  )
}

export const SelectedImageEditor = (props) => {
  const assetsStore = useAssetsStore()
  const options = assetsStore.getAssetsByType('image')

  return (
    <EditorContainer marginBottom={props.marginBottom}>
      <Small>Image Asset:</Small>
      <Spacer size='8px' />
      <Select
        showClear={false}
        searchEnabled={false}
        searchInputAutoFocus={false}
        optionLabelPath='name'
        selected={props.layer.imageAsset}
        options={options}
        onChange={({ option }) => {
          props.layersStore.setLayerImageAsset(props.layer.id, option)
        }}
      />
    </EditorContainer>
  )
}

export const ImageSizeEditor = (props) => {
  return (
    <EditorContainer marginBottom={props.marginBottom}>
      <Small>Size:</Small>
      <Spacer size='8px' />
      <SmallInput
        value={props.layer.style.size}
        type='number'
        step='0.1'
        onChange={(event) =>
          props.layersStore.setLayerStyle(props.layer.id, 'size', Number(event.target.value))
        }
      />
    </EditorContainer>
  )
}

export const ImageRatioLockEditor = (props) => {
  return (
    <EditorContainer marginBottom={props.marginBottom}>
      <Spacer size='12px' />
      <Checkbox
        text='Use Original Image Ratio'
        isChecked={props.layer.isRatioLocked}
        onClick={(event) =>
          props.layersStore.setLayerRatioLocked(props.layer.id, !props.layer.isRatioLocked)
        }
      />
    </EditorContainer>
  )
}

export const WidthContainmentEditor = (props) => {
  return (
    <EditorContainer marginBottom={props.marginBottom}>
      <Spacer size='12px' />
      <Checkbox
        text='Allow Width To Exceed Document'
        isChecked={props.layer.isWidthRestrictedToDocument}
        onClick={(event) =>
          props.layersStore.setLayerWidthRestrcted(
            props.layer.id,
            !props.layer.isWidthRestrictedToDocument,
          )
        }
      />
    </EditorContainer>
  )
}

export const ImageWidthStyleEditor = (props) => {
  return (
    <EditorContainer marginBottom={props.marginBottom}>
      <Small>Image Width (Inches):</Small>
      <Spacer size='8px' />
      <SmallInput
        value={props.layer.style.width}
        type='number'
        step='0.1'
        onChange={(event) => {
          const value = Number(event.target.value)
          props.layersStore.setLayerStyle(props.layer.id, 'width', value)

          if (props.layer.isRatioLocked) {
            const newHeight = value * props.layer.imageAsset.heightRatio
            props.layersStore.setLayerStyle(props.layer.id, 'height', newHeight)
          }
        }}
      />
    </EditorContainer>
  )
}

export const ImageHeightStyleEditor = (props) => {
  return (
    <EditorContainer marginBottom={props.marginBottom}>
      <Small>Image Height (Inches):</Small>
      <Spacer size='8px' />
      <SmallInput
        value={props.layer.style.height}
        type='number'
        step='0.1'
        onChange={(event) =>
          props.layersStore.setLayerStyle(props.layer.id, 'height', Number(event.target.value))
        }
      />
    </EditorContainer>
  )
}

export const LayerNameEditor = (props) => {
  return (
    <EditorContainer marginBottom={props.marginBottom}>
      <Small>Layer Name:</Small>
      <Spacer size='8px' />
      <SmallInput
        value={props.layer.name}
        onChange={(event) => props.layersStore.setLayerName(props.layer.id, event.target.value)}
      />
    </EditorContainer>
  )
}

export const LayerTextEditor = (props) => {
  return (
    <EditorContainer marginBottom={props.marginBottom}>
      <Small>Text:</Small>
      <Spacer size='8px' />
      <SmallTextArea
        value={props.layer.text}
        onChange={(event) => props.layersStore.setLayerText(props.layer.id, event.target.value)}
      />
    </EditorContainer>
  )
}

export const HeightStyleEditor = (props) => {
  return (
    <EditorContainer marginBottom={props.marginBottom}>
      <Small>Height (Inches):</Small>
      <Spacer size='8px' />
      <SmallInput
        value={props.layer.style.height}
        type='number'
        step='0.1'
        onChange={(event) =>
          props.layersStore.setLayerStyle(props.layer.id, 'height', Number(event.target.value))
        }
      />
    </EditorContainer>
  )
}

export const WidthStyleEditor = (props) => {
  return (
    <EditorContainer marginBottom={props.marginBottom}>
      <Small>Width (Inches):</Small>
      <Spacer size='8px' />
      <SmallInput
        value={props.layer.style.width}
        type='number'
        step='0.1'
        onChange={(event) =>
          props.layersStore.setLayerStyle(props.layer.id, 'width', Number(event.target.value))
        }
      />
    </EditorContainer>
  )
}

export const TextWidthStyleEditor = (props) => {
  return (
    <EditorContainer marginBottom={props.marginBottom}>
      <Small>Width (Inches or 0 for "auto"):</Small>
      <Spacer size='8px' />
      <SmallInput
        value={props.layer.style.width}
        type='number'
        step='0.1'
        onChange={(event) =>
          props.layersStore.setLayerStyle(props.layer.id, 'width', Number(event.target.value))
        }
      />
    </EditorContainer>
  )
}

export const TextHeightStyleEditor = (props) => {
  return (
    <EditorContainer marginBottom={props.marginBottom}>
      <Small>Heught (Inches or 0 for "auto"):</Small>
      <Spacer size='8px' />
      <SmallInput
        value={props.layer.style.height}
        type='number'
        step='0.1'
        onChange={(event) =>
          props.layersStore.setLayerStyle(props.layer.id, 'height', Number(event.target.value))
        }
      />
    </EditorContainer>
  )
}

export const TopStyleEditor = (props) => {
  return (
    <EditorContainer marginBottom={props.marginBottom}>
      <Small>Vertical Position (Inches):</Small>
      <Spacer size='8px' />
      <SmallInput
        value={props.layer.style.top}
        type='number'
        step='0.1'
        onChange={(event) =>
          props.layersStore.setLayerStyle(props.layer.id, 'top', event.target.value)
        }
      />
    </EditorContainer>
  )
}

export const LeftStyleEditor = (props) => {
  return (
    <EditorContainer marginBottom={props.marginBottom}>
      <Small>Horizontal Position (Inches):</Small>
      <Spacer size='8px' />
      <SmallInput
        value={props.layer.style.left}
        type='number'
        step='0.1'
        onChange={(event) =>
          props.layersStore.setLayerStyle(props.layer.id, 'left', event.target.value)
        }
      />
    </EditorContainer>
  )
}

export const FontSizeStyleEditor = (props) => {
  return (
    <EditorContainer marginBottom={props.marginBottom}>
      <Small>Font Size:</Small>
      <Spacer size='8px' />
      <SmallInput
        value={props.layer.style.fontSize}
        type='number'
        step='1'
        onChange={(event) => {
          const value = Number(event.target.value)
          props.layersStore.setLayerStyle(props.layer.id, 'fontSize', value)
        }}
      />
    </EditorContainer>
  )
}
