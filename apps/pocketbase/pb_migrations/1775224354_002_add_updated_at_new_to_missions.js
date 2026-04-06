/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("missions");

  const existing = collection.fields.getByName("updated_at_new");
  if (existing) {
    if (existing.type === "autodate") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("updated_at_new"); // exists with wrong type, remove first
  }

  collection.fields.add(new AutodateField({
    name: "updated_at_new",
    onCreate: true,
    onUpdate: true
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("missions");
  collection.fields.removeByName("updated_at_new");
  return app.save(collection);
})
