/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const program = app.findFirstRecordByFilter("programs", "title='Business Strategy Bootcamp – 21-Day Sprint'");
  if (!program) {
    console.log("Business Strategy Bootcamp program not found, skipping content upgrade");
    return;
  }

  program.set("duration_days", 5);
  program.set("description", "Build a sharper business strategy in 5 focused missions that clarify your model, market, money, and next moves.");
  app.save(program);

  const missionUpdates = [
    {
      day_number: 1,
      title: "Assess Your Business Model",
      objective: "Get clear on how your business creates, delivers, and captures value.",
      instructions: `Outcome
Clarity on how your business actually creates, delivers, and captures value.

Lesson
Most businesses do not fail because of effort. They fail because the model is not clear.

Today, answer three critical questions:
1. What problem do you solve?
2. Who do you solve it for?
3. How do you make money from it?

A strong business model is not complex. It is clear and repeatable.

If you cannot explain your model in 30 seconds, it is not ready to scale.

Audio script
"Let's simplify this.

Your business exists to solve a problem for someone specific.

Not everyone.

Someone.

When you try to serve everyone, you dilute your value.

So today, focus on clarity over creativity.

What problem do you solve?
Who is it for?
And why would they pay for it?

That's your foundation."

Video prompt
Scene: Clean desk, notebook, calm lighting
Camera: Slow zoom-in
Narration: "Most people build businesses backwards. They start with an idea instead of starting with a problem. Today, we flip that. Let's get clear on what you actually solve."

Activity
Exercise: The 3-Line Business Model
Fill in:
- I help ______ (specific audience)
- solve ______ (specific problem)
- by ______ (your method or product)

Constraint: Keep it under 25 words.

Jordy can help
- Rewrite your business model clearly
- Pressure-test your audience definition
- Simplify your positioning`,
      expected_output: `Submit your 3-Line Business Model in under 25 words:
- Audience
- Problem
- Method or product

Then add a 1-2 sentence reflection on what became clearer for you.`,
      ai_prompt_template: "Help the learner refine a concise business model statement. Push for specificity on audience, problem, and value delivery. If their wording is vague, rewrite it into sharper alternatives and ask one follow-up question.",
    },
    {
      day_number: 2,
      title: "Analyze Your Competition",
      objective: "Understand the market and identify where your positioning can stand apart.",
      instructions: `Outcome
Understand positioning and identify your advantage.

Lesson
You do not need to beat everyone. You need to be different in a way that matters.

Your competitors are already telling you:
- what works
- what does not
- what is missing

Your job is not to copy them.
Your job is to find the gap.

Audio script
"Stop thinking of competitors as threats.

They are data.

Every offer they make...
every message they use...
every review they receive...

That is insight.

Your advantage comes from seeing what others ignore."

Video prompt
Scene: Split screen showing your business versus competitors
Narration: "Most people try to be better. The winners position differently."

Activity
Exercise: Competitive Snapshot
List 3 competitors and answer:
- What do they do well?
- Where are they weak?
- What is missing?

Final question:
What can I do differently, not just better?

Jordy can help
- Compare competitors side by side
- Spot messaging gaps
- Suggest a sharper positioning angle`,
      expected_output: `Submit a Competitive Snapshot for 3 competitors:
- What they do well
- Where they are weak
- What is missing

Finish with: "What can I do differently, not just better?"`,
      ai_prompt_template: "Coach the learner through competitive positioning. Help them move beyond generic comparisons and identify a meaningful differentiation angle. Offer 2-3 possible positioning gaps if needed.",
    },
    {
      day_number: 3,
      title: "Identify Market Opportunities",
      objective: "Spot real market openings based on demand, frustration, and underserved needs.",
      instructions: `Outcome
Spot real opportunities instead of guessing.

Lesson
Opportunities are not random.

They exist where:
- demand is growing
- frustration is high
- solutions are incomplete

Look for:
- complaints
- inefficiencies
- underserved audiences

That is where leverage lives.

Audio script
"Opportunity is usually disguised as frustration.

When people complain, they are revealing unmet needs.

Listen carefully.

That is your roadmap."

Video prompt
Scene: Reviews, comments, and social feeds being scanned for patterns
Narration: "The market is already telling you what it needs. Most people just do not listen."

Activity
Exercise: Opportunity Finder
Find 5 real complaints in:
- reviews
- forums
- social media

Then answer:
What product or service would solve this?

Jordy can help
- Turn complaints into opportunity themes
- Group patterns
- Suggest offer ideas from the data`,
      expected_output: `Submit 5 real complaints you found and a proposed solution idea for each one.

Then summarize the biggest opportunity pattern you noticed in 2-3 sentences.`,
      ai_prompt_template: "Help the learner translate raw complaints into business opportunities. Cluster similar complaints, identify unmet needs, and propose practical solution directions without overcomplicating the idea.",
    },
    {
      day_number: 4,
      title: "Create Financial Projections",
      objective: "Understand how the business makes money and whether the economics are sustainable.",
      instructions: `Outcome
Understand how your business makes money realistically.

Lesson
You do not need a complex financial model.

You need clarity on:
- revenue per customer
- cost to deliver
- profit margin

Simple math creates powerful decisions.

Audio script
"Most people avoid numbers.

But numbers tell the truth.

If your model does not work on paper, it will not work in reality."

Video prompt
Scene: Whiteboard with simple math and margin breakdown
Narration: "Let's break this down simply. If you make $100 per customer and it costs you $40 to deliver, you do not have a revenue problem. You have a margin strategy."

Activity
Exercise: Simple Revenue Model
Fill in:
- Price per customer: $____
- Monthly customers: ____
- Monthly revenue: $____

Now subtract:
- costs

Final question:
Is this sustainable?

Jordy can help
- Stress-test assumptions
- Suggest pricing ranges
- Highlight margin risks`,
      expected_output: `Submit your Simple Revenue Model:
- Price per customer
- Monthly customers
- Monthly revenue
- Costs
- Estimated margin

Close with a short answer to: "Is this sustainable?"`,
      ai_prompt_template: "Review the learner's simple revenue model. Check for unrealistic assumptions, point out margin blind spots, and suggest one or two practical pricing or cost adjustments.",
    },
    {
      day_number: 5,
      title: "Draft Your Strategy Document",
      objective: "Turn the previous work into a clear one-page strategy you can actually use.",
      instructions: `Outcome
Turn ideas into a clear, usable strategy.

Lesson
A strategy is not a document.
It is a decision framework.

It tells you:
- what to do
- what not to do

Clarity creates speed.

Audio script
"Strategy is about focus.

Most people fail because they try to do too much.

Your strategy should simplify your decisions, not complicate them."

Video prompt
Scene: Calm, confident delivery with a one-page plan on screen
Narration: "You do not need a perfect plan. You need a clear direction."

Activity
Exercise: 1-Page Strategy
Write:
1. Target audience
2. Core problem
3. Offer
4. Revenue model
5. Next 3 actions

Constraint: One page only.

Jordy can help
- Rewrite your strategy clearly
- Suggest next steps
- Identify your strongest niche or pricing direction`,
      expected_output: `Submit a 1-page strategy that includes:
1. Target audience
2. Core problem
3. Offer
4. Revenue model
5. Next 3 actions

Keep it concise and actionable.`,
      ai_prompt_template: "Act like Jordy, an AI business strategy coach. Help the learner turn their earlier answers into a focused 1-page strategy. Simplify, prioritize, and recommend the next 3 highest-leverage actions.",
    },
  ];

  missionUpdates.forEach((update) => {
    const mission = app.findFirstRecordByFilter(
      "missions",
      `program_id='${program.id}' && day_number=${update.day_number}`,
    );

    if (!mission) {
      console.log(`Mission not found for Business Strategy Bootcamp day ${update.day_number}, skipping`);
      return;
    }

    mission.set("title", update.title);
    mission.set("objective", update.objective);
    mission.set("instructions", update.instructions);
    mission.set("expected_output", update.expected_output);
    mission.set("ai_prompt_template", update.ai_prompt_template);
    app.save(mission);
  });
}, (app) => {
  const program = app.findFirstRecordByFilter("programs", "title='Business Strategy Bootcamp – 21-Day Sprint'");
  if (!program) {
    return;
  }

  program.set("duration_days", 21);
  app.save(program);
})
