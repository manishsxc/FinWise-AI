# FinWise AI - Vercel Deployment Guide

## ✅ Pre-Deployment Checklist

Your project is now production-ready with:
- ✅ All syntax errors fixed (scenario calculations, Suspense boundaries)
- ✅ Next.js 14 production build succeeds
- ✅ All required environment variables documented
- ✅ `vercel.json` configured properly
- ✅ Build artifacts optimized (~87KB shared JS, 43 pages prerendered)

---

## 📋 Required Environment Variables for Vercel

Add these to Vercel Dashboard → Settings → Environment Variables:

### Authentication (REQUIRED)
```
NEXTAUTH_SECRET=<generate-new-secret>
NEXTAUTH_URL=https://your-domain.vercel.app
```
💡 Generate secret: `openssl rand -base64 32`

### Anthropic Claude API (REQUIRED)
```
ANTHROPIC_API_KEY=sk-ant-api03-...
```
Get from: https://console.anthropic.com

### Firebase Web Config (REQUIRED)
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```
Get from: Firebase Console → Project Settings → Download Service Account

### Firebase Admin SDK (REQUIRED)
```
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```
💡 Important: Replace actual newlines with `\n` in private key

### Google OAuth (OPTIONAL)
```
GOOGLE_CLIENT_ID=...apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=...
```
Update callback URL: `https://your-domain.vercel.app/api/auth/callback/google`

### Razorpay (OPTIONAL)
```
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=...
```

### Analytics (OPTIONAL)
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 🚀 Step-by-Step Deployment Process

### Step 1: Prepare GitHub Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Vercel deployment - production build verified"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/your-username/finwise-ai.git

# Push to main branch
git push -u origin main
```

### Step 2: Connect GitHub to Vercel

1. Go to **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Select **"GitHub"** and authenticate
4. Search for your **finwise-ai** repository
5. Click **Import**

### Step 3: Configure Vercel Project Settings

On the **"Configure Project"** page:

**Build & Development Settings:**
- Framework Preset: **Next.js** (should auto-detect)
- Build Command: `npm run build` ✓
- Output Directory: `.next` ✓
- Install Command: `npm install` ✓
- Development Command: `npm run dev` ✓

**Environment Variables:**
- Root directory: `/` (default)
- Node.js Version: **18.x** (matches your setup)

### Step 4: Add Environment Variables to Vercel

Before deploying:

1. Click **"Environment Variables"** section
2. Add ALL required variables from the list above:
   - Click **"Add"**
   - Paste variable name (e.g., `NEXTAUTH_SECRET`)
   - Paste value carefully
   - Click **Save**

**Critical Setup:**
```
NEXTAUTH_SECRET = [new 32-char secret - must be different from .env.local]
NEXTAUTH_URL = https://your-vercel-project.vercel.app
FIREBASE_ADMIN_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\n[actual-key]\n-----END PRIVATE KEY-----\n"
```

⚠️ **Never paste .env.local directly** - create new secrets for production!

### Step 5: Deploy

1. Review all settings
2. Click **"Deploy"**
3. Wait for build to complete (typically 3-5 minutes)

**Watch the build logs:**
- Vercel shows real-time build progress
- Look for ✓ "Build & Deployment" completion
- Check for any warnings/errors

### Step 6: Post-Deployment

After successful deployment:

1. Your app is live at: `https://your-project.vercel.app`
2. Visit your URL and test:
   - ✅ Landing page loads
   - ✅ Login/Register works
   - ✅ Google OAuth works
   - ✅ Dashboard loads
   - ✅ Tools calculate correctly
   - ✅ Firebase saves data

3. **Update OAuth callback URLs:**
   - Google Console: Add `https://your-domain.vercel.app/api/auth/callback/google`
   - Razorpay Dashboard: Update webhook URLs

4. **Claimed domain (optional):**
   - Vercel Dashboard → Settings → Domains
   - Add custom domain (requires DNS configuration)

---

## 🔄 Connecting Custom Domain

### Option A: Using Vercel Nameservers (Recommended)

1. Vercel Dashboard → Project Settings → Domains
2. Add your domain (e.g., finwiseai.com)
3. Copy the nameservers Vercel provides
4. Update your domain registrar:
   - Go to registrar's DNS settings
   - Replace nameservers with Vercel's
   - Wait 24-48 hours for DNS propagation

### Option B: Using CNAME Records

