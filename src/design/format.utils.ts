export function beautifyJson(raw: string): string {
  return JSON.stringify(JSON.parse(raw), null, 2)
}