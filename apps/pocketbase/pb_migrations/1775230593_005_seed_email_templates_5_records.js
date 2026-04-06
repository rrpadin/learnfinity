/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("email_templates");

  const record0 = new Record(collection);
    record0.set("name", "welcome_email");
    record0.set("subject", "Welcome to Learnfinity!");
    record0.set("body", "<h1>Welcome {{name}}!</h1><p>Start your learning journey today.</p>");
    record0.set("variables", ["name", "email"]);
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
    record1.set("name", "confirmation_email");
    record1.set("subject", "Confirm Your Email");
    record1.set("body", "<p>Click the link to confirm: {{link}}</p>");
    record1.set("variables", ["link"]);
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
    record2.set("name", "reset_password");
    record2.set("subject", "Reset Your Password");
    record2.set("body", "<p>Click here to reset: {{reset_link}}</p>");
    record2.set("variables", ["reset_link"]);
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
    record3.set("name", "enrollment_confirmation");
    record3.set("subject", "Program Enrollment Confirmed");
    record3.set("body", "<p>You are enrolled in {{program_name}}. Start learning!</p>");
    record3.set("variables", ["program_name"]);
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
    record4.set("name", "completion_notification");
    record4.set("subject", "Congratulations!");
    record4.set("body", "<p>You completed {{program_name}}!</p>");
    record4.set("variables", ["program_name"]);
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
