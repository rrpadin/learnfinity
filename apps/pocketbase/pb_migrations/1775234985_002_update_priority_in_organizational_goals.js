/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("organizational_goals");
  const field = collection.fields.getByName("priority");
  field.values = ["high", "medium", "low"];
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("organizational_goals");
  const field = collection.fields.getByName("priority");
  field.values = ["high", "medium", "low"];
  return app.save(collection);
})
