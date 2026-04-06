/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");

  const existing = collection.fields.getByName("enrolled_programs");
  if (existing) {
    if (existing.type === "json") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("enrolled_programs"); // exists with wrong type, remove first
  }

  collection.fields.add(new JSONField({
    name: "enrolled_programs",
    required: false
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("users");
  collection.fields.removeByName("enrolled_programs");
  return app.save(collection);
})
