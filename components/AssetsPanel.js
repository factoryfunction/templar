import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import Spacer from './Spacer'
import Icon from './Icon'
import useAssetsStore from '../stores/assetsStore'

import { ASSET_TYPE_ICON_NAME_MAP, ASSET_TYPE_ICON_SIZE_MAP } from '../consts'

import { useDropzone } from 'react-dropzone'

const StyledAssetsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: calc(100vh - 260px);
  overflow: auto;

  ::-webkit-scrollbar {
    width: 0px;
    background: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
`

const StyledAsset = styled.div`
  width: 100%;
  height: 40px;
  min-height: 40px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  border-radius: 2px;
  cursor: pointer;

  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;

  :hover {
    border-top: 1px solid var(--whiteBorderColor);
    border-bottom: 1px solid var(--whiteBorderColor);
  }

  &[data-is-selected='true'] {
    background: #d5a0f836;
  }
`

const StyledAssetName = styled.p`
  font-family: var(--mainFont);
  color: var(--subTextColor);
  font-size: 14px;
  margin-left: 8px;
  margin-bottom: 2px;
  width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
`

const StyledAssetIconContainer = styled.div`
  width: 24px;
  display: flex;
  justify-content: center;
`

const StyledRemoveIcon = styled(Icon)`
  margin-left: auto;
`

const StyledDropzoneInput = styled.div`
  width: 100%;
  height: 100px;
  background: var(--dark0);
  position: absolute;
  bottom: 8px;
  right: 0;
`

export const AssetsPanel = (props) => {
  const assetsStore = useAssetsStore()
  return (
    <>
      <AssetDropzone />
      <StyledAssetsList>
        <For each='asset' of={assetsStore.assets}>
          <Asset key={asset.id} asset={asset} assetsStore={assetsStore} />
        </For>
      </StyledAssetsList>
    </>
  )
}

const AssetDropzone = (props) => {
  const assetsStore = useAssetsStore()

  const onDrop = React.useCallback((acceptedFiles) => {
    for (const file of acceptedFiles) {
      console.log({ file })
      file.name.includes('.otf') && assetsStore.assFontAsset(file)
      file.name.includes('.ttf') && assetsStore.assFontAsset(file)
      file.name.includes('.woff') && assetsStore.assFontAsset(file)
      file.name.includes('.woff2') && assetsStore.assFontAsset(file)
      file.type.includes('image') && assetsStore.addImageAsset(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } = useDropzone({
    onDrop,
    // accept: 'image/jpeg,image/png,.ttf,.otf,.woff,.woff2',
  })

  console.log({ isDragReject, isDragAccept })

  return (
    <StyledDropzoneArea {...getRootProps()}>
      <StyledDropzoneInput {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </StyledDropzoneArea>
  )
}

const StyledDropzoneArea = styled.div`
  width: calc(100% - 24px);
  height: 80px;

  margin: 12px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #eeeeee;
  border-style: dashed;
  background-color: #fafafa;
  color: var(--subTextColor);
  outline: none;
`

const Asset = (props) => {
  const iconName = ASSET_TYPE_ICON_NAME_MAP[props.asset.type]
  const iconSize = ASSET_TYPE_ICON_SIZE_MAP[props.asset.type]

  return (
    <>
      <StyledAsset>
        <StyledAssetIconContainer>
          <Icon name={iconName} size={iconSize} color='var(--subTextColor)' />
        </StyledAssetIconContainer>
        <StyledAssetName>{props.asset.name}</StyledAssetName>
        <If condition={props.asset.canDelete}>
          <StyledRemoveIcon
            name='trash-alt'
            size='16px'
            color='var(--subTextColor)'
            onClick={() => props.assetsStore.removeAsset(props.asset.id)}
          />
        </If>
      </StyledAsset>
    </>
  )
}

export default observer(AssetsPanel)
