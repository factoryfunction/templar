import * as React from 'react'
import * as Styled from './AssetsTab.styled'
import { useDropzone } from 'react-dropzone'
import { EditorStore } from './utilities/editorStore'
import Icon from '../components/Icon'
import Spacer from '../components/Spacer'
import { LeftPanelView } from './LeftPanelView'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import { useProjectAssetsDropzone } from './utilities/useProjectAssetsDropzone'
import useAssets from './utilities/useAssets'
import * as storage from '../utilities/backend/storage'
import { windowLocation } from './utilities/windowLocation'

export const AssetsTab = () => {
  const store = EditorStore.useStoreState((store) => ({
    isLoadingAssets: store.isLoadingAssets,
    fontAssets: store.fontAssets,
    imageAssets: store.imageAssets,
  }))

  const storeActions = EditorStore.useStoreActions((store) => ({
    refreshProjectAssets: store.refreshProjectAssets,
    deleteAsset: store.deleteAsset,
  }))

  return (
    <LeftPanelView title='Assets' header={() => <AssetsUpload storeActions={storeActions} />}>
      <AssetFolder
        key='image'
        assetType='images'
        isLoading={store.isLoadingAssets}
        assets={store.imageAssets}
        storeActions={storeActions}
      />
      <AssetFolder
        key='font'
        assetType='fonts'
        isLoading={store.isLoadingAssets}
        assets={store.fontAssets}
        storeActions={storeActions}
      />
    </LeftPanelView>
  )
}

export const AssetFolder = (props) => {
  const accessoryText = props.isLoading ? '(loading...)' : `(${props.assets.length})`

  return (
    <Styled.AssetFolderContainer>
      <Styled.AssetFolderTitle>
        {/* Folder indicator icon. */}
        <Icon name='folder' size='22px' color='var(--night-gray)' />
        <Spacer size='12px' />
        {props.assetType} <Styled.AccessoryText>{accessoryText}</Styled.AccessoryText>
      </Styled.AssetFolderTitle>

      <Styled.AssetFolderContents>
        <For each='asset' of={props.assets}>
          <AssetFile key={asset.name} storeActions={props.storeActions} asset={asset} />
        </For>
      </Styled.AssetFolderContents>
    </Styled.AssetFolderContainer>
  )
}

const AssetFile = (props) => {
  return (
    <>
      <ContextMenuTrigger id={props.asset.id} posX={-2} posY={64}>
        <Styled.AssetInFolder>
          {props.asset.name}

          <Styled.AssetRemoveIcon
            data-is-component-action
            name='trash-alt'
            size='18px'
            color='var(--subTextColor)'
            onClick={() => props.storeActions.deleteAsset(props.asset.id)}
          />
        </Styled.AssetInFolder>
      </ContextMenuTrigger>
      <ContextMenu id={props.asset.id}>
        <MenuItem data={{ foo: 'bar' }}>ContextMenu Item 1</MenuItem>
        <MenuItem data={{ foo: 'bar' }}>ContextMenu Item 2</MenuItem>
        <MenuItem divider />
        <MenuItem data={{ foo: 'bar' }}>ContextMenu Item 3</MenuItem>
      </ContextMenu>
    </>
  )
}

const AssetsUpload = (props) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const uploads = []

      for (const file of acceptedFiles) {
        uploads.push(
          storage.uploadFile({
            ...windowLocation.params,
            file,
          }),
        )
      }

      await Promise.all(uploads)
      props.storeActions.refreshProjectAssets()
    },
  })

  return (
    <Styled.AssetUploadContainer>
      <Styled.AssetUpload {...getRootProps()}>
        <Styled.AssetUploadInput {...getInputProps()} />
        <Styled.Button>
          <Icon name='upload' size='16px' color='#fff' />
          <Spacer size='4px' />
          Upload
        </Styled.Button>
      </Styled.AssetUpload>
    </Styled.AssetUploadContainer>
  )
}

export default AssetsTab
