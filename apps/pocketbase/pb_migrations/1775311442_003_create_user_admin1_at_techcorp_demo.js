/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  const record = new Record(collection);
  record.set("email", "admin1@techcorp.demo");
  record.setPassword("Demo123!");
  record.set("first_name", "Alice");
  record.set("last_name", "Johnson");
  record.set("role", "admin");
  record.set("status", "active");
  const record_organization_idLookup = app.findFirstRecordByFilter("organizations", "name='TechCorp Learning'");
  if (!record_organization_idLookup) { throw new Error("Lookup failed for organization_id: no record in 'organizations' matching \"name='TechCorp Learning'\""); }
  record.set("organization_id", record_organization_idLookup.id);
  record.set("is_admin", true);
  try {
    return app.save(record);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
      return;
    }
    throw e;
  }
}, (app) => {
  try {
    const record = app.findFirstRecordByData("users", "email", "admin1@techcorp.demo");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})
