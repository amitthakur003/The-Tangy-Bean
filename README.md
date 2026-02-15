# The Tangy Bean (Premium Scrollytelling Website)

A high-performance, immersive scrollytelling e-commerce experience built with Next.js 14, Canvas API, Framer Motion, and Tailwind CSS.
It uses optimized image sequences on a Hardware-Accelerated Canvas to simulate 3D rotation without the overhead of WebGL model loading.

## 🚀 Getting Started

### Prerequisites

-   **Node.js**: v18.17.0 or higher.
-   **npm**: v9.0.0 or higher (or Bun/Yarn/pnpm).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-org/the-tangy-bean.git
    cd the-tangy-bean
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

### Running the Development Server

Start the local development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build

To build the application for production:

```bash
npm run build
npm start
```

## 🛠️ Technology Stack

-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
-   **Visual Engine**: [HTML5 Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) (High-performance image sequence rendering)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/) (Scroll-linked attributes, Spring physics)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand) (Persistent Cart Store)
-   **Fonts**: [Google Fonts](https://fonts.google.com/) (Outfit & Playfair Display)

## 📂 Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout (Provider wrapping, Fonts, Metadata)
│   ├── page.tsx         # Main Landing Page (Scrollytelling orchestration)
│   ├── juices/          # Juice Collection Page
│   ├── our-story/       # Brand Story Page
│   ├── health/          # Health & Science Page
│   └── icon.png         # Dynamic favicon override
├── components/
│   ├── ProductBottleScroll.tsx # Canvas Rendering Logic (Frame Buffer)
│   ├── CartDrawer.tsx   # Global Shopping Cart (Zustand + AnimatePresence)
│   ├── Navbar.tsx       # Responsive Navigation with blur effects
│   ├── Footer.tsx       # Site footer
│   └── ...              # Other UI components
├── data/
│   ├── products.ts      # Configuration for Hero Scrollytelling (Sequence Config, Text)
│   └── collection.ts    # Product Database for Grid/Shop (14 Items)
├── public/
│   ├── products/        # High-res product images for grid
│   └── frames/          # Image sequences for scroll animation
└── store/
    └── useCartStore.ts  # Zustand Store for Cart Logic (Persist Middleware)
```

## ✨ Key Features

1.  **Immersive Scrollytelling**:
    -   Scroll-driven localized image sequence playback.
    -   Performance-optimized `requestAnimationFrame` loop.
    -   Seamless transitions between "Hero" products (Mango, Chocolate, Kokum).
    -   Snap-scrolling sections (`ScrollSection` component).

2.  **Premium Cart System**:
    -   Persistent cart state (survives refreshes).
    -   "Scientific Luxury" UI with blur backdrop.
    -   Real-time "Free Shipping" progress bar.
    -   Smart Upsell recommendations (e.g., Dutch Dark Chocolate).

3.  **Performance Optimized**:
    -   Lazy-loading for non-critical assets.
    -   `next/image` optimization for static grid assets.
    -   Efficient re-renders using Zustand selectors.
    -   Frame caching logic for smooth scroll scrubbing.

4.  **Responsive Design**:
    -   Mobile-first approach with Tailwind CSS.
    -   Touch-optimized navigation handles.
    -   Adaptive Canvas scaling (`contain` mode).

## 📝 Customization

### Adding New Products

1.  **Hero Scroll Section**:
    -   Update `data/products.ts`.
    -   Add image sequence folder to `public/frames/`.
    -   Update `frameCount` to match the number of images.

2.  **Shop Collection**:
    -   Update `data/collection.ts`.
    -   Add product image to `public/products/`.

### Theming

-   Colors are defined in `tailwind.config.ts`.
-   Global styles (transparency, noise textures) in `app/globals.css`.

## 🤝 Contribution

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

---

**© 2024 The Tangy Bean.** All rights reserved.
