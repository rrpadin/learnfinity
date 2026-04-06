/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("organizational_goals");

  const record0 = new Record(collection);
    const record0_organization_idLookup = app.findFirstRecordByFilter("organizations", "name='TechCorp Learning'");
    if (!record0_organization_idLookup) { throw new Error("Lookup failed for organization_id: no record in 'organizations' matching \"name='TechCorp Learning'\""); }
    record0.set("organization_id", record0_organization_idLookup.id);
    record0.set("title", "Improve Leadership Skills");
    record0.set("description", "Develop leadership capabilities across all management levels");
    record0.set("goal_type", "strategic");
    record0.set("priority", "high");
    record0.set("status", "active");
    const record0_created_byLookup = app.findFirstRecordByFilter("users", "email='admin1@techcorp.demo'");
    if (!record0_created_byLookup) { throw new Error("Lookup failed for created_by: no record in 'users' matching \"email='admin1@techcorp.demo'\""); }
    record0.set("created_by", record0_created_byLookup.id);
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
    const record1_organization_idLookup = app.findFirstRecordByFilter("organizations", "name='TechCorp Learning'");
    if (!record1_organization_idLookup) { throw new Error("Lookup failed for organization_id: no record in 'organizations' matching \"name='TechCorp Learning'\""); }
    record1.set("organization_id", record1_organization_idLookup.id);
    record1.set("title", "Enhance Communication");
    record1.set("description", "Strengthen communication effectiveness across teams");
    record1.set("goal_type", "learning");
    record1.set("priority", "medium");
    record1.set("status", "active");
    const record1_created_byLookup = app.findFirstRecordByFilter("users", "email='admin1@techcorp.demo'");
    if (!record1_created_byLookup) { throw new Error("Lookup failed for created_by: no record in 'users' matching \"email='admin1@techcorp.demo'\""); }
    record1.set("created_by", record1_created_byLookup.id);
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
    const record2_organization_idLookup = app.findFirstRecordByFilter("organizations", "name='TechCorp Learning'");
    if (!record2_organization_idLookup) { throw new Error("Lookup failed for organization_id: no record in 'organizations' matching \"name='TechCorp Learning'\""); }
    record2.set("organization_id", record2_organization_idLookup.id);
    record2.set("title", "Master Project Management");
    record2.set("description", "Implement standardized project management practices");
    record2.set("goal_type", "operational");
    record2.set("priority", "high");
    record2.set("status", "on_hold");
    const record2_created_byLookup = app.findFirstRecordByFilter("users", "email='admin1@techcorp.demo'");
    if (!record2_created_byLookup) { throw new Error("Lookup failed for created_by: no record in 'users' matching \"email='admin1@techcorp.demo'\""); }
    record2.set("created_by", record2_created_byLookup.id);
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
    const record3_organization_idLookup = app.findFirstRecordByFilter("organizations", "name='TechCorp Learning'");
    if (!record3_organization_idLookup) { throw new Error("Lookup failed for organization_id: no record in 'organizations' matching \"name='TechCorp Learning'\""); }
    record3.set("organization_id", record3_organization_idLookup.id);
    record3.set("title", "Data Literacy");
    record3.set("description", "Build data analysis skills across the organization");
    record3.set("goal_type", "learning");
    record3.set("priority", "medium");
    record3.set("status", "completed");
    const record3_created_byLookup = app.findFirstRecordByFilter("users", "email='admin1@techcorp.demo'");
    if (!record3_created_byLookup) { throw new Error("Lookup failed for created_by: no record in 'users' matching \"email='admin1@techcorp.demo'\""); }
    record3.set("created_by", record3_created_byLookup.id);
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
    const record4_organization_idLookup = app.findFirstRecordByFilter("organizations", "name='TechCorp Learning'");
    if (!record4_organization_idLookup) { throw new Error("Lookup failed for organization_id: no record in 'organizations' matching \"name='TechCorp Learning'\""); }
    record4.set("organization_id", record4_organization_idLookup.id);
    record4.set("title", "Cloud Certification");
    record4.set("description", "Achieve cloud certifications for technical teams");
    record4.set("goal_type", "strategic");
    record4.set("priority", "high");
    record4.set("status", "active");
    const record4_created_byLookup = app.findFirstRecordByFilter("users", "email='admin1@techcorp.demo'");
    if (!record4_created_byLookup) { throw new Error("Lookup failed for created_by: no record in 'users' matching \"email='admin1@techcorp.demo'\""); }
    record4.set("created_by", record4_created_byLookup.id);
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
    const record5_organization_idLookup = app.findFirstRecordByFilter("organizations", "name='TechCorp Learning'");
    if (!record5_organization_idLookup) { throw new Error("Lookup failed for organization_id: no record in 'organizations' matching \"name='TechCorp Learning'\""); }
    record5.set("organization_id", record5_organization_idLookup.id);
    record5.set("title", "Agile Transformation");
    record5.set("description", "Transform organization to Agile methodologies");
    record5.set("goal_type", "operational");
    record5.set("priority", "high");
    record5.set("status", "active");
    const record5_created_byLookup = app.findFirstRecordByFilter("users", "email='admin1@techcorp.demo'");
    if (!record5_created_byLookup) { throw new Error("Lookup failed for created_by: no record in 'users' matching \"email='admin1@techcorp.demo'\""); }
    record5.set("created_by", record5_created_byLookup.id);
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
    const record6_organization_idLookup = app.findFirstRecordByFilter("organizations", "name='TechCorp Learning'");
    if (!record6_organization_idLookup) { throw new Error("Lookup failed for organization_id: no record in 'organizations' matching \"name='TechCorp Learning'\""); }
    record6.set("organization_id", record6_organization_idLookup.id);
    record6.set("title", "Customer Satisfaction");
    record6.set("description", "Improve customer satisfaction scores");
    record6.set("goal_type", "operational");
    record6.set("priority", "medium");
    record6.set("status", "active");
    const record6_created_byLookup = app.findFirstRecordByFilter("users", "email='admin1@techcorp.demo'");
    if (!record6_created_byLookup) { throw new Error("Lookup failed for created_by: no record in 'users' matching \"email='admin1@techcorp.demo'\""); }
    record6.set("created_by", record6_created_byLookup.id);
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
    const record7_organization_idLookup = app.findFirstRecordByFilter("organizations", "name='TechCorp Learning'");
    if (!record7_organization_idLookup) { throw new Error("Lookup failed for organization_id: no record in 'organizations' matching \"name='TechCorp Learning'\""); }
    record7.set("organization_id", record7_organization_idLookup.id);
    record7.set("title", "Team Development");
    record7.set("description", "Invest in continuous team development");
    record7.set("goal_type", "strategic");
    record7.set("priority", "medium");
    record7.set("status", "on_hold");
    const record7_created_byLookup = app.findFirstRecordByFilter("users", "email='admin1@techcorp.demo'");
    if (!record7_created_byLookup) { throw new Error("Lookup failed for created_by: no record in 'users' matching \"email='admin1@techcorp.demo'\""); }
    record7.set("created_by", record7_created_byLookup.id);
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
    const record8_organization_idLookup = app.findFirstRecordByFilter("organizations", "name='TechCorp Learning'");
    if (!record8_organization_idLookup) { throw new Error("Lookup failed for organization_id: no record in 'organizations' matching \"name='TechCorp Learning'\""); }
    record8.set("organization_id", record8_organization_idLookup.id);
    record8.set("title", "Process Improvement");
    record8.set("description", "Streamline organizational processes");
    record8.set("goal_type", "operational");
    record8.set("priority", "low");
    record8.set("status", "completed");
    const record8_created_byLookup = app.findFirstRecordByFilter("users", "email='admin1@techcorp.demo'");
    if (!record8_created_byLookup) { throw new Error("Lookup failed for created_by: no record in 'users' matching \"email='admin1@techcorp.demo'\""); }
    record8.set("created_by", record8_created_byLookup.id);
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
    const record9_organization_idLookup = app.findFirstRecordByFilter("organizations", "name='TechCorp Learning'");
    if (!record9_organization_idLookup) { throw new Error("Lookup failed for organization_id: no record in 'organizations' matching \"name='TechCorp Learning'\""); }
    record9.set("organization_id", record9_organization_idLookup.id);
    record9.set("title", "Innovation Culture");
    record9.set("description", "Foster a culture of innovation and creativity");
    record9.set("goal_type", "strategic");
    record9.set("priority", "medium");
    record9.set("status", "active");
    const record9_created_byLookup = app.findFirstRecordByFilter("users", "email='admin1@techcorp.demo'");
    if (!record9_created_byLookup) { throw new Error("Lookup failed for created_by: no record in 'users' matching \"email='admin1@techcorp.demo'\""); }
    record9.set("created_by", record9_created_byLookup.id);
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
