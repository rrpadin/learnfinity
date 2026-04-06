/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  const record = new Record(collection);
  record.set("email", "michael.chen@techcorp.com");
  record.setPassword("TechCorp2024!");
  record.set("name", "Michael Chen");
  record.set("role", "user");
  record.set("is_admin", false);
  record.set("job_title", "Engineering Manager");
  record.set("department", "Engineering");
  record.set("hire_date", "2021-03-20");
  record.set("employment_type", "full_time");
  record.set("phone", "+1-555-0102");
  record.set("location", "San Francisco, CA");
  record.set("bio", "Backend systems specialist");
  record.set("status", "active");
  const record_manager_idLookup = app.findFirstRecordByFilter("users", "email='sarah.johnson@techcorp.com'");
  if (!record_manager_idLookup) { throw new Error("Lookup failed for manager_id: no record in 'users' matching \"email='sarah.johnson@techcorp.com'\""); }
  record.set("manager_id", record_manager_idLookup.id);
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
    const record = app.findFirstRecordByData("users", "email", "michael.chen@techcorp.com");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})
