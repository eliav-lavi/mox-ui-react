export function beautifyJson(raw: string): string {
  try {
    return JSON.stringify(JSON.parse(raw), null, 2)
  } catch(e) {
    return raw
  }
}