export interface Endpoint {
  verb: string,
  path: string,
  returnValue: string,
  statusCode: number,
  headers: { [key: string]: string },
  minResponseMillis?: number,
  maxResponseMillis?: number,
}

export interface PersistedEndpoint extends Endpoint {
  id: number
}