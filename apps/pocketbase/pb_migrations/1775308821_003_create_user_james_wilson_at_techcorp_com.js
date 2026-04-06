/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  const record = new Record(collection);
  record.set("email", "james.wilson@techcorp.com");
  record.setPassword("TechCorp2024!");
  record.set("name", "James Wilson");
  record.set("role", "user");
  record.set("is_admin", false);
  record.set("job_title", "Software Engineer");
  record.set("department", "Engineering");
  record.set("hire_date", "2023-01-15");
  record.set("employment_type", "full_time");
  record.set("location", "Austin, TX");
  record.set("bio", "Frontend developer with React expertise");
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
    const record = app.findFirstRecordByData("users", "email", "james.wilson@techcorp.com");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})
