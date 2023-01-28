import axios, { AxiosResponse } from "axios";
import { Endpoint, PersistedEndpoint } from "../model/endpoint.model";

import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

export async function fetchEndpoints(): Promise<{ data: PersistedEndpoint[] }> {
  return await axios
    .get<void, AxiosResponse<{ response: PersistedEndpoint[] }>>('http://localhost:9898/endpoint')
    .then(r => ({ data: camelcaseKeys(r.data.response, { deep: false }) }))
}

// TODO: use something else other than `deep` - this is bug-prone.
export async function createEndpoint(endpoint: Endpoint): Promise<{ data: PersistedEndpoint }> {
  return await axios
    .post<void, AxiosResponse<{ response: PersistedEndpoint }>>(`http://localhost:9898/endpoint`, snakecaseKeys(endpoint, { deep: false }))
    .then(r => ({ data: camelcaseKeys(r.data.response, { deep: false }) }))
}

export async function updateEndpoint(id: number, endpoint: Endpoint): Promise<{ data: PersistedEndpoint }> {
  return await axios
    .put<void, AxiosResponse<{ response: PersistedEndpoint }>>(`http://localhost:9898/endpoint/${id}`, snakecaseKeys(endpoint, { deep: false }))
    .then(r => ({ data: camelcaseKeys(r.data.response, { deep: false }) }))
}

export async function deleteEndpoint(id: number): Promise<{ data: PersistedEndpoint }> {
  return await axios
    .delete<void, AxiosResponse<{ response: PersistedEndpoint }>>(`http://localhost:9898/endpoint/${id}`)
    .then(r => ({ data: camelcaseKeys(r.data.response, { deep: false }) }))
}