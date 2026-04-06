/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("user_missions");

  const existing = collection.fields.getByName("feedback_score");
  if (existing) {
    if (existing.type === "number") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("feedback_score"); // exists with wrong type, remove first
  }

  collection.fields.add(new NumberField({
    name: "feedback_score",
    required: false,
    min: 0,
    max: 10
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("user_missions");
  collection.fields.removeByName("feedback_score");
  return app.save(collection);
})
