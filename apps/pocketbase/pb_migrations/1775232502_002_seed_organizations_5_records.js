/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("organizations");

  const record0 = new Record(collection);
    record0.set("name", "TechCorp Inc");
    record0.set("description", "Leading technology solutions provider");
    record0.set("website", "https://techcorp.example.com");
    const record0_admin_idLookup = app.findFirstRecordByFilter("users", "email='admin@techcorp.com'");
    if (!record0_admin_idLookup) { throw new Error("Lookup failed for admin_id: no record in 'users' matching \"email='admin@techcorp.com'\""); }
    record0.set("admin_id", record0_admin_idLookup.id);
    record0.set("subscription_tier", "professional");
    record0.set("user_limit", 50);
    record0.set("current_user_count", 0);
    record0.set("status", "active");
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
    record1.set("name", "FinanceHub Ltd");
    record1.set("description", "Financial services and consulting firm");
    record1.set("website", "https://financehub.example.com");
    const record1_admin_idLookup = app.findFirstRecordByFilter("users", "email='admin@financehub.com'");
    if (!record1_admin_idLookup) { throw new Error("Lookup failed for admin_id: no record in 'users' matching \"email='admin@financehub.com'\""); }
    record1.set("admin_id", record1_admin_idLookup.id);
    record1.set("subscription_tier", "professional");
    record1.set("user_limit", 75);
    record1.set("current_user_count", 0);
    record1.set("status", "active");
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
    record2.set("name", "HealthFirst Clinic");
    record2.set("description", "Healthcare provider and medical services");
    record2.set("website", "https://healthfirst.example.com");
    const record2_admin_idLookup = app.findFirstRecordByFilter("users", "email='admin@healthfirst.com'");
    if (!record2_admin_idLookup) { throw new Error("Lookup failed for admin_id: no record in 'users' matching \"email='admin@healthfirst.com'\""); }
    record2.set("admin_id", record2_admin_idLookup.id);
    record2.set("subscription_tier", "starter");
    record2.set("user_limit", 30);
    record2.set("current_user_count", 0);
    record2.set("status", "active");
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
    record3.set("name", "EduLearn Academy");
    record3.set("description", "Online education and training platform");
    record3.set("website", "https://edulearn.example.com");
    const record3_admin_idLookup = app.findFirstRecordByFilter("users", "email='admin@edulearn.com'");
    if (!record3_admin_idLookup) { throw new Error("Lookup failed for admin_id: no record in 'users' matching \"email='admin@edulearn.com'\""); }
    record3.set("admin_id", record3_admin_idLookup.id);
    record3.set("subscription_tier", "enterprise");
    record3.set("user_limit", 100);
    record3.set("current_user_count", 0);
    record3.set("status", "active");
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
    record4.set("name", "RetailMax Store");
    record4.set("description", "Retail and e-commerce solutions");
    record4.set("website", "https://retailmax.example.com");
    const record4_admin_idLookup = app.findFirstRecordByFilter("users", "email='admin@retailmax.com'");
    if (!record4_admin_idLookup) { throw new Error("Lookup failed for admin_id: no record in 'users' matching \"email='admin@retailmax.com'\""); }
    record4.set("admin_id", record4_admin_idLookup.id);
    record4.set("subscription_tier", "starter");
    record4.set("user_limit", 40);
    record4.set("current_user_count", 0);
    record4.set("status", "active");
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
