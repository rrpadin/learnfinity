/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("ai_prompts");

  const record0 = new Record(collection);
    record0.set("name", "Beginner Python");
    record0.set("prompt_text", "Explain this Python concept: {{topic}}");
    record0.set("tags", ["python", "beginner"]);
    record0.set("difficulty", "beginner");
    record0.set("usage_count", 0);
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
    record1.set("name", "Intermediate SQL");
    record1.set("prompt_text", "Write a SQL query for: {{requirement}}");
    record1.set("tags", ["sql", "database", "intermediate"]);
    record1.set("difficulty", "intermediate");
    record1.set("usage_count", 0);
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
    record2.set("name", "Advanced ML");
    record2.set("prompt_text", "Design an ML solution for: {{problem}}");
    record2.set("tags", ["machine-learning", "advanced"]);
    record2.set("difficulty", "advanced");
    record2.set("usage_count", 0);
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
    record3.set("name", "Code Review");
    record3.set("prompt_text", "Review this code and suggest improvements: {{code}}");
    record3.set("tags", ["code-review", "general"]);
    record3.set("difficulty", "intermediate");
    record3.set("usage_count", 0);
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
    record4.set("name", "Explain Concept");
    record4.set("prompt_text", "Explain {{concept}} in simple terms");
    record4.set("tags", ["education", "beginner"]);
    record4.set("difficulty", "beginner");
    record4.set("usage_count", 0);
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
    record5.set("name", "Debug Code");
    record5.set("prompt_text", "Find and fix the bug in: {{code}}");
    record5.set("tags", ["debugging", "intermediate"]);
    record5.set("difficulty", "intermediate");
    record5.set("usage_count", 0);
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
    record6.set("name", "Design Pattern");
    record6.set("prompt_text", "Implement {{pattern}} design pattern");
    record6.set("tags", ["design-patterns", "advanced"]);
    record6.set("difficulty", "advanced");
    record6.set("usage_count", 0);
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
    record7.set("name", "API Design");
    record7.set("prompt_text", "Design an API for: {{use_case}}");
    record7.set("tags", ["api", "architecture", "advanced"]);
    record7.set("difficulty", "advanced");
    record7.set("usage_count", 0);
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
    record8.set("name", "Data Structure");
    record8.set("prompt_text", "Explain when to use {{structure}} data structure");
    record8.set("tags", ["data-structures", "intermediate"]);
    record8.set("difficulty", "intermediate");
    record8.set("usage_count", 0);
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
    record9.set("name", "Algorithm Analysis");
    record9.set("prompt_text", "Analyze the complexity of: {{algorithm}}");
    record9.set("tags", ["algorithms", "advanced"]);
    record9.set("difficulty", "advanced");
    record9.set("usage_count", 0);
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
