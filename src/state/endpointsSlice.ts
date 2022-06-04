import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as moxService from '../services/mox.service'
import { Endpoint, PersistedEndpoint } from '../model/endpoint.model'
import { RootState } from './store'

interface EndpointsState {
  isLoading: boolean,
  endpoints: Array<PersistedEndpoint>,
  viewType: 'none' | 'show' | 'edit' | 'create',
  selectedEnpointId?: number
}

const initialState: EndpointsState = {
  isLoading: false,
  endpoints: [],
  viewType: 'none'
}

export const getAllEndpointsAsync = createAsyncThunk(
  'endpoint/getAll',
  async () => {
    const response = await moxService.fetchEndpoints();
    return response.data;
  }
);

export const submitCreateEndpointAsync = createAsyncThunk(
  'endpoint/submitCreate',
  async (props: { endpoint: Endpoint }) => {
    const response = await moxService.createEndpoint(props.endpoint);
    return response.data;
  }
);

export const submitUpdateEndpointAsync = createAsyncThunk(
  'endpoint/submitUpdate',
  async (props: { id: number, endpoint: Endpoint }) => {
    const response = await moxService.updateEndpoint(props.id, props.endpoint);
    return response.data;
  }
);

export const submitDeleteEndpointAsync = createAsyncThunk(
  'endpoint/submitDelete',
  async (props: { id: number }) => {
    const response = await moxService.deleteEndpoint(props.id);
    return response.data;
  }
);

const endpointsSlice = createSlice({
  name: 'endpoints',
  initialState,
  reducers: {
    getAllEndpoints: (state) => {
      state.isLoading = true;
    },
    createEndpoint: (state) => {
      state.viewType = 'create';
    },
    showEndpoint: (state, action: PayloadAction<number>) => {
      state.viewType = 'show';
      state.selectedEnpointId = action.payload;
    },
    editEndpoint: (state, action: PayloadAction<number>) => {
      state.viewType = 'edit';
      state.selectedEnpointId = action.payload;
    },
    resetView: (state) => {
      state.viewType = 'none';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEndpointsAsync.pending, (state, _) => {
        state.isLoading = true
      })
      .addCase(getAllEndpointsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.endpoints = action.payload;
      })
      .addCase(submitCreateEndpointAsync.fulfilled, (state, action) => {
        state.endpoints = [action.payload, ...state.endpoints]
        state.viewType = 'show';
        state.selectedEnpointId = action.payload.id;
      })
      .addCase(submitUpdateEndpointAsync.fulfilled, (state, action) => {
        state.endpoints = state.endpoints.map(endpoint => endpoint.id == action.payload.id ? action.payload : endpoint)
        state.viewType = 'show';
        state.selectedEnpointId = action.payload.id;
      })
      .addCase(submitDeleteEndpointAsync.fulfilled, (state, action) => {
        state.endpoints = state.endpoints.flatMap(endpoint => endpoint.id == action.payload.id ? [] : [endpoint])
        state.viewType = 'none';
      })

  }
})

export const { resetView, createEndpoint, showEndpoint, editEndpoint } = endpointsSlice.actions

export const selectEnpoints = (state: RootState) => state.endpoints
// export function selectEnpoint(id: number) {
//   (state: RootState) => state.endpoints.endpoints.find(endpoint => endpoint.id == id)
// }

export const endpointsReducer = endpointsSlice.reducer