/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("feedback_templates");

  const record0 = new Record(collection);
    record0.set("name", "Great Work");
    record0.set("template_text", "Great job on this mission! {{feedback}}");
    record0.set("category", "mission");
    record0.set("usage_count", 0);
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
    record1.set("name", "Needs Improvement");
    record1.set("template_text", "Good effort, but consider: {{feedback}}");
    record1.set("category", "mission");
    record1.set("usage_count", 0);
  try {
    app.save(record1);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record2 = new Record(collection);
    record2.set("name", "Excellent Output");
    record2.set("template_text", "Your output demonstrates {{feedback}}");
    record2.set("category", "output");
    record2.set("usage_count", 0);
  try {
    app.save(record2);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record3 = new Record(collection);
    record3.set("name", "Output Review");
    record3.set("template_text", "Score: {{score}}/10. Feedback: {{feedback}}");
    record3.set("category", "output");
    record3.set("usage_count", 0);
  try {
    app.save(record3);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record4 = new Record(collection);
    record4.set("name", "General Feedback");
    record4.set("template_text", "{{feedback}}");
    record4.set("category", "general");
    record4.set("usage_count", 0);
  try {
    app.save(record4);
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
