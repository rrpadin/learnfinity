/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("organizations");

  const record0 = new Record(collection);
    record0.set("name", "TechCorp Learning");
    record0.set("description", "Demo organization for Learnfinity platform");
    record0.set("subscription_tier", "professional");
    record0.set("user_limit", 50);
    record0.set("status", "active");
    record0.set("is_demo", true);
  try {
    app.save(record0);
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
