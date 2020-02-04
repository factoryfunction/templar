import styled from 'styled-components'
import { Details } from '#components/Details'

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
