import * as React from 'react'
import { useDropzone } from 'react-dropzone'

import Icon from '#components/Icon'
import Spacer from '#components/Spacer'
import { EditorStore } from '#stores/editorStore'
import * as storage from '#utilities/backend/storage'
import { windowLocation } from '#utilities/windowLocation'
import * as Styled from './AssetsTab.styled'
import { LeftPanelView } from './LeftPanelView'

import './styles/AssetsTab.css'

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
      <Spacer size='36px' />
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
        {props.assetType} <small styleName='AccessoryText'>{accessoryText}</small>
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
    <div styleName='AssetInFolder'>
      <p styleName='AssetName'>{props.asset.name}</p>

      <Icon
        styleName='AssetRemoveIcon'
        color='var(--subTextColor)'
        data-is-component-action
        name='trash-alt'
        size='18px'
        onClick={() => props.storeActions.deleteAsset(props.asset.id)}
      />
    </div>
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
    <div styleName='AssetUploadContainer'>
      <div styleName='AssetUpload' {...getRootProps()}>
        <input {...getInputProps()} />
        <button styleName='Button'>
          <Icon name='upload' size='16px' color='#fff' />
          <Spacer size='4px' />
          Upload
        </button>
      </div>
    </div>
  )
}

export default AssetsTab
