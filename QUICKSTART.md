# 🚀 Quick Start Guide

## Get Started in 3 Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Run Development Server
```bash
npm run dev
```

### 3️⃣ Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🎨 Customize Your Content

### Update Your Name & Title
**File**: `components/HeroSection.tsx`

Find and replace:
```tsx
<h1 ref={titleRef} className={styles.title}>
  <span className="gradient-text">KIAN KHATIBI</span>
</h1>
<p ref={subtitleRef} className={styles.subtitle}>
  Full Stack Developer | Creative Technologist | Digital Innovator
</p>
```

### Add Your Experience
**File**: `components/ExperienceSection.tsx`

Update the `experiences` array:
```tsx
const experiences: Experience[] = [
  {
    title: 'Your Job Title',
    company: 'Your Company',
    period: '2022 - Present',
    description: 'What you did...',
    technologies: ['React', 'Node.js', 'etc'],
  },
  // Add more experiences...
];
```

### Update Your Skills
**File**: `components/SkillsSection.tsx`

Modify the `skills` array:
```tsx
const skills: Skill[] = [
  { name: 'Your Skill', level: 95, category: 'Frontend' },
  // Add more skills...
];
```

### Add Your Contact Info
**File**: `components/ContactSection.tsx`

Replace placeholder links:
```tsx
<a href="mailto:your.email@example.com">
<a href="https://github.com/yourusername">
<a href="https://linkedin.com/in/yourusername">
```

---

## 🎯 Animation Features

### Spaceship Animation
- Flies in from left on page load
- Floats smoothly in the hero section
- Customizable in `components/SpaceshipAnimation.tsx`

### Particle Field
- 100 animated particles with connecting lines
- Moves continuously in the background
- Adjust particle count in `components/ParticleField.tsx`

### Scroll Animations
- Each section animates when scrolled into view
- Multiple animation types: fadeIn, slideUp, slideLeft, slideRight, scale, rotate
- Customize timing in `components/ScrollAnimation.tsx`

### Cyber Effects
- Neon glow on text and borders
- Glitch effect on hero title
- Animated grid background
- Gradient text effects

---

## 🎨 Color Customization

Edit `app/globals.css`:

```css
:root {
  --bg-dark: #0a0e27;        /* Dark background */
  --bg-darker: #050814;      /* Darker background */
  --primary-cyan: #00f0ff;   /* Neon cyan */
  --primary-purple: #b537f2; /* Neon purple */
  --primary-pink: #ff006e;   /* Neon pink */
  --accent-blue: #3a86ff;    /* Accent blue */
}
```

---

## 📱 Responsive Design

The site is fully responsive and works on:
- ✅ Desktop (1920px+)
- ✅ Laptop (1024px - 1920px)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 768px)

---

## 🚀 Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

Done! Your site is live! 🎉

---

## 💡 Tips

- **Performance**: The animations are optimized using `requestAnimationFrame`
- **Accessibility**: Add proper alt text and ARIA labels for production
- **SEO**: Update metadata in `app/layout.tsx`
- **Images**: Add your photos to `public/` folder and import them

---

## 🐛 Troubleshooting

**Animations not working?**
- Make sure all dependencies are installed: `npm install`
- Clear cache: `rm -rf .next && npm run dev`

**Styles not loading?**
- Check that CSS modules are properly imported
- Restart the dev server

**TypeScript errors?**
- Run `npm install` to ensure all types are installed
- Check `tsconfig.json` is properly configured

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Anime.js Documentation](https://animejs.com/documentation/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Enjoy building your amazing portfolio! 🚀✨**

