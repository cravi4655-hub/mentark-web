"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Briefcase, Brain, Target, CheckCircle } from 'lucide-react';

// ... rest of your code
// Student Questions
const studentQuestions = [
  {
    id: 'academic_year',
    section: 'Academic Background',
    question: 'What year are you currently in?',
    type: 'radio',
    required: true,
    options: ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Final Year', 'Postgraduate', 'PhD/Research']
  },
  {
    id: 'field_of_study',
    section: 'Academic Background',
    question: 'What is your field of study?',
    type: 'radio',
    required: true,
    options: ['Engineering & Technology', 'Medicine & Healthcare', 'Business & Management', 'Science & Research', 'Arts & Literature', 'Law', 'Social Sciences', 'Other']
  },
  {
    id: 'current_performance',
    section: 'Academic Performance',
    question: 'How would you rate your current academic performance?',
    type: 'radio',
    required: true,
    options: ['Excellent (Above 8.5/10)', 'Good (7.5-8.5/10)', 'Average (6.5-7.5/10)', 'Below Average (5.5-6.5/10)', 'Struggling (Below 5.5/10)']
  },
  {
    id: 'academic_challenges',
    section: 'Academic Challenges',
    question: 'What are your biggest academic challenges? (Select up to 5)',
    type: 'checkbox',
    required: true,
    minSelections: 1,
    maxSelections: 5,
    options: ['Time management', 'Understanding complex concepts', 'Exam anxiety', 'Procrastination', 'Note-taking and organization', 'Group projects and teamwork', 'Language barriers', 'Financial stress affecting studies', 'Balancing studies with part-time work', 'Lack of motivation']
  },
  {
    id: 'study_habits',
    section: 'Learning Style',
    question: 'How do you prefer to study?',
    type: 'radio',
    required: true,
    options: ['Alone in quiet spaces', 'In groups with friends', 'Mix of both depending on subject', 'Online with digital resources', 'Traditional books and notes', 'Visual learning (videos, diagrams)', 'Hands-on practice']
  },
  {
    id: 'daily_study_hours',
    section: 'Study Schedule',
    question: 'How many hours do you typically study per day?',
    type: 'radio',
    required: true,
    options: ['Less than 2 hours', '2-4 hours', '4-6 hours', '6-8 hours', 'More than 8 hours']
  },
  {
    id: 'career_clarity',
    section: 'Career Planning',
    question: 'How clear are you about your career goals?',
    type: 'scale',
    required: true,
    min: 1,
    max: 10,
    labels: { 1: 'Completely unclear', 10: 'Very clear and specific' }
  },
  {
    id: 'career_interests',
    section: 'Career Planning',
    question: 'What type of career path interests you most?',
    type: 'radio',
    required: true,
    options: ['Corporate job in big company', 'Startup environment', 'Government/Public sector', 'Entrepreneurship/Own business', 'Research and academia', 'Creative fields', 'Social impact/NGO work', 'Freelancing/Consulting', 'Still exploring options']
  },
  {
    id: 'skill_development',
    section: 'Skills & Growth',
    question: 'Which skills do you want to develop most? (Select up to 3)',
    type: 'checkbox',
    required: true,
    minSelections: 1,
    maxSelections: 3,
    options: ['Technical/Programming skills', 'Communication skills', 'Leadership abilities', 'Critical thinking', 'Creativity and innovation', 'Time management', 'Networking and relationship building', 'Financial literacy', 'Public speaking', 'Problem-solving']
  },
  {
    id: 'stress_level',
    section: 'Wellbeing',
    question: 'How would you rate your current stress level?',
    type: 'scale',
    required: true,
    min: 1,
    max: 10,
    labels: { 1: 'Very relaxed', 10: 'Extremely stressed' }
  },
  {
    id: 'biggest_worry',
    section: 'Concerns',
    question: 'What is your biggest worry about the future?',
    type: 'radio',
    required: true,
    options: ['Not getting a good job', 'Not meeting family expectations', 'Financial burden on family', 'Not being skilled enough', 'Making the wrong career choice', 'Competition with peers', 'Uncertain economic situation', 'Work-life balance in future job']
  },
  {
    id: 'ideal_outcome',
    section: 'Goals',
    question: 'What would make you feel most successful in the next 2 years?',
    type: 'text',
    required: true,
    placeholder: 'Describe your ideal situation in 2 years...'
  }
];

