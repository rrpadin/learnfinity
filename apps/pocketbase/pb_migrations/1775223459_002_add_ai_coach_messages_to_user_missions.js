/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("user_missions");

  const existing = collection.fields.getByName("ai_coach_messages");
  if (existing) {
    if (existing.type === "json") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("ai_coach_messages"); // exists with wrong type, remove first
  }

  collection.fields.add(new JSONField({
    name: "ai_coach_messages",
    required: false
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("user_missions");
  collection.fields.removeByName("ai_coach_messages");
  return app.save(collection);
})
