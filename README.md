# LeadKodiakCRM

> Full-Stack, Multi-Tenant All-In-One CRM, Funnel Builder & Agency Automation Platform (GoHighLevel 1:1 Alternative).

LeadKodiakCRM is a modern, high-performance operating system for digital marketing agencies and local businesses, built with Next.js 15+ App Router, React 19, TypeScript, Tailwind CSS, Lucide icons, and Zustand.

---

## 🚀 Key Modules & Capabilities

### 1. Multi-Tenant Tenancy Architecture
- **Agency Super-Admin View vs. Sub-Account (Location) View**: Instant account switching with search across client locations.
- **SaaS Mode & Rebilling Engine**: Automatic Stripe Connect integration with custom usage markup multipliers (Twilio SMS markup, Mailgun Email markup, Voice Minutes markup, and AI Token markup) to generate automated software profits.
- **Snapshots Engine**: Package and deploy entire sub-account architectures (Funnels, Pipelines, Workflows, Forms, Custom Fields) into portable, conflict-free template bundles.
- **Prospecting Engine**: Local Google Maps business audit tool generating automated sales pitches and GMB audit scores.
- **White-Labeling**: Custom CNAME domain routing (`app.youragency.com`), custom branding, logos, and color palettes.

### 2. Omnichannel Communications & Inbox
- **Unified Inbox**: Real-time SMS (Twilio), Email, WhatsApp, and Web Chat messages in a 3-column stream with contact context, lead tags, and DND permissions.
- **LeadConnector Web Softphone**: Floating browser dialpad for outbound calls with live call timer and mute/speaker controls.
- **Quick Action Launcher (`+`)**: One-click modal to add contacts, deals, appointments, and trigger SMS.
- **Global Search (`⌘K`)**: Rapid search across contacts, opportunities, and navigation pages.

### 3. CRM & Sales Pipeline Management
- **Contacts & Smart Lists**: Column filters, tag filters, smart list tabs, and bulk actions (SMS, Email, Delete, CSV Export).
- **Opportunities & Pipelines**: Horizontal drag-and-drop Kanban board with win probabilities, customizable stages, and aggregate dollar totals.
- **Calendars & Scheduling**: Simple single-provider and Round-Robin weighted lead distribution scheduling with 2-way Google/Outlook sync indicators.

### 4. Visual Builders
- **Sites & Funnels**: Multi-step sales funnels with 1-Click Upsells, Order Bumps, and conversion analytics.
- **Visual Drag-and-Drop Page Builder**: Responsive viewports (Desktop, Tablet 768px, Mobile 375px), element palette (Headings, Paragraphs, Buttons, 2-Step Stripe Order Forms, Countdown Timers), and live element properties inspector.
- **Workflow Automation Engine**: Visual node-based workflow builder (Triggers, Actions, Delays, Conditions/If-Else) with Draft vs. Published status.

### 5. Payments, AI & Marketing
- **Payments & Invoicing**: Invoices, recurring subscriptions, and Text2Pay links.
- **AI Agents**: Autonomous Conversation AI bot modes (Off, Suggestive, Auto-Pilot) and Voice AI phone receptionist synthesizer (ElevenLabs / Cartesia).
- **Reputation Management**: Google & Facebook reviews stream, review request SMS launcher, and AI auto-replies.
- **Marketing Suite**: Social Planner (Facebook, Instagram, LinkedIn, GMB, TikTok), Email Campaigns, and Trigger Links.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router, Server Components)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/), [Lucide Icons](https://lucide.dev/), [Radix UI Primitives](https://www.radix-ui.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Drag-and-Drop & Flowcharts**: `@dnd-kit/core`, `@xyflow/react`
- **Charts & Data**: [Recharts](https://recharts.org/), [date-fns](https://date-fns.org/)
- **Type Safety**: TypeScript 5.7+

---

## 💻 Getting Started

### Prerequisites
- Node.js v20+ or v22+
- npm v10+

### Installation
```bash
# Clone the repository
git clone https://github.com/waleedmangla-source/LeadKodiakCRM.git
cd LeadKodiakCRM

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production
```bash
npm run build
npm run start
```
