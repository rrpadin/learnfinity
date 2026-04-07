import PocketBase from 'pocketbase';

export function resolvePocketBaseUrl({
  envSource = {},
  envKey,
  fallback,
}) {
  return envSource?.[envKey] || fallback;
}

export function createPocketBaseClient(baseUrl) {
  return new PocketBase(baseUrl);
}
