// import styled from 'styled-components'

// import Icon from './Icon'
// import useLayersStore from '../stores/layersStore'
// import useDoubleClick from 'use-double-click'

// import {
//   SelectedImageEditor,
//   ImageSizeEditor,
//   LayerNameEditor,
//   HeightStyleEditor,
//   WidthStyleEditor,
//   TopStyleEditor,
//   LeftStyleEditor,
//   LayerTextEditor,
//   ImageWidthStyleEditor,
//   ImageHeightStyleEditor,
//   ImageRatioLockEditor,
//   WidthContainmentEditor,
//   SelectedFontEditor,
//   FontSizeStyleEditor,
//   TextWidthStyleEditor,
//   TextHeightStyleEditor,
// } from './InputEditors'

// import { LAYER_TYPE_ICON_NAME_MAP, LAYER_TYPE_ICON_SIZE_MAP } from '../consts'
// import useLayerClickHandlers from '../utilities/useLayerClickHandlers'

// const StyledLayersList = styled.div`
//   display: flex;
//   flex-direction: column-reverse;
//   width: 100%;
//   max-height: calc(100vh - 128px);
//   overflow: auto;

//   ::-webkit-scrollbar {
//     width: 0px;
//     background: rgba(0, 0, 0, 0);
//   }

//   ::-webkit-scrollbar-track {
//     background: transparent;
//   }
// `

// const StyledLayerEditor = styled.div`
//   width: 100%;
//   height: fit-content;
//   padding: 16px 24px;
//   display: flex;
//   flex-direction: column;
//   border-bottom: 1px solid var(--whiteBorderColor);
//   background: #f6ebfe2e;
// `

// const StyledLayer = styled.div`
//   width: 100%;
//   height: 40px;
//   min-height: 40px;
//   padding: 0 24px;
//   display: flex;
//   align-items: center;
//   border-radius: 2px;
//   cursor: pointer;

//   border-top: 1px solid transparent;
//   border-bottom: 1px solid transparent;

//   :hover {
//     border-top: 1px solid var(--whiteBorderColor);
//     border-bottom: 1px solid var(--whiteBorderColor);
//   }

//   &[data-is-selected='true'] {
//     background: #d5a0f836;
//   }
// `

// const StyledLayerContainer = styled.div`
//   display: flex;
//   flex-direction: column;
// `

// const StyledLayerName = styled.p`
//   font-family: var(--mainFont);
//   color: var(--subTextColor);
//   font-size: 14px;
//   margin-left: 8px;
//   margin-bottom: 2px;
//   cursor: pointer;
//   width: 180px;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   user-select: none;
// `

// const StyledLayerIconContainer = styled.div`
//   width: 24px;
//   display: flex;
//   justify-content: center;
// `

// const StyledRemoveIcon = styled(Icon)`
//   margin-left: auto;
// `

// export const LayersPanel = (props) => {
//   const layersStore = useLayersStore()

//   return (
//     <>
//       <StyledLayersList>
//         <For each='layer' of={layersStore.layers}>
//           <Layer key={layer.id} layer={layer} layersStore={layersStore} />
//         </For>
//       </StyledLayersList>
//       <StyledBottomContainer>
//         <Icon name='text' size='24px' color='#fff' onClick={layersStore.addTextLayer} />
//         <Icon name='scenery' size='24px' color='#fff' onClick={layersStore.addImageLayer} />
//         <Icon name='square-full' size='24px' color='#fff' onClick={layersStore.addBlockLayer} />
//       </StyledBottomContainer>
//     </>
//   )
// }

// const Layer = (props) => {
//   const iconName = LAYER_TYPE_ICON_NAME_MAP[props.layer.type]
//   const iconSize = LAYER_TYPE_ICON_SIZE_MAP[props.layer.type]

//   const onClick = (event) => {
//     if (!event.target.getAttribute('data-is-component-action')) {
//       props.layersStore.selectLayer(props.layer.id)
//     }
//   }

