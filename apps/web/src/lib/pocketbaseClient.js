import { createPocketBaseClient, resolvePocketBaseUrl } from '@learnfinity/core';

const POCKETBASE_API_URL = resolvePocketBaseUrl({
  envSource: import.meta.env,
  envKey: 'VITE_POCKETBASE_URL',
  fallback: '/hcgi/platform',
});

const pocketbaseClient = createPocketBaseClient(POCKETBASE_API_URL);

export default pocketbaseClient;

export { pocketbaseClient };
