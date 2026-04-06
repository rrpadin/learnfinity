/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("ai_prompts");
  collection.indexes.push("CREATE UNIQUE INDEX idx_ai_prompts_name ON ai_prompts (name)");
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("ai_prompts");
  collection.indexes = collection.indexes.filter(idx => !idx.includes("idx_ai_prompts_name"));
  return app.save(collection);
})
