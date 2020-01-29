import styled from 'styled-components'
import { Details } from '../../components/Details'
import Icon from '../../components/Icon'

export const AssetsTabContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const AssetsTabHeaderContainer = styled.div`
  width: 100%;
  padding: 36px 32px 24px;
  display: flex;
`

export const AssetsTabHeaderText = styled.h4`
  font-size: 20px;
  font-family: var(--mainFont);
  letter-spacing: 0.5px;
  color: var(--night-white);
  font-weight: 400;
`

export const AssetsTabBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

/*

  AssetFolder

*/

export const AssetFolderTitle = styled(Details.Summary)`
  margin-bottom: 4px;
  align-items: center;
  display: flex;
`

export const AssetFolderContainer = styled(Details)`
  :hover {
    ${AssetFolderTitle}, ${AssetFolderTitle} i {
      color: var(--highlight);
    }
  }
`

export const AssetFolderContents = styled(Details.Contents)``

export const AssetInFolder = styled.p`
  font-size: 14px;
  padding: 12px 24px;
  width: 100%;
  display: flex;

  :hover {
    color: var(--highlight);
  }
`

/*
  AssetUpload
*/

export const AssetUploadContainer = styled.div`
  display: flex;
  width: 100%;
  padding-left: 36px;
  align-items: center;
  justify-content: flex-end;
`

export const AssetUpload = styled.div`
  display: flex;
  align-items: center;
`

export const AssetUploadInput = styled.input``

export const Button = styled.button`
  /* background: var(--tertiary); */
  background: none;
  border: 1px solid var(--night-white);
  color: var(--night-white);
  outline: none;
  border: none;
  font-weight: 500;
  font-family: var(--mainFont);
  font-size: 14px;
  padding: 2px 8px 3px 8px;
  letter-spacing: 0.5px;
  border-radius: 3px;
  cursor: pointer;

  :hover {
    color: var(--highlight);

    i {
      color: var(--highlight);
    }
  }
`

export const AccessoryText = styled.small`
  font-size: 11;
  color: var(--night-gray);
  margin-left: 8px;
`

export const AssetRemoveIcon = styled(Icon)`
  margin-left: auto;
  margin-bottom: 0px;
  position: relative;
  bottom: 2px;

  :hover {
    color: #fff;
  }
`
