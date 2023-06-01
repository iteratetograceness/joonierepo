export type QueryParams = Record<string, number | number[] | string | string[]>

export function encodeQueryParams(params: QueryParams) {
  return Object.keys(params)
    .map((key) => {
      const paramValue = params[key]

      if (Array.isArray(paramValue)) {
        return paramValue.join(',')
      }

      return encodeURIComponent(key) + '=' + encodeURIComponent(paramValue)
    })
    .join('&')
}
