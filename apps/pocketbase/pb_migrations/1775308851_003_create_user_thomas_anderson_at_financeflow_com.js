/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  const record = new Record(collection);
  record.set("email", "thomas.anderson@financeflow.com");
  record.setPassword("FinanceFlow2024!");
  record.set("name", "Thomas Anderson");
  record.set("role", "user");
  record.set("is_admin", false);
  record.set("job_title", "Accounting Manager");
  record.set("department", "Finance");
  record.set("hire_date", "2021-08-15");
  record.set("employment_type", "full_time");
  record.set("phone", "+1-555-0202");
  record.set("location", "Chicago, IL");
  record.set("bio", "GAAP accounting and financial reporting");
  record.set("status", "active");
  const record_manager_idLookup = app.findFirstRecordByFilter("users", "email='patricia.garcia@financeflow.com'");
  if (!record_manager_idLookup) { throw new Error("Lookup failed for manager_id: no record in 'users' matching \"email='patricia.garcia@financeflow.com'\""); }
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
    const record = app.findFirstRecordByData("users", "email", "thomas.anderson@financeflow.com");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})
