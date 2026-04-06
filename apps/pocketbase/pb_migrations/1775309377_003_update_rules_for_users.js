/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  collection.listRule = "organization_id.admin_id = @request.auth.id";
  collection.viewRule = "organization_id.admin_id = @request.auth.id";
  collection.createRule = "organization_id.admin_id = @request.auth.id";
  collection.updateRule = "organization_id.admin_id = @request.auth.id";
  collection.deleteRule = "organization_id.admin_id = @request.auth.id";
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("users");
  collection.listRule = "id = @request.auth.id";
  collection.viewRule = "id = @request.auth.id";
  collection.createRule = "";
  collection.updateRule = "id = @request.auth.id";
  collection.deleteRule = "id = @request.auth.id";
  return app.save(collection);
})
