import { beautifyJson } from "../design/format.utils";
import { SleepTime, SleepTimeData, SleepType } from "../endpoints/SleepTimeControl";
import { EndpointForm } from "../model/endpoint-form.model";
import { Endpoint } from "../model/endpoint.model";

export function transformToForm(endpoint: Endpoint): EndpointForm {
  const min = endpoint.minResponseMillis?.toString() || ''
  const max = endpoint.maxResponseMillis?.toString() || ''
  return {
    ...endpoint,
    statusCode: endpoint.statusCode.toString(),
    returnValue: beautifyJson(endpoint.returnValue),
    sleepType: inferSleepType({ min, max }),
    maxResponseMillis: max,
    minResponseMillis: min
  }
}

export function transformToEndpoint(endpointForm: EndpointForm, sleepTimeData: SleepTimeData): Endpoint {
  // TODO: millis can be undefined! won't work right now
  let minResponseMillis: number | undefined = undefined
  let maxResponseMillis: number | undefined = undefined
  if(sleepTimeData.sleepType !== 'none' ) {
    minResponseMillis = validateNumber(sleepTimeData.min)
  }
  if(sleepTimeData.sleepType === 'range') {
    maxResponseMillis = validateNumber(sleepTimeData.max)
  }
  const statusCode = validateNumber(endpointForm.statusCode)

  return {
    ...endpointForm,
    minResponseMillis,
    maxResponseMillis,
    statusCode
  }
}

function validateNumber(raw: string): number {
  if (!raw) {
    throw 'input is not defined'
  }
  const asNumber = +raw
  if (isNaN(asNumber)) {
    throw `input is not numeric: ${raw}`
  }
  return asNumber
}

function inferSleepType(sleepTime: SleepTime): SleepType {
  if (!!sleepTime.min && !!sleepTime.max) {
    return 'range'
  }
  if (!!sleepTime.min) {
    return 'fixed'
  }
  return 'none'
}