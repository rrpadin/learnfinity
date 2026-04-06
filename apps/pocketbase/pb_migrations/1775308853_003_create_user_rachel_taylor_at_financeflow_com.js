/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  const record = new Record(collection);
  record.set("email", "rachel.taylor@financeflow.com");
  record.setPassword("FinanceFlow2024!");
  record.set("name", "Rachel Taylor");
  record.set("role", "user");
  record.set("is_admin", false);
  record.set("job_title", "Senior Accountant");
  record.set("department", "Finance");
  record.set("hire_date", "2022-01-10");
  record.set("employment_type", "full_time");
  record.set("location", "Chicago, IL");
  record.set("bio", "Tax compliance and planning");
  record.set("status", "active");
  const record_manager_idLookup = app.findFirstRecordByFilter("users", "email='thomas.anderson@financeflow.com'");
  if (!record_manager_idLookup) { throw new Error("Lookup failed for manager_id: no record in 'users' matching \"email='thomas.anderson@financeflow.com'\""); }
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
    const record = app.findFirstRecordByData("users", "email", "rachel.taylor@financeflow.com");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})
