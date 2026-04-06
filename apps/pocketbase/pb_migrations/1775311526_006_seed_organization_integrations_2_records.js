/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("organization_integrations");

  const record0 = new Record(collection);
    const record0_organization_idLookup = app.findFirstRecordByFilter("organizations", "name='TechCorp Learning'");
    if (!record0_organization_idLookup) { throw new Error("Lookup failed for organization_id: no record in 'organizations' matching \"name='TechCorp Learning'\""); }
    record0.set("organization_id", record0_organization_idLookup.id);
    const record0_integration_idLookup = app.findFirstRecordByFilter("integrations", "code='slack'");
    if (!record0_integration_idLookup) { throw new Error("Lookup failed for integration_id: no record in 'integrations' matching \"code='slack'\""); }
    record0.set("integration_id", record0_integration_idLookup.id);
    record0.set("is_active", true);
    record0.set("sync_frequency", "realtime");
    record0.set("configuration", "{'channel': '#learning', 'notifications_enabled': True}");
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
    const record1_integration_idLookup = app.findFirstRecordByFilter("integrations", "code='teams'");
    if (!record1_integration_idLookup) { throw new Error("Lookup failed for integration_id: no record in 'integrations' matching \"code='teams'\""); }
    record1.set("integration_id", record1_integration_idLookup.id);
    record1.set("is_active", true);
    record1.set("sync_frequency", "daily");
    record1.set("configuration", "{'team': 'Learning & Development', 'notifications_enabled': True}");
  try {
    app.save(record1);
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
