import { SleepType } from "../endpoints/SleepTimeControl"

export interface EndpointForm2 {
  main: MainForm,
  sleepTime: SleepTimeForm
}

export interface MainForm {
  verb: string,
  path: string,
  returnValue: string,
  statusCode: string,
}

export interface SleepTimeForm {
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

export const defaultEndpointForm2: EndpointForm2 = {
  main: {
    verb: '',
    path: '',
    returnValue: '',
    statusCode: ''
  },
  sleepTime: {
    sleepType: 'none',
    min: '',
    max: ''
  }
}

export const defaultEndpointForm: MainForm = {
  verb: '',
  path: '',
  returnValue: '',
  statusCode: '',

}