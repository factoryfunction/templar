import * as React from 'react'
import * as Styled from './AssetsTab.styled'

import Icon from '../../components/Icon'
import Spacer from '../../components/Spacer'
import { LeftPanelView } from './LeftPanelView'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import { useProjectAssetsDropzone } from './utilities/useProjectAssetsDropzone'
import useAssets from './utilities/useAssets'

export const AssetsTab = () => {
  const assets = useAssets()

  return (
    <LeftPanelView title='Assets' header={AssetsUpload}>
      <AssetFolder
        key='image'
        assetType='images'
        isLoading={assets.projectAssets.isLoading}
        assets={assets.projectAssets.images}
      />
      <AssetFolder
        key='font'
        assetType='fonts'
        isLoading={assets.projectAssets.isLoading}
        assets={assets.projectAssets.fonts}
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
          <AssetFile key={asset.name} asset={asset} />
        </For>
      </Styled.AssetFolderContents>
    </Styled.AssetFolderContainer>
  )
}

const AssetFile = (props) => {
  return (
    <>
      <ContextMenuTrigger id={props.asset.name} posX={-2} posY={64}>
        <Styled.AssetInFolder>{props.asset.name}</Styled.AssetInFolder>
      </ContextMenuTrigger>
      <ContextMenu id={props.asset.name}>
        <MenuItem data={{ foo: 'bar' }}>ContextMenu Item 1</MenuItem>
        <MenuItem data={{ foo: 'bar' }}>ContextMenu Item 2</MenuItem>
        <MenuItem divider />
        <MenuItem data={{ foo: 'bar' }}>ContextMenu Item 3</MenuItem>
      </ContextMenu>
    </>
  )
}

const AssetsUpload = (props) => {
  const assetUploads = useProjectAssetsDropzone()

  return (
    <Styled.AssetUploadContainer>
      <Styled.AssetUpload {...assetUploads.getRootProps()}>
        <Styled.AssetUploadInput {...assetUploads.getInputProps()} />
        <Styled.Button>
          <Icon name='upload' size='16px' color='#fff' />
          <Spacer size='4px' />
          Upload
        </Styled.Button>
      </Styled.AssetUpload>
    </Styled.AssetUploadContainer>
  )
}
