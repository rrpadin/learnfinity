/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("integrations");
  collection.indexes.push("CREATE UNIQUE INDEX idx_integrations_code ON integrations (code)");
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("integrations");
  collection.indexes = collection.indexes.filter(idx => !idx.includes("idx_integrations_code"));
  return app.save(collection);
})
