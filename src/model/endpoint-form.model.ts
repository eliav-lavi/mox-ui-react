import { SleepType } from "../endpoints/SleepTimeControl"

export interface EndpointForm {
  main: MainForm,
  headers: HeadersForm,
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


export type HeaderForm = {index: number, headerName: string, headerValue: string}
export type HeadersForm = Array<HeaderForm>

export const defaultEndpointForm: EndpointForm = {
  main: {
    verb: "",
    path: "",
    returnValue: "",
    statusCode: "",
  },
  headers: [],
  sleepTime: {
    sleepType: "none",
    min: "",
    max: "",
  },
};
