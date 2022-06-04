import axios, { AxiosResponse } from "axios";
import { Endpoint, PersistedEndpoint } from "../model/endpoint.model";

import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

export async function fetchEndpoints(): Promise<{ data: PersistedEndpoint[] }> {
  return await axios
    .get<void, AxiosResponse<{ response: PersistedEndpoint[] }>>('http://localhost:9898/endpoint')
    .then(r => ({ data: camelcaseKeys(r.data.response) }))
}

// TODO: fix `exclude` which doesn't seem to be working. Also add solution on response as well.
export async function createEndpoint(endpoint: Endpoint): Promise<{ data: PersistedEndpoint }> {
  return await axios
    .post<void, AxiosResponse<{ response: PersistedEndpoint }>>(`http://localhost:9898/endpoint`, snakecaseKeys(endpoint, { exclude: ['headers'] }))
    .then(r => ({ data: camelcaseKeys(r.data.response) }))
}

export async function updateEndpoint(id: number, endpoint: Endpoint): Promise<{ data: PersistedEndpoint }> {
  return await axios
    .put<void, AxiosResponse<{ response: PersistedEndpoint }>>(`http://localhost:9898/endpoint/${id}`, snakecaseKeys(endpoint, { exclude: ['headers'] }))
    .then(r => ({ data: camelcaseKeys(r.data.response) }))
}

export async function deleteEndpoint(id: number): Promise<{ data: PersistedEndpoint }> {
  return await axios
    .delete<void, AxiosResponse<{ response: PersistedEndpoint }>>(`http://localhost:9898/endpoint/${id}`)
    .then(r => ({ data: camelcaseKeys(r.data.response) }))
}