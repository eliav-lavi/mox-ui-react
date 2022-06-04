import { beautifyJson } from "../design/format.utils";
import { SleepTime, SleepType } from "../endpoints/SleepTimeControl";
import { EndpointForm2 } from "../model/endpoint-form.model";
import { Endpoint } from "../model/endpoint.model";

export function transformToForm(endpoint: Endpoint): EndpointForm2 {
  const min = endpoint.minResponseMillis?.toString() || ''
  const max = endpoint.maxResponseMillis?.toString() || ''

  const main = {
    verb: endpoint.verb,
    path: endpoint.path,
    returnValue: beautifyJson(endpoint.returnValue),
    statusCode: endpoint.statusCode.toString(),
  }
  const sleepTime = {
    sleepType: inferSleepType({ min, max }),
    max,
    min
  }
  return {
    main,
    sleepTime,
    // ...endpoint,
    // statusCode: endpoint.statusCode.toString(),
    // returnValue: beautifyJson(endpoint.returnValue),
    // sleepType: inferSleepType({ min, max }),
    // maxResponseMillis: max,
    // minResponseMillis: min
  }
}

export function transformToEndpoint(endpointForm: EndpointForm2): Endpoint {
  // TODO: millis can be undefined! won't work right now
  let minResponseMillis: number | undefined = undefined
  let maxResponseMillis: number | undefined = undefined
  if (endpointForm.sleepTime.sleepType !== 'none') {
    minResponseMillis = validateNumber(endpointForm.sleepTime.min)
  }
  if (endpointForm.sleepTime.sleepType === 'range') {
    maxResponseMillis = validateNumber(endpointForm.sleepTime.max)
  }
  const statusCode = validateNumber(endpointForm.main.statusCode)

  return {
    ...endpointForm.main,
    minResponseMillis,
    maxResponseMillis,
    statusCode,
    headers: {} // TODO fix this
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