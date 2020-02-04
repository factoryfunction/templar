import { createContextStore } from 'easy-peasy'

import * as project from './project'
import * as assets from './assets'
import * as layers from './layers'
import * as source from './source'
import * as workbench from './workbench'

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

  assets: [],
  areAssetsLoading: false,
  ...assets,

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
