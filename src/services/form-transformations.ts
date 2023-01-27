import { beautifyJson } from "../design/format.utils";
import { SleepTime, SleepType } from "../endpoints/SleepTimeControl";
import { EndpointForm, HeadersForm } from "../model/endpoint-form.model";
import { Endpoint } from "../model/endpoint.model";

export function transformToForm(endpoint: Endpoint): EndpointForm {
  const min = endpoint.minResponseMillis?.toString() || ''
  const max = endpoint.maxResponseMillis?.toString() || ''

  const main = {
    verb: endpoint.verb,
    path: endpoint.path,
    returnValue: beautifyJson(endpoint.returnValue),
    statusCode: endpoint.statusCode.toString(),
    headers: endpoint.headers
  }
  const headers = transformHeadersToForm(endpoint.headers)
  const sleepTime = {
    sleepType: inferSleepType({ min, max }),
    max,
    min
  }
  return {
    main,
    headers,
    sleepTime
  }
}

export function transformToEndpoint(endpointForm: EndpointForm): Endpoint {
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
  const headers = transformHeadersToEndpoint(endpointForm.headers)
  return {
    ...endpointForm.main,
    minResponseMillis,
    maxResponseMillis,
    statusCode,
    headers
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

function transformHeadersToEndpoint(headersForm: HeadersForm): {
  [key: string]: string;
} {
  return headersForm.reduce(
    (object, item) =>
      Object.assign(object, { [item.headerName]: item.headerValue }),
    {}
  );
}
function transformHeadersToForm(headersEndpoint: {[key: string]: string}): HeadersForm {
  return Object.entries(headersEndpoint).map(
    ([headerName, headerValue], index) => ({ index, headerName, headerValue })
  );
}