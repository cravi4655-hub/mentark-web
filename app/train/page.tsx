// app/train/page.tsx
"use client";

import { useMemo, useState, useTransition } from "react";
import { savePreferences } from "@/app/actions/preferences";

type QBase = {
  id: string;
  section: string;
  text: string;
  help?: string;
  required?: boolean;
};

type QText = QBase & { kind: "text"; placeholder?: string };
type QNumber = QBase & { kind: "number"; placeholder?: string; min?: number; max?: number };
type QRadio = QBase & { kind: "radio"; options: string[] };
type QCheck = QBase & { kind: "checkbox"; options: string[]; min?: number; max?: number };
type QScale = QBase & { kind: "scale"; min: number; max: number; left?: string; right?: string };

type Question = QText | QNumber | QRadio | QCheck | QScale;

// answers can be string, number or list of strings
type AnswerValue = string | number | string[];

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

const questions: Question[] = [
  // … your full list exactly as you want …
  { id: "name", section: "Identity & Background", text: "What is your name?", kind: "text", placeholder: "Type your full name", required: true },
  { id: "age", section: "Identity & Background", text: "What is your age?", kind: "number", placeholder: "e.g., 15", min: 8, max: 22, required: true },
  { id: "grade", section: "Identity & Background", text: "What grade are you in?", kind: "radio", options: ["9th","10th","11th","12th"], required: true },
  // … keep the rest of the 50 exactly as before …
];

export default function TrainPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [pending, startTransition] = useTransition();

  const q = questions[step];
  const pct = Math.round(((step + 1) / questions.length) * 100);

  const sectionFirstIndex = useMemo(() => {
    const map = new Map<string, number>();
    questions.forEach((item, idx) => {
      if (!map.has(item.section)) map.set(item.section, idx);
    });
    return map;
  }, []);

  function setValue(v: AnswerValue) {
    setAnswers((prev) => ({ ...prev, [q.id]: v }));
  }

  function next() {
    if ("required" in q && q.required) {
      const v = answers[q.id];
      if (v === undefined || v === "" || (Array.isArray(v) && v.length === 0)) {
        alert("Please answer before continuing.");
        return;
      }
    }
    if (q.kind === "checkbox") {
      const arr = (answers[q.id] as string[]) || [];
      if (q.min && arr.length < q.min) return alert(`Please select at least ${q.min}.`);
      if (q.max && arr.length > q.max) return alert(`Please select at most ${q.max}.`);
    }

    if (step < questions.length - 1) setStep((s) => s + 1);
    else finish();
  }

  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  function finish() {
    startTransition(async () => {
      const fd = new FormData();
      Object.entries(answers).forEach(([key, value]) => {
        if (Array.isArray(value)) value.forEach((v) => fd.append(key, v));
        else fd.append(key, String(value));
      });
      await savePreferences(fd);
    });
  }

  const showSectionHeader = sectionFirstIndex.get(q.section) === step;

  return (
    <div className="container">
      <div className="card">
        <div className="progress">
          <span style={{ width: `${pct}%` }} />
        </div>
        <div className="muted mb-2">
          {step + 1} / {questions.length}
        </div>

        {showSectionHeader && (
          <div style={{ marginBottom: 6, opacity: 0.9, fontWeight: 700, letterSpacing: 0.3 }}>
            {q.section}
          </div>
        )}

        <h1 className="question-title">{q.text}</h1>
        {q.help && <div className="help">{q.help}</div>}

        <div className="field">
          {q.kind === "text" && (
            <input
              className="input"
              type="text"
              placeholder={q.placeholder || "Type your answer"}
              value={(answers[q.id] as string) || ""}
              onChange={(e) => setValue(e.target.value)}
            />
          )}

          {q.kind === "number" && (
            <input
              className="input"
              type="number"
              placeholder={q.placeholder || "Enter a number"}
              min={q.min}
              max={q.max}
              value={(answers[q.id] as number | undefined) ?? ""}
              onChange={(e) => setValue(Number(e.target.value))}
            />
          )}

          {q.kind === "radio" && (
            <div className="choice-grid">
              {q.options.map((opt) => (
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

          {q.kind === "checkbox" && (
            <div className="choice-grid">
              {q.options.map((opt) => {
                const arr = (answers[q.id] as string[]) || [];
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

          {q.kind === "scale" && (
            <div>
              <div
                className="muted"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  marginBottom: 6,
                }}
              >
                <span>{q.left || q.min}</span>
                <span>{q.right || q.max}</span>
              </div>
              <div
                className="choice-grid"
                style={{ gridTemplateColumns: `repeat(${q.max - q.min + 1}, minmax(0,1fr))` }}
              >
                {Array.from({ length: q.max - q.min + 1 }, (_, i) => i + q.min).map((n) => (
                  <label key={n} className="choice" style={{ justifyContent: "center" }}>
                    <input
                      type="radio"
                      name={q.id}
                      checked={String(answers[q.id] ?? "") === String(n)}
                      onChange={() => setValue(String(n))}
                    />
                    {n}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

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
              {pending ? "Saving…" : "Finish"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
