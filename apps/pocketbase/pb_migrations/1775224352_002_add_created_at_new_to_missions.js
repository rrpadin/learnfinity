/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("missions");

  const existing = collection.fields.getByName("created_at_new");
  if (existing) {
    if (existing.type === "autodate") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("created_at_new"); // exists with wrong type, remove first
  }

  collection.fields.add(new AutodateField({
    name: "created_at_new",
    onCreate: true,
    onUpdate: false
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("missions");
  collection.fields.removeByName("created_at_new");
  return app.save(collection);
})
