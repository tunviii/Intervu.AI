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
Simulate a full 45-60 minute technical interview with AI-driven questioning and behavioral assessment.

<table>
<tr>
<td width="50%">

**Interview Experience:**
- 🎙️ Voice-based AI interviewer
- 📹 Full audio/video recording
- ❓ Behavioral questions
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

### 📊 **Smart Dashboard**
Track your progress and see improvement over time with detailed analytics and performance metrics.

---

### 🏢 **Company-Specific Preparation**
Practice with company-specific question sets and interview patterns for your target employers.

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
| **Backend** | Node.js + Express | RESTful API server |
| **Database** | MongoDB + Mongoose | Data persistence |
| **AI** | Groq SDK | Real-time AI responses |
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
│   ├── Dashboard.jsx        # User dashboard
│   ├── Practice.jsx         # Learning mode
│   ├── PracticeMode.jsx     # Detailed practice UI
│   ├── Interview.jsx        # Live interview
│   ├── ReportScreen.jsx     # Interview results
│   ├── Topics.jsx           # Topic selection
│   └── CompaniesPage.jsx    # Company-specific prep
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
├── practice.js              # Learning mode API
├── Interview.js             # Interview API
├── models/
│   ├── User.js              # User schema
│   └── Conversation.js      # Interview data
├── routes/
│   ├── users.js             # User endpoints
│   └── dashboard.js         # Analytics endpoints
├── services/
│   ├── aiService.js         # AI integration
│   ├── parseEvaluation.js   # Report parsing
│   └── dashboardService.js  # Analytics logic
└── middleware/
    └── authMiddleware.js    # JWT verification
\\\

---

## 🎮 How to Use

### Learning Mode
1. Select a DSA topic or interview category
2. Answer the AI's question in text
3. Receive instant feedback with score
4. Review the AI's improved version
5. Learn and practice

### Mock Interview Mode
1. Choose a company or generic interview
2. Enable camera & microphone
3. Conduct a full 45-60 minute interview
4. Answer questions naturally (just like real interviews)
5. Review detailed AI-generated report

### Dashboard
- Track all interview attempts
- View scores and trends
- Compare performance across topics
- Set improvement goals

---

## 🧠 Why PrepForge?

✅ **Realistic** - Mimics actual interviewer behavior and questioning patterns  
✅ **Comprehensive** - Covers DSA, behavioral, and project-based questions  
✅ **Detailed Feedback** - Goes beyond scores with actionable insights  
✅ **Dual Mode** - Learn first, then practice under pressure  
✅ **Smart Analytics** - Track progress and identify weak areas  
✅ **Company-Specific** - Prepare for specific company interviews  
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

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (\git checkout -b feature/AmazingFeature\)
3. Commit your changes (\git commit -m 'Add some AmazingFeature'\)
4. Push to the branch (\git push origin feature/AmazingFeature\)
5. Open a Pull Request

---

## 📞 Support & Contact

- 📧 Email: support@prepforge.com
- 💬 Discord: [Join our community]
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/ai-interviewer/issues)
- 💡 Feature Requests: [Discussions](https://github.com/yourusername/ai-interviewer/discussions)

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

