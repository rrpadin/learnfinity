/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("workflows");

  const record0 = new Record(collection);
    const record0_organization_idLookup = app.findFirstRecordByFilter("organizations", "name='TechCorp Learning'");
    if (!record0_organization_idLookup) { throw new Error("Lookup failed for organization_id: no record in 'organizations' matching \"name='TechCorp Learning'\""); }
    record0.set("organization_id", record0_organization_idLookup.id);
    record0.set("name", "Onboarding Workflow");
    record0.set("description", "Automated onboarding process for new employees");
    record0.set("trigger_type", "event");
    record0.set("trigger_config", "{'event': 'user_joined'}");
    record0.set("actions", [{"type": "send_email", "template": "welcome_email"}, {"type": "assign_programs", "programs": ["Leadership Fundamentals", "Communication Skills"]}]);
    record0.set("is_active", true);
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
    record1.set("name", "Program Assignment Workflow");
    record1.set("description", "Scheduled program assignment and progress tracking");
    record1.set("trigger_type", "schedule");
    record1.set("trigger_config", "{'frequency': 'weekly', 'day': 'monday'}");
    record1.set("actions", [{"type": "notify_managers", "message": "Check team progress"}, {"type": "track_progress", "metric": "completion_rate"}]);
    record1.set("is_active", true);
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
    record2.set("name", "Notification Workflow");
    record2.set("description", "Event-based notifications and activity logging");
    record2.set("trigger_type", "event");
    record2.set("trigger_config", "{'event': 'mission_completed'}");
    record2.set("actions", [{"type": "send_notification", "channel": "email"}, {"type": "log_activity", "activity_type": "mission_completed"}]);
    record2.set("is_active", true);
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
