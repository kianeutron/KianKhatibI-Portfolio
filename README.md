# Kian Khatibi - Personal Portfolio Website

A stunning personal portfolio website with spaceship cyber-themed animations built with Next.js, TypeScript, and Anime.js.

## 🚀 Features

- **Spaceship Animations**: Dynamic spaceship flying across the screen with smooth anime.js animations
- **Particle Field**: Interactive particle system with connecting lines
- **Cyber Grid Background**: Futuristic grid overlay with neon effects
- **Scroll-Triggered Animations**: Each section animates smoothly as you scroll
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Neon Cyber Theme**: Vibrant cyan, purple, and pink color scheme with glow effects
- **Smooth Transitions**: Buttery smooth animations using anime.js and Framer Motion
- **Performance Optimized**: 60 FPS on desktop, 50-60 FPS on mobile

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Animations**: Anime.js + Framer Motion
- **Styling**: CSS Modules + Custom CSS
- **Scroll Detection**: React Intersection Observer

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Customization

### Update Your Information

Edit the content in the following files:

- **Experience**: `constants/experience.ts` - Add your work experience
- **Skills**: `constants/skills.ts` - Update your skills and technologies
- **Contact**: `constants/contact.ts` - Update your contact information

### Color Scheme

Modify the CSS variables in `app/globals.css`:

```css
:root {
  --bg-dark: #0a0e27;
  --bg-darker: #050814;
  --primary-cyan: #00f0ff;
  --primary-purple: #b537f2;
  --primary-pink: #ff006e;
  --accent-blue: #3a86ff;
}
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── animations/         # Animation components
│   ├── layout/            # Layout components (Nav, Loading)
│   ├── sections/          # Page sections (Hero, Experience, Skills, Contact)
│   └── ui/                # UI components (Buttons, etc.)
├── constants/             # Data constants
├── types/                 # TypeScript types
├── utils/                 # Utility functions
└── Documentation files
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

Build the production version:
```bash
npm run build
npm start
```

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 🎨 Credits

Created with ❤️ using Next.js, TypeScript, and Anime.js