// Professional Questions
const professionalQuestions = [
  {
    id: 'experience_level',
    section: 'Professional Background',
    question: 'How many years of professional experience do you have?',
    type: 'radio',
    required: true,
    options: ['Fresh graduate (0-1 years)', 'Early career (1-3 years)', 'Mid-level (3-7 years)', 'Senior level (7-12 years)', 'Leadership level (12+ years)']
  },
  {
    id: 'industry',
    section: 'Professional Background',
    question: 'Which industry do you work in?',
    type: 'radio',
    required: true,
    options: ['Technology & Software', 'Finance & Banking', 'Healthcare & Pharmaceuticals', 'Manufacturing & Engineering', 'Consulting & Professional Services', 'Media & Entertainment', 'Education & Training', 'Retail & E-commerce', 'Government & Public Sector', 'Startup/Entrepreneurship', 'Other']
  },
  {
    id: 'current_role',
    section: 'Current Position',
    question: 'What best describes your current role level?',
    type: 'radio',
    required: true,
    options: ['Individual Contributor', 'Team Lead/Senior IC', 'Manager (people management)', 'Senior Manager/Director', 'VP/C-level Executive', 'Founder/Co-founder', 'Consultant/Freelancer']
  },
  {
    id: 'career_satisfaction',
    section: 'Career Satisfaction',
    question: 'How satisfied are you with your current career progress?',
    type: 'scale',
    required: true,
    min: 1,
    max: 10,
    labels: { 1: 'Very dissatisfied', 10: 'Extremely satisfied' }
  },
  {
    id: 'career_challenges',
    section: 'Professional Challenges',
    question: 'What are your biggest professional challenges? (Select up to 5)',
    type: 'checkbox',
    required: true,
    minSelections: 1,
    maxSelections: 5,
    options: ['Work-life balance', 'Career advancement/promotion', 'Skill development and upskilling', 'Managing team and people', 'Dealing with workplace politics', 'Imposter syndrome', 'Burnout and stress management', 'Finding new opportunities', 'Salary/compensation concerns', 'Leadership development', 'Industry changes and adaptation']
  },
  {
    id: 'career_goals',
    section: 'Career Aspirations',
    question: 'What is your primary career goal for the next 3-5 years?',
    type: 'radio',
    required: true,
    options: ['Get promoted to next level', 'Switch to a better company', 'Transition to management/leadership', 'Start my own business', 'Change career/industry completely', 'Become a subject matter expert', 'Achieve better work-life balance', 'Increase income significantly', 'Move to international opportunities']
  },
  {
    id: 'skill_gaps',
    section: 'Skill Development',
    question: 'Which skills do you feel you need to develop most? (Select up to 3)',
    type: 'checkbox',
    required: true,
    minSelections: 1,
    maxSelections: 3,
    options: ['Leadership and management', 'Strategic thinking', 'Technical/Digital skills', 'Communication and presentation', 'Data analysis and decision making', 'Negotiation skills', 'Project management', 'Emotional intelligence', 'Innovation and creativity', 'Financial acumen', 'Cross-cultural competency']
  },
  {
    id: 'work_style',
    section: 'Work Preferences',
    question: 'What work environment do you thrive in most?',
    type: 'radio',
    required: true,
    options: ['Structured corporate environment', 'Fast-paced startup culture', 'Remote/flexible work setup', 'Collaborative team environment', 'Independent/autonomous work', 'Client-facing roles', 'Research and development focus', 'Creative and innovative spaces']
  },
  {
    id: 'learning_approach',
    section: 'Professional Development',
    question: 'How do you prefer to learn new skills?',
    type: 'checkbox',
    required: true,
    minSelections: 1,
    maxSelections: 3,
    options: ['Online courses and certifications', 'On-the-job training and projects', 'Conferences and workshops', 'Mentorship and coaching', 'Reading books and articles', 'Peer learning and collaboration', 'Trial and error approach', 'Formal education/degree programs']
  },
  {
    id: 'leadership_interest',
    section: 'Leadership',
    question: 'How interested are you in leadership/management roles?',
    type: 'radio',
    required: true,
    options: ['Very interested - actively pursuing', 'Somewhat interested - open to opportunities', 'Neutral - depends on the situation', 'Prefer individual contributor roles', 'Not interested in managing people', 'Interested but lack confidence']
  },
  {
    id: 'work_life_balance',
    section: 'Personal Priorities',
    question: 'How important is work-life balance to you currently?',
    type: 'radio',
    required: true,
    options: ['Extremely important - non-negotiable', 'Very important - major factor in decisions', 'Important but willing to compromise for growth', 'Somewhat important - career comes first', 'Not a priority right now - focused on advancement']
  },
  {
    id: 'immediate_priorities',
    section: 'Current Focus',
    question: 'What are your top 2-3 priorities for the next 6 months?',
    type: 'text',
    required: true,
    placeholder: 'List your most important professional priorities...'
  }
];

