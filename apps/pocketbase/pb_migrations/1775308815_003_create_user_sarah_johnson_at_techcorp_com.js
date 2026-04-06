/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  const record = new Record(collection);
  record.set("email", "sarah.johnson@techcorp.com");
  record.setPassword("TechCorp2024!");
  record.set("name", "Sarah Johnson");
  record.set("role", "admin");
  record.set("is_admin", true);
  record.set("job_title", "VP of Engineering");
  record.set("department", "Engineering");
  record.set("hire_date", "2020-01-15");
  record.set("employment_type", "full_time");
  record.set("phone", "+1-555-0101");
  record.set("location", "San Francisco, CA");
  record.set("bio", "Experienced engineering leader with 15+ years in tech");
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
    const record = app.findFirstRecordByData("users", "email", "sarah.johnson@techcorp.com");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})
