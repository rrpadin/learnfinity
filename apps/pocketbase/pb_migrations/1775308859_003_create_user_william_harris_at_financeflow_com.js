/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  const record = new Record(collection);
  record.set("email", "william.harris@financeflow.com");
  record.setPassword("FinanceFlow2024!");
  record.set("name", "William Harris");
  record.set("role", "user");
  record.set("is_admin", false);
  record.set("job_title", "Operations Analyst");
  record.set("department", "Operations");
  record.set("hire_date", "2023-06-01");
  record.set("employment_type", "part_time");
  record.set("location", "Chicago, IL");
  record.set("bio", "Process improvement and efficiency");
  record.set("status", "pending");
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
    const record = app.findFirstRecordByData("users", "email", "william.harris@financeflow.com");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})
