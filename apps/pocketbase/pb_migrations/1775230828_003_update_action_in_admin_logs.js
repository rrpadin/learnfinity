/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("admin_logs");
  const field = collection.fields.getByName("action");
  field.values = ["created", "updated", "deleted", "exported", "imported", "tested"];
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("admin_logs");
  const field = collection.fields.getByName("action");
  field.values = [];
  return app.save(collection);
})
