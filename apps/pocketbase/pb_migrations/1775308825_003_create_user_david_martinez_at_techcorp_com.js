/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  const record = new Record(collection);
  record.set("email", "david.martinez@techcorp.com");
  record.setPassword("TechCorp2024!");
  record.set("name", "David Martinez");
  record.set("role", "user");
  record.set("is_admin", false);
  record.set("job_title", "Sales Manager");
  record.set("department", "Sales");
  record.set("hire_date", "2020-11-05");
  record.set("employment_type", "full_time");
  record.set("phone", "+1-555-0106");
  record.set("location", "New York, NY");
  record.set("bio", "Enterprise sales leader");
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
    const record = app.findFirstRecordByData("users", "email", "david.martinez@techcorp.com");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})
