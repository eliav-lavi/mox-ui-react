import { SleepType } from "../endpoints/SleepTimeControl"

export interface EndpointForm2 {
  main: Main,
  sleepTime: SleepTime
}

export interface Main {
  verb: string,
  path: string,
  returnValue: string,
  statusCode: string,
}

export interface SleepTime {
  sleepType: SleepType
  min: string,
  max: string,
}

export interface EndpointForm {
  verb: string,
  path: string,
  returnValue: string,
  statusCode: string,
  headers: { [key: string]: string },
  sleepType: SleepType
  minResponseMillis: string,
  maxResponseMillis: string,
}

export const defaultEndpointForm: EndpointForm = {
  verb: '',
  path: '',
  returnValue: '',
  statusCode: '',
  headers: {},
  sleepType: 'none',
  minResponseMillis: '',
  maxResponseMillis: '',
}