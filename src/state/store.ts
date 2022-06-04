import { configureStore } from '@reduxjs/toolkit'
import { configsReducer, configsLocalStorageKey } from './configSlice'
import { endpointsReducer } from './endpointsSlice'

export const store = configureStore({
  reducer: {
    configs: configsReducer,
    endpoints: endpointsReducer
  },
});

store.subscribe(() => {
  const configs = store.getState().configs;
  if (!configs) return;

  localStorage.setItem(configsLocalStorageKey, JSON.stringify(configs));
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
