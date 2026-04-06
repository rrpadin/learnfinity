/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const pbc_6086422069Collection = app.findCollectionByNameOrId("pbc_6086422069");
  const collection = app.findCollectionByNameOrId("users");

  const existing = collection.fields.getByName("organization_id");
  if (existing) {
    if (existing.type === "relation") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("organization_id"); // exists with wrong type, remove first
  }

  collection.fields.add(new RelationField({
    name: "organization_id",
    required: true,
    collectionId: pbc_6086422069Collection.id
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("users");
  collection.fields.removeByName("organization_id");
  return app.save(collection);
})
