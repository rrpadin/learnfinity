/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("missions");

  const record0 = new Record(collection);
    const record0_program_idLookup = app.findFirstRecordByFilter("programs", "title='Content Creator Accelerator – 14-Day Sprint'");
    if (!record0_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title='Content Creator Accelerator – 14-Day Sprint'\""); }
    record0.set("program_id", record0_program_idLookup.id);
    record0.set("day_number", 1);
    record0.set("title", "Define Your Content Niche");
    record0.set("objective", "Identify your unique content focus");
    record0.set("instructions", "Identify your unique content focus");
    record0.set("expected_output", "Content niche definition document");
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
    const record1_program_idLookup = app.findFirstRecordByFilter("programs", "title='Content Creator Accelerator – 14-Day Sprint'");
    if (!record1_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title='Content Creator Accelerator – 14-Day Sprint'\""); }
    record1.set("program_id", record1_program_idLookup.id);
    record1.set("day_number", 2);
    record1.set("title", "Research Your Audience");
    record1.set("objective", "Understand your target audience");
    record1.set("instructions", "Understand your target audience");
    record1.set("expected_output", "Audience research report");
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
    const record2_program_idLookup = app.findFirstRecordByFilter("programs", "title='Content Creator Accelerator – 14-Day Sprint'");
    if (!record2_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title='Content Creator Accelerator – 14-Day Sprint'\""); }
    record2.set("program_id", record2_program_idLookup.id);
    record2.set("day_number", 3);
    record2.set("title", "Create Your First AI-Generated Post");
    record2.set("objective", "Generate professional content using AI");
    record2.set("instructions", "Generate professional content using AI");
    record2.set("expected_output", "AI-generated content sample");
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
    const record3_program_idLookup = app.findFirstRecordByFilter("programs", "title='Content Creator Accelerator – 14-Day Sprint'");
    if (!record3_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title='Content Creator Accelerator – 14-Day Sprint'\""); }
    record3.set("program_id", record3_program_idLookup.id);
    record3.set("day_number", 4);
    record3.set("title", "Develop a Content Calendar");
    record3.set("objective", "Plan your content strategy");
    record3.set("instructions", "Plan your content strategy");
    record3.set("expected_output", "30-day content calendar");
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
    const record4_program_idLookup = app.findFirstRecordByFilter("programs", "title='Content Creator Accelerator – 14-Day Sprint'");
    if (!record4_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title='Content Creator Accelerator – 14-Day Sprint'\""); }
    record4.set("program_id", record4_program_idLookup.id);
    record4.set("day_number", 5);
    record4.set("title", "Analyze Performance Metrics");
    record4.set("objective", "Measure content success");
    record4.set("instructions", "Measure content success");
    record4.set("expected_output", "Performance analysis report");
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
    const record5_program_idLookup = app.findFirstRecordByFilter("programs", "title='Business Strategy Bootcamp – 21-Day Sprint'");
    if (!record5_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title='Business Strategy Bootcamp – 21-Day Sprint'\""); }
    record5.set("program_id", record5_program_idLookup.id);
    record5.set("day_number", 1);
    record5.set("title", "Assess Your Business Model");
    record5.set("objective", "Evaluate current business structure");
    record5.set("instructions", "Evaluate current business structure");
    record5.set("expected_output", "Business model assessment");
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
    const record6_program_idLookup = app.findFirstRecordByFilter("programs", "title='Business Strategy Bootcamp – 21-Day Sprint'");
    if (!record6_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title='Business Strategy Bootcamp – 21-Day Sprint'\""); }
    record6.set("program_id", record6_program_idLookup.id);
    record6.set("day_number", 2);
    record6.set("title", "Analyze Your Competition");
    record6.set("objective", "Research competitive landscape");
    record6.set("instructions", "Research competitive landscape");
    record6.set("expected_output", "Competitive analysis report");
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
    const record7_program_idLookup = app.findFirstRecordByFilter("programs", "title='Business Strategy Bootcamp – 21-Day Sprint'");
    if (!record7_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title='Business Strategy Bootcamp – 21-Day Sprint'\""); }
    record7.set("program_id", record7_program_idLookup.id);
    record7.set("day_number", 3);
    record7.set("title", "Identify Market Opportunities");
    record7.set("objective", "Find growth opportunities");
    record7.set("instructions", "Find growth opportunities");
    record7.set("expected_output", "Market opportunities document");
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
    const record8_program_idLookup = app.findFirstRecordByFilter("programs", "title='Business Strategy Bootcamp – 21-Day Sprint'");
    if (!record8_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title='Business Strategy Bootcamp – 21-Day Sprint'\""); }
    record8.set("program_id", record8_program_idLookup.id);
    record8.set("day_number", 4);
    record8.set("title", "Create Financial Projections");
    record8.set("objective", "Build financial forecasts");
    record8.set("instructions", "Build financial forecasts");
    record8.set("expected_output", "Financial projections spreadsheet");
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
    const record9_program_idLookup = app.findFirstRecordByFilter("programs", "title='Business Strategy Bootcamp – 21-Day Sprint'");
    if (!record9_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title='Business Strategy Bootcamp – 21-Day Sprint'\""); }
    record9.set("program_id", record9_program_idLookup.id);
    record9.set("day_number", 5);
    record9.set("title", "Draft Your Strategy Document");
    record9.set("objective", "Synthesize strategy plan");
    record9.set("instructions", "Synthesize strategy plan");
    record9.set("expected_output", "Complete strategy document");
  try {
    app.save(record9);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record10 = new Record(collection);
    const record10_program_idLookup = app.findFirstRecordByFilter("programs", "title='AI Prompt Engineering Mastery – 7-Day Sprint'");
    if (!record10_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title='AI Prompt Engineering Mastery – 7-Day Sprint'\""); }
    record10.set("program_id", record10_program_idLookup.id);
    record10.set("day_number", 1);
    record10.set("title", "Understand Prompt Anatomy");
    record10.set("objective", "Learn prompt structure fundamentals");
    record10.set("instructions", "Learn prompt structure fundamentals");
    record10.set("expected_output", "Prompt anatomy guide");
  try {
    app.save(record10);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record11 = new Record(collection);
    const record11_program_idLookup = app.findFirstRecordByFilter("programs", "title='AI Prompt Engineering Mastery – 7-Day Sprint'");
    if (!record11_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title='AI Prompt Engineering Mastery – 7-Day Sprint'\""); }
    record11.set("program_id", record11_program_idLookup.id);
    record11.set("day_number", 2);
    record11.set("title", "Master the Art of Context");
    record11.set("objective", "Provide effective context in prompts");
    record11.set("instructions", "Provide effective context in prompts");
    record11.set("expected_output", "Context examples document");
  try {
    app.save(record11);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record12 = new Record(collection);
    const record12_program_idLookup = app.findFirstRecordByFilter("programs", "title='AI Prompt Engineering Mastery – 7-Day Sprint'");
    if (!record12_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title='AI Prompt Engineering Mastery – 7-Day Sprint'\""); }
    record12.set("program_id", record12_program_idLookup.id);
    record12.set("day_number", 3);
    record12.set("title", "Advanced Prompt Techniques");
    record12.set("objective", "Apply advanced prompt strategies");
    record12.set("instructions", "Apply advanced prompt strategies");
    record12.set("expected_output", "Advanced techniques guide");
  try {
    app.save(record12);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record13 = new Record(collection);
    const record13_program_idLookup = app.findFirstRecordByFilter("programs", "title='AI Prompt Engineering Mastery – 7-Day Sprint'");
    if (!record13_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title='AI Prompt Engineering Mastery – 7-Day Sprint'\""); }
    record13.set("program_id", record13_program_idLookup.id);
    record13.set("day_number", 4);
    record13.set("title", "Build Your Prompt Library");
    record13.set("objective", "Create reusable prompt templates");
    record13.set("instructions", "Create reusable prompt templates");
    record13.set("expected_output", "Prompt template library");
  try {
    app.save(record13);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record14 = new Record(collection);
    const record14_program_idLookup = app.findFirstRecordByFilter("programs", "title='AI Prompt Engineering Mastery – 7-Day Sprint'");
    if (!record14_program_idLookup) { throw new Error("Lookup failed for program_id: no record in 'programs' matching \"title='AI Prompt Engineering Mastery – 7-Day Sprint'\""); }
    record14.set("program_id", record14_program_idLookup.id);
    record14.set("day_number", 5);
    record14.set("title", "Create Production Prompts");
    record14.set("objective", "Develop production-ready prompts");
    record14.set("instructions", "Develop production-ready prompts");
    record14.set("expected_output", "Production-ready prompts");
  try {
    app.save(record14);
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
