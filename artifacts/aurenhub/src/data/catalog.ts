export interface Skill {
  id: string;
  name: string;
  desc: string;
  icon: string;
  iconName?: string;
  publisher: string;
  installs: string;
  rating: number;
  tags: string[];
  featured: boolean;
  trending: boolean;
  color: string;
  longDesc?: string;
  version?: string;
  updated?: string;
}

export interface Plugin {
  id: string;
  name: string;
  desc: string;
  icon: string;
  iconName?: string;
  publisher: string;
  installs: string;
  rating: number;
  tags: string[];
  featured: boolean;
  color: string;
}

export interface Publisher {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  skills: number;
  plugins: number;
  verified: boolean;
  bio: string;
  color: string;
}

export const SKILLS: Skill[] = [
  { id: "self-healing", iconName: "tool", name: "Self-Healing Agent", desc: "Automatically detects and fixes runtime errors, restarts crashed services, and patches broken workflows.", icon: "🔧", publisher: "AuRen Labs", installs: "124K", rating: 4.9, tags: ["automation", "debug", "AI"], featured: true, trending: true, color: "#0f62fe", version: "2.4.1", updated: "2 days ago", longDesc: "This skill monitors your running processes and automatically applies fixes when errors are detected. It uses a 3-phase self-healing loop: Detect → Patch → Verify." },
  { id: "github-integration", iconName: "git", name: "GitHub Integration", desc: "Full GitHub API integration — create PRs, review code, manage issues, and trigger actions from natural language.", icon: "⌀", publisher: "DevTools Guild", installs: "98K", rating: 4.8, tags: ["git", "devops", "integration"], featured: true, trending: true, color: "#ffffff", version: "3.1.0", updated: "1 week ago", longDesc: "Connect AuRen to your GitHub repositories. Create pull requests, review code changes, manage issues, and trigger CI/CD pipelines using natural language commands." },
  { id: "email-manager", iconName: "mail", name: "Email Manager", desc: "Read, compose, send and organise email across Gmail and Outlook. Supports auto-reply, label management and smart filtering.", icon: "✉️", publisher: "CloudPost AI", installs: "76K", rating: 4.7, tags: ["email", "productivity", "Gmail"], featured: true, trending: false, color: "#ea4335", version: "1.8.3", updated: "3 days ago", longDesc: "Manage all your email workflows with AuRen. Supports Gmail, Outlook, and any IMAP/SMTP server. Auto-label, auto-reply, and smart filtering included." },
  { id: "web-scraper", iconName: "spider", name: "Web Scraper", desc: "Extract data from any website with CSS selectors or AI-guided crawling. Export to JSON, CSV or database.", icon: "🕷️", publisher: "DataMine.ai", installs: "54K", rating: 4.6, tags: ["scraping", "data", "browser"], featured: false, trending: true, color: "#f59e0b", version: "2.0.2", updated: "5 days ago" },
  { id: "calendar-sync", iconName: "calendar", name: "Calendar Sync", desc: "Two-way sync with Google Calendar and Outlook. Manage events, set reminders, and resolve scheduling conflicts.", icon: "📅", publisher: "TimeFlow", installs: "47K", rating: 4.8, tags: ["calendar", "scheduling", "Google"], featured: false, trending: false, color: "#4285f4", version: "1.5.0", updated: "1 week ago" },
  { id: "voice-control", iconName: "mic", name: "Voice Control", desc: "Control AuRen and your computer entirely by voice. Transcription, voice commands, and voice-to-action mapping.", icon: "🎙️", publisher: "SpeakAI", installs: "38K", rating: 4.5, tags: ["voice", "accessibility", "control"], featured: false, trending: true, color: "#8b5cf6", version: "1.2.1", updated: "2 weeks ago" },
  { id: "code-review", iconName: "eye", name: "Code Review", desc: "Automated code review with line-by-line comments, security analysis, and best practice suggestions.", icon: "👁️", publisher: "DevTools Guild", installs: "62K", rating: 4.8, tags: ["code", "review", "security"], featured: false, trending: false, color: "#10b981", version: "2.2.0", updated: "4 days ago" },
  { id: "doc-analyzer", iconName: "document", name: "Document Analyzer", desc: "Extract, summarize and query any PDF, Word or text document. Supports multilingual content.", icon: "📄", publisher: "DocuMind", installs: "43K", rating: 4.6, tags: ["documents", "PDF", "analysis"], featured: false, trending: false, color: "#f97316", version: "1.4.2", updated: "1 week ago" },
  { id: "security-soul", iconName: "shield", name: "Security Soul", desc: "Real-time security monitoring, vulnerability scanning, and automated incident response for your codebase.", icon: "🛡️", publisher: "GuardAI", installs: "29K", rating: 4.9, tags: ["security", "monitoring", "DevSecOps"], featured: false, trending: true, color: "#ef4444", version: "3.0.1", updated: "3 days ago" },
  { id: "dashboard-builder", iconName: "chart", name: "Dashboard Builder", desc: "Generate beautiful analytics dashboards from any data source with natural language queries.", icon: "📊", publisher: "VizFlow", installs: "35K", rating: 4.7, tags: ["charts", "analytics", "data-viz"], featured: false, trending: false, color: "#06b6d4", version: "2.1.0", updated: "2 weeks ago" },
  { id: "db-agent", iconName: "database", name: "Database Agent", desc: "Write and execute SQL queries, migrate schemas, and manage Postgres/MySQL databases through conversation.", icon: "🗄️", publisher: "QueryBot", installs: "58K", rating: 4.7, tags: ["database", "SQL", "postgres"], featured: false, trending: false, color: "#336791", version: "1.9.0", updated: "6 days ago" },
  { id: "deploy-agent", iconName: "rocket", name: "Deploy Agent", desc: "Deploy to Vercel, Railway, Fly.io or AWS with one command. Monitors deployment health and auto-rolls back on failure.", icon: "🚀", publisher: "LaunchPad AI", installs: "41K", rating: 4.8, tags: ["deploy", "DevOps", "CI/CD"], featured: false, trending: true, color: "#000000", version: "2.5.0", updated: "5 days ago" },
  { id: "notion-sync", iconName: "notion", name: "Notion Sync", desc: "Bidirectional sync between AuRen memory and Notion pages, databases, and workspaces.", icon: "N", publisher: "NotionBridge", installs: "32K", rating: 4.6, tags: ["notion", "productivity", "sync"], featured: false, trending: false, color: "#ffffff", version: "1.3.0", updated: "2 weeks ago" },
  { id: "twitter-agent", iconName: "x", name: "X Agent", desc: "Search tweets, compose threads, schedule posts, and monitor mentions on X (Twitter).", icon: "𝕏", publisher: "SocialAI", installs: "27K", rating: 4.4, tags: ["social", "X", "twitter"], featured: false, trending: false, color: "#ffffff", version: "1.1.0", updated: "3 weeks ago" },
  { id: "youtube-summarizer", iconName: "play", name: "YouTube Summarizer", desc: "Transcribe and summarize any YouTube video. Extract key points, timestamps, and quotes.", icon: "▶️", publisher: "MediaMind", installs: "51K", rating: 4.7, tags: ["video", "YouTube", "summary"], featured: false, trending: true, color: "#ff0000", version: "2.0.0", updated: "1 week ago" },
  { id: "slack-bot", iconName: "hash", name: "Slack Bot", desc: "Send messages, manage channels, set reminders, and respond to mentions in Slack workspaces.", icon: "#", publisher: "TeamFlow AI", installs: "44K", rating: 4.6, tags: ["slack", "team", "messaging"], featured: false, trending: false, color: "#e01e5a", version: "1.7.0", updated: "4 days ago" },
];

