/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("user_missions");

  const existing = collection.fields.getByName("completed_at");
  if (existing) {
    if (existing.type === "date") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("completed_at"); // exists with wrong type, remove first
  }

  collection.fields.add(new DateField({
    name: "completed_at",
    required: false
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("user_missions");
  collection.fields.removeByName("completed_at");
  return app.save(collection);
})
