# Intervu.AI 🤖🎤

Intervu.AI is an AI-powered mock interview platform built to simulate **real software engineering interviews**. It helps students and early-career engineers improve how they **explain answers**, **think out loud**, and **perform under interview conditions**.

Unlike basic interview chatbots, Intervu.AI focuses on **evaluation, feedback, and realism** — exactly how interviewers assess candidates.

---

## 🚀 Features

### 1️⃣ Text-Based Interview Practice (Learning Mode)

In this mode, users practice by typing their answers and learning from feedback.

**What the AI does:**

* Asks common **HR, behavioral, and DSA interview questions**
* Evaluates the user’s answer
* Gives a **score out of 10**
* Explains what went well and what was missing
* Rewrites the user’s answer into a **clear, confident, interview-ready version**

**DSA Topics Covered:**

* Arrays & Strings (Two Sum, Sliding Window, Prefix Sum)
* Linked Lists (reverse, cycle detection, middle node)
* Stacks & Queues (valid parentheses, min stack)
* Trees & BST (traversals, validation, LCA)
* Basic Graphs (BFS vs DFS)
* Recursion & Dynamic Programming (basics)
* Time & Space Complexity and optimization

This mode is designed for **learning how to explain answers properly**, not memorizing solutions.

---

### 2️⃣ Voice & Video Mock Interview (Test Mode)

This mode simulates a **real 45–60 minute interview**, similar to a Google Meet or Zoom interview.

**How it works:**

* AI interviewer asks questions using **voice**
* User responds live using **audio and video**
* Interview includes:

  * Behavioral questions
  * Deep questions about the user’s own projects
  * DSA and problem-solving questions with follow-ups
* No hints or feedback during the interview (just like real interviews)

After the interview ends, the system analyzes the full session and generates a **detailed interview report**.

**Interview Report Includes:**

* Overall interview score (out of 100)
* Section-wise evaluation:

  * Communication skills
  * Behavioral responses
  * Project understanding
  * DSA & problem solving
  * Time & space complexity awareness
  * Confidence and clarity
* Strengths and weaknesses
* Common mistakes
* Final hire recommendation (Strong Hire / Hire / Borderline / No Hire)
* Actionable improvement tips

---

## 🧠 Why Intervu.AI?

* Simulates **real interviewer behavior**, not generic chat
* Focuses heavily on **DSA reasoning and explanation skills**
* Includes **project-based questioning**, which most platforms ignore
* Combines **learning mode + test mode** in one platform
* Helps users understand **how interviewers actually evaluate candidates**

---

## 🛠️ Tech Stack

**Frontend:**

* React.js
* WebRTC (for audio/video interview)

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB

**AI & Integrations:**

* Large Language Model (LLM) for question generation, evaluation, and feedback
* Speech-to-Text for voice interviews
* Prompt-based AI agent architecture

---

## 🧩 System Design Overview

* Two AI modes:

  * **Learning Agent** (text-based evaluation and improvement)
  * **Interview Agent** (voice-based full mock interview)
* Interview sessions and transcripts are stored for analysis
* Scores and feedback are generated after evaluation

---

## 📌 Future Improvements

* Resume-based interview customization
* Role-specific interviews (SDE, ML, Backend, Frontend)
* Progress tracking over multiple interviews
* Personalized weak-area practice

---

## 📄 How to Run Locally (High-Level)

1. Clone the repository
2. Install dependencies for frontend and backend
3. Set environment variables for LLM API keys
4. Run backend and frontend servers
5. Open the app in the browser and start practicing

---

## 🎯 Use Case

Intervu.AI is ideal for:

* Students preparing for internships and placements
* Developers improving interview communication
* Anyone who wants realistic mock interview practice

---

## ⭐ Conclusion

Intervu.AI is not just about answering questions — it’s about **thinking, explaining, and performing like a real interview candidate**. It bridges the gap between knowing concepts and confidently expressing them in interviews.

---
