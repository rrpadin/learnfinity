/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("email_templates");
  collection.indexes.push("CREATE UNIQUE INDEX idx_email_templates_name ON email_templates (name)");
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("email_templates");
  collection.indexes = collection.indexes.filter(idx => !idx.includes("idx_email_templates_name"));
  return app.save(collection);
})
