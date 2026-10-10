# Autopay (A_S)

A modern full-stack web application for tracking digital subscriptions and local business memberships, monitoring UPI recurring payments, and anchoring non-sensitive records for transparent verification.

---

## Repository Structure

```
A_S/
├── frontend/               # React 19 + TypeScript + Vite Single-Page Application
│   ├── src/
│   │   ├── components/     # UI primitives, charts, navigation & layout
│   │   ├── context/        # Auth & Subscriptions state management
│   │   ├── data/           # Types and fixture data
│   │   ├── lib/            # Formatting and date helpers
│   │   └── pages/          # Dashboard, Subscriptions, Businesses, Analytics, etc.
│   ├── public/             # Static assets & icons
│   ├── package.json        # Frontend dependencies & scripts
│   └── vite.config.ts      # Vite configuration with Tailwind CSS v4
│
├── backend/                # Python FastAPI Backend
│   ├── app/
│   │   ├── config.py       # Pydantic v2 settings (SQLite, CORS)
│   │   ├── database.py     # SQLAlchemy engine & session factory
│   │   ├── main.py         # FastAPI application entrypoint
│   │   ├── models/         # SQLAlchemy database models
│   │   ├── routers/        # Route handlers (health, etc.)
│   │   └── schemas/        # Pydantic data validation schemas
│   ├── tests/              # Pytest backend test suite
│   └── requirements.txt    # Python dependencies
│
└── contracts/              # Smart contracts placeholder
```

---

## Quick Start

### 1. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start at `http://localhost:5173`.

### 2. Backend Setup

```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

The backend API will run at `http://localhost:8000`. API docs available at `http://localhost:8000/docs`.

---

## Features

- **Subscription Management**: Full CRUD for subscriptions with cycle tracking, renewal alerts, and status filtering (**All**, **Successful**, **Failed**).
- **Local Business Directory**: Discover verified merchants (gyms, cafes, salons, bookstores) with distance, ratings, and subscription plan tiers.
- **Spending Analytics & Trends**: Monthly burn rate, category distribution donut chart, and yearly projection breakdown.
- **Renewal Reminders**: Automated reminders for upcoming and overdue renewals.
- **Blockchain Transparency Preview**: Information layer for non-sensitive public hash verification.
