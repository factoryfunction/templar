import { createContextStore } from 'easy-peasy'

// import * as assets from './assets'
import * as project from './project'
import * as layers from './layers'
import * as source from './source'
import * as workbench from './workbench'
import * as canvas from './canvas'

const TAB_NAMES = ['Layers', 'Sources', 'Help']

const store = {
  workbenchActiveTab: 'Layers',
  workbenchTabNames: TAB_NAMES,
  ...workbench,

  projectId: null,
  isProjectReady: false,
  isProjectLoading: false,
  wasProjectRecentlySaved: false,
  ...project,

  scale: 0.5,
  panPosition: [],
  panX: 0,
  panY: 0,
  isPanningEnabled: false,
  ...canvas,

  source: null,
  sourceShareUrl: null,
  ...source,

  layers: [],
  selectedLayers: [],
  areLayersLoading: false,
  ...layers,
}

export const EditorStore = createContextStore(store, {
  name: 'EditorStore',
})
