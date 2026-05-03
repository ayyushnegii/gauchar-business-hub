# Gauchar Business Hub - Project Documentation

## Overview

Gauchar Business Hub is a local business discovery and review platform for Gauchar, Uttarakhand. Unlike traditional rating systems that use star ratings, this platform uses a **sentiment-based rating system** inspired by Letterboxd, where users select from four sentiment categories: **Perfection**, **Go for it**, **Timepass**, or **Skip**.

## Core Philosophy

The platform helps users find the best local businesses based on **real experiences**, not just numerical ratings. It combines:
- Community sentiment (user-generated sentiment votes)
- Google Places data (external trust layer)
- Multilingual support (English + Hindi)
- Mobile-first responsive design

## Tech Stack

- **Frontend**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript with strict mode
- **State Management**: React hooks (useState, useContext)
- **Internationalization**: Custom i18n implementation with context API
- **Planned Backend**: Firebase or Supabase (authentication, database, storage)
- **Planned APIs**: Google Places API, Google Maps JavaScript API
- **Hosting**: Vercel (recommended)

## Project Structure

```
gauchar-business-hub/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout with LanguageProvider
│   │   ├── page.tsx                  # Homepage
│   │   ├── globals.css               # Global styles
│   │   ├── businesses/
│   │   │   ├── page.tsx             # Business listing with filters
│   │   │   └── [id]/
│   │   │       └── page.tsx         # Business detail page
│   │   └── favicon.ico
│   ├── components/                   # Reusable UI components
│   │   ├── business/
│   │   │   ├── BusinessCard.tsx     # Business card for listings
│   │   │   └── CategoryCard.tsx    # Category selection card
│   │   ├── layout/
│   │   │   └── Header.tsx          # App header with nav & language switcher
│   │   ├── review/
│   │   │   ├── SentimentButton.tsx  # Sentiment selection button
│   │   │   └── SentimentBar.tsx    # Visual sentiment distribution bar
│   │   └── search/
│   │       └── SearchBar.tsx        # Search input component
│   ├── hooks/
│   │   └── useLanguage.tsx          # Language context provider & hook
│   ├── i18n/
│   │   └── translations.ts          # EN/HI translation dictionaries
│   ├── lib/
│   │   └── constants.ts            # Utility functions (rating conversion, percentages)
│   └── types/
│       └── index.ts                 # TypeScript type definitions
├── public/                          # Static assets
├── .env.local.example               # Environment variables template
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

## Core Features Implemented

### 1. Sentiment-Based Rating System

**Files**: `src/types/index.ts`, `src/components/review/SentimentButton.tsx`, `src/components/review/SentimentBar.tsx`

Instead of 1-5 star ratings, users choose a sentiment:
- **Perfection** (🏆) - 4.6-5.0 Google rating equivalent
- **Go for it** (👍) - 4.0-4.5 Google rating equivalent  
- **Timepass** (😐) - 3.0-3.9 Google rating equivalent
- **Skip** (👎) - Below 3.0 Google rating equivalent

**Key Functions** (`src/lib/constants.ts`):
```typescript
// Convert Google rating to sentiment
googleRatingToSentiment(rating: number): Sentiment

// Calculate percentage distribution
calculateSentimentPercentages(sentimentCounts): Record<Sentiment, number>

// Get dominant sentiment
getDominantSentiment(sentimentCounts): Sentiment | null
```

### 2. Multilingual Support (EN/HI)

**Files**: `src/hooks/useLanguage.tsx`, `src/i18n/translations.ts`

- React Context API for language state management
- Persists language preference in localStorage
- Translation keys defined for all UI strings
- Language switcher in header (dropdown)

**Usage**:
```typescript
const { language, setLanguage, t } = useLanguage();
// t('key') returns translated string
```

### 3. Homepage (`src/app/page.tsx`)

Features:
- Hero section with search bar
- Category grid (6 business categories with emojis)
- Featured businesses section (dummy data)
- "How It Works" section (3-step explanation)
- Fully responsive, gradient background

### 4. Business Listing Page (`src/app/businesses/page.tsx`)

Features:
- Search section (reuses SearchBar component)
- Filter sidebar:
  - Filter by Category (6 categories)
  - Filter by Sentiment (4 sentiments)
- Sort dropdown (Perfection count, Reviews, Recent)
- Responsive grid layout (1/2/3 columns)
- Real-time filtering based on state

**Props Pattern** (Next.js 13+):
```typescript
interface BusinessesPageProps {
  searchParams: { category?: string; q?: string };
}
```

### 5. Business Detail Page (`src/app/businesses/[id]/page.tsx`)

Sections:
1. **Hero** - Business name, category, address
2. **Info Cards** - Contact, WhatsApp, Hours, Address
3. **Google Insights** - External Google rating (clearly labeled)
4. **Community Sentiment** - Platform sentiment distribution
5. **Write Review** - Sentiment selection + comment form
6. **Reviews List** - User reviews with avatars
7. **Sidebar** - Map placeholder + directions link

**Design Decision**: Google rating and platform sentiment are displayed **separately** with clear labeling to avoid confusion.

### 6. Component Library

#### SentimentButton
- Visual sentiment selection with emoji + label
- Selected/unselected states with different color schemes
- Optional count badge
- Color-coded: Yellow (Perfection), Green (Go for it), Gray (Timepass), Red (Skip)

#### SentimentBar
- Stacked bar chart showing sentiment distribution
- Percentage labels for each sentiment
- Dominant sentiment indicator
- Total votes display

#### BusinessCard
- Image or emoji placeholder
- Category badge
- Business name and address
- Google rating display (external)
- SentimentBar integration

#### CategoryCard
- Emoji icon + category name
- Color-coded backgrounds per category
- Optional business count
- Hover effects

#### SearchBar
- Controlled input with form submission
- Full-width with rounded design
- Integrated search button

#### Header
- Logo with emoji
- Navigation links (Home, Search)
- Language switcher dropdown
- Sign in button (placeholder)

## Type Definitions (`src/types/index.ts`)

```typescript
type Sentiment = 'perfection' | 'go_for_it' | 'timepass' | 'skip';

