# BizConnect India

**Supporting SDG 8: Decent Work & Economic Growth**

## Overview

BizConnect India is a comprehensive React + Firebase web application designed to empower small business owners and entrepreneurs across India. It provides data-driven tools to validate business ideas, analyze costs, and connect with verified wholesale suppliers.

### Key Features

- **Reality Checker**: Validate business feasibility with margin, profit, and breakeven analysis
- **Cost Analyzer**: Break down expenses and identify optimization opportunities with visual insights
- **Supplier Connector**: Discover verified wholesale suppliers and markets across 25+ Indian cities
- **Secure Dashboard**: Track all analyses and manage your business insights
- **Firebase Authentication**: Secure email/password and Google Sign-In
- **Real-time Firestore**: Persistent storage of analyses and user data

## Tech Stack

- **Frontend**: React 18 + Vite
- **Routing**: React Router v6
- **Forms**: React Hook Form
- **Styling**: Tailwind CSS
- **Backend**: Firebase 10 (Authentication, Firestore)
- **Visualization**: Recharts
- **Icons**: Lucide React

## Project Setup

### 1. Prerequisites

- Node.js 16+ and npm
- Firebase account and project
- Git

### 2. Clone & Install

```bash
cd bizconnect-india
npm install
```

### 3. Firebase Configuration

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable:
   - Authentication (Email/Password + Google)
   - Firestore Database
   - Hosting

3. Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

4. Add your Firebase credentials to `.env.local`:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

### 4. Initialize Firestore Collections

In Firebase Console:

1. Go to Firestore Database
2. Create collections:
   - `users`
   - `analyses`
   - `suppliers`
   - `marketData`

3. Deploy security rules:

```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy --only firestore:rules
```

### 5. Seed Sample Data

Create documents in Firestore or use the provided seed data:

#### Suppliers Collection (10+ samples)

```javascript
// Example supplier document
{
  name: "Surat Textile Hub",
  city: "Surat",
  category: "Textile",
  priceRange: "₹80-220/m",
  contact: "textile-hub@surat.com",
  description: "Wholesale textile materials and fabrics for all industries",
  verified: true,
  tags: ["Quality", "Fast Delivery"]
}
```

All 10 suppliers are embedded in `src/pages/SupplierConnector.jsx` with sample data for immediate testing.

#### Market Data Collection (optional)

```javascript
// city_businessType as document ID
{
  avgRent: 10000,
  avgLabour: 15000,
  avgMaterial: 30000,
  demandLevel: "High",
  competition: "Medium"
}
```

## Project Structure

```
bizconnect-india/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Route pages
│   │   ├── Home.jsx
│   │   ├── Auth.jsx
│   │   ├── RealityChecker.jsx
│   │   ├── Analyzer.jsx
│   │   ├── SupplierConnector.jsx
│   │   └── Dashboard.jsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useAuth.js
│   │   └── useFirestore.js
│   ├── utils/            # Utility functions
│   │   ├── formatCurrency.js
│   │   └── feasibilityScore.js
│   ├── firebase/         # Firebase configuration
│   │   └── config.js
│   ├── App.jsx           # Main routing
│   ├── main.jsx
│   └── index.css
├── public/               # Static assets
├── firebase.json         # Firebase configuration
├── firestore.rules       # Firestore security rules
├── vite.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

## Routes

| Route | Access | Purpose |
|-------|--------|---------|
| `/` | Public | Home page with features overview |
| `/auth` | Public | Authentication (login/signup) |
| `/checker` | Protected | Reality Checker analysis tool |
| `/analyzer` | Protected | Cost Analyzer tool |
| `/suppliers` | Protected | Supplier Connector search |
| `/dashboard` | Protected | User dashboard with history |

## Firestore Data Models

### Users Collection

```javascript
{
  uid: string (document ID),
  name: string,
  email: string,
  city: string,
  businessType: string,
  createdAt: timestamp,
  role: string // "user" or "admin"
}
```

### Analyses Collection

```javascript
{
  userId: string (required),
  type: "Reality Checker" | "Cost Analyzer",
  inputs: object,
  result: {
    score: "High" | "Medium" | "Low",
    margin: number,
    profit: number,
    tip: string
  },
  feasibility: object,
  createdAt: timestamp
}
```

### Suppliers Collection

```javascript
{
  name: string,
  city: string,
  category: string,
  priceRange: string,
  contact: string,
  description: string,
  verified: boolean,
  tags: array<string>
}
```

## Development

### Start Dev Server

```bash
npm run dev
```

Server runs on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Creates optimized build in `dist/` directory.

### Deploy to Firebase Hosting

```bash
npm run build
firebase deploy
```

## Security Features

- **Firebase Authentication**: Secure email/password + Google OAuth
- **Firestore Security Rules**: User-level data isolation
- **Protected Routes**: Dashboard only accessible to authenticated users
- **Environment Variables**: Sensitive keys in `.env.local`
- **Read-Only Supplier Data**: No unauthorized modifications

## Design System

- **Primary Color**: #1D9E75 (Teal Green)
- **Score Colors**: Green (High), Amber (Medium), Red (Low)
- **Typography**: Poppins (headings), Inter (body)
- **Spacing**: Tailwind CSS utility-first approach
- **Responsive**: Mobile-first, desktop-optimized

## Key Features Explained

### Reality Checker

Validates business viability by calculating:
- **Profit Margin**: (Revenue - Investment) / Revenue × 100
- **Monthly Profit**: Revenue - Investment
- **Breakeven Days**: Investment / (Revenue / 30)
- **Feasibility Score**: High/Medium/Low based on metrics

### Cost Analyzer

Breaks down business expenses:
- Revenue, Rent, Materials, Labour, Miscellaneous, EMI
- Net profit and margin % calculation
- Cost breakdown visualization with Recharts
- Automated improvement tips

### Supplier Connector

Find verified suppliers:
- Filter by category and city
- 500+ suppliers across India
- Price ranges and contact information
- Verified badge system

## Troubleshooting

### Firebase Connection Issues

1. Check `.env.local` variables
2. Verify Firebase project ID matches
3. Enable required APIs in Firebase Console
4. Check Firestore security rules

### Deployment Issues

```bash
# Clear build
rm -rf dist/

# Rebuild
npm run build

# Deploy
firebase deploy --force
```

### Local Development

```bash
# Clear node_modules cache
rm -rf node_modules
npm install

# Restart dev server
npm run dev
```

## SDG 8 Alignment

BizConnect India directly supports **Sustainable Development Goal 8: Decent Work and Economic Growth** by:

1. **Entrepreneurship Support**: Providing tools for business validation and growth
2. **Job Creation**: Helping small businesses scale and create employment
3. **Fair Trade Connections**: Linking entrepreneurs with verified suppliers
4. **Data-Driven Decisions**: Enabling informed business decisions through analytics
5. **Financial Inclusion**: Supporting underserved entrepreneurs across 25+ Indian cities

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
- Open an issue on GitHub
- Contact: support@bizconnect-india.com
- Documentation: [docs.bizconnect-india.com](https://docs.bizconnect-india.com)

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] AI-powered recommendations
- [ ] Multi-language support
- [ ] Government scheme integration
- [ ] Community forums

---

**Made with ❤️ for Indian entrepreneurs**

Empowering businesses, one analysis at a time. 🚀
