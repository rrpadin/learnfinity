/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("programs");

  const existing = collection.fields.getByName("difficulty");
  if (existing) {
    if (existing.type === "select") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("difficulty"); // exists with wrong type, remove first
  }

  collection.fields.add(new SelectField({
    name: "difficulty",
    required: false,
    values: ["beginner", "intermediate", "advanced"]
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("programs");
  collection.fields.removeByName("difficulty");
  return app.save(collection);
})