type BusinessCategory = 'hotels' | 'restaurants' | 'repair' | 'grocery' | 'medical' | 'transport';

interface Business {
  id: string;
  name: string;
  category: BusinessCategory;
  address: string;
  coordinates: { lat: number; lng: number };
  contactNumber?: string;
  whatsappLink?: string;
  openingHours?: string;
  googleRating?: number;
  googleReviewCount?: number;
  googlePhotos?: string[];
  sentimentCounts: Record<Sentiment, number>;
  reviews: Review[];
  userMedia: Media[];
}

interface Review {
  id: string;
  businessId: string;
  userId: string;
  userName: string;
  sentiment: Sentiment;
  text?: string;
  createdAt: Date;
}

type Language = 'en' | 'hi';
```

## Environment Configuration

Copy `.env.local.example` to `.env.local` and fill in:

```env
# Google APIs
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_key_here

# Firebase (Option 1)
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# OR Supabase (Option 2)
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## Build & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## What's Next (Pending Features)

### 1. Google Maps/Places API Integration
- [ ] Fetch real business data from Google Places API
- [ ] Display Google Maps with business markers
- [ ] Get Google ratings and reviews
- [ ] Show Google photos (API only, no permanent storage)
- [ ] Convert Google rating to initial sentiment label

### 2. User Authentication
- [ ] Integrate Firebase Auth or Supabase Auth
- [ ] Sign up / Sign in flows
- [ ] Protected routes (only logged-in users can review)
- [ ] User profiles with review history

### 3. Backend Database
- [ ] Choose: Firestore (Firebase) or PostgreSQL (Supabase)
- [ ] Create collections/tables:
  - `users` - User profiles
  - `businesses` - Business data
  - `reviews` - Sentiment reviews
  - `media` - User-uploaded photos/videos
  - `saved_places` - User favorites
- [ ] Real-time data fetching
- [ ] Optimistic UI updates

### 4. Media Upload System
- [ ] Firebase Storage / Supabase Storage setup
- [ ] Photo upload component
- [ ] Video upload (optional, with size limits)
- [ ] Combined gallery view (Google + User media)
- [ ] Content labeling (Google vs User)

### 5. Advanced Features
- [ ] "Near me" geolocation search
- [ ] "Open now" filter (parse opening hours)
- [ ] Map-based discovery view
- [ ] Sort by: Most Perfection, Most Reviews, Recent
- [ ] Pagination or infinite scroll
- [ ] Business owner claims/dashboards

### 6. Scalability
- [ ] Multi-location support (Gauchar → Chamoli → Uttarakhand)
- [ ] Location-based database queries
- [ ] Regional language expansion beyond Hindi

## Design Principles

1. **No Merging**: Google ratings and platform sentiment are NEVER merged. They're displayed separately with clear labeling.
2. **External Data Labeling**: All Google-sourced data is labeled as "(External Data)".
3. **Mobile-First**: All components are responsive and touch-friendly.
4. **No Scraping**: Only official Google APIs are used (compliance with ToS).
5. **No Permanent Storage of Google Images**: Google photos are displayed via API URLs only.

## Compliance & Legal

- ✅ Using official Google Places API (not scraping)
- ✅ Not storing Google images permanently
- ✅ Clearly labeling external data
- ⏳ API usage quotas monitoring (pending)
- ⏳ Privacy policy (pending)
- ⏳ Terms of service (pending)

## Deployment

**Recommended**: Vercel (seamless Next.js integration)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

## Contributors

- Ayush Negi (@ayyushnegii) - Creator

## License

MIT (or specify your preferred license)

---

**Last Updated**: May 3, 2026  
**Status**: MVP Complete (Frontend), Backend Integration Pending
