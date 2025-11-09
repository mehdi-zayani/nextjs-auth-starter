# NextJS Auth Starter

A clean and minimal **Next.js starter** with **TailwindCSS**, **dark mode**, and ready for authentication. Perfect for building authentication systems quickly with modern UI.

## Features

- Next.js 16+ App Router
- TailwindCSS 3.x for styling
- Dark mode support via class strategy
- Responsive design and typography
- Ready to integrate authentication (NextAuth, OAuth, Email/Password)
- Minimal and professional layout for starters or portfolio

## Installation

1. Clone the repository:

```bash
git clone https://github.com/mehdi-zayani/nextjs-auth-starter.git
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open http://localhost:3000
   with your browser.

## Project Structure

```yaml
nextjs-auth-starter/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx           # Root layout with Tailwind et dark mode
│  │  └─ page.tsx             # Welcome / landing page
│  ├─ styles/
│  │  └─ globals.css          # Tailwind base + global styling
├─ public/                     # empty for now
├─ .gitignore
├─ package.json
├─ tsconfig.json              #  TypeScript Config
├─ next.config.js             #  Next.js Config
├─ tailwind.config.js         #  Tailwind Config
├─ postcss.config.js          #  PostCSS Config
├─ README.md

```

## Contributing

Feel free to fork and improve this starter. Pull requests and issues are welcome.
