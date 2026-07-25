# NXTFLIX - Movie Streaming & Discovery Web Application

A modern, responsive, full-featured web-based movie streaming and discovery application built from scratch using **React 19**, **React Router DOM v7**, **Vite**, and **Tailwind CSS / Custom CSS**. NXTFLIX allows users to securely sign in, explore trending and fresh movie releases via auto-scrolling carousels, filter movies by genre, view detailed movie descriptions, and manage a persistent **Watch Later** watchlist.

---

## 🌟 Key Features

### 1. **Authentication & Session Management**
- Secure API authentication 
- JWT authentication saved in cookies via `js-cookie` (valid for 7 days).
- Automatic route protection using `ProtectedRoute` component (unauthenticated users are redirected to `/login`).
- Instant session destruction on **Logout** with seamless redirection to Sign In page.

### 2. **Dynamic Home Page (`/`)**
- **Sticky Top Navigation Bar:** Branding logo, dynamic navigation links, live Watch Later badge counter, and Logout action.
- **Hero Banner:** Premium dark aesthetic featuring backdrop wallpaper, headline, dynamic movie metrics, and call-to-actions.
- **Auto-scrolling Infinite Carousels:**
  - **Trending Now:** Top 16 highest-rated movies sorted in descending order (scrolls left).
  - **Fresh Releases:** Up to 16 modern movies released from 2015 onwards (scrolls right).
  - Both carousels feature CSS keyframe animations that pause gracefully on hover/focus.
- **Genre Filter Bar:** Filter by *All, Action, Drama, Comedy, Thriller, Sci-Fi, Romance, Horror, Fantasy* with instant state updates.
- **Responsive Movie Grid:** Visually rich cards featuring poster artwork, star ratings, metadata tags (genre · year · duration), and interactive hover play icons.

### 3. **Movie Details View (`/movies/:id`)**
- Full-bleed immersive backdrop header image with gradient overlays.
- Complete metadata breakdown: Title, Poster visual, Star Rating, Genre, Release Year, Duration, and Plot Overview.
- Interactive toggle button: **+ Add to Watch Later** / **✓ Added to Watch Later**.
- Smart navigation with a **Go Back** fallback.
- Auto-redirection to `/not-found` for invalid movie IDs.

### 4. **Persistent Watch Later List (`/watch-later`)**
- Powered by `WatchLaterContext` utilizing HTML5 `localStorage` (`nxtflix_watch_later`).
- Stores full movie objects natively to prevent extra fetching.
- Includes a dedicated Empty State with a direct quick-link to return to browsing.

### 5. **Error & 404 Handling (`/not-found` & `*`)**
- Clean, standalone 404 error template without header distractions.
- Provides simple navigation back to the primary Home view.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** React 19
- **Routing:** React Router DOM v7
- **Build Tool:** Vite 7 (Dev server port `3000`, build folder `build`)
- **State & Storage:** React Context API + `localStorage` (`nxtflix_watch_later`)
- **Cookie Management:** `js-cookie` (`jwt_token`)
- **Styling:** CSS3 variables, Flexbox/Grid, keyframe animations, responsive design

---

## 📁 Project Directory Structure

```text
nxtflix/
├── public/
│   └── favicon.ico
├── src/
│   ├── api/
│   │   └── auth.js             # Authentication API service wrapper
│   ├── components/
│   │   ├── Header.jsx          # Sticky Header with nav links & Watch Later badge
│   │   ├── MovieCard.jsx       # Standardized movie card component
│   │   ├── MovieCarousel.jsx   # Auto-scrolling infinite carousel component
│   │   ├── GenreFilter.jsx     # Filter bar chip component
│   │   └── ProtectedRoute.jsx  # Route guard checking jwt_token cookie
│   ├── context/
│   │   └── WatchLaterContext.jsx # React Context for managing watchlist state
│   ├── data/
│   │   └── movies.js           # Static catalog of 50 movies & GENRES array
│   ├── pages/
│   │   ├── Login.jsx           # Sign in page (split layout)
│   │   ├── Home.jsx            # Protected Home dashboard
│   │   ├── MovieDetails.jsx    # Movie details and watch later toggle page
│   │   ├── WatchLater.jsx      # Watch Later list page
│   │   └── NotFound.jsx        # 404 Not Found error page
│   ├── App.jsx                 # Route configurations and providers
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles, variables, & keyframes
├── index.html
├── vite.config.js              # Custom Vite configuration (port 3000, build output 'build')
├── package.json
└── README.md
```

---

## 🔑 Test Credentials

To test the authentication process, use the following official credentials:

| Field | Value |
| :--- | :--- |
| **Email** | `admin@example.com` |
| **Password** | `admin123` |

---

## 📦 Installation & Setup Guide

### Prerequisites
- **Node.js**: `v20.x` or `v22.x` (recommended)
- **npm**: `v9.x` or higher

### Steps to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/ruthick76/nxtflix.git
   cd nxtflix
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The app will run locally at `http://localhost:3000/`.

4. **Build for Production**
   ```bash
   npm run build
   ```
   The production-ready output will be compiled into the `build/` directory.

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

