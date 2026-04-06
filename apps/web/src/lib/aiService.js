
/**
 * Mock AI Service Layer for Learnfinity Phase 2
 * 
 * This service provides simulated AI guidance, feedback, and conversational capabilities.
 * Real AI integration will replace these functions when API keys are configured.
 */
import pb from '@/lib/pocketbaseClient';

export function getGuidanceMessages(missionTitle, objective) {
  const title = (missionTitle || '').toLowerCase();
  
  if (title.includes('assess') || title.includes('readiness')) {
    return [
      { id: 1, sender: 'ai', text: 'Welcome! Let\'s start by understanding where you are in your AI journey. Be honest about your current knowledge and experience.', timestamp: new Date().toISOString() },
      { id: 2, sender: 'ai', text: 'Think about: What AI tools have you used? What challenges do you face? What excites you most about AI?', timestamp: new Date().toISOString() }
    ];
  }
  
  if (title.includes('goal') || title.includes('define')) {
    return [
      { id: 1, sender: 'ai', text: 'Setting clear goals is crucial for your AI learning journey. Let\'s make them specific and achievable.', timestamp: new Date().toISOString() },
      { id: 2, sender: 'ai', text: 'Consider: What do you want to accomplish in 30 days? How will AI help your work or projects?', timestamp: new Date().toISOString() }
    ];
  }
  
  return [
    { id: 1, sender: 'ai', text: `Let's work on: ${objective}`, timestamp: new Date().toISOString() },
    { id: 2, sender: 'ai', text: 'Take your time to think through this mission. Quality matters more than speed.', timestamp: new Date().toISOString() }
  ];
}

export function generateFeedback(missionTitle, outputText) {
  const wordCount = (outputText || '').trim().split(/\s+/).length;
  const charCount = (outputText || '').length;
  
  if (charCount < 50) {
    return {
      score: 4,
      strengths: ['You started the mission'],
      areasToImprove: ['Your response needs more detail and depth', 'Aim for at least 100 words'],
      nextSteps: ['Expand your response with more specific details', 'Review the mission instructions']
    };
  }
  
  const hasStructure = outputText.includes('\n') || outputText.includes('•') || outputText.includes('-');
  const hasDetails = wordCount > 100;
  
  return {
    score: hasStructure && hasDetails ? 8 : 6,
    strengths: [
      'You completed the mission and submitted your work',
      hasDetails ? 'You provided substantial detail in your response' : 'You addressed the mission objective'
    ],
    areasToImprove: [
      !hasDetails ? 'Consider adding more specific examples and details' : null,
      !hasStructure ? 'Try organizing your thoughts with bullet points or sections' : null
    ].filter(Boolean),
    nextSteps: [
      'Review this output before starting tomorrow\'s mission',
      'Consider how you can apply these insights to your work'
    ]
  };
}

/**
 * Returns context-aware guidance referencing user's progress
 */
export function getContextAwareGuidance(missionType, userProgress, previousOutputs) {
  const completedCount = userProgress?.completedMissions || 0;
  const streak = userProgress?.streak || 0;
  
  let intro = '';
  if (streak > 3) {
    intro = `You're on a ${streak}-day streak! Great momentum. `;
  } else if (completedCount > 0) {
    intro = `You've completed ${completedCount} missions so far. Let's keep building on that. `;
  } else {
    intro = "Welcome to your first mission! I'm Jordy, your AI Coach. ";
  }

  return {
    id: Date.now().toString(),
    sender: 'ai',
    text: `${intro}For this mission, focus on applying what you've learned to your specific context. Real AI will provide personalized insights when your API key is configured.`,
    timestamp: new Date().toISOString()
  };
}

/**
 * Generates suggested follow-up questions based on the mission and last message
 */
export function generateFollowUpQuestions(missionType, lastMessage) {
  const type = (missionType || '').toLowerCase();
  
  if (type.includes('prompt')) {
    return [
      "Can you give me an example of a good prompt?",
      "How do I add more context?",
      "What if the AI gives a bad response?"
    ];
  }
  
  if (type.includes('strategy') || type.includes('business')) {
    return [
      "How do I identify my target audience?",
      "What metrics should I track?",
      "Can you explain market positioning?"
    ];
  }

  return [
    "Can you explain this concept further?",
    "What are the next steps?",
    "I'm stuck, can you help me break this down?"
  ];
}

/**
 * Analyzes keywords in a custom question and returns a mocked response
 */
export function handleCustomQuestion(question, missionType, conversationHistory) {
  const q = (question || '').toLowerCase();
  let responseText = '';

  if (q.includes('improve') || q.includes('better')) {
    responseText = "To improve this, try adding more specific examples and breaking your thoughts into clear, actionable steps. Focus on the 'why' behind your statements.";
  } else if (q.includes('next') || q.includes('after')) {
    responseText = "Next, you should review your output against the mission objective. Once you're satisfied, submit it and take a moment to reflect on what you've learned today.";
  } else if (q.includes('explain') || q.includes('what is')) {
    responseText = "Think of this concept as building a foundation. Just like a house needs a solid base, your AI strategy needs clear objectives before you start choosing specific tools.";
  } else if (q.includes('help') || q.includes('stuck')) {
    responseText = "Don't worry, it's normal to feel stuck! Let's break it down: 1) Read the objective again. 2) Write down just three bullet points. 3) Expand on each point one by one.";
  } else {
    responseText = "That's a great question. In a real scenario, I would analyze your specific context and provide a tailored answer. (Real AI will respond to custom questions when API key is configured).";
  }

  return {
    id: Date.now().toString(),
    sender: 'ai',
    text: responseText,
    timestamp: new Date().toISOString()
  };
}

/**
 * Retrieves conversation history from a user_mission record
 */
export async function getConversationHistory(userMissionId) {
  try {
    const record = await pb.collection('user_missions').getOne(userMissionId, { $autoCancel: false });
    return record.ai_coach_messages || [];
  } catch (error) {
    console.error("Error fetching conversation history:", error);
    return [];
  }
}
