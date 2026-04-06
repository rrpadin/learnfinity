/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("programs");

  const existing = collection.fields.getByName("featured_color");
  if (existing) {
    if (existing.type === "text") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("featured_color"); // exists with wrong type, remove first
  }

  collection.fields.add(new TextField({
    name: "featured_color",
    required: false
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("programs");
  collection.fields.removeByName("featured_color");
  return app.save(collection);
})
