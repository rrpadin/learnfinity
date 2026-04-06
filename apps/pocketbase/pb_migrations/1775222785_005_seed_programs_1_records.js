/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("programs");

  const record0 = new Record(collection);
    record0.set("title", "AI Learning Consultant \u2013 30-Day Sprint");
    record0.set("description", "Master AI tools and techniques in 30 days through execution-based learning");
    record0.set("duration_days", 30);
    record0.set("category", "AI Learning");
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
