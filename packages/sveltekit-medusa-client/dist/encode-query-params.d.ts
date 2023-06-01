export type QueryParams = Record<string, number | number[] | string | string[]>;
export declare function encodeQueryParams(params: QueryParams): string;
