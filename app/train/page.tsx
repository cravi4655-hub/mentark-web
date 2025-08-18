'use client';

import { useMemo, useState, useTransition } from 'react';
import { savePreferences } from '@/app/actions/preferences';

type QBase = {
  id: string;
  section: string;
  text: string;
  help?: string;
  required?: boolean;
};

type QText    = QBase & { kind: 'text';  placeholder?: string };
type QNumber  = QBase & { kind: 'number'; placeholder?: string; min?: number; max?: number };
type QRadio   = QBase & { kind: 'radio';  options: string[] };
type QCheck   = QBase & { kind: 'checkbox'; options: string[]; min?: number; max?: number };
type QScale   = QBase & { kind: 'scale';  min: number; max: number; left?: string; right?: string };

type Question = QText | QNumber | QRadio | QCheck | QScale;

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter(v => v !== value) : [...list, value];
}

const questions: Question[] = [
  // SECTION 1: Identity & Background
  { id: 'name', section: 'Identity & Background', text: 'What is your name?', kind: 'text', placeholder: 'Type your full name', required: true },
  { id: 'age', section: 'Identity & Background', text: 'What is your age?', kind: 'number', placeholder: 'e.g., 15', min: 8, max: 22, required: true },
  { id: 'grade', section: 'Identity & Background', text: 'What grade are you in?', kind: 'radio', options: ['9th','10th','11th','12th'], required: true },
  { id: 'gender', section: 'Identity & Background', text: 'What is your gender?', kind: 'radio', options: ['Male','Female','Non-binary','Prefer not to say'] },
  { id: 'school_type', section: 'Identity & Background', text: 'What type of school do you go to?', kind: 'radio', options: ['Public','Private','Boarding','Online/Remote'] },
  { id: 'location', section: 'Identity & Background', text: 'Where do you live?', kind: 'radio', options: ['Urban','Semi-urban','Rural'] },
  { id: 'siblings', section: 'Identity & Background', text: 'How many siblings do you have?', kind: 'radio', options: ['0','1','2','3 or more'] },

  // SECTION 2: Self-Perception & Personality
  { id: 'self_desc', section: 'Self-Perception & Personality', text: 'How would you describe yourself?', kind: 'radio', options: ['Quiet and introspective','Outgoing and social','Balanced'] },
  { id: 'express_emotions', section: 'Self-Perception & Personality', text: 'Do you find it easy to express your emotions?', kind: 'radio', options: ['Yes','No','Sometimes'] },
  { id: 'biggest_strength', section: 'Self-Perception & Personality', text: 'What is your biggest strength?', kind: 'radio', options: ['Creativity','Discipline','Leadership','Empathy','Curiosity'] },
  { id: 'biggest_weakness', section: 'Self-Perception & Personality', text: 'What is your biggest weakness?', kind: 'radio', options: ['Procrastination','Overthinking','Fear of failure','Low self-confidence','Difficulty focusing'] },
  { id: 'handle_failure', section: 'Self-Perception & Personality', text: 'How do you handle failure?', kind: 'radio', options: ['I get discouraged easily','I learn and try again','I ignore it and move on'] },
  { id: 'ambitious', section: 'Self-Perception & Personality', text: 'Do you consider yourself ambitious?', kind: 'radio', options: ['Yes','No','Not sure'] },
  { id: 'thinker_type', section: 'Self-Perception & Personality', text: 'Which of the following describes you best?', kind: 'radio', options: ['Logical thinker','Emotional thinker','Action-oriented','Dreamer'] },

  // SECTION 3: Academic Interests & Learning Style
  { id: 'subjects_enjoy', section: 'Academic Interests & Learning Style', text: 'What subjects do you enjoy most? (Select 2–3)', kind: 'checkbox', options: ['Math','Science','Social Science','English','Language','Computer Science','Art/Music','Physical Education'], min: 2, max: 3 },
  { id: 'subjects_struggle', section: 'Academic Interests & Learning Style', text: 'What subjects do you struggle with?', kind: 'checkbox', options: ['Math','Science','Social Science','English','Language','Computer Science','Art/Music','Physical Education'] },
  { id: 'learner_type', section: 'Academic Interests & Learning Style', text: 'What type of learner are you?', kind: 'radio', options: ['Visual','Auditory','Kinesthetic (hands-on)','Reading/Writing'] },
  { id: 'exam_prep', section: 'Academic Interests & Learning Style', text: 'How do you prepare for exams?', kind: 'radio', options: ['Last-minute cramming','Scheduled and spaced revisions','Group studies','I don’t prepare much'] },
  { id: 'enjoy_learning', section: 'Academic Interests & Learning Style', text: 'Do you enjoy learning new things?', kind: 'radio', options: ['Yes','No','Only when it interests me'] },
  { id: 'use_online_resources', section: 'Academic Interests & Learning Style', text: 'Do you use online resources to study?', kind: 'radio', options: ['Yes, regularly','Occasionally','Rarely','Never'] },

  // SECTION 4: Emotions & Mental Health
  { id: 'stress_frequency', section: 'Emotions & Mental Health', text: 'How often do you feel stressed?', kind: 'radio', options: ['Frequently','Sometimes','Rarely','Never'] },
  { id: 'stress_causes', section: 'Emotions & Mental Health', text: 'What usually causes you stress?', kind: 'checkbox', options: ['Exams','Parental pressure','Peer pressure','Fear of future','Relationships'] },
  { id: 'talk_when_upset', section: 'Emotions & Mental Health', text: "Who do you talk to when you're upset?", kind: 'radio', options: ['Parents','Friends','Teacher or Mentor','No one'] },
  { id: 'feel_understood', section: 'Emotions & Mental Health', text: 'Do you feel understood by the people around you?', kind: 'radio', options: ['Yes','No','Sometimes'] },
  { id: 'happiness_scale', section: 'Emotions & Mental Health', text: 'On a scale of 1 to 5, how happy are you daily?', kind: 'scale', min: 1, max: 5, left: 'Very unhappy', right: 'Very happy' },
  { id: 'lonely_isolated', section: 'Emotions & Mental Health', text: 'Have you ever felt lonely or isolated?', kind: 'radio', options: ['Yes, often','Sometimes','Rarely','Never'] },
  { id: 'make_friends_easy', section: 'Emotions & Mental Health', text: 'Do you find it easy to make friends?', kind: 'radio', options: ['Yes','No','Sometimes'] },
  { id: 'feel_safe', section: 'Emotions & Mental Health', text: 'Do you feel safe in your home and school environment?', kind: 'radio', options: ['Yes','No','Sometimes'] },
  { id: 'compare_with_others', section: 'Emotions & Mental Health', text: 'Do you compare yourself a lot with others?', kind: 'radio', options: ['Yes','No','Occasionally'] },

  // SECTION 5: Family & Relationships
  { id: 'relationship_parents', section: 'Family & Relationships', text: 'How is your relationship with your parents?', kind: 'radio', options: ['Very good','Average','Poor'] },
  { id: 'parents_support', section: 'Family & Relationships', text: 'Are your parents supportive of your dreams?', kind: 'radio', options: ['Yes','No','Not sure'] },
  { id: 'admire_most', section: 'Family & Relationships', text: 'Who do you admire most in your life?', kind: 'radio', options: ['Parent','Sibling','Friend','Celebrity','Teacher'] },
  { id: 'make_own_decisions', section: 'Family & Relationships', text: 'Do your parents allow you to make your own decisions?', kind: 'radio', options: ['Yes, often','Sometimes','Rarely'] },
  { id: 'best_friend', section: 'Family & Relationships', text: 'Do you have a best friend?', kind: 'radio', options: ['Yes','No'] },
  { id: 'experienced_bullying', section: 'Family & Relationships', text: 'Have you experienced bullying?', kind: 'radio', options: ['Yes','No'] },
  { id: 'in_relationship', section: 'Family & Relationships', text: 'Are you currently in a relationship?', kind: 'radio', options: ['Yes','No','Prefer not to say'] },

  // SECTION 6: Hobbies & Passions
  { id: 'hobbies', section: 'Hobbies & Passions', text: 'What are your hobbies? (Select 2–3)', kind: 'checkbox', options: ['Reading','Sports','Art/Music','Gaming','Dancing','Watching content','Writing','Other'], min: 2, max: 3 },
  { id: 'pursue_passion', section: 'Hobbies & Passions', text: 'Do you have any passion you want to pursue seriously?', kind: 'radio', options: ['Yes','No','Still figuring it out'] },
  { id: 'hobby_frequency', section: 'Hobbies & Passions', text: 'How often do you engage in your hobbies?', kind: 'radio', options: ['Daily','Weekly','Rarely'] },
  { id: 'hobbies_help_relax', section: 'Hobbies & Passions', text: 'Do your hobbies help you relax?', kind: 'radio', options: ['Yes','No','Sometimes'] },
  { id: 'competitions', section: 'Hobbies & Passions', text: 'Do you participate in competitions or exhibitions?', kind: 'radio', options: ['Yes','No'] },
  { id: 'created_proud', section: 'Hobbies & Passions', text: "Have you created something you're proud of?", kind: 'radio', options: ['Yes','No'] },

  // SECTION 7: Social Media & Screen Time
  { id: 'screen_time', section: 'Social Media & Screen Time', text: 'How many hours do you spend on screen daily (excluding school)?', kind: 'radio', options: ['1-2 hours','3-4 hours','5-6 hours','More than 6 hours'] },
  { id: 'device_usage', section: 'Social Media & Screen Time', text: 'What do you mostly use your phone/laptop for?', kind: 'checkbox', options: ['Social Media','Watching videos','Gaming','Reading/Research','Messaging friends'] },
  { id: 'phone_addiction', section: 'Social Media & Screen Time', text: 'Do you ever feel addicted to your phone?', kind: 'radio', options: ['Yes','No','Sometimes'] },
  { id: 'platforms', section: 'Social Media & Screen Time', text: 'Which platforms do you use most?', kind: 'checkbox', options: ['Instagram','YouTube','Snapchat','WhatsApp','Discord','Others'] },

  // SECTION 8: Career & Future Goals
  { id: 'know_future', section: 'Career & Future Goals', text: 'Do you know what you want to be when you grow up?', kind: 'radio', options: ['Yes','No','I have a few ideas'] },
  { id: 'interest_field', section: 'Career & Future Goals', text: 'Which field interests you the most?', kind: 'radio', options: ['Science','Commerce','Arts','Sports','Entrepreneurship','Social Work','Other'] },
  { id: 'career_matters', section: 'Career & Future Goals', text: 'What matters most in a career for you?', kind: 'radio', options: ['Money','Passion','Impact on others','Recognition','Stability'] },
  { id: 'open_unconventional', section: 'Career & Future Goals', text: 'Are you open to exploring unconventional careers?', kind: 'radio', options: ['Yes','No','Maybe'] },
];