const getQuestionsBySection = (questions) => {
  const sections = [...new Set(questions.map(q => q.section))];
  return sections.map(section => ({
    name: section,
    questions: questions.filter(q => q.section === section)
  }));
};

export default function EnhancedTrainingPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [userType, setUserType] = useState('STUDENT');
  const [selectedUniversity, setSelectedUniversity] = useState('');

  // Get user type from localStorage (set by landing page)
  useEffect(() => {
    const storedUserType = localStorage.getItem('selectedUserType');
    const storedUniversity = localStorage.getItem('selectedUniversity');
    if (storedUserType) {
      setUserType(storedUserType.toUpperCase());
    }
    if (storedUniversity) {
      setSelectedUniversity(storedUniversity);
    }
  }, []);

  // Get appropriate questions based on user type
  const questionSections = userType === 'STUDENT' 
    ? getQuestionsBySection(studentQuestions)
    : getQuestionsBySection(professionalQuestions);

  const currentSectionData = questionSections[currentSection];
  const currentQuestion = currentSectionData?.questions[currentQuestionIndex];
  const totalQuestions = questionSections.reduce((sum, section) => sum + section.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const isCurrentQuestionAnswered = () => {
    return answers[currentQuestion?.id] !== undefined;
  };

  const canProceed = () => {
    if (!currentQuestion) return false;
    const answer = answers[currentQuestion.id];
    
    if (currentQuestion.required && !answer) return false;
    
    if (currentQuestion.type === 'checkbox' && currentQuestion.minSelections) {
      return Array.isArray(answer) && answer.length >= currentQuestion.minSelections;
    }
    
    return true;
  };

  const handleNext = () => {
    if (!canProceed()) return;

    const nextQuestionInSection = currentQuestionIndex + 1;
    const hasMoreQuestionsInSection = nextQuestionInSection < currentSectionData.questions.length;

    if (hasMoreQuestionsInSection) {
      setCurrentQuestionIndex(nextQuestionInSection);
    } else {
      // Move to next section
      const nextSection = currentSection + 1;
      if (nextSection < questionSections.length) {
        setCurrentSection(nextSection);
        setCurrentQuestionIndex(0);
      } else {
        // Training complete
        handleComplete();
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentQuestionIndex(questionSections[currentSection - 1].questions.length - 1);
    }
  };

  const handleComplete = async () => {
    try {
      // Save answers to database
      const response = await fetch('/api/training/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userType,
          answers,
          university: selectedUniversity
        })
      });

      if (response.ok) {
        const { preferenceId } = await response.json();
        // Redirect to analysis
        window.location.href = `/train/analyze?pref=${preferenceId}`;
      } else {
        alert('Error saving your responses. Please try again.');
      }
    } catch (error) {
      console.error('Error saving training data:', error);
      alert('Error saving your responses. Please try again.');
    }
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    const answer = answers[currentQuestion.id];

    switch (currentQuestion.type) {
      case 'radio':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-3 p-4 border border-white/20 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option}
                  checked={answer === option}
                  onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <span className="text-white">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-300 mb-4">
              {currentQuestion.minSelections && `Select at least ${currentQuestion.minSelections} option${currentQuestion.minSelections > 1 ? 's' : ''}`}
              {currentQuestion.maxSelections && ` (max ${currentQuestion.maxSelections})`}
            </p>
            {currentQuestion.options?.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-3 p-4 border border-white/20 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={Array.isArray(answer) && answer.includes(option)}
                  onChange={(e) => {
                    const currentAnswers = Array.isArray(answer) ? answer : [];
                    if (e.target.checked) {
                      const newAnswers = [...currentAnswers, option];
                      if (!currentQuestion.maxSelections || newAnswers.length <= currentQuestion.maxSelections) {
                        handleAnswer(currentQuestion.id, newAnswers);
                      }
                    } else {
                      handleAnswer(currentQuestion.id, currentAnswers.filter(a => a !== option));
                    }
                  }}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <span className="text-white">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'scale':
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-300">
              <span>{currentQuestion.labels?.[currentQuestion.min || 1]}</span>
              <span>{currentQuestion.labels?.[currentQuestion.max || 10]}</span>
            </div>
            <div className="grid grid-cols-10 gap-2">
              {Array.from({ length: (currentQuestion.max || 10) - (currentQuestion.min || 1) + 1 }, (_, i) => {
                const value = (currentQuestion.min || 1) + i;
                return (
                  <button
                    key={value}
                    onClick={() => handleAnswer(currentQuestion.id, value)}
                    className={`py-3 px-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                      answer === value
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-white/20 hover:border-blue-300 text-white'
                    }`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 'text':
        return (
          <textarea
            value={answer || ''}
            onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
            placeholder={currentQuestion.placeholder}
            rows={4}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            {userType === 'STUDENT' ? (
              <BookOpen className="h-8 w-8 text-blue-400" />
            ) : (
              <Briefcase className="h-8 w-8 text-purple-400" />
            )}
            <h1 className="text-3xl font-bold text-white">
              Train Your AI {userType === 'STUDENT' ? 'Study' : 'Career'} Coach
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Help us understand your unique situation so we can provide personalized guidance
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">
              Question {answeredQuestions + 1} of {totalQuestions}
            </span>
            <span className="text-gray-300">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            {/* Section Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-blue-400" />
                <span className="text-blue-400 font-medium text-sm uppercase tracking-wide">
                  {currentSectionData?.name}
                </span>
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 leading-relaxed">
                {currentQuestion?.question}
              </h2>
              
              {renderQuestion()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentSection === 0 && currentQuestionIndex === 0}
                className="flex items-center gap-2 px-6 py-3 text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <div className="flex items-center gap-2">
                {isCurrentQuestionAnswered() && (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                )}
                <span className="text-gray-300 text-sm">
                  {isCurrentQuestionAnswered() ? 'Answered' : 'Required'}
                </span>
              </div>

              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {currentSection === questionSections.length - 1 && 
                 currentQuestionIndex === currentSectionData?.questions.length - 1 ? (
                  <>
                    Complete Training
                    <Target className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            Your responses are private and will only be used to personalize your AI coach
          </p>
        </div>
      </div>

      <style jsx>{`
        .stars {
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: 1800px 1200px #fff, 300px 300px #fff, 1200px 600px #fff, 600px 1800px #fff;
          animation: animStar 50s linear infinite;
        }
        
        .twinkling {
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: 1000px 800px #fff, 200px 200px #fff, 800px 400px #fff, 400px 1200px #fff;
          animation: animStar 100s linear infinite;
        }
        
        @keyframes animStar {
          from { transform: translateY(0px); }
          to { transform: translateY(-2000px); }
        }
      `}</style>
    </div>
  );
}