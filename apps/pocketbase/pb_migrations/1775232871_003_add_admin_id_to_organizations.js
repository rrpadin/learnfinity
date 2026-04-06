/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const usersCollection = app.findCollectionByNameOrId("users");
  const collection = app.findCollectionByNameOrId("organizations");

  const existing = collection.fields.getByName("admin_id");
  if (existing) {
    if (existing.type === "relation") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("admin_id"); // exists with wrong type, remove first
  }

  collection.fields.add(new RelationField({
    name: "admin_id",
    required: false,
    collectionId: usersCollection.id
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("organizations");
  collection.fields.removeByName("admin_id");
  return app.save(collection);
})
