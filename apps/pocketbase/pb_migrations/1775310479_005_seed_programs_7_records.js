/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("programs");

  const record0 = new Record(collection);
    record0.set("title", "Python Fundamentals");
    record0.set("description", "Learn the basics of Python programming");
    record0.set("duration_days", 14);
    record0.set("category", "Programming");
    record0.set("difficulty", "beginner");
    record0.set("status", "active");
    record0.set("enrollment_count", 8);
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
    record1.set("title", "Advanced JavaScript");
    record1.set("description", "Master advanced JavaScript concepts and patterns");
    record1.set("duration_days", 21);
    record1.set("category", "Programming");
    record1.set("difficulty", "advanced");
    record1.set("status", "active");
    record1.set("enrollment_count", 5);
    record1.set("rating", 4.8);
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
    record2.set("title", "Data Analysis with Pandas");
    record2.set("description", "Learn data analysis using Python and Pandas");
    record2.set("duration_days", 28);
    record2.set("category", "Data Science");
    record2.set("difficulty", "intermediate");
    record2.set("status", "active");
    record2.set("enrollment_count", 6);
    record2.set("rating", 4.6);
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
    record3.set("title", "Web Development Bootcamp");
    record3.set("description", "Complete web development from frontend to backend");
    record3.set("duration_days", 42);
    record3.set("category", "Web Development");
    record3.set("difficulty", "intermediate");
    record3.set("status", "active");
    record3.set("enrollment_count", 10);
    record3.set("rating", 4.7);
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
    record4.set("title", "Cloud Architecture Essentials");
    record4.set("description", "Design and deploy cloud-based solutions");
    record4.set("duration_days", 35);
    record4.set("category", "Cloud");
    record4.set("difficulty", "advanced");
    record4.set("status", "active");
    record4.set("enrollment_count", 4);
    record4.set("rating", 4.9);
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
    record5.set("title", "Machine Learning Basics");
    record5.set("description", "Introduction to machine learning algorithms");
    record5.set("duration_days", 30);
    record5.set("category", "AI/ML");
    record5.set("difficulty", "intermediate");
    record5.set("status", "active");
    record5.set("enrollment_count", 7);
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
    record6.set("title", "DevOps Fundamentals");
    record6.set("description", "Learn DevOps practices and tools");
    record6.set("duration_days", 21);
    record6.set("category", "DevOps");
    record6.set("difficulty", "intermediate");
    record6.set("status", "active");
    record6.set("enrollment_count", 3);
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
