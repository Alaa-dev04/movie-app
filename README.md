# 🎬 TrendyFlix

**Discover your next favorite movie or TV series!**

TrendyFlix is a responsive movie and TV series discovery website built with Next.js and React. It helps users explore trending content, search for movies and TV shows, view detailed information, and watch trailers through a clean and interactive interface.

## ✨ Features

- 🎥 **Trending Movies & TV Shows** — Explore trending entertainment with an animated hero slider.
- 🔎 **Live Search** — Search for movies and TV series with debounced suggestions.
- 🎞️ **Movie & TV Details** — Navigate to dedicated detail pages for selected titles.
- ▶️ **Trailer Modal** — Open trailers in a modal dialog.
- 📱 **Responsive Design** — Optimized layouts for mobile, tablet, and desktop screens.
- 🎨 **Interactive UI** — Smooth animations, navigation menus, and slider controls.
- ⚡ **Data Fetching & Caching** — Manage API requests and cache results using TanStack Query.
- 🔗 **URL State Management** — Use URL query parameters for search and navigation state.

## 🛠️ Tech Stack

- **Next.js** — React framework
- **React** — UI development
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling and responsive layouts
- **TanStack Query** — Data fetching and caching
- **Swiper.js** — Hero slider and fade transitions
- **Motion** — UI animations
- **Lucide React** — Icons
- **nuqs** — URL query-state management
- **TMDB API** — Movie and TV series data

## 🚀 Getting Started

### Prerequisites

- Node.js
- pnpm, npm, or another compatible package manager
- A TMDB API credential, if required by your API integration

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_REPOSITORY_URL
   ```

2. Navigate to the project directory:

   ```bash
   cd trendyflix
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Configure the environment variables required by your project. Add them to a `.env.local` file in the root directory.

   ```env
   TMDB_API_KEY=your_tmdb_api_key
   ```

   Replace the example variable with the exact variable name expected by your API routes. Never commit API credentials to GitHub.

5. Start the development server:

   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Highlights

- Reusable React components for navigation, search, pagination, and trailer dialogs.
- Responsive styling with Tailwind CSS breakpoints.
- API-driven movie and TV series discovery.
- Interactive movie carousel with autoplay and navigation dots.
- Search suggestions powered by debounced input and cached API requests.

## 🎯 Purpose

This project demonstrates practical frontend development skills, including component-based architecture, responsive design, API integration, asynchronous data fetching, state management, and UI animations.

## 📌 Future Improvements

- Add advanced filtering by genre, rating, and release year.
- Implement watchlists and favorites.
- Improve accessibility and keyboard navigation.
- Add loading skeletons and enhanced error handling.
- Optimize images and animations for mobile performance.

## 📄 Disclaimer

TrendyFlix is a personal development project for educational purposes. Movie and TV series data is provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

This project is not endorsed or certified by TMDB.

---

**Built with ❤️ using Next.js and React.**