1. Add CNAME record pointing to: `cname.vercel-dns.com`
2. Add TXT verification record provided by Vercel
3. Wait for DNS propagation

---

## 📊 Monitoring & Maintenance

### Check Deployment Health
- Vercel Dashboard → **Deployments** tab
- Each deployment shows build time, page count, bundle size
- Current build: **43 pages**, **~87KB JS**, **Prerendered**

### Enable Analytics
1. Vercel Dashboard → **Analytics**
2. Enable **Web Analytics** (real-time performance)
3. Enable **Speed Insights** (Lighthouse data)

### View Logs
1. **Build Logs:** Vercel Dashboard → Deployments → View Build Logs
2. **Runtime Logs:** Vercel Dashboard → Functions (for API routes)
3. **Error Tracking:** See failed requests and server errors

### Rollback Deployment
If something breaks:
1. Vercel Dashboard → **Deployments**
2. Find the working previous deployment
3. Click **more options** → **Redeploy** or **Promote to Production**

---

## 🔧 Troubleshooting Common Issues

### ❌ Build Fails: "Cannot find module"
**Solution:** 
```bash
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### ❌ Environment Variables Not Found
**Solution:**
1. Check Vercel Dashboard → Settings → Environment Variables
2. Ensure variables are added to **Production** environment
3. Redeploy after adding variables: **Redeploy** button

### ❌ Firebase Authentication Fails
**Solution:**
1. Check `FIREBASE_ADMIN_PRIVATE_KEY` has `\n` between lines
2. Verify Firestore security rules allow reads/writes
3. Check browser console for Firebase errors

### ❌ useSearchParams() Suspense Error
**Solution:** Already fixed in this version. If it recurs:
```tsx
import { Suspense } from 'react';
// Wrap component using useSearchParams()
<Suspense fallback={<LoadingUI />}>
  <ProtectedComponent />
</Suspense>
```

### ❌ 502 Bad Gateway on API Routes
**Solution:**
1. Check function logs: Vercel Dashboard → Functions
2. Verify environment variables are set
3. Check for infinite loops or timeouts in API code

---

## 🔐 Security Checklist

- [ ] Update `NEXTAUTH_SECRET` (generate new for production)
- [ ] Update `NEXTAUTH_URL` to production domain
- [ ] Verify Firebase security rules (not test mode)
- [ ] Set Firestore Database to "Start in production mode"
- [ ] Enable HTTPS redirect (Vercel does automatically)
- [ ] Update Google OAuth redirect URLs
- [ ] Review Firestore security rules:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can access their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /profiles/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /goals/{goalId} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
    // Chat messages only for authenticated user
    match /chats/{userId}/messages/{messageId} {
      allow read, write: if request.auth.uid == userId;
    }
    // Nudges only for authenticated user
    match /nudges/{nudgeId} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

---

## 📈 Performance Optimization

Your build metrics:
- ✅ **First Load JS:** 87.1 kB (good)
- ✅ **Prerendered Pages:** 43 static pages
- ✅ **API Routes:** 7 serverless functions
- ✅ **Build Time:** <1 minute typically

### To further optimize:
1. Enable **Web Analytics** in Vercel for real user monitoring
2. Set up **Speed Insights** to track Core Web Vitals
3. Use **Vercel KV** if needed for caching frequently accessed data

---

## 💡 Pro Tips for Success

1. **Always test locally first:**
   ```bash
   npm run build
   npm run start
   # Visit http://localhost:3000
   ```

2. **Make smallest possible deployments:**
   - Deploy frequently with small changes
   - Easier to identify issues
   - Faster rollback if needed

3. **Use Git branches for staging:**
   ```bash
   git checkout -b staging
   # Push to GitHub
   # Create second Vercel project connected to staging branch
   ```

4. **Monitor Vercel Analytics:**
   - Track real user performance
   - Identify slow endpoints
   - Monitor error rates

5. **Set up GitHub Actions (optional):**
   - Auto-run tests before deployment
   - Prevent broken builds from reaching production

---

## 📞 Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Firebase Support:** https://firebase.google.com/support
- **NextAuth.js:** https://next-auth.js.org

---

## ✨ Deployment Complete!

Your FinWise AI application is now production-ready on Vercel! 🎉

**Next steps:**
1. Share your URL with users
2. Monitor analytics and performance
3. Set up email notifications for deployments
4. Plan future feature deployments using Git flow

---
