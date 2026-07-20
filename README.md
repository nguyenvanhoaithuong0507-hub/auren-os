# SandboxCode # AuRen — Documentation & Knowledge Base

> **Docusaurus 3 Documentation Site**

A comprehensive documentation and knowledge base site built with Docusaurus 3, featuring multilingual support (Vietnamese & English) and automated deployment to GitHub Pages.

---

## 🎯 Features

- **Docusaurus 3** — Modern documentation framework with React & MDX
- **Multilingual Support** — Vietnamese (vi) and English (en) translations
- **Dark & Light Themes** — Beautiful, modern UI with smooth theme switching
- **Fast & SEO-Optimized** — Static site generation with excellent SEO
- **GitHub Pages Deploy** — Automated CI/CD pipeline for deployment
- **Code Quality Validation** — ESLint, Prettier, Markdown lint with pre-commit hooks
- **Responsive Design** — Mobile-friendly documentation experience

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/nguyenvanhoaithuong0507-hub/SandboxCode.git
cd SandboxCode

# Install dependencies
npm install

# Start local development server
npm start

# Build for production
npm run build

# Serve production build locally
npm run serve
```

---

## 📋 Project Structure

```
SandboxCode/
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml           # GitHub Pages deployment (Docusaurus)
│   │   ├── node.js.yml          # Node.js CI/CD pipeline
│   │   └── codeql.yml           # Code quality analysis
│   └── dependabot.yml           # Dependency updates
├── docs/
│   ├── intro.md                 # Introduction documentation
│   └── ...                      # Additional docs
├── src/
│   ├── pages/
│   │   ├── index.js             # Homepage component
│   │   └── dashboard.js         # Dashboard page
│   └── css/
│       └── custom.css           # Custom Docusaurus styles
├── public/
│   ├── main.js                  # Frontend interactivity
│   └── ...                      # Static assets
├── docusaurus.config.js         # Docusaurus configuration
├── sidebars.js                  # Documentation sidebar structure
├── package.json                 # Dependencies & scripts
├── .gitignore                   # Git ignore rules
├── LICENSE                      # GNU AGPL v3
└── README.md                    # This file
```

---

## 🏗️ Build & Deployment

This project uses a modern CI/CD pipeline for automated deployment:

1. **Push to main** — Changes trigger GitHub Actions workflow
2. **Build** — Node.js environment builds Docusaurus static site
3. **Deploy** — Built artifacts deploy to GitHub Pages (gh-pages branch)
4. **Live** — Site available at https://nguyenvanhoaithuong0507-hub.github.io/SandboxCode/

**GitHub Pages Configuration**: Ensure your repository settings have GitHub Pages source set to "GitHub Actions"

---

## 🛠️ Development

### Available Scripts

```bash
# Install dependencies
npm install

# Start local dev server (with hot reload)
npm start

# Build static site
npm run build

# Serve production build locally
npm run serve

# Clear Docusaurus cache
npm run clear
```

### Code Quality & Validation

```bash
# ESLint - Check JavaScript/JSX code
npm run lint           # Check for errors
npm run lint:fix       # Auto-fix issues

# Prettier - Format code consistently
npm run format         # Format all files
npm run format:check   # Check formatting without changes

# Markdown Lint - Check documentation
npm run lint:md        # Check markdown files
npm run lint:md:fix    # Fix markdown issues

# Run full validation
npm run validate       # lint + lint:md + format:check + build
```

### Docusaurus Commands

- `npm run docusaurus` — Run Docusaurus CLI commands
- `npm run swizzle` — Customize Docusaurus components
- `npm run write-translations` — Extract translatable strings
- `npm run write-heading-ids` — Generate heading IDs

### CI/CD Workflow

The project includes GitHub Actions workflows:

- **deploy.yml** — Builds and deploys to GitHub Pages on every push to `main`
- **node.js.yml** — Validates code quality (ESLint, Prettier, Markdown lint) and builds across Node.js 18.x, 20.x, 22.x
- **codeql.yml** — Code security analysis

### Git Hooks (Pre-commit & Pre-push)

Automatic validation when committing/pushing:

**Pre-commit Hook:**

- Runs lint-staged on changed files
- Auto-fixes ESLint/Prettier issues
- Blocks commit if validation fails

**Pre-push Hook:**

- Runs full build: `npm run build`
- Validates no broken links (onBrokenLinks: 'throw')
- Prevents push if build fails

If hooks fail:

```bash
npm run lint:fix && npm run format  # Fix issues
git add .                           # Re-stage files
git commit -m "message"             # Commit again
```

---

## 📦 Frontend Components

### HTML Structure (`public/index.html`)

- Responsive dark-themed landing page
- Semantic HTML5 sections
- Mobile-friendly drawer navigation
- Accessibility features (aria-labels, focus states)

### Styling (`public/style.css`)

- Design system with CSS custom properties
- Mobile-first responsive design
- Dark theme (OLED-friendly)
- Smooth animations and transitions

### Interactivity (`public/main.js`)

- Mobile menu toggle
- Blog tab switching
- Newsletter form validation
- Scroll animations with Intersection Observer
- Smooth anchor link scrolling

---

## 🎨 Design System

### Color Palette

```css
--bg: #0a0b0d /* Primary background */ --bg-raise: #0f1216 /* Elevated surfaces */
  --bg-card: #0d0f13 /* Card backgrounds */ --line: #1e242b /* Borders, dividers */ --blue: #3b82f6
  /* Primary accent */ --blue-brt: #60a5fa /* Bright accent */ --green: #22c55e /* Success state */
  --text: #e9edf1 /* Primary text */ --text-dim: #8a929c /* Secondary text */ --text-faint: #4b525b
  /* Tertiary text */;
