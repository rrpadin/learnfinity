/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("integrations");

  const record0 = new Record(collection);
    record0.set("name", "Slack");
    record0.set("code", "slack");
    record0.set("description", "Slack workspace integration for notifications and messaging");
    record0.set("category", "communication");
    record0.set("is_enabled", true);
    record0.set("authentication_type", "oauth2");
    record0.set("status", "available");
  try {
    app.save(record0);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record1 = new Record(collection);
    record1.set("name", "Microsoft Teams");
    record1.set("code", "teams");
    record1.set("description", "Microsoft Teams integration for team collaboration");
    record1.set("category", "communication");
    record1.set("is_enabled", true);
    record1.set("authentication_type", "oauth2");
    record1.set("status", "available");
  try {
    app.save(record1);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }
}, (app) => {
  // Rollback: record IDs not known, manual cleanup needed
})
