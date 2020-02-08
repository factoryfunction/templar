import './styles/index.css'
import { EditorCanvasLayers } from './EditorCanvasLayers'
export const Preview = (props) => {
  return (
    <div styleName='EditorCanvasContainer' id='DocumentCanvas'>
      <EditorCanvasLayers />
    </div>
  )
}

export default Preview
