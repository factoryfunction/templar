import { action } from 'easy-peasy'

// BASIC STORE ACTIONS ------------------------------------
// Since actions are *synchronous* ways of updating the
// store, we use "thunks" when we need to do something
// *asynchrnously* while updating the store along the way.

export const setWorkbenchActiveTab = action((state, value) => {
  state.workbenchActiveTab = value
})
