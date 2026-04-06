/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("programs");

  const record0 = new Record(collection);
    record0.set("title", "Leadership Fundamentals");
    record0.set("description", "Learn essential leadership skills and principles");
    record0.set("duration_days", 45);
    record0.set("category", "Leadership");
    record0.set("difficulty", "intermediate");
    record0.set("status", "active");
    record0.set("enrollment_count", 12);
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
    record1.set("title", "Technical Skills Bootcamp");
    record1.set("description", "Comprehensive technical training program");
    record1.set("duration_days", 60);
    record1.set("category", "Technical");
    record1.set("difficulty", "advanced");
    record1.set("status", "active");
    record1.set("enrollment_count", 8);
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
    record2.set("title", "Customer Success Mastery");
    record2.set("description", "Master customer success strategies and techniques");
    record2.set("duration_days", 30);
    record2.set("category", "Customer Success");
    record2.set("difficulty", "intermediate");
    record2.set("status", "active");
    record2.set("enrollment_count", 15);
    record2.set("rating", 4.8);
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
    record3.set("title", "Data Analytics 101");
    record3.set("description", "Introduction to data analytics and visualization");
    record3.set("duration_days", 40);
    record3.set("category", "Analytics");
    record3.set("difficulty", "beginner");
    record3.set("status", "active");
    record3.set("enrollment_count", 5);
    record3.set("rating", 4.3);
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
    record4.set("title", "Communication Excellence");
    record4.set("description", "Develop professional communication skills");
    record4.set("duration_days", 21);
    record4.set("category", "Soft Skills");
    record4.set("difficulty", "beginner");
    record4.set("status", "active");
    record4.set("enrollment_count", 20);
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
    record5.set("title", "Project Management Pro");
    record5.set("description", "Advanced project management methodologies");
    record5.set("duration_days", 50);
    record5.set("category", "Management");
    record5.set("difficulty", "advanced");
    record5.set("status", "active");
    record5.set("enrollment_count", 10);
    record5.set("rating", 4.9);
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
    record6.set("title", "Cloud Architecture Basics");
    record6.set("description", "Fundamentals of cloud architecture and design");
    record6.set("duration_days", 35);
    record6.set("category", "Cloud");
    record6.set("difficulty", "intermediate");
    record6.set("status", "active");
    record6.set("enrollment_count", 7);
    record6.set("rating", 4.4);
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
