# BizConnect India - Development Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Firebase**
   - Go to https://firebase.google.com
   - Create a new project
   - Enable: Authentication (Email/Password + Google), Firestore
   - Copy credentials to `.env.local`

3. **Start Development**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm run preview
   ```

5. **Deploy**
   ```bash
   firebase init
   firebase deploy
   ```

## Important Files

- `src/firebase/config.js` - Firebase initialization
- `.env.local` - Environment variables (keep secure!)
- `firestore.rules` - Security rules
- `firebase.json` - Firebase configuration

## Frontend Routes

```
/ - Public home page
/auth - Public auth page
/checker - Protected (Reality Checker)
/analyzer - Protected (Cost Analyzer)
/suppliers - Protected (Supplier Connector)
/dashboard - Protected (User Dashboard)
```

## Firestore Collections to Create

1. `users` - User profiles
2. `analyses` - Business analyses results
3. `suppliers` - Supplier database (10+ samples provided)
4. `marketData` - Market information

## Testing

1. Sign up with email at `/auth`
2. Navigate to `/checker` to analyze a business
3. Try `/analyzer` for cost breakdown
4. Search `/suppliers` by city/category
5. View history at `/dashboard`

Good luck! 🚀
