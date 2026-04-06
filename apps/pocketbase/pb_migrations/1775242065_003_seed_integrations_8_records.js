/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("integrations");

  const record0 = new Record(collection);
    record0.set("name", "Workday");
    record0.set("code", "workday");
    record0.set("category", "hris");
    record0.set("status", "available");
    record0.set("is_enabled", false);
    record0.set("description", "Connect with Workday HRIS system");
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
    record1.set("name", "BambooHR");
    record1.set("code", "bamboohr");
    record1.set("category", "hris");
    record1.set("status", "available");
    record1.set("is_enabled", false);
    record1.set("description", "Integrate with BambooHR for HR management");
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
    record2.set("name", "SAP SuccessFactors");
    record2.set("code", "sap_successfactors");
    record2.set("category", "hris");
    record2.set("status", "coming_soon");
    record2.set("is_enabled", false);
    record2.set("description", "SAP SuccessFactors integration coming soon");
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
    record3.set("name", "Slack");
    record3.set("code", "slack");
    record3.set("category", "communication");
    record3.set("status", "available");
    record3.set("is_enabled", false);
    record3.set("description", "Send notifications to Slack channels");
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
    record4.set("name", "Microsoft Teams");
    record4.set("code", "microsoft_teams");
    record4.set("category", "communication");
    record4.set("status", "available");
    record4.set("is_enabled", false);
    record4.set("description", "Integrate with Microsoft Teams");
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
    record5.set("name", "Salesforce");
    record5.set("code", "salesforce");
    record5.set("category", "other");
    record5.set("status", "coming_soon");
    record5.set("is_enabled", false);
    record5.set("description", "Salesforce CRM integration coming soon");
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
    record6.set("name", "Google Workspace");
    record6.set("code", "google_workspace");
    record6.set("category", "communication");
    record6.set("status", "available");
    record6.set("is_enabled", false);
    record6.set("description", "Connect with Google Workspace");
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
    record7.set("name", "Zapier");
    record7.set("code", "zapier");
    record7.set("category", "other");
    record7.set("status", "coming_soon");
    record7.set("is_enabled", false);
    record7.set("description", "Zapier integration platform coming soon");
  try {
    app.save(record7);
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
