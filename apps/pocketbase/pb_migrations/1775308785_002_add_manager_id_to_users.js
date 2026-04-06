/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const _pb_users_auth_Collection = app.findCollectionByNameOrId("_pb_users_auth_");
  const collection = app.findCollectionByNameOrId("users");

  const existing = collection.fields.getByName("manager_id");
  if (existing) {
    if (existing.type === "relation") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("manager_id"); // exists with wrong type, remove first
  }

  collection.fields.add(new RelationField({
    name: "manager_id",
    collectionId: _pb_users_auth_Collection.id
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("users");
  collection.fields.removeByName("manager_id");
  return app.save(collection);
})
