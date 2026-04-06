/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("admin_logs");

  const existing = collection.fields.getByName("admin_email");
  if (existing) {
    if (existing.type === "text") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("admin_email"); // exists with wrong type, remove first
  }

  collection.fields.add(new TextField({
    name: "admin_email"
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("admin_logs");
  collection.fields.removeByName("admin_email");
  return app.save(collection);
})
