/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("organization_programs");

  const record0 = new Record(collection);
    const record0_organization_idLookup = app.findFirstRecordByFilter("organizations", "name != ''");
    if (!record0_organization_idLookup) { throw new Error("Lookup failed for organization_id: no record in 'organizations' matching \"name != ''\""); }
    record0.set("organization_id", record0_organization_idLookup.id);
    const record0_program_idLookup = app.findFirstRecordByFilter("programs", "title != ''");
    if (!record0_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title != ''\""); }
    record0.set("program_id", record0_program_idLookup.id);
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
    const record1_organization_idLookup = app.findFirstRecordByFilter("organizations", "name != ''");
    if (!record1_organization_idLookup) { throw new Error("Lookup failed for organization_id: no record in 'organizations' matching \"name != ''\""); }
    record1.set("organization_id", record1_organization_idLookup.id);
    const record1_program_idLookup = app.findFirstRecordByFilter("programs", "title != ''");
    if (!record1_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title != ''\""); }
    record1.set("program_id", record1_program_idLookup.id);
    record1.set("status", "inactive");
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
    const record2_organization_idLookup = app.findFirstRecordByFilter("organizations", "name != ''");
    if (!record2_organization_idLookup) { throw new Error("Lookup failed for organization_id: no record in 'organizations' matching \"name != ''\""); }
    record2.set("organization_id", record2_organization_idLookup.id);
    const record2_program_idLookup = app.findFirstRecordByFilter("programs", "title != ''");
    if (!record2_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title != ''\""); }
    record2.set("program_id", record2_program_idLookup.id);
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
}, (app) => {
  // Rollback: record IDs not known, manual cleanup needed
})
