/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("settings");

  const record0 = new Record(collection);
    record0.set("key", "platform_name");
    record0.set("value", "{'name': 'Learnfinity'}");
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
    record1.set("key", "platform_description");
    record1.set("value", "{'description': 'AI-powered learning platform'}");
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
    record2.set("key", "support_email");
    record2.set("value", "{'email': 'support@learnfinity.com'}");
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
    record3.set("key", "ai_provider");
    record3.set("value", "{'provider': 'none', 'api_key': '', 'model': 'gpt-4', 'temperature': 0.7, 'max_tokens': 2000}");
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
    record4.set("key", "feature_flags");
    record4.set("value", "{'ai_coach': True, 'analytics': True, 'signups': True, 'enrollment': True, 'outputs': True, 'streaks': True}");
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
    record5.set("key", "security_settings");
    record5.set("value", "{'session_timeout': 30, 'password_change_interval': 90, 'mfa_enabled': False, 'max_login_attempts': 5, 'lockout_duration': 15}");
  try {
    app.save(record5);
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
