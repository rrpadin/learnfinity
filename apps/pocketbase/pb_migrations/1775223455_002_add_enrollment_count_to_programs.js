/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("programs");

  const existing = collection.fields.getByName("enrollment_count");
  if (existing) {
    if (existing.type === "number") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("enrollment_count"); // exists with wrong type, remove first
  }

  collection.fields.add(new NumberField({
    name: "enrollment_count",
    required: false,
    min: 0
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("programs");
  collection.fields.removeByName("enrollment_count");
  return app.save(collection);
})