export const PLUGINS: Plugin[] = [
  { id: "weather", iconName: "cloud", name: "Weather", desc: "Real-time weather forecasts, alerts, and historical data for any location worldwide.", icon: "🌤️", publisher: "MeteoAI", installs: "89K", rating: 4.7, tags: ["weather", "forecast", "API"], featured: true, color: "#60a5fa" },
  { id: "calculator", iconName: "calculator", name: "Calculator Pro", desc: "Advanced math, unit conversion, currency exchange, and financial calculations.", icon: "🧮", publisher: "MathBot", installs: "67K", rating: 4.8, tags: ["math", "finance", "utility"], featured: true, color: "#a78bfa" },
  { id: "translate", iconName: "globe", name: "Translator", desc: "Translate text between 100+ languages with context-aware AI translation.", icon: "🌐", publisher: "LinguaAI", installs: "72K", rating: 4.8, tags: ["language", "translate", "global"], featured: true, color: "#34d399" },
  { id: "image-gen", iconName: "image", name: "Image Generator", desc: "Generate images from text descriptions using DALL-E, Stable Diffusion, or Midjourney.", icon: "🎨", publisher: "PixelMind", installs: "55K", rating: 4.6, tags: ["images", "AI-art", "generation"], featured: false, color: "#f472b6" },
  { id: "news-feed", iconName: "news", name: "News Feed", desc: "Curated news from 50+ sources. Filter by topic, region, or sentiment.", icon: "📰", publisher: "NewsBot", installs: "38K", rating: 4.5, tags: ["news", "media", "feed"], featured: false, color: "#fb923c" },
  { id: "maps", iconName: "map", name: "Maps & Navigation", desc: "Get directions, find places, and navigate with Google Maps and Apple Maps integration.", icon: "🗺️", publisher: "NavAI", installs: "43K", rating: 4.7, tags: ["maps", "navigation", "location"], featured: false, color: "#22c55e" },
  { id: "spotify", iconName: "music", name: "Spotify", desc: "Control Spotify playback, create playlists, and get music recommendations.", icon: "🎵", publisher: "MusicBridge", installs: "61K", rating: 4.8, tags: ["music", "spotify", "entertainment"], featured: false, color: "#1db954" },
  { id: "crypto-tracker", iconName: "bitcoin", name: "Crypto Tracker", desc: "Real-time crypto prices, portfolio tracking, and market alerts for 1000+ coins.", icon: "₿", publisher: "CoinWatch", installs: "29K", rating: 4.5, tags: ["crypto", "finance", "bitcoin"], featured: false, color: "#f59e0b" },
  { id: "pdf-tools", iconName: "document", name: "PDF Tools", desc: "Convert, merge, split, and edit PDFs. Extract text, tables, and images.", icon: "📑", publisher: "DocuMind", installs: "46K", rating: 4.6, tags: ["PDF", "documents", "conversion"], featured: false, color: "#ef4444" },
  { id: "qr-generator", iconName: "qr", name: "QR Generator", desc: "Generate QR codes for URLs, text, WiFi, contacts, and more. Includes analytics.", icon: "▦", publisher: "QRBot", installs: "34K", rating: 4.5, tags: ["QR", "utility", "sharing"], featured: false, color: "#6366f1" },
  { id: "recipe-finder", iconName: "food", name: "Recipe Finder", desc: "Find recipes by ingredients, dietary restrictions, or cuisine. Includes nutrition info.", icon: "🍳", publisher: "FoodieAI", installs: "27K", rating: 4.6, tags: ["food", "recipes", "health"], featured: false, color: "#f97316" },
  { id: "flight-tracker", iconName: "flight", name: "Flight Tracker", desc: "Real-time flight status, gate changes, delays, and price tracking for flights worldwide.", icon: "✈️", publisher: "SkyWatch", installs: "33K", rating: 4.7, tags: ["travel", "flights", "tracking"], featured: false, color: "#0ea5e9" },
];

