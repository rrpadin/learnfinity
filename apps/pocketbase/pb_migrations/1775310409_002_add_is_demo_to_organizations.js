/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("organizations");

  const existing = collection.fields.getByName("is_demo");
  if (existing) {
    if (existing.type === "bool") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("is_demo"); // exists with wrong type, remove first
  }

  collection.fields.add(new BoolField({
    name: "is_demo",
    required: false
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("organizations");
  collection.fields.removeByName("is_demo");
  return app.save(collection);
})
