/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("analytics_events");

  const record0 = new Record(collection);
    const record0_user_idLookup = app.findFirstRecordByFilter("users", "email='user1@test.com'");
    if (!record0_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user1@test.com'\""); }
    record0.set("user_id", record0_user_idLookup.id);
    record0.set("event_type", "mission_started");
    record0.set("event_data", "{'mission_id': 'm1', 'program_id': 'p1'}");
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
    const record1_user_idLookup = app.findFirstRecordByFilter("users", "email='user2@test.com'");
    if (!record1_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user2@test.com'\""); }
    record1.set("user_id", record1_user_idLookup.id);
    record1.set("event_type", "mission_completed");
    record1.set("event_data", "{'mission_id': 'm2', 'program_id': 'p1', 'time_spent': 45}");
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
    const record2_user_idLookup = app.findFirstRecordByFilter("users", "email='user3@test.com'");
    if (!record2_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user3@test.com'\""); }
    record2.set("user_id", record2_user_idLookup.id);
    record2.set("event_type", "output_submitted");
    record2.set("event_data", "{'mission_id': 'm3', 'output_length': 250}");
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
    const record3_user_idLookup = app.findFirstRecordByFilter("users", "email='user4@test.com'");
    if (!record3_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user4@test.com'\""); }
    record3.set("user_id", record3_user_idLookup.id);
    record3.set("event_type", "ai_coach_message");
    record3.set("event_data", "{'message': 'Great work!', 'mission_id': 'm4'}");
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
    const record4_user_idLookup = app.findFirstRecordByFilter("users", "email='user5@test.com'");
    if (!record4_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user5@test.com'\""); }
    record4.set("user_id", record4_user_idLookup.id);
    record4.set("event_type", "program_enrolled");
    record4.set("event_data", "{'program_id': 'p2', 'program_name': 'Python Basics'}");
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
    const record5_user_idLookup = app.findFirstRecordByFilter("users", "email='user6@test.com'");
    if (!record5_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user6@test.com'\""); }
    record5.set("user_id", record5_user_idLookup.id);
    record5.set("event_type", "mission_started");
    record5.set("event_data", "{'mission_id': 'm5', 'program_id': 'p2'}");
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
    const record6_user_idLookup = app.findFirstRecordByFilter("users", "email='user7@test.com'");
    if (!record6_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user7@test.com'\""); }
    record6.set("user_id", record6_user_idLookup.id);
    record6.set("event_type", "mission_completed");
    record6.set("event_data", "{'mission_id': 'm6', 'program_id': 'p2', 'time_spent': 60}");
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
    const record7_user_idLookup = app.findFirstRecordByFilter("users", "email='user8@test.com'");
    if (!record7_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user8@test.com'\""); }
    record7.set("user_id", record7_user_idLookup.id);
    record7.set("event_type", "output_submitted");
    record7.set("event_data", "{'mission_id': 'm7', 'output_length': 180}");
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
    const record8_user_idLookup = app.findFirstRecordByFilter("users", "email='user9@test.com'");
    if (!record8_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user9@test.com'\""); }
    record8.set("user_id", record8_user_idLookup.id);
    record8.set("event_type", "ai_coach_message");
    record8.set("event_data", "{'message': 'Keep practicing!', 'mission_id': 'm8'}");
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
    const record9_user_idLookup = app.findFirstRecordByFilter("users", "email='user10@test.com'");
    if (!record9_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user10@test.com'\""); }
    record9.set("user_id", record9_user_idLookup.id);
    record9.set("event_type", "program_enrolled");
    record9.set("event_data", "{'program_id': 'p3', 'program_name': 'Web Development'}");
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
    const record10_user_idLookup = app.findFirstRecordByFilter("users", "email='user1@test.com'");
    if (!record10_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user1@test.com'\""); }
    record10.set("user_id", record10_user_idLookup.id);
    record10.set("event_type", "mission_started");
    record10.set("event_data", "{'mission_id': 'm9', 'program_id': 'p3'}");
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
    const record11_user_idLookup = app.findFirstRecordByFilter("users", "email='user2@test.com'");
    if (!record11_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user2@test.com'\""); }
    record11.set("user_id", record11_user_idLookup.id);
    record11.set("event_type", "mission_completed");
    record11.set("event_data", "{'mission_id': 'm10', 'program_id': 'p3', 'time_spent': 75}");
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
    const record12_user_idLookup = app.findFirstRecordByFilter("users", "email='user3@test.com'");
    if (!record12_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user3@test.com'\""); }
    record12.set("user_id", record12_user_idLookup.id);
    record12.set("event_type", "output_submitted");
    record12.set("event_data", "{'mission_id': 'm11', 'output_length': 320}");
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
    const record13_user_idLookup = app.findFirstRecordByFilter("users", "email='user4@test.com'");
    if (!record13_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user4@test.com'\""); }
    record13.set("user_id", record13_user_idLookup.id);
    record13.set("event_type", "ai_coach_message");
    record13.set("event_data", "{'message': 'Excellent progress!', 'mission_id': 'm12'}");
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
    const record14_user_idLookup = app.findFirstRecordByFilter("users", "email='user5@test.com'");
    if (!record14_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user5@test.com'\""); }
    record14.set("user_id", record14_user_idLookup.id);
    record14.set("event_type", "mission_started");
    record14.set("event_data", "{'mission_id': 'm13', 'program_id': 'p1'}");
  try {
    app.save(record14);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record15 = new Record(collection);
    const record15_user_idLookup = app.findFirstRecordByFilter("users", "email='user6@test.com'");
    if (!record15_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user6@test.com'\""); }
    record15.set("user_id", record15_user_idLookup.id);
    record15.set("event_type", "mission_completed");
    record15.set("event_data", "{'mission_id': 'm14', 'program_id': 'p1', 'time_spent': 50}");
  try {
    app.save(record15);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record16 = new Record(collection);
    const record16_user_idLookup = app.findFirstRecordByFilter("users", "email='user7@test.com'");
    if (!record16_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user7@test.com'\""); }
    record16.set("user_id", record16_user_idLookup.id);
    record16.set("event_type", "output_submitted");
    record16.set("event_data", "{'mission_id': 'm15', 'output_length': 210}");
  try {
    app.save(record16);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record17 = new Record(collection);
    const record17_user_idLookup = app.findFirstRecordByFilter("users", "email='user8@test.com'");
    if (!record17_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user8@test.com'\""); }
    record17.set("user_id", record17_user_idLookup.id);
    record17.set("event_type", "program_enrolled");
    record17.set("event_data", "{'program_id': 'p4', 'program_name': 'Data Science'}");
  try {
    app.save(record17);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record18 = new Record(collection);
    const record18_user_idLookup = app.findFirstRecordByFilter("users", "email='user9@test.com'");
    if (!record18_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user9@test.com'\""); }
    record18.set("user_id", record18_user_idLookup.id);
    record18.set("event_type", "mission_started");
    record18.set("event_data", "{'mission_id': 'm16', 'program_id': 'p4'}");
  try {
    app.save(record18);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record19 = new Record(collection);
    const record19_user_idLookup = app.findFirstRecordByFilter("users", "email='user10@test.com'");
    if (!record19_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user10@test.com'\""); }
    record19.set("user_id", record19_user_idLookup.id);
    record19.set("event_type", "mission_completed");
    record19.set("event_data", "{'mission_id': 'm17', 'program_id': 'p4', 'time_spent': 90}");
  try {
    app.save(record19);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record20 = new Record(collection);
    const record20_user_idLookup = app.findFirstRecordByFilter("users", "email='user1@test.com'");
    if (!record20_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user1@test.com'\""); }
    record20.set("user_id", record20_user_idLookup.id);
    record20.set("event_type", "output_submitted");
    record20.set("event_data", "{'mission_id': 'm18', 'output_length': 275}");
  try {
    app.save(record20);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record21 = new Record(collection);
    const record21_user_idLookup = app.findFirstRecordByFilter("users", "email='user2@test.com'");
    if (!record21_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user2@test.com'\""); }
    record21.set("user_id", record21_user_idLookup.id);
    record21.set("event_type", "ai_coach_message");
    record21.set("event_data", "{'message': 'Well done!', 'mission_id': 'm19'}");
  try {
    app.save(record21);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record22 = new Record(collection);
    const record22_user_idLookup = app.findFirstRecordByFilter("users", "email='user3@test.com'");
    if (!record22_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user3@test.com'\""); }
    record22.set("user_id", record22_user_idLookup.id);
    record22.set("event_type", "program_enrolled");
    record22.set("event_data", "{'program_id': 'p5', 'program_name': 'Machine Learning'}");
  try {
    app.save(record22);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record23 = new Record(collection);
    const record23_user_idLookup = app.findFirstRecordByFilter("users", "email='user4@test.com'");
    if (!record23_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user4@test.com'\""); }
    record23.set("user_id", record23_user_idLookup.id);
    record23.set("event_type", "mission_started");
    record23.set("event_data", "{'mission_id': 'm20', 'program_id': 'p5'}");
  try {
    app.save(record23);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record24 = new Record(collection);
    const record24_user_idLookup = app.findFirstRecordByFilter("users", "email='user5@test.com'");
    if (!record24_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user5@test.com'\""); }
    record24.set("user_id", record24_user_idLookup.id);
    record24.set("event_type", "mission_completed");
    record24.set("event_data", "{'mission_id': 'm21', 'program_id': 'p5', 'time_spent': 120}");
  try {
    app.save(record24);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record25 = new Record(collection);
    const record25_user_idLookup = app.findFirstRecordByFilter("users", "email='user6@test.com'");
    if (!record25_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user6@test.com'\""); }
    record25.set("user_id", record25_user_idLookup.id);
    record25.set("event_type", "output_submitted");
    record25.set("event_data", "{'mission_id': 'm22', 'output_length': 400}");
  try {
    app.save(record25);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record26 = new Record(collection);
    const record26_user_idLookup = app.findFirstRecordByFilter("users", "email='user7@test.com'");
    if (!record26_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user7@test.com'\""); }
    record26.set("user_id", record26_user_idLookup.id);
    record26.set("event_type", "ai_coach_message");
    record26.set("event_data", "{'message': 'Great effort!', 'mission_id': 'm23'}");
  try {
    app.save(record26);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record27 = new Record(collection);
    const record27_user_idLookup = app.findFirstRecordByFilter("users", "email='user8@test.com'");
    if (!record27_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user8@test.com'\""); }
    record27.set("user_id", record27_user_idLookup.id);
    record27.set("event_type", "mission_started");
    record27.set("event_data", "{'mission_id': 'm24', 'program_id': 'p2'}");
  try {
    app.save(record27);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record28 = new Record(collection);
    const record28_user_idLookup = app.findFirstRecordByFilter("users", "email='user9@test.com'");
    if (!record28_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user9@test.com'\""); }
    record28.set("user_id", record28_user_idLookup.id);
    record28.set("event_type", "mission_completed");
    record28.set("event_data", "{'mission_id': 'm25', 'program_id': 'p2', 'time_spent': 55}");
  try {
    app.save(record28);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record29 = new Record(collection);
    const record29_user_idLookup = app.findFirstRecordByFilter("users", "email='user10@test.com'");
    if (!record29_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user10@test.com'\""); }
    record29.set("user_id", record29_user_idLookup.id);
    record29.set("event_type", "output_submitted");
    record29.set("event_data", "{'mission_id': 'm26', 'output_length': 290}");
  try {
    app.save(record29);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record30 = new Record(collection);
    const record30_user_idLookup = app.findFirstRecordByFilter("users", "email='user1@test.com'");
    if (!record30_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user1@test.com'\""); }
    record30.set("user_id", record30_user_idLookup.id);
    record30.set("event_type", "program_enrolled");
    record30.set("event_data", "{'program_id': 'p6', 'program_name': 'Advanced Python'}");
  try {
    app.save(record30);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record31 = new Record(collection);
    const record31_user_idLookup = app.findFirstRecordByFilter("users", "email='user2@test.com'");
    if (!record31_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user2@test.com'\""); }
    record31.set("user_id", record31_user_idLookup.id);
    record31.set("event_type", "mission_started");
    record31.set("event_data", "{'mission_id': 'm27', 'program_id': 'p6'}");
  try {
    app.save(record31);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record32 = new Record(collection);
    const record32_user_idLookup = app.findFirstRecordByFilter("users", "email='user3@test.com'");
    if (!record32_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user3@test.com'\""); }
    record32.set("user_id", record32_user_idLookup.id);
    record32.set("event_type", "mission_completed");
    record32.set("event_data", "{'mission_id': 'm28', 'program_id': 'p6', 'time_spent': 85}");
  try {
    app.save(record32);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record33 = new Record(collection);
    const record33_user_idLookup = app.findFirstRecordByFilter("users", "email='user4@test.com'");
    if (!record33_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user4@test.com'\""); }
    record33.set("user_id", record33_user_idLookup.id);
    record33.set("event_type", "output_submitted");
    record33.set("event_data", "{'mission_id': 'm29', 'output_length': 350}");
  try {
    app.save(record33);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record34 = new Record(collection);
    const record34_user_idLookup = app.findFirstRecordByFilter("users", "email='user5@test.com'");
    if (!record34_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user5@test.com'\""); }
    record34.set("user_id", record34_user_idLookup.id);
    record34.set("event_type", "ai_coach_message");
    record34.set("event_data", "{'message': 'Keep it up!', 'mission_id': 'm30'}");
  try {
    app.save(record34);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record35 = new Record(collection);
    const record35_user_idLookup = app.findFirstRecordByFilter("users", "email='user6@test.com'");
    if (!record35_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user6@test.com'\""); }
    record35.set("user_id", record35_user_idLookup.id);
    record35.set("event_type", "mission_started");
    record35.set("event_data", "{'mission_id': 'm31', 'program_id': 'p3'}");
  try {
    app.save(record35);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record36 = new Record(collection);
    const record36_user_idLookup = app.findFirstRecordByFilter("users", "email='user7@test.com'");
    if (!record36_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user7@test.com'\""); }
    record36.set("user_id", record36_user_idLookup.id);
    record36.set("event_type", "mission_completed");
    record36.set("event_data", "{'mission_id': 'm32', 'program_id': 'p3', 'time_spent': 70}");
  try {
    app.save(record36);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record37 = new Record(collection);
    const record37_user_idLookup = app.findFirstRecordByFilter("users", "email='user8@test.com'");
    if (!record37_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user8@test.com'\""); }
    record37.set("user_id", record37_user_idLookup.id);
    record37.set("event_type", "output_submitted");
    record37.set("event_data", "{'mission_id': 'm33', 'output_length': 240}");
  try {
    app.save(record37);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record38 = new Record(collection);
    const record38_user_idLookup = app.findFirstRecordByFilter("users", "email='user9@test.com'");
    if (!record38_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user9@test.com'\""); }
    record38.set("user_id", record38_user_idLookup.id);
    record38.set("event_type", "program_enrolled");
    record38.set("event_data", "{'program_id': 'p7', 'program_name': 'Cloud Computing'}");
  try {
    app.save(record38);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record39 = new Record(collection);
    const record39_user_idLookup = app.findFirstRecordByFilter("users", "email='user10@test.com'");
    if (!record39_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user10@test.com'\""); }
    record39.set("user_id", record39_user_idLookup.id);
    record39.set("event_type", "mission_started");
    record39.set("event_data", "{'mission_id': 'm34', 'program_id': 'p7'}");
  try {
    app.save(record39);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record40 = new Record(collection);
    const record40_user_idLookup = app.findFirstRecordByFilter("users", "email='user1@test.com'");
    if (!record40_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user1@test.com'\""); }
    record40.set("user_id", record40_user_idLookup.id);
    record40.set("event_type", "mission_completed");
    record40.set("event_data", "{'mission_id': 'm35', 'program_id': 'p7', 'time_spent': 95}");
  try {
    app.save(record40);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record41 = new Record(collection);
    const record41_user_idLookup = app.findFirstRecordByFilter("users", "email='user2@test.com'");
    if (!record41_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user2@test.com'\""); }
    record41.set("user_id", record41_user_idLookup.id);
    record41.set("event_type", "output_submitted");
    record41.set("event_data", "{'mission_id': 'm36', 'output_length': 310}");
  try {
    app.save(record41);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record42 = new Record(collection);
    const record42_user_idLookup = app.findFirstRecordByFilter("users", "email='user3@test.com'");
    if (!record42_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user3@test.com'\""); }
    record42.set("user_id", record42_user_idLookup.id);
    record42.set("event_type", "ai_coach_message");
    record42.set("event_data", "{'message': 'Fantastic work!', 'mission_id': 'm37'}");
  try {
    app.save(record42);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record43 = new Record(collection);
    const record43_user_idLookup = app.findFirstRecordByFilter("users", "email='user4@test.com'");
    if (!record43_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user4@test.com'\""); }
    record43.set("user_id", record43_user_idLookup.id);
    record43.set("event_type", "mission_started");
    record43.set("event_data", "{'mission_id': 'm38', 'program_id': 'p4'}");
  try {
    app.save(record43);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record44 = new Record(collection);
    const record44_user_idLookup = app.findFirstRecordByFilter("users", "email='user5@test.com'");
    if (!record44_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user5@test.com'\""); }
    record44.set("user_id", record44_user_idLookup.id);
    record44.set("event_type", "mission_completed");
    record44.set("event_data", "{'mission_id': 'm39', 'program_id': 'p4', 'time_spent': 110}");
  try {
    app.save(record44);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record45 = new Record(collection);
    const record45_user_idLookup = app.findFirstRecordByFilter("users", "email='user6@test.com'");
    if (!record45_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user6@test.com'\""); }
    record45.set("user_id", record45_user_idLookup.id);
    record45.set("event_type", "output_submitted");
    record45.set("event_data", "{'mission_id': 'm40', 'output_length': 380}");
  try {
    app.save(record45);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record46 = new Record(collection);
    const record46_user_idLookup = app.findFirstRecordByFilter("users", "email='user7@test.com'");
    if (!record46_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user7@test.com'\""); }
    record46.set("user_id", record46_user_idLookup.id);
    record46.set("event_type", "program_enrolled");
    record46.set("event_data", "{'program_id': 'p8', 'program_name': 'DevOps Essentials'}");
  try {
    app.save(record46);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record47 = new Record(collection);
    const record47_user_idLookup = app.findFirstRecordByFilter("users", "email='user8@test.com'");
    if (!record47_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user8@test.com'\""); }
    record47.set("user_id", record47_user_idLookup.id);
    record47.set("event_type", "mission_started");
    record47.set("event_data", "{'mission_id': 'm41', 'program_id': 'p8'}");
  try {
    app.save(record47);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record48 = new Record(collection);
    const record48_user_idLookup = app.findFirstRecordByFilter("users", "email='user9@test.com'");
    if (!record48_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user9@test.com'\""); }
    record48.set("user_id", record48_user_idLookup.id);
    record48.set("event_type", "mission_completed");
    record48.set("event_data", "{'mission_id': 'm42', 'program_id': 'p8', 'time_spent': 65}");
  try {
    app.save(record48);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record49 = new Record(collection);
    const record49_user_idLookup = app.findFirstRecordByFilter("users", "email='user10@test.com'");
    if (!record49_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user10@test.com'\""); }
    record49.set("user_id", record49_user_idLookup.id);
    record49.set("event_type", "output_submitted");
    record49.set("event_data", "{'mission_id': 'm43', 'output_length': 220}");
  try {
    app.save(record49);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record50 = new Record(collection);
    const record50_user_idLookup = app.findFirstRecordByFilter("users", "email='user1@test.com'");
    if (!record50_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user1@test.com'\""); }
    record50.set("user_id", record50_user_idLookup.id);
    record50.set("event_type", "ai_coach_message");
    record50.set("event_data", "{'message': 'Impressive!', 'mission_id': 'm44'}");
  try {
    app.save(record50);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record51 = new Record(collection);
    const record51_user_idLookup = app.findFirstRecordByFilter("users", "email='user2@test.com'");
    if (!record51_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user2@test.com'\""); }
    record51.set("user_id", record51_user_idLookup.id);
    record51.set("event_type", "mission_started");
    record51.set("event_data", "{'mission_id': 'm45', 'program_id': 'p5'}");
  try {
    app.save(record51);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record52 = new Record(collection);
    const record52_user_idLookup = app.findFirstRecordByFilter("users", "email='user3@test.com'");
    if (!record52_user_idLookup) { throw new Error("Lookup failed for user_id: no record in 'users' matching \"email='user3@test.com'\""); }
    record52.set("user_id", record52_user_idLookup.id);
    record52.set("event_type", "mission_completed");
    record52.set("event_data", "{'mission_id': 'm46', 'program_id': 'p5', 'time_spent': 100}");
  try {
    app.save(record52);
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
