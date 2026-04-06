/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("programs");

  const record0 = new Record(collection);
    record0.set("title", "Leadership Fundamentals");
    record0.set("description", "Master the core principles of effective leadership");
    record0.set("duration_days", 21);
    record0.set("category", "Leadership");
    record0.set("difficulty", "intermediate");
    record0.set("status", "active");
    record0.set("enrollment_count", 45);
    record0.set("rating", 4.5);
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
    record1.set("title", "Communication Skills");
    record1.set("description", "Enhance your professional communication abilities");
    record1.set("duration_days", 14);
    record1.set("category", "Soft Skills");
    record1.set("difficulty", "beginner");
    record1.set("status", "active");
    record1.set("enrollment_count", 60);
    record1.set("rating", 4.7);
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
    record2.set("title", "Project Management");
    record2.set("description", "Learn essential project management methodologies");
    record2.set("duration_days", 28);
    record2.set("category", "Management");
    record2.set("difficulty", "intermediate");
    record2.set("status", "active");
    record2.set("enrollment_count", 30);
    record2.set("rating", 4.3);
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
    record3.set("title", "Data Analytics");
    record3.set("description", "Master data analysis and visualization techniques");
    record3.set("duration_days", 21);
    record3.set("category", "Technical");
    record3.set("difficulty", "advanced");
    record3.set("status", "active");
    record3.set("enrollment_count", 100);
    record3.set("rating", 4.8);
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
    record4.set("title", "Cloud Computing");
    record4.set("description", "Comprehensive cloud infrastructure and services training");
    record4.set("duration_days", 35);
    record4.set("category", "Technical");
    record4.set("difficulty", "advanced");
    record4.set("status", "active");
    record4.set("enrollment_count", 100);
    record4.set("rating", 4.6);
  try {
    app.save(record4);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record5 = new Record(collection);
    record5.set("title", "Agile Methodology");
    record5.set("description", "Implement Agile practices in your organization");
    record5.set("duration_days", 14);
    record5.set("category", "Management");
    record5.set("difficulty", "intermediate");
    record5.set("status", "active");
    record5.set("enrollment_count", 75);
    record5.set("rating", 4.4);
  try {
    app.save(record5);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record6 = new Record(collection);
    record6.set("title", "Customer Service Excellence");
    record6.set("description", "Deliver exceptional customer service experiences");
    record6.set("duration_days", 10);
    record6.set("category", "Soft Skills");
    record6.set("difficulty", "beginner");
    record6.set("status", "active");
    record6.set("enrollment_count", 50);
    record6.set("rating", 4.5);
  try {
    app.save(record6);
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
