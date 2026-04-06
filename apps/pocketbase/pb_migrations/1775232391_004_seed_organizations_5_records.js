/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("organizations");

  const record0 = new Record(collection);
    record0.set("name", "TechCorp");
    record0.set("description", "Leading technology solutions provider");
    record0.set("website", "https://techcorp.com");
    const record0_admin_idLookup = app.findFirstRecordByFilter("users", "email='admin.techcorp@example.com'");
    if (!record0_admin_idLookup) { throw new Error("Lookup failed for admin_id: no record in 'users' matching \"email='admin.techcorp@example.com'\""); }
    record0.set("admin_id", record0_admin_idLookup.id);
    record0.set("primary_contact_name", "John Smith");
    record0.set("primary_contact_email", "john@techcorp.com");
    record0.set("primary_contact_phone", "+1-555-0101");
    record0.set("user_limit", 150);
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
    record1.set("name", "FinanceInc");
    record1.set("description", "Financial services and consulting firm");
    record1.set("website", "https://financeinc.com");
    const record1_admin_idLookup = app.findFirstRecordByFilter("users", "email='admin.financeinc@example.com'");
    if (!record1_admin_idLookup) { throw new Error("Lookup failed for admin_id: no record in 'users' matching \"email='admin.financeinc@example.com'\""); }
    record1.set("admin_id", record1_admin_idLookup.id);
    record1.set("primary_contact_name", "Sarah Johnson");
    record1.set("primary_contact_email", "sarah@financeinc.com");
    record1.set("primary_contact_phone", "+1-555-0102");
    record1.set("user_limit", 100);
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
    record2.set("name", "CreativeStudio");
    record2.set("description", "Digital design and creative agency");
    record2.set("website", "https://creativestudio.com");
    const record2_admin_idLookup = app.findFirstRecordByFilter("users", "email='admin.creativestudio@example.com'");
    if (!record2_admin_idLookup) { throw new Error("Lookup failed for admin_id: no record in 'users' matching \"email='admin.creativestudio@example.com'\""); }
    record2.set("admin_id", record2_admin_idLookup.id);
    record2.set("primary_contact_name", "Mike Chen");
    record2.set("primary_contact_email", "mike@creativestudio.com");
    record2.set("primary_contact_phone", "+1-555-0103");
    record2.set("user_limit", 75);
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
    record3.set("name", "HealthCare+");
    record3.set("description", "Healthcare management and services");
    record3.set("website", "https://healthcare-plus.com");
    const record3_admin_idLookup = app.findFirstRecordByFilter("users", "email='admin.healthcare@example.com'");
    if (!record3_admin_idLookup) { throw new Error("Lookup failed for admin_id: no record in 'users' matching \"email='admin.healthcare@example.com'\""); }
    record3.set("admin_id", record3_admin_idLookup.id);
    record3.set("primary_contact_name", "Dr. Emily Davis");
    record3.set("primary_contact_email", "emily@healthcare.com");
    record3.set("primary_contact_phone", "+1-555-0104");
    record3.set("user_limit", 200);
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
    record4.set("name", "EduLearn");
    record4.set("description", "Educational technology and learning platform");
    record4.set("website", "https://edulearn.com");
    const record4_admin_idLookup = app.findFirstRecordByFilter("users", "email='admin.edulearn@example.com'");
    if (!record4_admin_idLookup) { throw new Error("Lookup failed for admin_id: no record in 'users' matching \"email='admin.edulearn@example.com'\""); }
    record4.set("admin_id", record4_admin_idLookup.id);
    record4.set("primary_contact_name", "Prof. Robert Wilson");
    record4.set("primary_contact_email", "robert@edulearn.com");
    record4.set("primary_contact_phone", "+1-555-0105");
    record4.set("user_limit", 500);
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
