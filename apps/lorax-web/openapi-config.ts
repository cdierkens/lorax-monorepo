import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'http://127.0.0.1:8000/openapi.json',
  apiFile: './src/store/emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './src/store/loraxServerApi.ts',
  exportName: 'loraxServerApi',
  hooks: true,
};

export default config;
