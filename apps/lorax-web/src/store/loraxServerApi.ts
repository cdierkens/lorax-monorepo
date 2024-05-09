import { emptySplitApi as api } from './emptyApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    readRootGet: build.query<ReadRootGetApiResponse, ReadRootGetApiArg>({
      query: (queryArg) => ({
        url: `/`,
        params: {
          prompt: queryArg.prompt,
          base_modelA: queryArg.baseModelA,
          adapterA: queryArg.adapterA,
          temperatureA: queryArg.temperatureA,
          max_new_tokensA: queryArg.maxNewTokensA,
          base_modelB: queryArg.baseModelB,
          adapterB: queryArg.adapterB,
          temperatureB: queryArg.temperatureB,
          max_new_tokensB: queryArg.maxNewTokensB,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as loraxServerApi };
export type ReadRootGetApiResponse =
  /** status 200 Successful Response */ Response;
export type ReadRootGetApiArg = {
  prompt: string;
  baseModelA: string;
  adapterA: string | null;
  temperatureA: number;
  maxNewTokensA: number;
  baseModelB: string;
  adapterB: string | null;
  temperatureB: number;
  maxNewTokensB: number;
};
export type Response = {
  prompt: string;
  textA: string;
  textB: string;
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
