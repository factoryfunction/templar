declare type UploadingFileT = {
  name: string,
  size: number,
  type: string,
  path: string,
  lastModifiedDate: Date,
  lastModified: Number,
}

declare type LayerT = {
  id: string,
  name: string,
  type: string,
  isVisible: boolean,
  styleTop: number,
  styleLeft: number,
  styleWidth: number,
  styleHeight: number,
  styleOpacity: number,
}

declare type ImageLayerT = LayerT & {
  styleBackgroundSize: string,
  styleBackgroundImage: string,
}

declare type TextLayerT = LayerT & {
  textValue: string,
  styleFontFamily: string,
  styleFontWeight: string,
  styleFontStyle: string,
  styleFontSize: number,
  styleColor: string,
  styleLineHeight: number,
  styleLetterSpacing: number,
  styleTextOverflow: string,
  styleBackgroundColor: string,
}

declare type BoxLayerT = LayerT & {
  styleBackgroundColor: string,
}
