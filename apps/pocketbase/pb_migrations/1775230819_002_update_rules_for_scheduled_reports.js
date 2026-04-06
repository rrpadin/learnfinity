/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("scheduled_reports");
  collection.listRule = "@request.auth.is_admin = true";
  collection.viewRule = "@request.auth.is_admin = true";
  collection.createRule = "@request.auth.is_admin = true";
  collection.updateRule = "@request.auth.is_admin = true";
  collection.deleteRule = "@request.auth.is_admin = true";
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("scheduled_reports");
  collection.listRule = null;
  collection.viewRule = null;
  collection.createRule = null;
  collection.updateRule = null;
  collection.deleteRule = null;
  return app.save(collection);
})
