<div align="center">

# 🏘️ Gauchar Business Hub

**A local business directory for Gauchar, Uttarakhand — helping the community discover nearby services.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://typescriptlang.org)

</div>

---

## Problem

Small businesses in Gauchar lack digital presence. Locals rely on word-of-mouth to discover services — which means new residents and tourists miss out, and businesses lose customers.

## Solution

Gauchar Business Hub is a hyperlocal directory app with Google Maps integration, business categories, and search — built to work well even on slow mobile connections.

## Features

- 📍 **Google Maps integration** — see businesses on an interactive map
- 🔍 **Category search** — filter by type (food, medical, travel, etc.)
- 📱 **Mobile-first** responsive design
- ⚡ **Fast** — Next.js 15 App Router with static generation

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Maps | Google Maps JavaScript API |
| Deployment | Vercel |

## Setup

```bash
git clone https://github.com/ayyushnegii/gauchar-business-hub.git
cd gauchar-business-hub
npm install
cp .env.example .env.local   # add your GOOGLE_MAPS_API_KEY
npm run dev
```

## Environment Variables

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
```

## License

MIT © [Ayush Negi](https://github.com/ayyushnegii)
