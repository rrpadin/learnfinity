/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  const record = new Record(collection);
  record.set("email", "jessica.lee@techcorp.com");
  record.setPassword("TechCorp2024!");
  record.set("name", "Jessica Lee");
  record.set("role", "user");
  record.set("is_admin", false);
  record.set("job_title", "Sales Representative");
  record.set("department", "Sales");
  record.set("hire_date", "2023-04-10");
  record.set("employment_type", "full_time");
  record.set("location", "New York, NY");
  record.set("bio", "Account executive focused on mid-market");
  record.set("status", "active");
  const record_manager_idLookup = app.findFirstRecordByFilter("users", "email='david.martinez@techcorp.com'");
  if (!record_manager_idLookup) { throw new Error("Lookup failed for manager_id: no record in 'users' matching \"email='david.martinez@techcorp.com'\""); }
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
    const record = app.findFirstRecordByData("users", "email", "jessica.lee@techcorp.com");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})
