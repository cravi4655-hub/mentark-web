// app/train/questions.ts
export type QType = "text" | "number" | "radio" | "checkbox" | "scale";

export type Question = {
  id: string;
  label: string;
  type: QType;
  required?: boolean;
  options?: string[];
  min?: number;
  max?: number;
  hint?: string;
  maxSelect?: number;
  section: string;
};

export const QUESTION_SECTIONS: { section: string; items: Question[] }[] = [
  {
    section: "Section 1: Identity & Background",
    items: [
      { id: "identity.name",  label: "What is your name?", type: "text", required: true, section: "Section 1" },
      { id: "identity.age",   label: "What is your age?",  type: "number", required: true, section: "Section 1", min: 8, max: 25 },
      { id: "identity.grade", label: "What grade are you in?", type: "radio", required: true, options: ["9th","10th","11th","12th"], section: "Section 1" },
      { id: "identity.gender", label: "What is your gender?", type: "radio", options: ["Male","Female","Non-binary","Prefer not to say"], section: "Section 1" },
      { id: "identity.schoolType", label: "What type of school do you go to?", type: "radio", options: ["Public","Private","Boarding","Online/Remote"], section: "Section 1" },
      { id: "identity.location", label: "Where do you live?", type: "radio", options: ["Urban","Semi-urban","Rural"], section: "Section 1" },
      { id: "identity.siblings", label: "How many siblings do you have?", type: "radio", options: ["0","1","2","3 or more"], section: "Section 1" },
    ],
  },
  {
    section: "Section 2: Self-Perception & Personality",
    items: [
      { id: "self.describe", label: "How would you describe yourself?", type: "radio", options: ["Quiet and introspective","Outgoing and social","Balanced"], section: "Section 2" },
      { id: "self.expressEmotions", label: "Do you find it easy to express your emotions?", type: "radio", options: ["Yes","No","Sometimes"], section: "Section 2" },
      { id: "self.strength", label: "What is your biggest strength?", type: "radio", options: ["Creativity","Discipline","Leadership","Empathy","Curiosity"], section: "Section 2" },
      { id: "self.weakness", label: "What is your biggest weakness?", type: "radio", options: ["Procrastination","Overthinking","Fear of failure","Low self-confidence","Difficulty focusing"], section: "Section 2" },
      { id: "self.handleFailure", label: "How do you handle failure?", type: "radio", options: ["I get discouraged easily","I learn and try again","I ignore it and move on"], section: "Section 2" },
      { id: "self.ambitious", label: "Do you consider yourself ambitious?", type: "radio", options: ["Yes","No","Not sure"], section: "Section 2" },
      { id: "self.style", label: "Which of the following describes you best?", type: "radio", options: ["Logical thinker","Emotional thinker","Action-oriented","Dreamer"], section: "Section 2" },
    ],
  },
  {
    section: "Section 3: Academic Interests & Learning Style",
    items: [
      { id: "academic.enjoy", label: "What subjects do you enjoy most? (Select 2–3)", type: "checkbox", options: ["Math","Science","Social Science","English","Language","Computer Science","Art/Music","Physical Education"], hint: "Pick 2–3", maxSelect: 3, section: "Section 3" },
      { id: "academic.struggle", label: "What subjects do you struggle with?", type: "checkbox", options: ["Math","Science","Social Science","English","Language","Computer Science","Art/Music","Physical Education"], section: "Section 3" },
      { id: "academic.learnerType", label: "What type of learner are you?", type: "radio", options: ["Visual","Auditory","Kinesthetic (hands-on)","Reading/Writing"], section: "Section 3" },
      { id: "academic.examPrep", label: "How do you prepare for exams?", type: "radio", options: ["Last-minute cramming","Scheduled and spaced revisions","Group studies","I don’t prepare much"], section: "Section 3" },
      { id: "academic.enjoyLearning", label: "Do you enjoy learning new things?", type: "radio", options: ["Yes","No","Only when it interests me"], section: "Section 3" },
      { id: "academic.onlineResources", label: "Do you use online resources to study?", type: "radio", options: ["Yes, regularly","Occasionally","Rarely","Never"], section: "Section 3" },
    ],
  },
  {
    section: "Section 4: Emotions & Mental Health",
    items: [
      { id: "mental.stressFrequency", label: "How often do you feel stressed?", type: "radio", options: ["Frequently","Sometimes","Rarely","Never"], section: "Section 4" },
      { id: "mental.stressCauses", label: "What usually causes you stress?", type: "checkbox", options: ["Exams","Parental pressure","Peer pressure","Fear of future","Relationships"], section: "Section 4" },
      { id: "mental.supportPerson", label: "Who do you talk to when you're upset?", type: "radio", options: ["Parents","Friends","Teacher or Mentor","No one"], section: "Section 4" },
      { id: "mental.feelUnderstood", label: "Do you feel understood by the people around you?", type: "radio", options: ["Yes","No","Sometimes"], section: "Section 4" },
      { id: "mental.happinessScale", label: "On a scale of 1 to 5, how happy are you daily?", type: "scale", options: ["1","2","3","4","5"], section: "Section 4" },
      { id: "mental.lonely", label: "Have you ever felt lonely or isolated?", type: "radio", options: ["Yes, often","Sometimes","Rarely","Never"], section: "Section 4" },
      { id: "mental.makeFriends", label: "Do you find it easy to make friends?", type: "radio", options: ["Yes","No","Sometimes"], section: "Section 4" },
      { id: "mental.feelSafe", label: "Do you feel safe in your home and school environment?", type: "radio", options: ["Yes","No","Sometimes"], section: "Section 4" },
      { id: "mental.compareOthers", label: "Do you compare yourself a lot with others?", type: "radio", options: ["Yes","No","Occasionally"], section: "Section 4" },
    ],
  },
  {
    section: "Section 5: Family & Relationships",
    items: [
      { id: "family.withParents", label: "How is your relationship with your parents?", type: "radio", options: ["Very good","Average","Poor"], section: "Section 5" },
      { id: "family.parentsSupport", label: "Are your parents supportive of your dreams?", type: "radio", options: ["Yes","No","Not sure"], section: "Section 5" },
      { id: "family.admireMost", label: "Who do you admire most in your life?", type: "radio", options: ["Parent","Sibling","Friend","Celebrity","Teacher"], section: "Section 5" },
      { id: "family.allowDecisions", label: "Do your parents allow you to make your own decisions?", type: "radio", options: ["Yes, often","Sometimes","Rarely"], section: "Section 5" },
      { id: "family.bestFriend", label: "Do you have a best friend?", type: "radio", options: ["Yes","No"], section: "Section 5" },
      { id: "family.bullying", label: "Have you experienced bullying?", type: "radio", options: ["Yes","No"], section: "Section 5" },
      { id: "family.relationshipStatus", label: "Are you currently in a relationship?", type: "radio", options: ["Yes","No","Prefer not to say"], section: "Section 5" },
    ],
  },
  {
    section: "Section 6: Hobbies & Passions",
    items: [
      { id: "hobby.list", label: "What are your hobbies? (Select 2–3)", type: "checkbox", options: ["Reading","Sports","Art/Music","Gaming","Dancing","Watching content","Writing","Other"], hint: "Pick 2–3", maxSelect: 3, section: "Section 6" },
      { id: "hobby.passion", label: "Do you have any passion you want to pursue seriously?", type: "radio", options: ["Yes","No","Still figuring it out"], section: "Section 6" },
      { id: "hobby.frequency", label: "How often do you engage in your hobbies?", type: "radio", options: ["Daily","Weekly","Rarely"], section: "Section 6" },
      { id: "hobby.relax", label: "Do your hobbies help you relax?", type: "radio", options: ["Yes","No","Sometimes"], section: "Section 6" },
      { id: "hobby.competitions", label: "Do you participate in competitions or exhibitions?", type: "radio", options: ["Yes","No"], section: "Section 6" },
      { id: "hobby.createdProud", label: "Have you created something you're proud of?", type: "radio", options: ["Yes","No"], section: "Section 6" },
    ],
  },
  {
    section: "Section 7: Social Media & Screen Time",
    items: [
      { id: "screen.dailyHours", label: "How many hours do you spend on screen daily (excluding school)?", type: "radio", options: ["1–2 hours","3–4 hours","5–6 hours","More than 6 hours"], section: "Section 7" },
      { id: "screen.usage", label: "What do you mostly use your phone/laptop for?", type: "radio", options: ["Social Media","Watching videos","Gaming","Reading/Research","Messaging friends"], section: "Section 7" },
      { id: "screen.addiction", label: "Do you ever feel addicted to your phone?", type: "radio", options: ["Yes","No","Sometimes"], section: "Section 7" },
      { id: "screen.platforms", label: "Which platforms do you use most?", type: "checkbox", options: ["Instagram","YouTube","Snapchat","WhatsApp","Discord","Others"], section: "Section 7" },
    ],
  },
  {
    section: "Section 8: Career & Future Goals",
    items: [
      { id: "career.knowPath", label: "Do you know what you want to be when you grow up?", type: "radio", options: ["Yes","No","I have a few ideas"], section: "Section 8" },
      { id: "career.fieldInterest", label: "Which field interests you the most?", type: "radio", options: ["Science","Commerce","Arts","Sports","Entrepreneurship","Social Work","Other"], section: "Section 8" },
      { id: "career.priorities", label: "What matters most in a career for you?", type: "radio", options: ["Money","Passion","Impact on others","Recognition","Stability"], section: "Section 8" },
      { id: "career.unconventional", label: "Are you open to exploring unconventional careers?", type: "radio", options: ["Yes","No","Maybe"], section: "Section 8" },
    ],
  },
];
