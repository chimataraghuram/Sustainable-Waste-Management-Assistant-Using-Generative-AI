# WasteGuide AI – Sustainable Waste Management Assistant Using Generative AI

A full-stack web application that helps users identify how to properly dispose of everyday waste items using Generative AI (Google Gemini).

## Features

- **AI-Powered Analysis** — Enter any waste item and get structured disposal guidance
- **Beautiful UI** — Modern glassmorphism design with Tailwind CSS
- **History Tracking** — All analyses saved to Firebase Firestore
- **Three Pages** — Home, Result, and History

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React.js + Vite + Tailwind CSS      |
| Backend  | Flask (Python)                      |
| AI       | Google Gemini API (gemini-2.0-flash) |
| Database | Firebase Firestore                  |
| HTTP     | Axios                               |

## Project Structure

```
├── backend/
│   ├── app.py                 # Flask entry point
│   ├── routes.py              # API routes
│   ├── config.py              # Configuration
│   ├── services/
│   │   └── groq_service.py    # Groq AI integration
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/        # Reusable UI components
    │   ├── pages/             # Home, Result, History
    │   ├── services/          # API & history services
    │   └── firebase/          # Firebase config
    ├── package.json
    └── .env.example
```

## Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.10+
- **Gemini API Key** — [Google AI Studio](https://aistudio.google.com/)
- **Firebase Project** — [console.firebase.google.com](https://console.firebase.google.com)

## Setup

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
```

Copy the environment template and add your Gemini API key:

```bash
cp .env.example .env
# Edit .env and set GEMINI_API_KEY=your_key_here
```

Start the Flask server:

```bash
python app.py
```

The API runs at `http://localhost:5000`.

### 2. Frontend

```bash
cd frontend
npm install
```

Copy the environment template and add your Firebase config:

```bash
cp .env.example .env
# Edit .env with your Firebase project credentials
```

Start the dev server:

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

### 3. Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Cloud Firestore** (start in test mode for local development)
3. Go to Project Settings → General → Your apps → Web app
4. Copy the config values into `frontend/.env`
5. Create a Firestore collection named `history` (it will be populated automatically)

**Firestore Security Rules (development):**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /history/{document=**} {
      allow read, write: if true;
    }
  }
}
```

> For production, restrict read/write with proper authentication rules.

## API Reference

### `POST /api/analyze`

Analyze a waste item.

**Request:**
```json
{ "item": "Plastic Bottle" }
```

**Response:**
```json
{
  "item": "Plastic Bottle",
  "category": "Plastic Waste",
  "recyclable": "Yes",
  "disposal_steps": ["Empty bottle", "Remove cap", "Wash bottle", "Put into recycling bin"],
  "hazard_warning": "No significant hazards.",
  "eco_suggestion": "Switch to reusable water bottles."
}
```

### `GET /health`

Health check endpoint.

## Environment Variables

### Backend (`backend/.env`)

| Variable         | Description          |
|------------------|----------------------|
| `GEMINI_API_KEY` | Your Gemini API key  |
| `GEMINI_MODEL`   | Gemini model to use  |
| `FLASK_DEBUG`    | `True` or `False`    |

### Frontend (`frontend/.env`)

| Variable                          | Description              |
|-----------------------------------|--------------------------|
| `VITE_FIREBASE_API_KEY`           | Firebase API key         |
| `VITE_FIREBASE_AUTH_DOMAIN`       | Firebase auth domain     |
| `VITE_FIREBASE_PROJECT_ID`        | Firebase project ID      |
| `VITE_FIREBASE_STORAGE_BUCKET`    | Firebase storage bucket  |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID     |
| `VITE_FIREBASE_APP_ID`            | Firebase app ID          |
| `VITE_API_BASE_URL`               | Backend URL (optional)   |

## License

MIT
