/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("learning_outcomes");

  const record0 = new Record(collection);
    record0.set("text", "Understand AI fundamentals");
    const record0_categoryLookup = app.findFirstRecordByFilter("categories", "name='AI Learning'");
    if (!record0_categoryLookup) { throw new Error("Lookup failed for category: no record in 'categories' matching \"name='AI Learning'\""); }
    record0.set("category", record0_categoryLookup.id);
    record0.set("program_count", 0);
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
    record1.set("text", "Apply machine learning algorithms");
    const record1_categoryLookup = app.findFirstRecordByFilter("categories", "name='AI Learning'");
    if (!record1_categoryLookup) { throw new Error("Lookup failed for category: no record in 'categories' matching \"name='AI Learning'\""); }
    record1.set("category", record1_categoryLookup.id);
    record1.set("program_count", 0);
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
    record2.set("text", "Develop business strategy");
    const record2_categoryLookup = app.findFirstRecordByFilter("categories", "name='Business'");
    if (!record2_categoryLookup) { throw new Error("Lookup failed for category: no record in 'categories' matching \"name='Business'\""); }
    record2.set("category", record2_categoryLookup.id);
    record2.set("program_count", 0);
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
    record3.set("text", "Master financial planning");
    const record3_categoryLookup = app.findFirstRecordByFilter("categories", "name='Business'");
    if (!record3_categoryLookup) { throw new Error("Lookup failed for category: no record in 'categories' matching \"name='Business'\""); }
    record3.set("category", record3_categoryLookup.id);
    record3.set("program_count", 0);
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
    record4.set("text", "Create visual designs");
    const record4_categoryLookup = app.findFirstRecordByFilter("categories", "name='Creative'");
    if (!record4_categoryLookup) { throw new Error("Lookup failed for category: no record in 'categories' matching \"name='Creative'\""); }
    record4.set("category", record4_categoryLookup.id);
    record4.set("program_count", 0);
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
    record5.set("text", "Develop creative writing skills");
    const record5_categoryLookup = app.findFirstRecordByFilter("categories", "name='Creative'");
    if (!record5_categoryLookup) { throw new Error("Lookup failed for category: no record in 'categories' matching \"name='Creative'\""); }
    record5.set("category", record5_categoryLookup.id);
    record5.set("program_count", 0);
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
    record6.set("text", "Learn programming basics");
    const record6_categoryLookup = app.findFirstRecordByFilter("categories", "name='Tech'");
    if (!record6_categoryLookup) { throw new Error("Lookup failed for category: no record in 'categories' matching \"name='Tech'\""); }
    record6.set("category", record6_categoryLookup.id);
    record6.set("program_count", 0);
  try {
    app.save(record6);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record7 = new Record(collection);
    record7.set("text", "Master web development");
    const record7_categoryLookup = app.findFirstRecordByFilter("categories", "name='Tech'");
    if (!record7_categoryLookup) { throw new Error("Lookup failed for category: no record in 'categories' matching \"name='Tech'\""); }
    record7.set("category", record7_categoryLookup.id);
    record7.set("program_count", 0);
  try {
    app.save(record7);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record8 = new Record(collection);
    record8.set("text", "Understand data analysis");
    const record8_categoryLookup = app.findFirstRecordByFilter("categories", "name='Tech'");
    if (!record8_categoryLookup) { throw new Error("Lookup failed for category: no record in 'categories' matching \"name='Tech'\""); }
    record8.set("category", record8_categoryLookup.id);
    record8.set("program_count", 0);
  try {
    app.save(record8);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record9 = new Record(collection);
    record9.set("text", "Develop problem-solving skills");
    const record9_categoryLookup = app.findFirstRecordByFilter("categories", "name='Other'");
    if (!record9_categoryLookup) { throw new Error("Lookup failed for category: no record in 'categories' matching \"name='Other'\""); }
    record9.set("category", record9_categoryLookup.id);
    record9.set("program_count", 0);
  try {
    app.save(record9);
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
