# Gauchar Business Hub 🏔️

A local business discovery and review platform for Gauchar, Uttarakhand. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **Sentiment-Based Rating System**: Instead of star ratings, users choose from:
  - 🏆 Perfection
  - 👍 Go for it
  - 😐 Timepass
  - 👎 Skip

- **Multilingual Support**: Full English + Hindi language support
- **Google Places Integration**: External trust layer with Google ratings (clearly labeled)
- **Smart Filters**: Filter by category, sentiment, and more
- **Mobile-First Design**: Responsive UI that works on all devices
- **Community Driven**: Real experiences from local users

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/ayyushnegii/gauchar-business-hub.git
cd gauchar-business-hub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your API keys
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   └── businesses/        # Business listing & detail pages
├── components/             # Reusable UI components
│   ├── business/          # BusinessCard, CategoryCard
│   ├── review/            # SentimentButton, SentimentBar
│   ├── search/            # SearchBar
│   └── layout/            # Header
├── hooks/                 # Custom React hooks
├── i18n/                  # Translations
├── lib/                   # Utility functions
└── types/                 # TypeScript types
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Context + Hooks
- **i18n**: Custom implementation (EN/HI)
- **Backend** (Planned): Firebase or Supabase
- **Deployment**: Vercel (recommended)

## 🔧 Environment Variables

Create a `.env.local` file with:

```env
# Google APIs
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_google_places_api_key

# Firebase (Option 1)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com

# OR Supabase (Option 2)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📖 Documentation

See [documenting.md](./documenting.md) for comprehensive documentation about:
- Architecture overview
- Component details
- Type definitions
- Pending features
- Deployment guide

## 🎯 Current Status

✅ **Completed (MVP)**:
- Sentiment-based rating system
- Homepage with categories and search
- Business listing with filters
- Business detail page
- Multilingual support (EN/HI)
- TypeScript types and utilities
- Responsive design

⏳ **Pending**:
- Google Maps/Places API integration
- User authentication
- Backend database (Firebase/Supabase)
- Media upload system
- Real-time data fetching

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - see LICENSE file for details.

## 👤 Author

**Ayush Negi** (@ayyushnegii)
- GitHub: [ayyushnegii](https://github.com/ayyushnegii)
- Portfolio: [ayyushportfolio.vercel.app](https://ayyushportfolio.vercel.app)

## 🙏 Acknowledgments

- Inspired by Letterboxd's sentiment-based rating system
- Built for the community of Gauchar, Uttarakhand
- Designed to scale from Gauchar → Chamoli → Uttarakhand → Beyond
