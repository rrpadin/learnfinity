/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  const record = new Record(collection);
  record.set("email", "robert.thompson@techcorp.com");
  record.setPassword("TechCorp2024!");
  record.set("name", "Robert Thompson");
  record.set("role", "user");
  record.set("is_admin", false);
  record.set("job_title", "HR Specialist");
  record.set("department", "HR");
  record.set("hire_date", "2022-02-14");
  record.set("employment_type", "full_time");
  record.set("phone", "+1-555-0108");
  record.set("location", "San Francisco, CA");
  record.set("bio", "Talent acquisition and employee relations");
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
    const record = app.findFirstRecordByData("users", "email", "robert.thompson@techcorp.com");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})
