/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  const record = new Record(collection);
  record.set("email", "patricia.garcia@financeflow.com");
  record.setPassword("FinanceFlow2024!");
  record.set("name", "Patricia Garcia");
  record.set("role", "admin");
  record.set("is_admin", true);
  record.set("job_title", "Chief Financial Officer");
  record.set("department", "Finance");
  record.set("hire_date", "2019-05-10");
  record.set("employment_type", "full_time");
  record.set("phone", "+1-555-0201");
  record.set("location", "Chicago, IL");
  record.set("bio", "Financial strategy and operations leader");
  record.set("status", "active");
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
    const record = app.findFirstRecordByData("users", "email", "patricia.garcia@financeflow.com");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})
