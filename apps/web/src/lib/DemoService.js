
import pb from '@/lib/pocketbaseClient';

class DemoService {
  async initializeDemoData() {
    // Data is already created by migrations agent.
    // We just verify it exists.
    try {
      const orgs = await pb.collection('organizations').getFullList({
        filter: 'is_demo = true',
        $autoCancel: false
      });
      return orgs.length > 0;
    } catch (error) {
      console.error("Failed to initialize demo data:", error);
      return false;
    }
  }

  async getDemoOrganization() {
    try {
      const orgs = await pb.collection('organizations').getFullList({
        filter: 'is_demo = true',
        $autoCancel: false
      });
      return orgs[0] || null;
    } catch (error) {
      console.error("Failed to fetch demo org:", error);
      return null;
    }
  }

  async getDemoUsers() {
    try {
      return await pb.collection('users').getFullList({
        filter: 'email ~ "@techcorp.demo"',
        $autoCancel: false
      });
    } catch (error) {
      console.error("Failed to fetch demo users:", error);
      return [];
    }
  }

  async getDemoPrograms() {
    try {
      return await pb.collection('programs').getFullList({
        $autoCancel: false
      });
    } catch (error) {
      console.error("Failed to fetch demo programs:", error);
      return [];
    }
  }

  async getDemoGoals() {
    try {
      return await pb.collection('organizational_goals').getFullList({
        $autoCancel: false
      });
    } catch (error) {
      console.error("Failed to fetch demo goals:", error);
      return [];
    }
  }

  async getDemoWorkflows() {
    try {
      return await pb.collection('workflows').getFullList({
        $autoCancel: false
      });
    } catch (error) {
      console.error("Failed to fetch demo workflows:", error);
      return [];
    }
  }

  async getDemoIntegrations() {
    try {
      return await pb.collection('integrations').getFullList({
        $autoCancel: false
      });
    } catch (error) {
      console.error("Failed to fetch demo integrations:", error);
      return [];
    }
  }

  getAdminDemoSteps() {
    return [
      {
        stepNumber: 1,
        title: "Dashboard Overview",
        description: "Welcome to the Admin Dashboard. Here you can see key metrics at a glance.",
        keyPoints: ["Total Users", "Active Programs", "Completion Rates"]
      },
      {
        stepNumber: 2,
        title: "Organization Management",
        description: "Manage your organization settings, branding, and subscription details.",
        keyPoints: ["Update Logo", "Manage Limits", "View Status"]
      },
      {
        stepNumber: 3,
        title: "User Management",
        description: "Add, edit, or remove users from your organization.",
        keyPoints: ["Bulk Import", "Role Assignment", "Status Tracking"]
      },
      {
        stepNumber: 4,
        title: "User Roles",
        description: "Assign specific roles to control access levels.",
        keyPoints: ["Admin Access", "Manager Access", "Employee Access"]
      },
      {
        stepNumber: 5,
        title: "Program Management",
        description: "Create and manage learning programs for your team.",
        keyPoints: ["Create Programs", "Set Duration", "Track Enrollments"]
      },
      {
        stepNumber: 6,
        title: "Program Details",
        description: "Dive deep into specific programs like 'Leadership Fundamentals'.",
        keyPoints: ["View Progress", "Manage Content", "Analyze Ratings"]
      },
      {
        stepNumber: 7,
        title: "Goal Management",
        description: "Set and track organizational learning goals.",
        keyPoints: ["Strategic Goals", "Operational Goals", "Priority Levels"]
      },
      {
        stepNumber: 8,
        title: "Workflow Automation",
        description: "Automate repetitive tasks with custom workflows.",
        keyPoints: ["Event Triggers", "Scheduled Actions", "Execution Logs"]
      },
      {
        stepNumber: 9,
        title: "Integration Management",
        description: "Connect Learnfinity with your existing tools.",
        keyPoints: ["Slack Integration", "Microsoft Teams", "Sync Settings"]
      },
      {
        stepNumber: 10,
        title: "Summary",
        description: "You've completed the Admin Demo! You're ready to manage your organization.",
        keyPoints: ["Explore on your own", "Check out the End-User Demo"]
      }
    ];
  }

  getEndUserDemoSteps() {
    return [
      {
        stepNumber: 1,
        title: "Learner Dashboard",
        description: "Welcome to your personal learning hub.",
        keyPoints: ["Assigned Programs", "Current Goals", "Recent Activity"]
      },
      {
        stepNumber: 2,
        title: "Browse Programs",
        description: "Discover new skills in the program library.",
        keyPoints: ["Search & Filter", "View Details", "Enroll"]
      },
      {
        stepNumber: 3,
        title: "Program Details",
        description: "View the syllabus and requirements for 'Leadership Fundamentals'.",
        keyPoints: ["Learning Outcomes", "Duration", "Difficulty"]
      },
      {
        stepNumber: 4,
        title: "Learning Module",
        description: "Engage with interactive learning content.",
        keyPoints: ["Read Materials", "Complete Missions", "Submit Output"]
      },
      {
        stepNumber: 5,
        title: "My Goals",
        description: "Track your personal and assigned learning goals.",
        keyPoints: ["Target Dates", "Status Updates", "Priority"]
      },
      {
        stepNumber: 6,
        title: "Goal Details",
        description: "Break down your goals into actionable steps.",
        keyPoints: ["Progress Tracking", "Related Programs"]
      },
      {
        stepNumber: 7,
        title: "My Progress",
        description: "Visualize your learning journey over time.",
        keyPoints: ["Completion Stats", "Time Spent", "Achievements"]
      },
      {
        stepNumber: 8,
        title: "Notifications",
        description: "Stay updated on assignments and feedback.",
        keyPoints: ["New Programs", "Goal Reminders", "Manager Feedback"]
      },
      {
        stepNumber: 9,
        title: "My Profile",
        description: "Manage your personal information and preferences.",
        keyPoints: ["Update Avatar", "Change Password", "View Certificates"]
      },
      {
        stepNumber: 10,
        title: "Summary",
        description: "You've completed the End-User Demo! Start learning today.",
        keyPoints: ["Enroll in a program", "Set a new goal"]
      }
    ];
  }
}

export default new DemoService();
