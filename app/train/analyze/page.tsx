"use client"
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Brain, Target, TrendingUp, AlertTriangle, Lightbulb, Calendar, User, Loader2 } from 'lucide-react';

interface AnalysisResults {
  challenges: string[];
  strengths: string[];
  weaknesses: string[];
  shortGoals: string[];
  longGoals: string[];
  urgentNeeds: string[];
  persona: string;
  cadence: string;
  focusAreas: string[];
  plan: {
    weekly: string[];
    daily: string[];
  };
  tags: string[];
  similarIssues?: string[];
  solutions?: string[];
}

export default function EnhancedAnalysisPage() {
  const searchParams = useSearchParams();
  const preferenceId = searchParams?.get('pref');
  
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const analysisSteps = [
    "Loading your responses...",
    "Analyzing personality patterns...",
    "Identifying strengths and challenges...",
    "Creating personalized goals...",
    "Generating action plan...",
    "Finalizing recommendations..."
  ];

  useEffect(() => {
    if (preferenceId) {
      performAnalysis(preferenceId);
    }
  }, [preferenceId]);

  const performAnalysis = async (prefId: string) => {
    try {
      setIsAnalyzing(true);
      setCurrentStep(0);

      // Simulate step progression
      const stepInterval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < analysisSteps.length - 1) {
            return prev + 1;
          }
          clearInterval(stepInterval);
          return prev;
        });
      }, 1500);

      // Actual API call
      const response = await fetch('/api/training/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferenceId: prefId })
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setAnalysisResults(data.analysis);
        setTimeout(() => {
          setIsAnalyzing(false);
        }, 2000); // Show final step for 2 seconds
      } else {
        throw new Error(data.error || 'Analysis failed');
      }

    } catch (error) {
      console.error('Analysis error:', error);
      setError(error instanceof Error ? error.message : 'Analysis failed');
      setIsAnalyzing(false);
    }
  };

  const handleContinueToChat = () => {
    // Store analysis results for chat context
    if (analysisResults) {
      localStorage.setItem('analysisResults', JSON.stringify(analysisResults));
      window.location.href = `/chat?analysis=complete`;
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-md mx-auto text-center">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Analysis Error</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.href = '/train'}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="stars"></div>
          <div className="twinkling"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center max-w-2xl mx-auto px-4">
            <div className="mb-8">
              <Brain className="h-20 w-20 text-blue-400 mx-auto mb-6 animate-pulse" />
              <h1 className="text-4xl font-bold text-white mb-4">
                Analyzing Your Profile
              </h1>
              <p className="text-gray-300 text-lg">
                Our AI is creating your personalized growth strategy...
              </p>
            </div>

            {/* Progress Steps */}
            <div className="space-y-4 mb-8">
              {analysisSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-500 ${
                    index <= currentStep
                      ? 'bg-white/10 border border-blue-400/30'
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  {index < currentStep ? (
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  ) : index === currentStep ? (
                    <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gray-600" />
                  )}
                  <span className={`${
                    index <= currentStep ? 'text-white' : 'text-gray-400'
                  }`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-gray-400 text-sm">
              This usually takes 30-60 seconds...
            </div>
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

  if (!analysisResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading analysis results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
            <Brain className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Your Personalized Analysis
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Based on your responses, we've created a comprehensive profile and action plan tailored specifically for you.
          </p>
        </div>

        {/* Analysis Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Strengths & Challenges */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-6 w-6 text-green-400" />
              <h2 className="text-xl font-bold text-white">Strengths & Challenges</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-green-400 font-semibold mb-3">Your Key Strengths</h3>
                <div className="space-y-2">
                  {analysisResults.strengths.map((strength, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">+</span>
                      <span className="text-gray-300">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-yellow-400 font-semibold mb-3">Growth Areas</h3>
                <div className="space-y-2">
                  {analysisResults.challenges.map((challenge, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">→</span>
                      <span className="text-gray-300">{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Goals & Priorities */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Goals & Priorities</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-orange-400 font-semibold mb-3">Urgent Needs (This Month)</h3>
                <div className="space-y-2">
                  {analysisResults.urgentNeeds.map((need, index) => (
                    <div key={index} className="bg-orange-500/20 border border-orange-400/30 rounded-lg p-3">
                      <span className="text-white text-sm">{need}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-blue-400 font-semibold mb-3">Short-term Goals (3 months)</h3>
                <div className="space-y-2">
                  {analysisResults.shortGoals.map((goal, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span className="text-gray-300 text-sm">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Persona & Style */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="h-6 w-6 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Your Profile</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-purple-400 font-semibold mb-2">Coaching Style</h3>
                <div className="bg-purple-500/20 border border-purple-400/30 rounded-lg p-3">
                  <span className="text-white capitalize">{analysisResults.persona}</span>
                </div>
              </div>

              <div>
                <h3 className="text-purple-400 font-semibold mb-2">Check-in Frequency</h3>
                <div className="bg-purple-500/20 border border-purple-400/30 rounded-lg p-3">
                  <span className="text-white capitalize">{analysisResults.cadence}</span>
                </div>
              </div>

              <div>
                <h3 className="text-purple-400 font-semibold mb-2">Focus Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {analysisResults.focusAreas.map((area, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-500/30 border border-purple-400/50 rounded-full text-white text-xs"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Plan */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="h-6 w-6 text-green-400" />
              <h2 className="text-xl font-bold text-white">Your Action Plan</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-green-400 font-semibold mb-3">Weekly Actions</h3>
                <div className="space-y-2">
                  {analysisResults.plan.weekly.map((action, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">□</span>
                      <span className="text-gray-300 text-sm">{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-green-400 font-semibold mb-3">Daily Habits</h3>
                <div className="space-y-2">
                  {analysisResults.plan.daily.map((habit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">○</span>
                      <span className="text-gray-300 text-sm">{habit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center mt-12">
          <button
            onClick={handleContinueToChat}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-lg font-semibold"
          >
            Start Coaching with Your AI Mentor
          </button>
          <p className="text-gray-400 text-sm mt-3">
            Your personalized AI coach is ready to help you achieve these goals
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