/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("user_missions");

  const existing = collection.fields.getByName("time_spent");
  if (existing) {
    if (existing.type === "number") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("time_spent"); // exists with wrong type, remove first
  }

  collection.fields.add(new NumberField({
    name: "time_spent",
    required: false,
    min: 0
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("user_missions");
  collection.fields.removeByName("time_spent");
  return app.save(collection);
})
