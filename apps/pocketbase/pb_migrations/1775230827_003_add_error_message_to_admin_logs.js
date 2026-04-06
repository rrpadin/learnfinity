/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("admin_logs");

  const existing = collection.fields.getByName("error_message");
  if (existing) {
    if (existing.type === "text") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("error_message"); // exists with wrong type, remove first
  }

  collection.fields.add(new TextField({
    name: "error_message"
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("admin_logs");
  collection.fields.removeByName("error_message");
  return app.save(collection);
})
