# Gauchar Local Business Discovery Platform Prompt

I want to build a local business discovery and review platform for Gauchar.

The goal is to help users find the best local businesses based on real experiences, not just numerical ratings.

## 1. Categories

The platform should include:

- Hotels & stays
- Restaurants & food
- Phone & laptop repair
- Grocery & general stores
- Medical & pharmacy
- Transport & travel

## 2. Rating System (Core Feature)

Instead of traditional star ratings, use a sentiment-based system inspired by Letterboxd-style reviews:

- Perfection
- Go for it
- Timepass
- Skip

Each user must:
- Select one category
- Optionally write a short review

The platform should:
- Show total votes for each category
- Show percentage distribution
- Highlight the dominant sentiment

## 3. Google Maps Integration (External Trust Layer)

Integrate Google Places API to fetch:
- Business name
- Address and coordinates
- Google rating and total reviews
- Photos (via API only, do NOT store permanently)

Convert Google rating into an initial sentiment label:
- 4.6–5.0 → Perfection
- 4.0–4.5 → Go for it
- 3.0–3.9 → Timepass
- Below 3.0 → Skip

Important rules:
- Do NOT merge Google ratings with platform sentiment
- Show both separately
- Clearly label Google data as external

## 4. Media System (Hybrid Content)

The platform should support:

**Google Content:**
- Images displayed using API (not stored)

**User-Generated Content:**
- Photo uploads
- Short video uploads (optional but supported)

Requirements:
- Clearly label content source (Google vs User)
- Build a combined gallery view

## 5. Business Listing Structure

Each business page should include:
- Name
- Category
- Address + map view
- Contact number
- WhatsApp link
- Opening hours

Sections:
- **Google Insights**: Rating, Review count, Photos
- **Community Sentiment**: Moctale-style distribution, User reviews
- **Media Gallery**: Google images, User photos/videos

## 6. Core Features
- User authentication (only registered users can review)
- Search functionality (e.g., "Chinese food near me")
- Filters: Category, Sentiment (Perfection, Go for it, etc.), Open now
- Map-based discovery view
- Mobile-first responsive design
- Multilingual support (English + Hindi)

## 7. Ranking Logic (Important)

Do NOT manually rank businesses.

Instead:
- Show sentiment distribution
- Highlight most selected category
- Allow sorting by: Most "Perfection" votes, Most reviews, Recently reviewed

## 8. Technical Requirements

Suggest a beginner-friendly stack:
- **Frontend**: Next.js or simple React + Tailwind CSS
- **Backend**: Firebase or Supabase
- **Database**: Firestore / PostgreSQL
- **Authentication**: Firebase Auth / Supabase Auth
- **Storage**: Firebase Storage / Supabase Storage (for user media)
- **Maps & Places**: Google Maps API + Places API
- **Hosting**: Vercel

## 9. Database Design

Provide schema for:
- Users
- Businesses
- Reviews (with sentiment category)
- Media (user uploads)
- Saved/Favorite places (optional)

## 10. UI/UX Structure

Design:
- Homepage (search + categories + featured places)
- Listing page (filters + map + results)
- Business detail page (full info + sentiment + media)
- Review submission flow (simple and fast)

## 11. Compliance & Data Rules
- Do NOT scrape Google Maps
- Use official APIs only
- Do NOT store Google images permanently
- Follow API usage policies

## 12. Scalability Plan

Design the system so it can expand from:
Gauchar → Chamoli → Entire Uttarakhand → Other regions

Ensure database and structure support multi-location scaling.

## 13. Output Requirement

Provide:
- Step-by-step development plan
- Tech setup guide
- Database schema
- UI wireframe explanation
- API integration steps

Keep everything beginner-friendly but scalable.
