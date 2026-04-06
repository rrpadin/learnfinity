/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  const record = new Record(collection);
  record.set("email", "kevin.brown@techcorp.com");
  record.setPassword("TechCorp2024!");
  record.set("name", "Kevin Brown");
  record.set("role", "user");
  record.set("is_admin", false);
  record.set("job_title", "QA Engineer");
  record.set("department", "Engineering");
  record.set("hire_date", "2023-05-22");
  record.set("employment_type", "contract");
  record.set("phone", "+1-555-0110");
  record.set("location", "Austin, TX");
  record.set("bio", "Automation testing specialist");
  record.set("status", "active");
  const record_manager_idLookup = app.findFirstRecordByFilter("users", "email='michael.chen@techcorp.com'");
  if (!record_manager_idLookup) { throw new Error("Lookup failed for manager_id: no record in 'users' matching \"email='michael.chen@techcorp.com'\""); }
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
    const record = app.findFirstRecordByData("users", "email", "kevin.brown@techcorp.com");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})
