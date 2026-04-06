/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("missions");

  const existing = collection.fields.getByName("difficulty_level");
  if (existing) {
    if (existing.type === "select") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("difficulty_level"); // exists with wrong type, remove first
  }

  collection.fields.add(new SelectField({
    name: "difficulty_level",
    required: false,
    values: ["easy", "medium", "hard"]
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("missions");
  collection.fields.removeByName("difficulty_level");
  return app.save(collection);
})
