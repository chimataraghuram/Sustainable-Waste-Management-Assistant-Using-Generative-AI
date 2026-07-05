# 🌍 WasteGuide AI
### Sustainable Waste Management Assistant Using Generative AI

WasteGuide AI is an AI-powered waste classification and sustainable disposal assistant that analyzes everyday waste items using Google Gemini (gemini-2.0-flash), generates step-by-step disposal guidance, evaluates recyclability, flags potential hazards, provides eco-friendly suggestions, and tracks analysis history in an interactive history page powered by Firebase Firestore.

---

## 🚀 Live Demo
Experience WasteGuide AI Live [Here](http://localhost:5173) *(Runs locally on default Vite setup)*

---

## 📝 Project Overview
WasteGuide AI was developed to demonstrate end-to-end AI application development using modern Full Stack technologies and Generative AI.

The application allows users to enter any household or industrial waste item (e.g., plastic bottle, LED bulb, banana peel). Using the Google Gemini API, WasteGuide AI evaluates the item's details, categorizes it, and outputs structured, clear, and actionable advice to encourage proper recycling and safe disposal.

---

## ✨ Key Features
- 🔍 **AI-powered Waste Identification** — Simply type any waste item for analysis.
- ♻️ **Recyclability & Category Classification** — Instant identification of waste category and recyclability.
- 📋 **Step-by-Step Disposal Steps** — AI-generated preparation steps before disposal.
- ⚠️ **Hazard Detection** — Real-time alerts for hazardous items (electronics, chemicals, batteries).
- 🌱 **Eco Suggestions** — Custom tips to reduce future waste or use eco-friendly alternatives.
- 🗂️ **Historical Inspection Log** — Saved records of past searches fetched from Firebase Firestore.
- 📱 **Responsive Glassmorphism UI** — A modern, fully responsive user interface built using Tailwind CSS.

---

## 🖼️ Application Workflow

```
       Enter Waste Item (e.g., LED Bulb)
                      │
                      ▼
            Submit to Backend API
                      │
                      ▼
         Gemini API Analysis (JSON Mode)
                      │
                      ▼
     ┌────────────────┴────────────────┐
     ▼                                 ▼
Classification & Recyclability     Disposal & Prep Steps
     │                                 │
     └────────────────┬────────────────┘
                      ▼
       Hazard Warnings & Eco Suggestions
                      │
                      ▼
        Save to Firebase History Log
                      │
                      ▼
            Display Result Page
```

---

## 🎯 Supported Waste Types
- 🥤 **Plastics** (PET Bottles, Bags, Containers)
- 🖥️ **E-Waste** (Smartphones, LED Bulbs, Chargers)
- 🍌 **Organic** (Food Scraps, Leaves, Coffee Grounds)
- 📰 **Paper & Cardboard** (Newspapers, Boxes)
- 🧪 **Hazardous** (Batteries, Chemicals, Aerosols)
- 🥛 **Glass & Metal** (Jars, Cans, Foil)

---

## 🏗️ Technology Stack

| Category | Technologies |
|---|---|
| **Frontend** | React.js, Vite, Tailwind CSS, React Router |
| **Backend** | Flask (Python), Flask-CORS, Dotenv |
| **Database** | Firebase Cloud Firestore |
| **AI Engine** | Google Gemini (gemini-2.0-flash) |
| **HTTP client** | Axios, Fetch API |

---

## 📂 Project Structure

```
Sustainable-Waste-Management-Assistant-Using-Generative-AI/
├── backend/
│   ├── services/
│   │   └── gemini_service.py   # Gemini AI prompt & generation
│   ├── app.py                  # Flask entry point & factory
│   ├── routes.py               # API endpoints (/api/analyze)
│   ├── config.py               # Config & environment loaders
│   ├── requirements.txt        # Backend dependencies
│   └── .env.example            # Backend env template
│
├── frontend/
│   ├── src/
│   │   ├── components/         # SearchCard, InfoCard, Navbar, Layout
│   │   ├── pages/              # Home, Result, History
│   │   ├── services/           # Axios API caller & Firestore service
│   │   ├── firebase/           # Firebase app initialisation
│   │   ├── App.jsx             # React routing setup
│   │   ├── index.css           # Styling directives
│   │   └── main.jsx            # Entry point
│   ├── package.json            # Frontend script dependencies
│   └── .env.example            # Frontend env template
│
├── README.md
└── .gitignore                  # Git exclusions for node_modules, .env, etc.
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/chimataraghuram/Sustainable-Waste-Management-Assistant-Using-Generative-AI.git
cd Sustainable-Waste-Management-Assistant-Using-Generative-AI
```

### 2. Backend Setup
Navigate to the backend directory, set up your virtual environment, and install dependencies:
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
.\venv\Scripts\activate
# Activate virtual environment (macOS/Linux)
source venv/bin/activate

# Install requirements
pip install -r requirements.txt
```
Copy `.env.example` to `.env` and fill in your Gemini API key:
```bash
cp .env.example .env
# Set GEMINI_API_KEY=your_gemini_api_key
```
Start the Flask development server:
```bash
python app.py
```
The backend API runs at `http://localhost:5000`.

### 3. Frontend Setup
Navigate to the frontend directory, install dependencies, and run:
```bash
cd ../frontend

# Install node packages
npm install
```
Copy `.env.example` to `.env` and fill in your Firebase configuration parameters:
```bash
cp .env.example .env
```
Start the Vite development server:
```bash
npm run dev
```
The frontend application runs at `http://localhost:5173`.

---

## 🔥 Firebase Firestore Setup
1. Create a project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Cloud Firestore** in test mode or production mode.
3. Obtain your configuration details from Project Settings and paste them into `frontend/.env`.
4. The history logs will automatically write to a Firestore collection named `history`.

---

## 📊 API Documentation

### `POST /api/analyze`
Analyzes a waste item and returns structured disposal guidance.

* **Request Body:**
```json
{
  "item": "LED Bulb"
}
```

* **Response Body (200 OK):**
```json
{
  "item": "LED Bulb",
  "category": "E-Waste / Hazardous",
  "recyclable": "Yes (special facility only)",
  "disposal_steps": [
    "Do not throw in regular trash bins",
    "Store in a safe cardboard box to prevent breaking",
    "Locate a local electronic recycling center",
    "Drop off at a hazardous waste collection day"
  ],
  "hazard_warning": "Contains tiny amounts of heavy metals and glass particles that can cause injury if broken.",
  "eco_suggestion": "Look into purchasing energy-efficient LED bulbs with longer lifespan ratings, or brands participating in take-back schemes."
}
```

---

## 👨‍💻 Developer
**CHIMATA RAGHURAM**

- [GitHub](https://github.com/chimataraghuram)

Developed as a Sustainable Waste Management Assistant technical showcase using React, Flask, Firebase Firestore, and the Google Gemini API.

---

## 📄 License
This project is released under the [MIT License](LICENSE).