export const PUBLISHERS: Publisher[] = [
  { id: "auren-labs", name: "AuRen Labs", handle: "@auren-labs", avatar: "A", skills: 8, plugins: 3, verified: true, bio: "Official AuRen team. Building the core skill ecosystem.", color: "#0f62fe" },
  { id: "devtools-guild", name: "DevTools Guild", handle: "@devtools-guild", avatar: "D", skills: 12, plugins: 5, verified: true, bio: "Open source developer tools and integrations for the modern stack.", color: "#3b82f6" },
  { id: "cloudpost-ai", name: "CloudPost AI", handle: "@cloudpost-ai", avatar: "C", skills: 4, plugins: 2, verified: false, bio: "Email and communication AI tools.", color: "#ea4335" },
  { id: "datamine-ai", name: "DataMine.ai", handle: "@datamine-ai", avatar: "M", skills: 6, plugins: 4, verified: true, bio: "Data extraction and processing automation specialists.", color: "#f59e0b" },
  { id: "timeflow", name: "TimeFlow", handle: "@timeflow", avatar: "T", skills: 3, plugins: 2, verified: false, bio: "Calendar, scheduling, and time management automation.", color: "#4285f4" },
  { id: "guardai", name: "GuardAI", handle: "@guardai", avatar: "G", skills: 5, plugins: 1, verified: true, bio: "Security-focused AI tools for modern development teams.", color: "#ef4444" },
  { id: "vizflow", name: "VizFlow", handle: "@vizflow", avatar: "V", skills: 4, plugins: 6, verified: false, bio: "Data visualization and analytics dashboard builder.", color: "#06b6d4" },
  { id: "launchpad-ai", name: "LaunchPad AI", handle: "@launchpad-ai", avatar: "L", skills: 7, plugins: 3, verified: true, bio: "DevOps automation — deploy, monitor, scale.", color: "#6366f1" },
];

export const SUGGESTION_PILLS = [
  "self-improving agent",
  "GitHub integration",
  "security soul",
  "dashboard builder",
  "email automation",
  "voice control",
  "PDF tools",
  "deploy agent",
];
