/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("admin_logs");
  const field = collection.fields.getByName("resource_type");
  field.values = ["program", "mission", "user", "settings", "content", "report", "email"];
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("admin_logs");
  const field = collection.fields.getByName("resource_type");
  field.values = [];
  return app.save(collection);
})
