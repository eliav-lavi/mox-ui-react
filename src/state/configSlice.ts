import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

// Define a type for the slice state
interface ConfigsState {
  isDarkModeEnabled: boolean
}

export const configsLocalStorageKey = "mox-configs";
const persistedConfigs = localStorage.getItem(configsLocalStorageKey)

let initialState: ConfigsState
if (!!persistedConfigs) {
  initialState = JSON.parse(persistedConfigs)
} else {
  initialState = {
    isDarkModeEnabled: false
  }
}

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    toggle: (state) => {
      state.isDarkModeEnabled = !state.isDarkModeEnabled
    },
  },
})

export const { toggle } = configSlice.actions

export const selectIsDarkModeEnabled = (state: RootState) => state.configs.isDarkModeEnabled

export const configsReducer = configSlice.reducer