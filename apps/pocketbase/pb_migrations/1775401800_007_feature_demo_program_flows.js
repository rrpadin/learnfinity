/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const updates = [
    {
      title: "AI Prompt Engineering Mastery – 7-Day Sprint",
      description: "Build practical prompt instincts in short daily reps that improve the quality of your AI outputs fast.",
      program_format: "sprint",
      ai_mode: "jordy_guided",
      visual_theme: "midnight",
      visual_icon: "brain",
      cover_image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
      jordy_personalization_hint: "Best for learners who want faster, better AI outputs without getting lost in theory.",
    },
    {
      title: "Content Creator Accelerator – 14-Day Sprint",
      description: "Turn your ideas into a repeatable content engine with short, high-leverage creation sprints.",
      program_format: "sprint",
      ai_mode: "jordy_guided",
      visual_theme: "sunrise",
      visual_icon: "spark",
      cover_image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=1600&q=80",
      jordy_personalization_hint: "Great for creators who need consistency, clarity, and momentum more than theory.",
    },
    {
      title: "Business Strategy Bootcamp – 21-Day Sprint",
      description: "Sharpen strategic thinking with a guided sprint focused on market moves, priorities, and execution.",
      program_format: "sprint",
      ai_mode: "jordy_generated",
      visual_theme: "ocean",
      visual_icon: "target",
      cover_image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
      jordy_personalization_hint: "Ideal for operators and founders who need structured strategy with adaptive guidance.",
    },
  ];

  updates.forEach((update) => {
    const record = app.findFirstRecordByFilter("programs", `title='${update.title}'`);
    if (!record) {
      console.log(`Program not found, skipping: ${update.title}`);
      return;
    }

    Object.entries(update).forEach(([key, value]) => {
      if (key !== "title") {
        record.set(key, value);
      }
    });

    app.save(record);
  });
}, (app) => {
  const titles = [
    "AI Prompt Engineering Mastery – 7-Day Sprint",
    "Content Creator Accelerator – 14-Day Sprint",
    "Business Strategy Bootcamp – 21-Day Sprint",
  ];

  titles.forEach((title) => {
    const record = app.findFirstRecordByFilter("programs", `title='${title}'`);
    if (!record) {
      return;
    }

    record.set("program_format", "standard");
    record.set("ai_mode", "static");
    record.set("visual_theme", "ocean");
    record.set("visual_icon", "spark");
    record.set("cover_image", "");
    record.set("jordy_personalization_hint", "");
    app.save(record);
  });
})
