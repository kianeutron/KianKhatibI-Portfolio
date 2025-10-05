'use client';

import { LoadingScreen, Navigation } from '@/components/layout';
import { ParticleField, SpaceshipAnimation } from '@/components/animations';
import { HeroSection, ExperienceSection, SkillsSection, ContactSection } from '@/components/sections';

export default function Home() {
  return (
    <main>
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Navigation */}
      <Navigation />

      {/* Background Effects */}
      <div className="cyber-grid"></div>
      <ParticleField />
      <SpaceshipAnimation />

      {/* Content Sections */}
      <div id="hero">
        <HeroSection />
      </div>
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}

