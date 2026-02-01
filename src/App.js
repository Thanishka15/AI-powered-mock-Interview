import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const [difficulty, setDifficulty] = useState("easy");
  const [qNo, setQNo] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [scores, setScores] = useState([]);

  // ⏱ Time management
  const [timeLeft, setTimeLeft] = useState(60);

  // 🔍 Role detection from JD
  const role = jd.toLowerCase().includes("react")
    ? "React"
    : jd.toLowerCase().includes("python")
    ? "Python"
    : "Software";

  // ⏱ Time limits by difficulty
  const getTimeLimit = (level) => {
    if (level === "easy") return 60;
    if (level === "medium") return 90;
    return 120;
  };

  // 📘 Question bank
  const QUESTIONS = {
    easy: [
      `What is ${role}?`,
      `Why is ${role} used in modern applications?`
    ],
    medium: [
      `How does ${role} handle data or state?`,
      `What are common challenges when working with ${role}?`
    ],
    hard: [
      `Design a scalable ${role}-based system.`,
      `How would you optimize performance in a large ${role} application?`
    ]
  };

  const askQuestion = (level) => {
    const list = QUESTIONS[level];
    if (!list) {
      setQuestion("No question available.");
      return;
    }
    const q = list[Math.floor(Math.random() * list.length)];
    setQuestion(q);
    setTimeLeft(getTimeLimit(level));
  };

  // ⏱ Countdown timer
  useEffect(() => {
    if (!started || finished) return;

    if (timeLeft <= 0) {
      submitAnswer(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, started, finished]);

  const submitAnswer = (timeout = false) => {
    let score =
      answer.length > 150 ? 90 :
      answer.length > 80  ? 80 :
      answer.length > 30  ? 70 :
      40;

    // ⏱ Time penalty
    if (timeout) {
      score -= 20;
    } else {
      const limit = getTimeLimit(difficulty);
      if (timeLeft < limit * 0.2) score -= 10;
    }

    score = Math.max(0, score);

    const newScores = [...scores, score];
    setScores(newScores);

    // 🔁 Adaptive difficulty
    let nextDifficulty;
    if (score >= 75) nextDifficulty = "hard";
    else if (score < 40) nextDifficulty = "easy";
    else nextDifficulty = "medium";

    setDifficulty(nextDifficulty);

    // 🚪 Early termination
    const avg =
      newScores.reduce((a, b) => a + b, 0) / newScores.length;

    if (qNo >= 2 && avg < 35) {
      setFinished(true);
      return;
    }

    // 🔚 Max 5 questions
    if (qNo === 4) {
      setFinished(true);
      return;
    }

    setQNo(qNo + 1);
    setAnswer("");
    askQuestion(nextDifficulty);
  };

  const avgScore =
    scores.length > 0
      ? scores.reduce((a, b) => a + b, 0) / scores.length
      : 0;

  const hiringReadiness =
    avgScore >= 75
      ? "Ready for the Role"
      : avgScore >= 55
      ? "Partially Ready"
      : "Not Ready";

  const skillBreakdown = {
    Technical:
      avgScore >= 75 ? "Strong" : avgScore >= 55 ? "Average" : "Weak",
    Communication:
      avgScore >= 70 ? "Good" : avgScore >= 50 ? "Average" : "Needs Improvement",
    ProblemSolving:
      avgScore >= 80 ? "Strong" : avgScore >= 60 ? "Average" : "Weak",
  };

  const strengths = [];
  const weaknesses = [];

  Object.entries(skillBreakdown).forEach(([skill, level]) => {
    if (level === "Strong" || level === "Good") strengths.push(skill);
    if (level === "Weak" || level === "Needs Improvement") weaknesses.push(skill);
  });

  const feedback = [];

  if (weaknesses.includes("Technical"))
    feedback.push("Strengthen core technical fundamentals.");
  if (weaknesses.includes("Communication"))
    feedback.push("Practice structuring clear and concise answers.");
  if (weaknesses.includes("ProblemSolving"))
    feedback.push("Work on breaking problems into logical steps.");

  if (feedback.length === 0)
    feedback.push("You are interview-ready. Continue practicing advanced scenarios.");

  return (
    <div className="app">
      <h1>AI-Powered Mock Interview</h1>

      {!started && (
        <>
          <textarea
            placeholder="Paste Resume"
            rows={5}
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />

          <textarea
            placeholder="Paste Job Description"
            rows={5}
            value={jd}
            onChange={(e) => setJd(e.target.value)}
          />

          <button
            disabled={!resume.trim() || !jd.trim()}
            onClick={() => {
              setStarted(true);
              askQuestion("easy");
            }}
          >
            Start Interview
          </button>

          {(!resume.trim() || !jd.trim()) && (
            <p style={{ fontSize: "13px", color: "#9ca3af" }}>
              Please fill both Resume and Job Description.
            </p>
          )}
        </>
      )}

      {started && !finished && (
        <>
          <h3>
            Question {qNo + 1} ({difficulty})
          </h3>

          {/* ✅ FINAL TIMER CHANGE */}
          <p className={`timer ${timeLeft <= 10 ? "warning" : ""}`}>
            ⏱ Time Left: {timeLeft}s
          </p>

          <div className="question-box">
            <p>{question}</p>
          </div>

          <textarea
            placeholder="Your answer"
            rows={4}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <button
            disabled={!answer.trim()}
            onClick={() => submitAnswer(false)}
          >
            Submit Answer
          </button>
        </>
      )}

      {finished && (
        <div className="result">
          <h2>Interview Finished</h2>

          <h3>Final Interview Readiness Score: {avgScore.toFixed(1)}/100</h3>
          <p>Hiring Readiness: {hiringReadiness}</p>

          <h3>Performance Breakdown</h3>
          <ul>
            <li>Technical Skills: {skillBreakdown.Technical}</li>
            <li>Communication: {skillBreakdown.Communication}</li>
            <li>Problem Solving: {skillBreakdown.ProblemSolving}</li>
          </ul>

          <h3>Strengths</h3>
          <ul>{strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>

          <h3>Areas for Improvement</h3>
          <ul>{weaknesses.map((w, i) => <li key={i}>{w}</li>)}</ul>

          <h3>Actionable Feedback</h3>
          <ul>{feedback.map((f, i) => <li key={i}>{f}</li>)}</ul>
        </div>
      )}
    </div>
  );
}

export default App;
