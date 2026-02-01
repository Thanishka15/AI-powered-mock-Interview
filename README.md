# AI-Powered Mock Interview Platform

An AI-inspired, rule-based mock interview platform that simulates a real-world interview environment by adapting questions, enforcing time pressure, evaluating responses, and generating an interview readiness report.

This project is built as part of a hackathon challenge to model how interviews actually work, not just test memorized knowledge.

---

## Live Demo (Screen Recording)

Screen Recording of Working Project:  
https://1drv.ms/v/c/ec9ab3da9926aa0b/IQBmN8lB4m0sSYsqw0vl3PehAcGqikBbzlETlJRP66H_1Ec?e=iX0cHS

The video demonstrates:
- Resume and Job Description input
- Adaptive interview flow
- Time-based question constraints
- Dynamic scoring and early termination
- Final interview readiness report

---

## Problem Statement Summary

Candidates often fail interviews not due to lack of skill, but due to:
- Lack of realistic interview practice
- No objective, structured feedback
- No time-pressure simulation
- No adaptability in mock interviews

This platform addresses these issues by simulating a thinking interviewer that can adapt, evaluate, and decide using predefined rules.

---

## Key Features

### Resume and Job Description Analysis
- Accepts candidate resume and job description
- Detects role keywords (React, Python, Software)
- Aligns interview questions with the target role

---

### Adaptive Interview Flow
- Question difficulty adapts dynamically:
  - Strong responses lead to harder questions
  - Weak responses lead to easier questions
- Interview terminates early if performance falls below a defined threshold

---

### Time-Constrained Interview
- Fixed response time per question:
  - Easy: 60 seconds
  - Medium: 90 seconds
  - Hard: 120 seconds
- Penalties applied for:
  - Over-time responses
  - Very slow answers
  - No response (timeout)

---

### Objective Scoring Mechanism
Responses are evaluated using predefined, rule-based heuristics acting as proxies for:
- Accuracy
- Clarity
- Depth
- Relevance
- Time efficiency

Final Interview Score is calculated as the average of all question scores.

---

## Output and Evaluation Report

At the end of the interview, the platform provides:

- Final Interview Readiness Score (0–100)
- Performance breakdown by skill areas
- Strengths and areas for improvement
- Actionable feedback for candidate improvement
- Hiring readiness indicator for the given job description

---

## Interview Decision Logic

The interviewer behavior is simulated using state-based, rule-driven logic:

| Interview Behavior | Implementation |
|-------------------|----------------|
| Thinking | Role detection from job description |
| Asking | Difficulty-based question selection |
| Adapting | Dynamic difficulty adjustment |
| Evaluating | Rule-based scoring engine |
| Deciding | Early termination and readiness outcome |

This approach ensures explainability, consistency, and scalability.

---

## Tech Stack

- Frontend: React.js
- State Management: React Hooks
- Styling: Custom CSS 
- Evaluation Engine: Rule-based logic

---

## Installation and Setup

### 1. Clone the repository
```bash
git clone https://github.com/Thanishka15/AI-powered-mock-Interview.git
cd AI-powered-mock-Interview
```

### 2. Install dependencies
```bash
npm install
```
### 3. Environment variables

Create a .env file in the root directory and add:
```bash
REACT_APP_OPENAI_API_KEY=your_api_key_here
```
### 4. Run the application
```bash
npm start
```
---

## Security and Best Practices

- Environment variables stored in `.env`
- `.env` excluded using `.gitignore`
- No sensitive data committed to the repository

The application runs at:
http://localhost:3000
