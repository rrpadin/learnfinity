/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  const record = new Record(collection);
  record.set("email", "amanda.white@techcorp.com");
  record.setPassword("TechCorp2024!");
  record.set("name", "Amanda White");
  record.set("role", "user");
  record.set("is_admin", false);
  record.set("job_title", "Marketing Manager");
  record.set("department", "Marketing");
  record.set("hire_date", "2022-07-18");
  record.set("employment_type", "full_time");
  record.set("location", "San Francisco, CA");
  record.set("bio", "Content and demand generation specialist");
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
    const record = app.findFirstRecordByData("users", "email", "amanda.white@techcorp.com");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})
