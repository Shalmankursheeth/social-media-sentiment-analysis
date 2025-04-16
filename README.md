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

## 🗂️ Project Structure