```

### Typography

- Font Family: JetBrains Mono, SFMono, ui-monospace, Consolas
- Sizes: 11px–4rem (clamp responsive)
- Line Height: 1.55 default, 1.75 for readability

### Spacing

- Grid: 28px × 28px background pattern
- Padding: 12px–56px (section-based)
- Gap: 10px–26px (component-based)

---

## 🌍 Internationalization (i18n)

This documentation supports multiple languages:

- **Vietnamese (vi)** — Default language
- **English (en)** — Secondary language

Language switching is available in the site header. Add new languages in `docusaurus.config.js`:

```js
i18n: {
  defaultLocale: 'vi',
  locales: ['vi', 'en'],
}
```

---

## 📱 Responsive Design

Docusaurus provides built-in responsive layouts:

- **Mobile** — Single column, touch-friendly navigation
- **Tablet** — Optimized for medium screens (640px–1024px)
- **Desktop** — Full layout with sidebar (1024px+)

---

## 🔐 Security

- **License**: GNU AGPL v3 — Ensures code sharing for network services
- **Sandbox Isolation**: No access to production systems
- **Environment Variables**: Use `.env` (included in `.gitignore`)
- **Input Validation**: Client-side form validation, server-side enforcement required

---

## 📖 Documentation Content

Documentation is stored in the `docs/` directory as Markdown files.

### Creating New Pages

1. Create a `.md` file in `docs/` directory
2. Add frontmatter metadata:
   ```md
   ---
   sidebar_position: 1
   title: Page Title
   description: Page description for SEO
   ---
   ```
3. Update `sidebars.js` to add the new page to navigation

### Supported Content

- Markdown with MDX support
- Code blocks with syntax highlighting
- Interactive components
- Math equations (LaTeX)
- Admonitions (notes, warnings, etc.)

---

## 🚀 Deployment

### Local Build Verification

Before pushing, verify the build works locally:

```bash
npm run build
```

If the build fails with broken link errors, check:

- All internal links use correct paths
- No missing files referenced in markdown
- All relative links are correct

### GitHub Pages Setup

**Manual Step (Required once)**:

1. Go to your repository settings
2. Navigate to **Pages** section
3. Set **Build and deployment** source to **GitHub Actions**
4. Save the changes

After this, the `deploy.yml` workflow will automatically deploy on every push to `main`.

### Viewing Deployed Site

- **Production URL**: https://nguyenvanhoaithuong0507-hub.github.io/SandboxCode/
- **Deployment Status**: Check GitHub Actions tab for workflow status

---

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

### Coding Standards

- Follow existing code style
- Write meaningful commit messages
- Include tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the **GNU AGPL v3** �� see [LICENSE](./LICENSE) file for details.

The AGPL v3 requires that if you modify and run this software on a network server, you must provide access to the modified source code to all users. This ensures the community benefits from improvements.

---

## 🌐 Links

- **GitHub**: [github.com/nguyenvanhoaithuong0507-hub/SandboxCode](https://github.com/nguyenvanhoaithuong0507-hub/SandboxCode)
- **Issues**: [Report bugs or request features](https://github.com/nguyenvanhoaithuong0507-hub/SandboxCode/issues)
- **Discussions**: [Community conversations](https://github.com/nguyenvanhoaithuong0507-hub/SandboxCode/discussions)

---

## 📞 Support

For questions or issues:

1. Check existing [GitHub Issues](https://github.com/nguyenvanhoaithuong0507-hub/SandboxCode/issues)
2. Start a [Discussion](https://github.com/nguyenvanhoaithuong0507-hub/SandboxCode/discussions)
3. Review [Documentation](./README.md)

---

## 📝 License

This project is licensed under the **GNU AGPL v3** — see [LICENSE](./LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Test locally (`npm run build`)
5. Commit (`git commit -m 'Add feature'`)
6. Push and open a Pull Request

---

## 📞 Support

For issues or questions:

- Check [GitHub Issues](https://github.com/nguyenvanhoaithuong0507-hub/SandboxCode/issues)
- Start a [Discussion](https://github.com/nguyenvanhoaithuong0507-hub/SandboxCode/discussions)

**Status**: Active Development  
**Last Updated**: July 18, 2026

---

© 2026 SandboxCode. All rights reserved.
