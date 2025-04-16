# Social Media Sentiment Analysis

A simple, interactive landing page inspired by Twitter, designed to analyze user-submitted comments for sentiment polarity and detect offensive content.

---

## 🚀 Features

- 🐦 Twitter-style landing page UI (HTML/CSS/JS)
- 📊 Real-time sentiment score visualized as a horizontal bar
- 🚫 Classifies content as *offensive* or *non-offensive*
- 💾 Automatically logs comments with sentiment score and classification in a CSV file
- ⚡ Powered by a lightweight Node.js backend for quick inference

---

## 🧠 How It Works

1. User types a comment in the input field.
2. On submit, the comment is sent to the backend (`server.js`).
3. The backend analyzes:
   - Sentiment polarity (scale: -1 to +1)
   - Offensive classification (binary)
4. Results are:
   - Displayed with a progress bar for sentiment
   - Shown as "Offensive" or "Not Offensive"
   - Stored in `results.csv` along with timestamp

---


## 🛠️ Setup Instructions

### 1. Clone the repository

      git clone https://github.com/your-username/social-media-sentiment-analysis.git
      cd social-media-sentiment-analysis

### 2. Install dependencies

      npm install

### 3. Run the server

      node server.js

### 4. Open the app in your browser

      http://localhost:3000

# 📌 Notes
This is a prototype for academic and demonstration purposes.

The sentiment/offense classifier used here is lightweight and may be replaced with advanced models as needed.

You can integrate your own ML model using Python or cloud APIs via backend.
# Sample Output
Timestamp | Comment | Sentiment Score | Offensive
2025-04-15 10:03 AM | "I love this!" | 0.89 | No
2025-04-15 10:04 AM | "You're the worst!" | -0.75 | Yes
2025-04-15 10:05 AM | "Meh, it was okay." | 0.10 | No
