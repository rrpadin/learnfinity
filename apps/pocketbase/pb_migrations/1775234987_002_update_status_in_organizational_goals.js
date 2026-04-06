/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("organizational_goals");
  const field = collection.fields.getByName("status");
  field.values = ["active", "completed", "on_hold"];
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("organizational_goals");
  const field = collection.fields.getByName("status");
  field.values = ["active", "completed", "on_hold"];
  return app.save(collection);
})
