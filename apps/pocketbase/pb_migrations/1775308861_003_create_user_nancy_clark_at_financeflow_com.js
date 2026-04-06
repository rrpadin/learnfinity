/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  const record = new Record(collection);
  record.set("email", "nancy.clark@financeflow.com");
  record.setPassword("FinanceFlow2024!");
  record.set("name", "Nancy Clark");
  record.set("role", "user");
  record.set("is_admin", false);
  record.set("job_title", "Financial Analyst");
  record.set("department", "Finance");
  record.set("hire_date", "2022-11-08");
  record.set("employment_type", "full_time");
  record.set("phone", "+1-555-0207");
  record.set("location", "Chicago, IL");
  record.set("bio", "Budgeting and forecasting");
  record.set("status", "inactive");
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
    const record = app.findFirstRecordByData("users", "email", "nancy.clark@financeflow.com");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})
