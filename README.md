# ROVISA 🤖 – AI Chatbot with Topic Flow & Typing Effect

**ROVISA** is a React-based AI chatbot interface that interacts with a backend model (like Gemini or any LLM API), supports topic-wise conversation flow, and features a realistic typing animation. It’s designed for learning, engagement, and custom AI interaction experiences.

---

## 🌟 Features

- 💬 Chatbot UI built using **React**
- ⌨️ Typing animation for model responses
- 🧠 Automatic **topic progression** on user commands like "done"/"finish"
- 🛡️ Input validation with error messages
- 📱 Responsive design for mobile & desktop
- 🎨 Clean, CSS-styled UI with a background image

---

## 🧰 Tech Stack

- **React (Hooks)** – Frontend framework
- **CSS** – Styling
- **Fetch API** – Communication with backend (e.g., Gemini at `localhost:8000/gemini`)

---

## 📁 Folder Structure

ROVISA/
├── public/
│ └── img01.jpg # Background image
├── src/
│ ├── App.js # Main chat logic
│ ├── index.js # React entry point
│ └── index.css # UI styling
├── package.json
└── README.md


---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ROVISA.git
cd ROVISA
2. Install dependencies
bash
Copy
Edit
npm install
3. Run the app
bash
Copy
Edit
npm start
Ensure your backend server (e.g., Gemini or LLM model) is running at:
http://localhost:8000/gemini

How It Works
-->Users input questions.

-->Chatbot types out responses with animation.

-->Typing "done" or "finish" automatically triggers the next topic.

Topics rotate from a predefined list.

👤 Author
Sivanesan Balu
📧 apsiva69@gmail.com
🌐 www.linkedin.com/in/sivanesan-b-871ba7264

📄 License
This project is licensed under the MIT License.
