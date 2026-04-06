/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  const record = new Record(collection);
  record.set("email", "lisa.rodriguez@techcorp.demo");
  record.setPassword("DemoPass123!");
  record.set("first_name", "Lisa");
  record.set("last_name", "Rodriguez");
  const record_organization_idLookup = app.findFirstRecordByFilter("organizations", "name='TechCorp Learning'");
  if (!record_organization_idLookup) { throw new Error("Lookup failed for organization_id: no record in 'organizations' matching \"name='TechCorp Learning'\""); }
  record.set("organization_id", record_organization_idLookup.id);
  record.set("role", "manager");
  record.set("status", "active");
  record.set("job_title", "Sales Manager");
  record.set("department", "Sales");
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
    const record = app.findFirstRecordByData("users", "email", "lisa.rodriguez@techcorp.demo");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})
