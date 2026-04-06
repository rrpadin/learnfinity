/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("programs");

  const existing = collection.fields.getByName("learning_outcomes");
  if (existing) {
    if (existing.type === "json") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("learning_outcomes"); // exists with wrong type, remove first
  }

  collection.fields.add(new JSONField({
    name: "learning_outcomes",
    required: false
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("programs");
  collection.fields.removeByName("learning_outcomes");
  return app.save(collection);
})
