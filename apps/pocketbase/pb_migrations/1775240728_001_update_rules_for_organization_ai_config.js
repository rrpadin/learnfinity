/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("organization_ai_config");
  collection.createRule = "organization_id.admin_id = @request.auth.id || @request.auth.is_admin = true";
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("organization_ai_config");
  collection.createRule = "organization_id.admin_id = @request.auth.id";
  return app.save(collection);
})
