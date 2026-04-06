/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  const record = new Record(collection);
  record.set("email", "lisa.park@techcorp.com");
  record.setPassword("TechCorp2024!");
  record.set("name", "Lisa Park");
  record.set("role", "user");
  record.set("is_admin", false);
  record.set("job_title", "Product Manager");
  record.set("department", "Product");
  record.set("hire_date", "2021-09-01");
  record.set("employment_type", "full_time");
  record.set("phone", "+1-555-0105");
  record.set("location", "San Francisco, CA");
  record.set("bio", "Product strategy and roadmap planning");
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
    const record = app.findFirstRecordByData("users", "email", "lisa.park@techcorp.com");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})
