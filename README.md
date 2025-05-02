# AarogyaDesk 🏥

AarogyaDesk is a mobile-first, cross-platform OPD and appointment management system tailored for Indian clinics and healthcare providers.

Built with:
- **Frontend**: React Native (via Expo) – works on Android, iOS, and Web
- **Backend**: FastAPI (Python)
- **Database**: Supabase (PostgreSQL + Auth + Storage)

---

## 🚀 Project Setup

### 📁 Folder Structure

```
aarogyadesk/
├── backend/      # FastAPI backend
├── frontend/     # React Native frontend (Expo)
├── supabase/     # DB schema and edge functions
```

---

## 🧠 Requirements

- Python 3.10+
- Node.js 18+
- Supabase account (https://supabase.com)
- Expo CLI (`npm install -g expo-cli`)

---

## ⚙️ Backend Setup (FastAPI)

### 1. Navigate to the backend

```bash
cd backend
```

### 2. Create virtual environment (recommended)

```bash
python -m venv env
source env/bin/activate        # For Windows: env\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Set up environment variables

Create a `.env` file in the root of the `backend` folder:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-or-service-role-key
```

### 5. Run the backend server

```bash
uvicorn app.main:app --reload
```

Visit: [http://localhost:8000/docs](http://localhost:8000/docs) to test the API

---

## 📱 Frontend Setup (Expo)

### 1. Navigate to the frontend

```bash
cd frontend
```

### 2. Install packages

```bash
npm install
```

### 3. Start the app

```bash
npx expo start
```

- Scan the QR code to run on your Android/iOS device
- Press `w` to run on Web

---

## 🔗 Supabase

### Basic Tables to Create

- `appointments`
- `patients`
- `doctors`
- `opd_sessions`
- `prescriptions`

Use the SQL editor or `schema.sql` in the `/supabase` folder.

---

## ✅ TODO

- [ ] Add Supabase row-level security
- [ ] Implement auth and patient registration
- [ ] Create OPD dashboard UI
- [ ] Add push notification system

---

## 👨‍⚕️ Made for modern Indian clinics.

Feel free to fork, contribute, or reach out!
