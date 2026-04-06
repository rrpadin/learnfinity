/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("admin_logs");
  collection.listRule = "@request.auth.is_admin = true";
  collection.viewRule = "@request.auth.is_admin = true";
  collection.createRule = "@request.auth.id != \"\"";
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("admin_logs");
  collection.listRule = "@request.auth.id != \"\" && @request.auth.is_admin = true";
  collection.viewRule = "@request.auth.id != \"\" && @request.auth.is_admin = true";
  collection.createRule = "@request.auth.id != \"\" && @request.auth.is_admin = true";
  return app.save(collection);
})