//   const onDoubleClick = (event) => {
//     if (!event.target.getAttribute('data-is-component-action')) {
//       props.layersStore.enableLayerEditing(props.layer.id)
//     }
//   }

//   return (
//     <StyledLayerContainer>
//       <StyledLayer
//         onDoubleClick={onDoubleClick}
//         onClick={onClick}
//         draggable
//         data-is-selected={props.layer.isSelected}
//       >
//         <StyledLayerIconContainer>
//           <Icon name={iconName} size={iconSize} color='var(--subTextColor)' />
//         </StyledLayerIconContainer>

//         <StyledLayerName>{props.layer.name}</StyledLayerName>

//         <StyledRemoveIcon
//           data-is-component-action
//           name='trash-alt'
//           size='16px'
//           color='var(--subTextColor)'
//           onClick={() => props.layersStore.removeLayer(props.layer.id)}
//         />
//       </StyledLayer>

//       <If condition={props.layer.isBeingEdited}>
//         <Choose>
//           <When condition={props.layer.type === 'text'}>
//             <TextLayerEditor layer={props.layer} layersStore={props.layersStore}></TextLayerEditor>
//           </When>

//           <When condition={props.layer.type === 'image'}>
//             <ImageLayerEditor layer={props.layer} layersStore={props.layersStore}></ImageLayerEditor>
//           </When>

//           <When condition={props.layer.type === 'block'}>
//             <BlockLayerEditor layer={props.layer} layersStore={props.layersStore}></BlockLayerEditor>
//           </When>
//         </Choose>
//       </If>
//     </StyledLayerContainer>
//   )
// }

// const TextLayerEditor = (props) => {
//   return (
//     <StyledLayerEditor>
//       <LayerNameEditor layer={props.layer} layersStore={props.layersStore} />
//       <SelectedFontEditor layer={props.layer} layersStore={props.layersStore} />
//       <LeftStyleEditor layer={props.layer} layersStore={props.layersStore} />
//       <TopStyleEditor layer={props.layer} layersStore={props.layersStore} />
//       <LayerTextEditor layer={props.layer} layersStore={props.layersStore} />
//       <TextWidthStyleEditor layer={props.layer} layersStore={props.layersStore} />
//       <TextHeightStyleEditor layer={props.layer} layersStore={props.layersStore} />
//       <FontSizeStyleEditor layer={props.layer} layersStore={props.layersStore} />
//     </StyledLayerEditor>
//   )
// }

// const ImageLayerEditor = (props) => {
//   return (
//     <StyledLayerEditor>
//       <LayerNameEditor layer={props.layer} layersStore={props.layersStore} />
//       <SelectedImageEditor layer={props.layer} layersStore={props.layersStore} />
//       <LeftStyleEditor layer={props.layer} layersStore={props.layersStore} />
//       <TopStyleEditor layer={props.layer} layersStore={props.layersStore} marginBottom='8px' />
//       <ImageRatioLockEditor layer={props.layer} layersStore={props.layersStore} marginBottom='20px' />
//       <ImageWidthStyleEditor layer={props.layer} layersStore={props.layersStore} />
//       <ImageHeightStyleEditor layer={props.layer} layersStore={props.layersStore} />
//     </StyledLayerEditor>
//   )
// }

// const BlockLayerEditor = (props) => {
//   return (
//     <StyledLayerEditor>
//       <LayerNameEditor layer={props.layer} layersStore={props.layersStore} />
//       <LeftStyleEditor layer={props.layer} layersStore={props.layersStore} />
//       <TopStyleEditor layer={props.layer} layersStore={props.layersStore} />
//       <WidthStyleEditor layer={props.layer} layersStore={props.layersStore} />
//       <HeightStyleEditor layer={props.layer} layersStore={props.layersStore} />
//     </StyledLayerEditor>
//   )
// }

// const StyledBottomContainer = styled.div`
//   width: 100%;
//   height: 40px;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-around;
//   align-items: center;
//   background: var(--dark0);
//   position: absolute;
//   bottom: 8px;
//   right: 0;
// `

// export default LayersPanel
