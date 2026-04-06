/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("missions");

  const record0 = new Record(collection);
    const record0_program_idLookup = app.findFirstRecordByFilter("programs", "title='AI Learning Consultant – 30-Day Sprint'");
    if (!record0_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title='AI Learning Consultant – 30-Day Sprint'\""); }
    record0.set("program_id", record0_program_idLookup.id);
    record0.set("day_number", 1);
    record0.set("title", "Assess Your AI Readiness");
    record0.set("objective", "Understand your current AI knowledge and identify learning gaps");
    record0.set("instructions", "1. Reflect on your experience with AI tools. 2. List 3 areas where you want to improve. 3. Write a brief diagnostic summary.");
    record0.set("expected_output", "A 200-300 word diagnostic summary of your AI readiness");
    record0.set("ai_prompt_template", "Analyze the user's AI readiness assessment and provide personalized learning recommendations");
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
    const record1_program_idLookup = app.findFirstRecordByFilter("programs", "title='AI Learning Consultant – 30-Day Sprint'");
    if (!record1_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title='AI Learning Consultant – 30-Day Sprint'\""); }
    record1.set("program_id", record1_program_idLookup.id);
    record1.set("day_number", 2);
    record1.set("title", "Define Your AI Learning Goal");
    record1.set("objective", "Create a specific, measurable goal for this 30-day sprint");
    record1.set("instructions", "1. Choose one AI skill to master. 2. Define what success looks like. 3. Break it into 3 milestones.");
    record1.set("expected_output", "A goal statement with 3 measurable milestones");
    record1.set("ai_prompt_template", "Review the user's goal and suggest specific daily missions to achieve it");
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
    const record2_program_idLookup = app.findFirstRecordByFilter("programs", "title='AI Learning Consultant – 30-Day Sprint'");
    if (!record2_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title='AI Learning Consultant – 30-Day Sprint'\""); }
    record2.set("program_id", record2_program_idLookup.id);
    record2.set("day_number", 3);
    record2.set("title", "Explore AI Tools Landscape");
    record2.set("objective", "Map the AI tools relevant to your goal");
    record2.set("instructions", "1. Research 5 AI tools related to your goal. 2. Compare their features. 3. Select your primary tool.");
    record2.set("expected_output", "A comparison table of 5 AI tools with pros/cons");
    record2.set("ai_prompt_template", "Evaluate the user's tool selection and recommend the best fit for their goal");
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
    const record3_program_idLookup = app.findFirstRecordByFilter("programs", "title='AI Learning Consultant – 30-Day Sprint'");
    if (!record3_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title='AI Learning Consultant – 30-Day Sprint'\""); }
    record3.set("program_id", record3_program_idLookup.id);
    record3.set("day_number", 4);
    record3.set("title", "Create Your First AI Output");
    record3.set("objective", "Generate your first real output using an AI tool");
    record3.set("instructions", "1. Set up your chosen AI tool. 2. Create a simple prompt. 3. Generate and refine an output. 4. Document the process.");
    record3.set("expected_output", "Your AI-generated output + a reflection on the process");
    record3.set("ai_prompt_template", "Review the user's first AI output and provide constructive feedback");
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
    const record4_program_idLookup = app.findFirstRecordByFilter("programs", "title='AI Learning Consultant – 30-Day Sprint'");
    if (!record4_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title='AI Learning Consultant – 30-Day Sprint'\""); }
    record4.set("program_id", record4_program_idLookup.id);
    record4.set("day_number", 5);
    record4.set("title", "Reflect and Iterate");
    record4.set("objective", "Analyze what you learned and plan improvements");
    record4.set("instructions", "1. Review your Day 4 output. 2. Identify what worked and what didn't. 3. Plan 3 improvements for tomorrow.");
    record4.set("expected_output", "A reflection document with 3 specific improvements");
    record4.set("ai_prompt_template", "Analyze the user's reflection and suggest advanced techniques for Day 6");
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
