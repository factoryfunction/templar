import { observable, reaction, computed } from 'mobx'
import nanoid from 'nanoid'

// Store
// Constants

const PLACEHOLDER_IMAGE_URL = 'https://www.okcballet.org/wp-content/uploads/2016/09/placeholder-image.png'

// Store
// Definition

class LayersStore {
  @observable layers = []

  @computed get layerIds() {
    return this.layers.map((layer) => {
      return layer.id
    })
  }

  // Store
  // Actions

  deselectAllLayers = () => {
    this.layers.forEach((layer) => {
      if (layer.isSelected) {
        layer.isSelected = false
        layer.isBeingEdited = false
      }
    })
  }

  setLayerEditing = (id, isEditing) => {
    this.updateLayerById(id, (layer) => {
      layer.isSelected = isEditing
      layer.isBeingEdited = isEditing
    })
  }

  getLayerById = (id) => {
    let index = undefined

    const layer = this.layers.find((layer, _index) => {
      const matchesId = layer.id === id

      if (matchesId) {
        index = _index
      }

      return matchesId
    })

    return {
      layer,
      index,
    }
  }

  updateLayerById = (id, handler) => {
    this.layers.forEach((layer) => {
      if (layer.id === id) {
        handler(layer)
      }
    })
  }

  selectLayer = (id) => {
    for (const layer of this.layers) {
      if (layer.id === id) {
        layer.isSelected = true
      } else {
        layer.isSelected = false
        layer.isBeingEdited = false
      }
    }
  }

  deselectLayer = (id) => {
    this.updateLayerById(id, (layer) => {
      layer.isSelected = false
      layer.isBeingEdited = false
    })
  }

  setLayerName = (id, name) => {
    this.layers.forEach((layer) => {
      if (layer.id === id) {
        layer.name = name
      }
    })
  }

  setLayerStyle = (id, styleProperty, styleValue) => {
    this.layers.forEach((layer) => {
      if (layer.id === id) {
        layer.style[styleProperty] = styleValue
      }
    })
  }

  setLayerText = (id, text) => {
    this.updateLayerById(id, (layer) => {
      layer.text = text
    })
  }

  insertTextLayer = () => {
    this.layers.push({
      isSelected: false,
      isBeingEdited: false,
      id: nanoid(),
      type: 'text',
      name: 'Text Layer',
      text: 'some text',
      style: {
        position: 'absolute',
        top: '2%',
        left: '2%',
        width: 'auto',
        height: 'auto',
        fontFamily: 'Work Sans',
        fontStyle: 'normal',
        fontWeight: 400,
        letterSpacing: 0.5,
        lineHeight: '140%',
      },
    })
  }

  insertImageLayer = () => {
    this.layers.push({
      isSelected: false,
      isBeingEdited: false,
      id: nanoid(),
      type: 'image',
      name: 'Image Layer',
      url: PLACEHOLDER_IMAGE_URL,
      style: {
        position: 'absolute',
        top: '2%',
        left: '2%',
        width: 'auto',
        height: 'auto',
        maxWidth: '50%',
        display: 'flex',
        backgroundSize: 'cover',
        backgroundImage: `url(${PLACEHOLDER_IMAGE_URL})`,
        size: 0.25,
      },
    })
  }

  insertBlockLayer = () => {
    this.layers.push({
      isSelected: false,
      isBeingEdited: false,
      id: nanoid(),
      type: 'block',
      name: 'Block Layer',
      style: {
        position: 'absolute',
        top: '2%',
        left: '2%',
        width: '5%',
        height: '5%',
        backgroundColor: 'rgba(0,0,0,0.75)',
      },
    })
  }

  removeLayer = (id) => {
    this.layers = this.layers.filter((layer) => {
      return layer.id !== id
    })
  }
}

const layersStore = new LayersStore()
export default layersStore

reaction(
  () => layersStore.layers.length,
  () => {
    console.log('layers added or removed.')
  },
)
