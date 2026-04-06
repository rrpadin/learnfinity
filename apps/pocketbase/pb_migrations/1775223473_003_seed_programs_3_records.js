/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("programs");

  const record0 = new Record(collection);
    record0.set("title", "Content Creator Accelerator \u2013 14-Day Sprint");
    record0.set("category", "Creative");
    record0.set("duration_days", 14);
    record0.set("description", "Master AI-powered content creation. Learn to generate, edit, and publish professional content in 2 weeks.");
    record0.set("learning_outcomes", ["Generate high-quality content with AI", "Develop a content calendar", "Master prompt engineering", "Build a content portfolio"]);
    record0.set("difficulty", "intermediate");
    record0.set("enrollment_count", 0);
    record0.set("rating", 4.7);
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
    record1.set("title", "Business Strategy Bootcamp \u2013 21-Day Sprint");
    record1.set("category", "Business");
    record1.set("duration_days", 21);
    record1.set("description", "Build a data-driven business strategy using AI insights. Perfect for entrepreneurs and managers.");
    record1.set("learning_outcomes", ["Analyze market opportunities", "Create a competitive strategy", "Build financial projections", "Develop a go-to-market plan"]);
    record1.set("difficulty", "advanced");
    record1.set("enrollment_count", 0);
    record1.set("rating", 4.9);
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
    record2.set("title", "AI Prompt Engineering Mastery \u2013 7-Day Sprint");
    record2.set("category", "AI Learning");
    record2.set("duration_days", 7);
    record2.set("description", "Become an expert at crafting prompts that get results. Intensive 7-day program for rapid skill building.");
    record2.set("learning_outcomes", ["Master prompt structure", "Learn advanced techniques", "Build a prompt library", "Create production-ready prompts"]);
    record2.set("difficulty", "beginner");
    record2.set("enrollment_count", 0);
    record2.set("rating", 4.8);
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
