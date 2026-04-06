/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("user_missions");

  const existing = collection.fields.getByName("output_length");
  if (existing) {
    if (existing.type === "number") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("output_length"); // exists with wrong type, remove first
  }

  collection.fields.add(new NumberField({
    name: "output_length",
    required: false,
    min: 0
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("user_missions");
  collection.fields.removeByName("output_length");
  return app.save(collection);
})
