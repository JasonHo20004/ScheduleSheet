# ScheduleSheet

A React application for managing and viewing law school schedule (Lịch Học Luật).

## Features

- View law school schedule for HK2 2025-2026
- Filter by subject and phase
- Export schedule to CSV
- Beautiful, responsive UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

### Build for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

### Type Checking

Run TypeScript type checking:
```bash
npm run check
```

## Project Structure

```
ScheduleSheet/
├── src/
│   ├── LawScheduleSheet.tsx  # Main schedule component
│   ├── App.tsx               # Root app component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Tailwind CSS styles
├── index.html                # HTML entry point
├── package.json              # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
└── tailwind.config.js        # Tailwind CSS configuration
```

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

1. Push your code to the `main` branch on GitHub
2. Go to your repository Settings → Pages
3. Under "Source", select "GitHub Actions"
4. The workflow will automatically build and deploy your site on every push to `main`

Your site will be available at: `https://[your-username].github.io/ScheduleSheet/`

### Manual Deployment

If you prefer to deploy manually:

1. Build the project for GitHub Pages:
```bash
npm run build:gh-pages
```

2. Push the `dist` folder to the `gh-pages` branch (you may need to install `gh-pages` package for this)

### Important Notes

- The base path is set to `/ScheduleSheet/` for GitHub Pages
- If you change the repository name, update the `base` path in `vite.config.ts`
- The deployment workflow runs automatically on every push to `main`