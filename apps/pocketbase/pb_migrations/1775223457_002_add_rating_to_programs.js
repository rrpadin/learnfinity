/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("programs");

  const existing = collection.fields.getByName("rating");
  if (existing) {
    if (existing.type === "number") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("rating"); // exists with wrong type, remove first
  }

  collection.fields.add(new NumberField({
    name: "rating",
    required: false,
    min: 0,
    max: 5
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("programs");
  collection.fields.removeByName("rating");
  return app.save(collection);
})
