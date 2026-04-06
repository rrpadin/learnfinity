/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("admin_logs");

  const existing = collection.fields.getByName("ip_address");
  if (existing) {
    if (existing.type === "text") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("ip_address"); // exists with wrong type, remove first
  }

  collection.fields.add(new TextField({
    name: "ip_address"
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("admin_logs");
  collection.fields.removeByName("ip_address");
  return app.save(collection);
})
