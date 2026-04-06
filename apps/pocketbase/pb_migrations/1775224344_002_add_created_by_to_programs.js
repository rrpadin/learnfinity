/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const usersCollection = app.findCollectionByNameOrId("users");
  const collection = app.findCollectionByNameOrId("programs");

  const existing = collection.fields.getByName("created_by");
  if (existing) {
    if (existing.type === "relation") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("created_by"); // exists with wrong type, remove first
  }

  collection.fields.add(new RelationField({
    name: "created_by",
    required: false,
    collectionId: usersCollection.id,
    maxSelect: 1
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("programs");
  collection.fields.removeByName("created_by");
  return app.save(collection);
})
