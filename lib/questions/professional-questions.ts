// lib/questions/professional-questions.ts
export const professionalQuestions = [
  {
    id: 'experience_level',
    section: 'Professional Background',
    question: 'How many years of professional experience do you have?',
    type: 'radio',
    required: true,
    options: [
      'Fresh graduate (0-1 years)',
      'Early career (1-3 years)',
      'Mid-level (3-7 years)', 
      'Senior level (7-12 years)',
      'Leadership level (12+ years)'
    ]
  },
  {
    id: 'industry',
    section: 'Professional Background',
    question: 'Which industry do you work in?',
    type: 'radio',
    required: true,
    options: [
      'Technology & Software',
      'Finance & Banking',
      'Healthcare & Pharmaceuticals',
      'Manufacturing & Engineering',
      'Consulting & Professional Services',
      'Media & Entertainment',
      'Education & Training',
      'Retail & E-commerce',
      'Government & Public Sector',
      'Startup/Entrepreneurship',
      'Other'
    ]
  },
  {
    id: 'current_role',
    section: 'Current Position',
    question: 'What best describes your current role level?',
    type: 'radio',
    required: true,
    options: [
      'Individual Contributor',
      'Team Lead/Senior IC',
      'Manager (people management)',
      'Senior Manager/Director',
      'VP/C-level Executive',
      'Founder/Co-founder',
      'Consultant/Freelancer'
    ]
  },
  {
    id: 'career_satisfaction',
    section: 'Career Satisfaction',
    question: 'How satisfied are you with your current career progress?',
    type: 'scale',
    required: true,
    min: 1,
    max: 10,
    labels: {
      1: 'Very dissatisfied',
      10: 'Extremely satisfied'
    }
  },
  {
    id: 'career_challenges',
    section: 'Professional Challenges',
    question: 'What are your biggest professional challenges? (Select all that apply)',
    type: 'checkbox',
    required: true,
    minSelections: 1,
    maxSelections: 5,
    options: [
      'Work-life balance',
      'Career advancement/promotion',
      'Skill development and upskilling',
      'Managing team and people',
      'Dealing with workplace politics',
      'Imposter syndrome',
      'Burnout and stress management',
      'Finding new opportunities',
      'Salary/compensation concerns',
      'Leadership development',
      'Industry changes and adaptation'
    ]
  },
  {
    id: 'career_goals',
    section: 'Career Aspirations',
    question: 'What is your primary career goal for the next 3-5 years?',
    type: 'radio',
    required: true,
    options: [
      'Get promoted to next level',
      'Switch to a better company',
      'Transition to management/leadership',
      'Start my own business',
      'Change career/industry completely',
      'Become a subject matter expert',
      'Achieve better work-life balance',
      'Increase income significantly',
      'Move to international opportunities'
    ]
  },
  {
    id: 'skill_gaps',
    section: 'Skill Development',
    question: 'Which skills do you feel you need to develop most? (Select up to 3)',
    type: 'checkbox',
    required: true,
    minSelections: 1,
    maxSelections: 3,
    options: [
      'Leadership and management',
      'Strategic thinking',
      'Technical/Digital skills',
      'Communication and presentation',
      'Data analysis and decision making',
      'Negotiation skills',
      'Project management',
      'Emotional intelligence',
      'Innovation and creativity',
      'Financial acumen',
      'Cross-cultural competency'
    ]
  },
  {
    id: 'work_style',
    section: 'Work Preferences',
    question: 'What work environment do you thrive in most?',
    type: 'radio',
    required: true,
    options: [
      'Structured corporate environment',
      'Fast-paced startup culture',
      'Remote/flexible work setup',
      'Collaborative team environment',
      'Independent/autonomous work',
      'Client-facing roles',
      'Research and development focus',
      'Creative and innovative spaces'
    ]
  },
  {
    id: 'networking_comfort',
    section: 'Professional Relationships',
    question: 'How comfortable are you with networking and building professional relationships?',
    type: 'scale',
    required: true,
    min: 1,
    max: 10,
    labels: {
      1: 'Very uncomfortable',
      10: 'Natural networker'
    }
  },
  {
    id: 'learning_approach',
    section: 'Professional Development',
    question: 'How do you prefer to learn new skills?',
    type: 'checkbox',
    required: true,
    minSelections: 1,
    maxSelections: 3,
    options: [
      'Online courses and certifications',
      'On-the-job training and projects',
      'Conferences and workshops',
      'Mentorship and coaching',
      'Reading books and articles',
      'Peer learning and collaboration',
      'Trial and error approach',
      'Formal education/degree programs'
    ]
  },
  {
    id: 'stress_management',
    section: 'Work-Life Balance',
    question: 'How well do you manage work-related stress?',
    type: 'radio',
    required: true,
    options: [
      'Very well - I have effective strategies',
      'Fairly well - mostly manageable',
      'Sometimes struggle but cope',
      'Often overwhelmed by stress',
      'Constantly stressed and burned out'
    ]
  },
  {
    id: 'feedback_reception',
    section: 'Growth Mindset',
    question: 'How do you typically respond to constructive feedback?',
    type: 'radio',
    required: true,
    options: [
      'Embrace it and act on it immediately',
      'Listen carefully and implement gradually',
      'Accept it but sometimes feel defensive',
      'Find it difficult to receive criticism',
      'Rarely receive or seek feedback'
    ]
  },
  {
    id: 'innovation_comfort',
    section: 'Adaptability',
    question: 'How comfortable are you with change and new technologies?',
    type: 'scale',
    required: true,
    min: 1,
    max: 10,
    labels: {
      1: 'Prefer stability and routine',
      10: 'Thrive on change and innovation'
    }
  },
  {
    id: 'leadership_interest',
    section: 'Leadership',
    question: 'How interested are you in leadership/management roles?',
    type: 'radio',
    required: true,
    options: [
      'Very interested - actively pursuing',
      'Somewhat interested - open to opportunities',
      'Neutral - depends on the situation',
      'Prefer individual contributor roles',
      'Not interested in managing people',
      'Interested but lack confidence'
    ]
  },
  {
    id: 'financial_goals',
    section: 'Financial Planning',
    question: 'What are your primary financial objectives?',
    type: 'checkbox',
    required: true,
    minSelections: 1,
    maxSelections: 3,
    options: [
      'Increase current income by 50%+',
      'Build emergency fund (6+ months expenses)',
      'Save for major purchase (house, car)',
      'Invest for long-term wealth building',
      'Plan for early retirement/FIRE',
      'Support family/parents financially',
      'Start a side business',
      'Pay off debts (loans, credit cards)'
    ]
  },
  {
    id: 'work_life_balance',
    section: 'Personal Priorities',
    question: 'How important is work-life balance to you currently?',
    type: 'radio',
    required: true,
    options: [
      'Extremely important - non-negotiable',
      'Very important - major factor in decisions',
      'Important but willing to compromise for growth',
      'Somewhat important - career comes first',
      'Not a priority right now - focused on advancement'
    ]
  },
  {
    id: 'biggest_obstacle',
    section: 'Challenges',
    question: 'What is the biggest obstacle preventing you from reaching your career goals?',
    type: 'radio',
    required: true,
    options: [
      'Lack of relevant skills/experience',
      'Limited networking and connections',
      'Company/industry constraints',
      'Personal/family commitments',
      'Economic/market conditions',
      'Lack of clear direction/strategy',
      'Self-doubt and confidence issues',
      'Financial constraints for development'
    ]
  },
  {
    id: 'success_definition',
    section: 'Personal Values',
    question: 'How do you define professional success?',
    type: 'radio',
    required: true,
    options: [
      'High salary and financial security',
      'Leadership position and influence',
      'Recognition and industry reputation',
      'Work-life balance and personal fulfillment',
      'Making meaningful impact/contribution',
      'Continuous learning and growth',
      'Building something of my own',
      'Helping and mentoring others'
    ]
  },
  {
    id: 'immediate_priorities',
    section: 'Current Focus',
    question: 'What are your top 2-3 priorities for the next 6 months?',
    type: 'text',
    required: true,
    placeholder: 'List your most important professional priorities...'
  },
  {
    id: 'support_needs',
    section: 'Development Needs',
    question: 'What type of support would help you most right now?',
    type: 'checkbox',
    required: true,
    minSelections: 1,
    maxSelections: 3,
    options: [
      'Career strategy and planning',
      'Skill development roadmap',
      'Leadership coaching',
      'Industry networking opportunities',
      'Performance optimization techniques',
      'Work-life balance strategies',
      'Financial planning guidance',
      'Confidence and mindset coaching'
    ]
  }
];

export const getProfessionalQuestionsBySection = () => {
  const sections = [...new Set(professionalQuestions.map(q => q.section))];
  return sections.map(section => ({
    name: section,
    questions: professionalQuestions.filter(q => q.section === section)
  }));
};