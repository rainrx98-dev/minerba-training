# MINERBA Crisis Intelligence Training

A bilingual (English / Spanish) web application for training Minerba Comunicación Corporativa consultants on energy sector PR crises.

**Built by:** Rice Jones MBA Consulting Team — Global Field Experience 2026  
**Client:** Minerba Comunicación Corporativa, Buenos Aires

---

## What This App Does

- **10 Energy Sector Case Studies** — Exxon Valdez, BP Deepwater Horizon, Petrobras Lava Jato, Chevron Ecuador, and more
- **Crisis Simulation Chat** — AI-powered roleplay where consultants practice live decision-making as a Minerba PR consultant
- **Minerba Frameworks** — 72-Hour Protocol, FPIC/Consulta Previa Checklist, Anti-Corruption Market Entry Checklist
- **Bilingual** — Full English and Spanish support
- **Filter & Browse** — Filter cases by region, crisis type, and PR rating

---

## Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18 or higher ([nodejs.org](https://nodejs.org))
- npm (comes with Node.js)

### 2. Install dependencies
```bash
cd minerba-training
npm install
```

### 3. Set up your API key
```bash
cp .env.local.example .env.local
```
Then open `.env.local` and replace `sk-ant-api03-your-key-here` with your real Anthropic API key.

**Getting an API key:**
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create a free account
3. Go to **API Keys** → **Create Key**
4. Add $10–20 in credits (will last months at training usage levels)
5. Copy the key into `.env.local`

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en` automatically.

---

## Deploying to Vercel (Recommended — Free Hosting)

### One-time setup

1. **Push this project to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial MINERBA training app"
   # Create a new repo on github.com, then:
   git remote add origin https://github.com/YOUR_USERNAME/minerba-training.git
   git push -u origin main
   ```

2. **Create a Vercel account** at [vercel.com](https://vercel.com) (free)

3. **Import your GitHub repo** on Vercel:
   - Click "Add New Project"
   - Connect your GitHub account
   - Select the `minerba-training` repo
   - Click **Deploy** (Vercel auto-detects Next.js)

4. **Add your API key** in Vercel:
   - Go to your project → **Settings** → **Environment Variables**
   - Add: `ANTHROPIC_API_KEY` = your key value
   - Click Save, then **Redeploy**

5. **Share the URL** with MINERBA — it will look like `minerba-training.vercel.app`

### Updates
Every time you push to GitHub, Vercel auto-redeploys. No manual steps needed.

---

## Handing Off to MINERBA

When transferring this project to MINERBA's team:

1. **Transfer the GitHub repo** to their account (Settings → Transfer)
2. **Transfer the Vercel project** (Settings → Transfer Project) or have them redeploy from their own GitHub fork
3. **They create their own Anthropic account** and add their API key to Vercel environment variables
4. Share this README with their technical contact

**Estimated ongoing cost for MINERBA:**
- Vercel hosting: **$0/month** (free tier is sufficient)
- Anthropic API: **$3–10/month** at normal training usage (10-20 sessions/week)

---

## Project Structure

```
minerba-training/
├── app/
│   ├── [locale]/              # All pages (en/es)
│   │   ├── layout.tsx         # Locale layout with nav + footer
│   │   ├── page.tsx           # Home / Dashboard
│   │   ├── cases/
│   │   │   ├── page.tsx       # Case browser with filters
│   │   │   └── [id]/
│   │   │       └── page.tsx   # Individual case study
│   │   └── quiz/
│   │       └── [id]/
│   │           └── page.tsx   # Crisis simulation chat
│   └── api/
│       └── chat/
│           └── route.ts       # Claude API streaming endpoint
├── components/                # Reusable UI components
├── content/cases/             # 10 case study markdown files
├── lib/
│   ├── cases.ts               # Case data parsing & utilities
│   └── quiz-prompts.ts        # AI system prompts for each case
├── messages/
│   ├── en.json                # English translations
│   └── es.json                # Spanish translations
└── .env.local.example         # Environment variables template
```

---

## Adding New Cases

1. Create a new markdown file in `content/cases/` following the frontmatter schema in existing files
2. Add a quiz scenario in `lib/quiz-prompts.ts`
3. The case will automatically appear in the browser and be available for simulation

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Internationalization | next-intl (EN/ES) |
| AI | Anthropic Claude (claude-opus-4-6) |
| Markdown | react-markdown + remark-gfm |
| Content | Gray-matter (YAML frontmatter) |
| Hosting | Vercel (recommended) |

---

*MINERBA Comunicación Corporativa — Crisis Intelligence Training · Rice Jones MBA 2026*
