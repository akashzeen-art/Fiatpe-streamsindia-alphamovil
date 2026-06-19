import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

import { BurgerMenu } from '@/components/BurgerMenu';
import { GlobalVideoBg } from '@/components/SectionVideoBg';
import { SectionDivider } from '@/components/SectionDivider';
import { HeroSection } from '@/sections/HeroSection';
import { FeaturedSection } from '@/sections/FeaturedSection';
import { TopPicksSection } from '@/sections/TopPicksSection';
import { ActionSection } from '@/sections/ActionSection';
import { MostWatchedSection } from '@/sections/MostWatchedSection';
import { BestOfWeekSection } from '@/sections/BestOfWeekSection';
import { WellnessCollectionSection } from '@/sections/WellnessCollectionSection';
import { CriticsChoiceSection } from '@/sections/CriticsChoiceSection';
import { TrendingSection } from '@/sections/TrendingSection';
import { RomanceSection } from '@/sections/RomanceSection';
import { ThrillerSection } from '@/sections/ThrillerSection';
import { NewReleasesSection } from '@/sections/NewReleasesSection';
import { CookingGridSection } from '@/sections/CookingGridSection';
import { StaffPicksSection } from '@/sections/StaffPicksSection';
import { UniverseSection } from '@/sections/UniverseSection';
import { FooterSection } from '@/sections/FooterSection';

export default function Index() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0) setScrollProgress((window.scrollY / max) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    document.getElementById('featured-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full overflow-x-hidden">
      <GlobalVideoBg />

      <BurgerMenu />

      <div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 via-cyan-400 to-amber-400 transition-transform duration-150"
          style={{
            transform: `scaleX(${scrollProgress / 100})`,
            transformOrigin: 'left',
            boxShadow: '0 0 12px rgba(168,85,247,0.6)',
          }}
        />
      </div>

      {scrollProgress > 20 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-40 w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 animate-border-glow"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
            boxShadow: '0 0 24px rgba(124,58,237,0.5)',
          }}
          aria-label="Scroll to top"
        >
          <ChevronUp size={18} />
        </button>
      )}

      <div className="relative z-10">
        <HeroSection onEnter={scrollToContent} />

        <div id="featured-section">
          <FeaturedSection />
        </div>

        <SectionDivider colors="from-transparent via-pink-500/60 to-transparent" />

        <TopPicksSection />
        <SectionDivider colors="from-transparent via-red-500/50 to-transparent" />
        <ActionSection />
        <SectionDivider colors="from-transparent via-cyan-500/50 to-transparent" />
        <TrendingSection />
        <RomanceSection />

        <SectionDivider colors="from-transparent via-purple-500/50 to-transparent" />
        <MostWatchedSection />
        <ThrillerSection />

        <SectionDivider colors="from-transparent via-orange-500/50 to-transparent" />
        <BestOfWeekSection />
        <CriticsChoiceSection />
        <NewReleasesSection />

        <SectionDivider colors="from-transparent via-emerald-500/50 to-transparent" />
        <CookingGridSection />
        <StaffPicksSection />
        <UniverseSection />
        <WellnessCollectionSection />
        <FooterSection />
      </div>
    </div>
  );
}
