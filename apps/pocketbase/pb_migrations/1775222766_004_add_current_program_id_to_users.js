/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const programsCollection = app.findCollectionByNameOrId("programs");
  const collection = app.findCollectionByNameOrId("users");

  const existing = collection.fields.getByName("current_program_id");
  if (existing) {
    if (existing.type === "relation") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("current_program_id"); // exists with wrong type, remove first
  }

  collection.fields.add(new RelationField({
    name: "current_program_id",
    collectionId: programsCollection.id
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("users");
  collection.fields.removeByName("current_program_id");
  return app.save(collection);
})
