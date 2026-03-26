# FinWise AI — Firebase Setup (5 Minutes)

## Step 1: Firebase Setup (3 minutes)

### 1.1 Create Firebase Project (FREE)
1. Go to **https://firebase.google.com**
2. Click **"Get started"** → **"Add project"**
3. Enter project name: `finwise-ai`
4. Disable Google Analytics (optional) → **Create project**

### 1.2 Get Web App Config
1. Click **"</>"** (Web) icon on project homepage
2. Register app name: `finwise-web`
3. **Copy the config object** — you'll need it shortly

### 1.3 Enable Firestore Database
1. Left sidebar → **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (allows all reads/writes — fine for demo)
4. Select **asia-south1 (Mumbai)** → **Done**

### 1.4 Get Admin Service Account Key
1. Project Settings (gear icon) → **Service accounts** tab
2. Click **"Generate new private key"**
3. Download the JSON file — keep it safe!
4. You need: `project_id`, `client_email`, `private_key` from this JSON

---

## Step 2: Get API Keys (2 minutes)

### Anthropic Claude API (FREE $5 credit)
1. Go to **https://console.anthropic.com**
2. Sign up → API Keys → **Create key**
3. Copy: `sk-ant-api03-...`

### Google OAuth (for Google Sign-In — optional)
1. **https://console.cloud.google.com**
2. APIs & Services → Credentials → **Create OAuth 2.0 Client ID**
3. Application type: **Web application**
4. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
5. Copy Client ID and Client Secret

---

## Step 3: Configure .env.local

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
# Required — generate with: openssl rand -base64 32
NEXTAUTH_SECRET=your-32-char-secret-here
NEXTAUTH_URL=http://localhost:3000

# Required — from Anthropic
ANTHROPIC_API_KEY=sk-ant-api03-your-key

# Required — from Firebase Web App Config
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy-your-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Required — from Firebase Service Account JSON
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"

# Optional — Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

> **Private key tip:** Open the downloaded JSON, find `private_key`, copy the entire value including `-----BEGIN...-----END-----`. Replace actual newlines with `\n`.

---

## Step 4: Run the App

```bash
npm install
npm run dev
```

Open **http://localhost:3000** ✅

**No database migrations needed!** Firebase Firestore auto-creates collections when data is first written.

---

## What's Working

| Feature | Status |
|---------|--------|
| Landing page | ✅ Full — SEO, mobile, PWA |
| Google OAuth | ✅ Real — users saved to Firestore |
| Email/password login | ✅ Real — bcrypt hashed in Firestore |
| FIRE Calculator | ✅ Working + saves to profile |
| Tax Wizard | ✅ FY2025-26, old+new regime |
| MF X-Ray | ✅ XIRR, overlap, expense ratio |
| Money Health Score | ✅ 6-dimension, saves to Firestore |
| Scenario Simulator | ✅ 6 life scenarios |
| AI Chatbot | ✅ Claude API + Hinglish + history saved |
| Goals CRUD | ✅ Real Firestore — create/update/delete |
| Dashboard | ✅ Real data from Firestore |
| Privacy Policy | ✅ Full 10-section legal page |
| Terms of Service | ✅ Full SEBI-compliant |
| Footer | ✅ App Store, Play Store, PWA, legal |
| Sitemap + robots.txt | ✅ SEO ready |
| Security headers | ✅ XSS, HSTS |

---

## Firebase Firestore Collections

Collections auto-created on first use:

```
users/          → { name, email, password, plan, provider, createdAt }
profiles/       → { userId, moneyScore, fireResult, taxResult, mfResult, ... }
goals/          → { userId, name, icon, targetAmount, savedAmount, ... }
chats/{userId}/messages/ → { role, content, createdAt }
nudges/         → { userId, type, message, read, createdAt }
```

---

## Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

Add all `.env.local` variables in Vercel Dashboard → Settings → Environment Variables.

---

## Hackathon Demo Script (5-7 minutes)

1. **Landing page** → scroll through features, show pricing
2. **Register** with Google or email → lands on dashboard
3. **Dashboard** → explain Money Score, nudges
4. **Tools → FIRE Planner** → age 28, income ₹80K, retire at 50 → show results
5. **Tools → Tax Wizard** → salary ₹12L → show old vs new regime, missing deductions
6. **AI Advisor** → type in Hindi: "Mera SIP kitna hona chahiye?"
7. **Goals** → create "Dream Home ₹40L" goal
8. **Scenario → Job Loss** → show runway calculation
9. Show **Firestore console** to prove data is really being saved

---

## Support

- Setup issues: engineering@finwise.ai
- Demo questions: team@finwise.ai
