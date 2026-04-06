/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("feedback_templates");
  collection.indexes.push("CREATE UNIQUE INDEX idx_feedback_templates_name ON feedback_templates (name)");
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("feedback_templates");
  collection.indexes = collection.indexes.filter(idx => !idx.includes("idx_feedback_templates_name"));
  return app.save(collection);
})