export default function TrainPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [pending, startTransition] = useTransition();

  const q = questions[step];
  const pct = Math.round(((step + 1) / questions.length) * 100);

  const sectionFirstIndex = useMemo(() => {
    // find the first index for each section to show the section header when it changes
    const map = new Map<string, number>();
    questions.forEach((item, idx) => {
      if (!map.has(item.section)) map.set(item.section, idx);
    });
    return map;
  }, []);

  function setValue(v: any) {
    setAnswers(prev => ({ ...prev, [q.id]: v }));
  }

  function next() {
    // Basic validation for required and checkbox min/max
    if ('required' in q && q.required) {
      const v = answers[q.id];
      if (v === undefined || v === '' || (Array.isArray(v) && v.length === 0)) {
        alert('Please answer before continuing.');
        return;
      }
    }
    if (q.kind === 'checkbox') {
      const arr = (answers[q.id] as string[]) || [];
      if (q.min && arr.length < q.min) return alert(`Please select at least ${q.min}.`);
      if (q.max && arr.length > q.max) return alert(`Please select at most ${q.max}.`);
    }

    if (step < questions.length - 1) setStep(s => s + 1);
    else finish();
  }

  function back() {
    if (step > 0) setStep(s => s - 1);
  }

  function finish() {
    startTransition(async () => {
      // Convert answers to FormData
      const fd = new FormData();
      Object.entries(answers).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(v => fd.append(key, v));
        } else {
          fd.append(key, value);
        }
      });
      // Save and redirect to /train/analyze → /chat
      await savePreferences(fd);
    });
  }

  const showSectionHeader = sectionFirstIndex.get(q.section) === step;

  return (
    <div className="container">
      <div className="card">
        {/* Progress */}
        <div className="progress"><span style={{ width: `${pct}%` }} /></div>
        <div className="muted mb-2">{step + 1} / {questions.length}</div>

        {/* Section header (first question of each section) */}
        {showSectionHeader && (
          <div style={{marginBottom: 6, opacity: .9, fontWeight: 700, letterSpacing: .3}}>
            {q.section}
          </div>
        )}

        {/* Big question */}
        <h1 className="question-title">{q.text}</h1>
        {q.help && <div className="help">{q.help}</div>}

        {/* INPUT RENDERER */}
        <div className="field">
          {q.kind === 'text' && (
            <input
              className="input"
              type="text"
              placeholder={q.placeholder || 'Type your answer'}
              value={answers[q.id] || ''}
              onChange={(e) => setValue(e.target.value)}
            />
          )}

          {q.kind === 'number' && (
            <input
              className="input"
              type="number"
              placeholder={q.placeholder || 'Enter a number'}
              min={q.min}
              max={q.max}
              value={answers[q.id] ?? ''}
              onChange={(e) => setValue(e.target.value)}
            />
          )}

          {q.kind === 'radio' && (
            <div className="choice-grid">
              {q.options.map(opt => (
                <label key={opt} className="choice">
                  <input
                    type="radio"
                    name={q.id}
                    checked={answers[q.id] === opt}
                    onChange={() => setValue(opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}

          {q.kind === 'checkbox' && (
            <div className="choice-grid">
              {q.options.map(opt => {
                const arr: string[] = answers[q.id] || [];
                return (
                  <label key={opt} className="choice">
                    <input
                      type="checkbox"
                      checked={arr.includes(opt)}
                      onChange={() => setValue(toggle(arr, opt))}
                    />
                    {opt}
                  </label>
                );
              })}
            </div>
          )}

          {q.kind === 'scale' && (
            <div>
              <div className="muted" style={{display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:6}}>
                <span>{q.left || q.min}</span>
                <span>{q.right || q.max}</span>
              </div>
              <div className="choice-grid" style={{gridTemplateColumns: `repeat(${q.max - q.min + 1}, minmax(0,1fr))`}}>
                {Array.from({length: (q.max - q.min + 1)}, (_,i)=>i+q.min).map(n => (
                  <label key={n} className="choice" style={{justifyContent:'center'}}>
                    <input
                      type="radio"
                      name={q.id}
                      checked={String(answers[q.id] ?? '') === String(n)}
                      onChange={() => setValue(String(n))}
                    />
                    {n}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* NAV */}
        <div className="actions mt-6">
          {step > 0 && (
            <button type="button" className="btn secondary" onClick={back} disabled={pending}>
              Back
            </button>
          )}
          {step < questions.length - 1 ? (
            <button type="button" className="btn" onClick={next} disabled={pending}>
              Next
            </button>
          ) : (
            <button type="button" className="btn" onClick={finish} disabled={pending}>
              {pending ? 'Saving…' : 'Finish'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

