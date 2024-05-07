import { emptySplitApi as api } from './emptyApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    readRootGet: build.query<ReadRootGetApiResponse, ReadRootGetApiArg>({
      query: (queryArg) => ({ url: `/`, params: { prompt: queryArg.prompt } }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as loraxServerApi };
export type ReadRootGetApiResponse =
  /** status 200 Successful Response */ Response;
export type ReadRootGetApiArg = {
  prompt: string;
};
export type Response = {
  text: string;
};
export type ValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
};
export type HttpValidationError = {
  detail?: ValidationError[];
};
export const { useReadRootGetQuery } = injectedRtkApi;
