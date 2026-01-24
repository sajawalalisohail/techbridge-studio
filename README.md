# TechBridge - Modern Software Studio Website

A premium, studio-style website built with Next.js 15, featuring smooth scrolling, subtle animations, and a complete lead management system.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Smooth Scroll**: Lenis
- **Backend**: Supabase (Auth + Database)
- **Deployment**: Vercel

## Features

- Modern, minimal design with large typography
- Smooth scrolling experience (desktop)
- Scroll-reveal animations
- Responsive design (mobile-first)
- Lead capture form with validation
- Protected admin dashboard
- Dark mode support

## Pages

1. **Home** - Hero, services, work samples, process, FAQ
2. **Services** - Detailed service offerings with pricing
3. **Work** - Portfolio/sample builds
4. **Process** - Development methodology
5. **Quote** - Lead intake form
6. **Admin** - Protected leads dashboard

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd techbridge
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

4. Set up Supabase database:
   - Go to your Supabase dashboard
   - Open the SQL Editor
   - Run the schema from `lib/supabase/schema.sql`

5. Create an admin user:
   - Go to Supabase Dashboard > Authentication > Users
   - Click "Add user" and create an admin account

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
techbridge/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Protected admin dashboard
│   ├── process/           # Process page
│   ├── quote/             # Lead intake form
│   ├── services/          # Services page
│   ├── work/              # Portfolio page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── sections/          # Page sections
│   └── ui/                # Reusable components
├── lib/
│   ├── supabase/          # Supabase clients
│   └── utils.ts           # Helper functions
├── providers/
│   └── LenisProvider.tsx  # Smooth scroll
├── types/
│   └── index.ts           # TypeScript types
└── public/                # Static assets
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Make sure to set these in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Customization

### Colors

Edit CSS variables in `app/globals.css`:
```css
:root {
  --background: #fafafa;
  --foreground: #0a0a0a;
  --muted: #f5f5f5;
  --muted-foreground: #737373;
  --border: #e5e5e5;
  --accent: #0a0a0a;
  --accent-foreground: #fafafa;
}
```

### Typography

Edit font sizes in `tailwind.config.ts`:
```typescript
fontSize: {
  'display': ['4.5rem', { lineHeight: '1.1' }],
  'headline': ['3rem', { lineHeight: '1.2' }],
}
```

### Content

- Edit service offerings in `components/sections/ServicesGrid.tsx`
- Edit FAQ items in `components/sections/FAQ.tsx`
- Edit process steps in `components/sections/ProcessSection.tsx`
- Edit sample projects in `components/sections/SelectedWork.tsx`

## License

Private - All rights reserved.

## Support

For questions or issues, contact hello@techbridge.dev
