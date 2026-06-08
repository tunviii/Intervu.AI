<div align="center">

# 🤖 PrepForge

### AI-Powered Mock Interview Platform for Software Engineers

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)](https://github.com)

*Master your interview skills with AI-powered real-time feedback and comprehensive performance analysis*

[Features](#-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Contributors](#-contributors) • [License](#-license)

</div>

---

## 🎯 About PrepForge

PrepForge is a **next-generation AI-powered interview practice platform** designed to simulate real software engineering interviews with unmatched realism and depth. Unlike generic interview chatbots, PrepForge focuses on what actually matters: **evaluation accuracy, detailed feedback, and simulating real interviewer behavior**.

Whether you're preparing for your first internship or aiming for a senior role at top tech companies, PrepForge helps you master the **art of explaining your thinking**, **handling technical questions**, and **performing confidently under pressure**.

---

## ✨ Features

### 🎓 **Mode 1: Text-Based Learning Mode**
Practice by typing answers and receive intelligent, detailed feedback.

<table>
<tr>
<td width="50%">

**What You Get:**
- 📝 HR, behavioral, and DSA questions
- 🎯 Scoring system (0-10)
- 💬 AI critique and improvement tips
- ✍️ AI-rewritten perfect answers

</td>
<td width="50%">

**DSA Topics Covered:**
- Arrays & Strings
- Linked Lists
- Stacks & Queues
- Trees & BSTs
- Graphs & Recursion
- Dynamic Programming
- Complexity Analysis

</td>
</tr>
</table>

**Perfect for:** Understanding interview expectations and learning how to structure answers properly.

---

### 🎬 **Mode 2: Real-Time Voice & Video Mock Interviews**
Simulate a full structured technical interview with AI-driven questioning and comprehensive evaluation.

<table>
<tr>
<td width="50%">

**Interview Experience:**
- 🎙️ Voice-based AI interviewer
- 📹 Full audio/video recording
- ❓ Behavioral & HR questions
- 🔍 Project deep-dives
- 💻 Technical DSA challenges
- 🚀 Follow-up questions

</td>
<td width="50%">

**AI-Generated Report Includes:**
- 📊 Overall score (0-100)
- 📈 Section-wise breakdown
- 💪 Strengths & weaknesses
- 🎯 Hiring recommendation
- 💡 Actionable improvement tips
- 📝 Detailed analysis report

</td>
</tr>
</table>

**Interview Structure (10 Questions):**
- Introduction & background (2 Qs)
- Data Structures & Algorithms (3 Qs)
- CS Fundamentals - OS, CN, OOP (2 Qs)
- DBMS (2 Qs)
- Behavioral (1 Q)

**Evaluation Metrics:**
- Communication & Clarity
- Behavioral Response Quality
- Project Understanding
- DSA Problem-Solving
- Complexity Awareness
- Confidence & Delivery
- Hire/No-Hire Recommendation

**Perfect for:** Getting real-world interview experience and understanding how you actually perform under pressure.

---

### 🎯 **Topic-Specific Practice**
Select and practice specific DSA topics at your own pace with focused questions and feedback.

**Available Topics:**
- Arrays & Strings
- Linked Lists
- Stacks & Queues
- Trees & BST
- Graphs
- Dynamic Programming
- Sorting & Searching
- Recursion & Backtracking
- Hashing
- Bit Manipulation
- SQL & Databases
- System Design

**Perfect for:** Targeted learning and mastering individual concepts before full interviews.

---

### 📊 **Smart Dashboard**
Track your progress with detailed analytics and performance metrics across all interview attempts and topics.

---

### 🏢 **Company-Specific Preparation**
Practice with question sets tailored to major tech companies' interview patterns and expectations.

**Supported Companies:**
- **Trending:** Amazon (644 Qs) • Microsoft (439 Qs) • Google (174 Qs) • Flipkart (167 Qs) • Adobe (164 Qs) • NPCI (143 Qs) • Samsung (127 Qs) • Paytm (74 Qs) • Morgan Stanley (73 Qs) • Meta (62 Qs) • Apple (58 Qs) • Netflix (45 Qs)
- **Other:** Accolite • MakeMyTrip • Zoho • Snapdeal • Walmart • Goldman Sachs

**Perfect for:** Preparing for specific companies with their actual interview patterns.

---

### 📄 **Resume Analyzer**
Upload and analyze your resume with AI-powered scoring and improvement suggestions.

<table>
<tr>
<td width="50%">

**Supported Formats:**
- PDF files
- DOCX (Word)
- Markdown (.md)
- LaTeX (.tex)
- Plain text

</td>
<td width="50%">

**Analysis Includes:**
- 📋 Section completeness check
- 📊 Skills & keyword density
- 🎯 ATS optimization score
- 💡 Improvement suggestions
- ✅ Resume strength rating

</td>
</tr>
</table>

**Perfect for:** Optimizing your resume before applying and ensuring it passes ATS screening.

---

## 🏗️ Architecture

\\\
PrepForge/
├── 📱 Client (React + Vite)
│   ├── Authentication (Firebase)
│   ├── Real-time Communication (WebRTC)
│   ├── Code Editor (Monaco)
│   └── Data Visualization (Recharts)
│
└── 🔧 Server (Node.js + Express)
    ├── AI Engine (Groq SDK)
    ├── Interview Management
    ├── User Analytics
    └── Database (MongoDB)
\\\

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19 + Vite | Fast, modern UI |
| **Styling** | CSS Modules | Component-scoped styles |
| **State & Routing** | React Router v7 | Navigation & app flow |
| **Authentication** | Firebase Auth | Secure user management |
| **Code Editing** | Monaco Editor | In-browser code editor |
| **Data Viz** | Recharts | Interactive charts |
| **HTTP Client** | Axios | API communication |
| **Icons** | React Icons | UI icon library |
| **Backend** | Node.js + Express | RESTful API server |
| **Database** | MongoDB + Mongoose | Data persistence |
| **AI** | Groq SDK | Real-time AI responses |
| **File Upload** | Multer | Resume file handling |
| **PDF Parsing** | pdf-parse | Extract text from PDFs |
| **Word Parsing** | Mammoth | Extract text from DOCX |
| **Cloud Services** | Firebase Admin | Backend auth & data |
| **CORS** | cors middleware | Cross-origin requests |
| **Environment** | dotenv | Configuration management |

</div>

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Firebase project setup
- Groq API key

### Installation

**Clone the repository:**
\\\ash
git clone https://github.com/yourusername/ai-interviewer.git
cd ai-interviewer
\\\

**Setup Backend:**
\\\ash
cd server
npm install

# Create .env file
echo "MONGO_URI=your_mongodb_uri" > .env
echo "GROQ_API_KEY=your_groq_key" >> .env
echo "FIREBASE_PROJECT_ID=your_firebase_id" >> .env

npm start
\\\

**Setup Frontend:**
\\\ash
cd ../client
npm install
npm run dev
\\\

**Open in browser:**
\\\
http://localhost:5173
\\\

---

## 📖 Project Structure

### Frontend (\client/\)
\\\
src/
├── components/
│   ├── Landing.jsx          # Home page
│   ├── Auth.jsx             # Login/Signup
│   ├── Dashboard.jsx        # User dashboard with analytics
│   ├── Practice.jsx         # Text-based practice mode
│   ├── PracticeMode.jsx     # Practice UI
│   ├── Interview.jsx        # Live mock interview
│   ├── ReportScreen.jsx     # Interview results & analysis
│   ├── Topics.jsx           # Topic selection for practice
│   ├── CompaniesPage.jsx    # Company-specific preparation
│   ├── ResumeAnalyzer.jsx   # Resume upload & analysis
│   └── ProtectedRoute.jsx   # Route protection
├── services/
│   ├── auth.js              # Authentication logic
│   └── ReportService.js     # Report generation
├── firebase/
│   └── firebase.js          # Firebase config
└── styles/                  # Component styles
\\\

### Backend (\server/\)
\\\
├── server.js                # Express setup
├── practice.js              # Practice mode API
├── Interview.js             # Mock interview API
├── models/
│   ├── User.js              # User schema
│   └── Conversation.js      # Interview data
├── routes/
│   ├── users.js             # User endpoints
│   ├── dashboard.js         # Analytics endpoints
│   └── resume.js            # Resume analysis endpoints
├── controllers/
│   └── resumeController.js  # Resume analysis logic
├── services/
│   ├── aiService.js         # AI integration
│   ├── parseEvaluation.js   # Report parsing
│   └── dashboardService.js  # Analytics logic
├── middleware/
│   └── authMiddleware.js    # JWT verification
└── uploads/                 # Resume file storage
\\\

---

## 🎮 How to Use

### Text-Based Learning Mode
1. Select a DSA topic or interview category
2. Answer the AI's question in text
3. Receive instant AI critique with score (0-10)
4. Review the AI's improved version
5. Learn and practice at your own pace

### Topic-Specific Practice
1. Browse available DSA topics
2. Select one or multiple topics to focus on
3. Answer questions tailored to those topics
4. Get feedback within your selected areas
5. Master individual concepts efficiently

### Mock Interview Mode
1. Choose a company or generic interview
2. Enable camera & microphone
3. Conduct a full structured interview (10 questions)
4. Answer questions naturally (just like real interviews)
5. Review detailed AI-generated report with metrics

### Resume Analysis
1. Navigate to Resume Analyzer
2. Upload your resume (PDF, DOCX, MD, TEX, or TXT)
3. Get instant AI-powered analysis
4. Review strengths and improvement areas
5. Optimize your resume for better ATS scores

### Dashboard
- Track all interview attempts with dates and scores
- View performance trends across time
- Compare scores across different topics and companies
- Identify weak areas and set improvement goals
- Monitor progress with visual analytics

---

## 🧠 Why PrepForge?

✅ **Realistic** - Mimics actual interviewer behavior and questioning patterns  
✅ **Comprehensive** - Covers DSA, behavioral, CS fundamentals, DBMS, and project-based questions  
✅ **Detailed Feedback** - Goes beyond scores with actionable insights and improvement areas  
✅ **Multi-Mode Learning** - Learn with text mode, practice specific topics, then mock interview  
✅ **Smart Analytics** - Track progress and identify weak areas with visual dashboards  
✅ **Company-Specific** - Prepare for 18+ major tech companies with company-tailored questions  
✅ **Resume Optimization** - Analyze and improve your resume before applying  
✅ **Always Available** - Practice anytime without scheduling interviews  

---

## 👩‍💻 Contributors

<div align="center">

| Name | Role | 
|------|------|
| **Uddandam Tanvi** |
| **Siddhi Shetkar** |

</div>

---

## 📊 Performance & Metrics

- ⚡ **Fast**: Built with Vite for instant hot module reloading
- 🔒 **Secure**: Firebase authentication + JWT tokens
- 📈 **Scalable**: MongoDB + Node.js backend
- 🎯 **Accurate**: AI-powered evaluation using Groq SDK
- 🌐 **Real-time**: WebRTC for live audio/video

---

## 🔐 Security

- Firebase authentication for user management
- JWT-based API authentication
- Environment variables for sensitive data
- CORS configured for trusted origins
- MongoDB connection with authentication


---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (\git checkout -b feature/AmazingFeature\)
3. Commit your changes (\git commit -m 'Add some AmazingFeature'\)
4. Push to the branch (\git push origin feature/AmazingFeature\)
5. Open a Pull Request


---

## 🎯 Roadmap

- [ ] Real-time collaborative interviews
- [ ] More DSA topics & advanced algorithms
- [ ] Industry-specific curated question sets
- [ ] Mobile app version
- [ ] Advanced analytics dashboard
- [ ] Peer comparison & leaderboards
- [ ] Integration with job boards
- [ ] Multilingual support

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Tutorial](https://docs.mongodb.com)
- [Firebase Setup](https://firebase.google.com/docs)
- [Groq API Docs](https://groq.com/docs)

---

