// lib/questions/student-questions.ts
export const studentQuestions = [
  {
    id: 'academic_year',
    section: 'Academic Background',
    question: 'What year are you currently in?',
    type: 'radio',
    required: true,
    options: [
      'First Year',
      'Second Year', 
      'Third Year',
      'Fourth Year',
      'Final Year',
      'Postgraduate',
      'PhD/Research'
    ]
  },
  {
    id: 'field_of_study',
    section: 'Academic Background',
    question: 'What is your field of study?',
    type: 'radio',
    required: true,
    options: [
      'Engineering & Technology',
      'Medicine & Healthcare',
      'Business & Management',
      'Science & Research',
      'Arts & Literature',
      'Law',
      'Social Sciences',
      'Other'
    ]
  },
  {
    id: 'current_cgpa',
    section: 'Academic Performance',
    question: 'How would you rate your current academic performance?',
    type: 'radio',
    required: true,
    options: [
      'Excellent (Above 8.5/10)',
      'Good (7.5-8.5/10)',
      'Average (6.5-7.5/10)',
      'Below Average (5.5-6.5/10)',
      'Struggling (Below 5.5/10)'
    ]
  },
  {
    id: 'academic_challenges',
    section: 'Academic Challenges',
    question: 'What are your biggest academic challenges? (Select all that apply)',
    type: 'checkbox',
    required: true,
    minSelections: 1,
    maxSelections: 5,
    options: [
      'Time management',
      'Understanding complex concepts',
      'Exam anxiety',
      'Procrastination',
      'Note-taking and organization',
      'Group projects and teamwork',
      'Language barriers',
      'Financial stress affecting studies',
      'Balancing studies with part-time work',
      'Lack of motivation'
    ]
  },
  {
    id: 'study_habits',
    section: 'Learning Style',
    question: 'How do you prefer to study?',
    type: 'radio',
    required: true,
    options: [
      'Alone in quiet spaces',
      'In groups with friends',
      'Mix of both depending on subject',
      'Online with digital resources',
      'Traditional books and notes',
      'Visual learning (videos, diagrams)',
      'Hands-on practice'
    ]
  },
  {
    id: 'daily_study_hours',
    section: 'Study Schedule',
    question: 'How many hours do you typically study per day?',
    type: 'radio',
    required: true,
    options: [
      'Less than 2 hours',
      '2-4 hours',
      '4-6 hours',
      '6-8 hours',
      'More than 8 hours'
    ]
  },
  {
    id: 'career_clarity',
    section: 'Career Planning',
    question: 'How clear are you about your career goals?',
    type: 'scale',
    required: true,
    min: 1,
    max: 10,
    labels: {
      1: 'Completely unclear',
      10: 'Very clear and specific'
    }
  },
  {
    id: 'career_interests',
    section: 'Career Planning',
    question: 'What type of career path interests you most?',
    type: 'radio',
    required: true,
    options: [
      'Corporate job in big company',
      'Startup environment',
      'Government/Public sector',
      'Entrepreneurship/Own business',
      'Research and academia',
      'Creative fields',
      'Social impact/NGO work',
      'Freelancing/Consulting',
      'Still exploring options'
    ]
  },
  {
    id: 'internship_experience',
    section: 'Experience',
    question: 'What is your internship/work experience?',
    type: 'radio',
    required: true,
    options: [
      'No experience yet',
      'Currently doing first internship',
      'Completed 1-2 internships',
      'Multiple internships completed',
      'Part-time work experience',
      'Freelancing experience'
    ]
  },
  {
    id: 'skill_development',
    section: 'Skills & Growth',
    question: 'Which skills do you want to develop most? (Select up to 3)',
    type: 'checkbox',
    required: true,
    minSelections: 1,
    maxSelections: 3,
    options: [
      'Technical/Programming skills',
      'Communication skills',
      'Leadership abilities',
      'Critical thinking',
      'Creativity and innovation',
      'Time management',
      'Networking and relationship building',
      'Financial literacy',
      'Public speaking',
      'Problem-solving'
    ]
  },
  {
    id: 'stress_level',
    section: 'Wellbeing',
    question: 'How would you rate your current stress level?',
    type: 'scale',
    required: true,
    min: 1,
    max: 10,
    labels: {
      1: 'Very relaxed',
      10: 'Extremely stressed'
    }
  },
  {
    id: 'support_system',
    section: 'Support Network',
    question: 'Who do you turn to for academic/career guidance?',
    type: 'checkbox',
    required: true,
    minSelections: 1,
    options: [
      'Parents/Family',
      'College professors',
      'Senior students/Alumni',
      'Friends and peers',
      'Online communities',
      'Career counselors',
      'Industry professionals',
      'No one - I figure things out alone'
    ]
  },
  {
    id: 'financial_situation',
    section: 'Financial Awareness',
    question: 'How would you describe your financial situation?',
    type: 'radio',
    required: true,
    options: [
      'Family fully supports my education',
      'Mix of family support and scholarships',
      'Taking education loans',
      'Working part-time to support studies',
      'Fully self-funded through work/scholarships',
      'Financial stress is a major concern'
    ]
  },
  {
    id: 'technology_comfort',
    section: 'Digital Skills',
    question: 'How comfortable are you with technology and digital tools?',
    type: 'scale',
    required: true,
    min: 1,
    max: 10,
    labels: {
      1: 'Basic user',
      10: 'Advanced power user'
    }
  },
  {
    id: 'social_life_balance',
    section: 'Life Balance',
    question: 'How well do you balance studies with social life?',
    type: 'radio',
    required: true,
    options: [
      'Studies always come first',
      'Good balance between both',
      'Social life often takes priority',
      'Struggle to balance both',
      'Very little social interaction',
      'Too much social life, affecting studies'
    ]
  },
  {
    id: 'biggest_worry',
    section: 'Concerns',
    question: 'What is your biggest worry about the future?',
    type: 'radio',
    required: true,
    options: [
      'Not getting a good job',
      'Not meeting family expectations',
      'Financial burden on family',
      'Not being skilled enough',
      'Making the wrong career choice',
      'Competition with peers',
      'Uncertain economic situation',
      'Work-life balance in future job'
    ]
  },
  {
    id: 'motivation_source',
    section: 'Motivation',
    question: 'What motivates you the most to succeed?',
    type: 'radio',
    required: true,
    options: [
      'Family pride and expectations',
      'Personal achievement and growth',
      'Financial security',
      'Making a positive impact on society',
      'Proving doubters wrong',
      'Competition with peers',
      'Fear of failure',
      'Passion for my field'
    ]
  },
  {
    id: 'ideal_outcome',
    section: 'Goals',
    question: 'What would make you feel most successful in the next 2 years?',
    type: 'text',
    required: true,
    placeholder: 'Describe your ideal situation in 2 years...'
  },
  {
    id: 'immediate_help',
    section: 'Support Needs',
    question: 'What kind of help do you need most right now?',
    type: 'checkbox',
    required: true,
    minSelections: 1,
    maxSelections: 3,
    options: [
      'Better study techniques',
      'Career guidance and planning',
      'Time management skills',
      'Stress and anxiety management',
      'Skill development roadmap',
      'Networking opportunities',
      'Financial planning advice',
      'Motivation and accountability'
    ]
  }
];

export const getStudentQuestionsBySection = () => {
  const sections = [...new Set(studentQuestions.map(q => q.section))];
  return sections.map(section => ({
    name: section,
    questions: studentQuestions.filter(q => q.section === section)
  }));
};