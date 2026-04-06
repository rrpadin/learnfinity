/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("subscription_plans");

  const record0 = new Record(collection);
    record0.set("name", "free");
    record0.set("user_limit", 10);
    record0.set("price_monthly", 0);
    record0.set("price_yearly", 0);
    record0.set("features", ["basic_analytics", "community_support"]);
    record0.set("description", "Free plan for individuals");
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
    record1.set("name", "starter");
    record1.set("user_limit", 50);
    record1.set("price_monthly", 2999);
    record1.set("price_yearly", 29990);
    record1.set("features", ["advanced_analytics", "email_support", "api_access"]);
    record1.set("description", "Starter plan for small teams");
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
    record2.set("name", "professional");
    record2.set("user_limit", 200);
    record2.set("price_monthly", 9999);
    record2.set("price_yearly", 99990);
    record2.set("features", ["advanced_analytics", "priority_support", "api_access", "sso"]);
    record2.set("description", "Professional plan for growing organizations");
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
    record3.set("name", "enterprise");
    record3.set("user_limit", 999999);
    record3.set("price_monthly", 29999);
    record3.set("price_yearly", 299990);
    record3.set("features", ["advanced_analytics", "24/7_support", "api_access", "sso", "saml", "custom_integrations"]);
    record3.set("description", "Enterprise plan with unlimited users");
  try {
    app.save(record3);
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
