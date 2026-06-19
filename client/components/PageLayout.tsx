import { ReactNode } from 'react';
import { GlobalVideoBg } from '@/components/SectionVideoBg';
import { BurgerMenu } from '@/components/BurgerMenu';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  badge?: string;
}

export function PageLayout({ children, title, subtitle, badge }: PageLayoutProps) {
  return (
    <div className="relative min-h-screen text-gray-200 w-full overflow-x-hidden">
      <GlobalVideoBg />
      <BurgerMenu />

      {(title || badge) && (
        <div className="relative z-10 w-full border-b border-purple-500/20 px-6 sm:px-12 pt-24 pb-12 sm:pb-16"
          style={{ background: 'linear-gradient(135deg, rgba(88,28,135,0.3) 0%, rgba(5,2,8,0.8) 50%, rgba(157,23,77,0.2) 100%)' }}>
          {badge && (
            <p className="text-purple-400 font-orbitron text-xs uppercase tracking-[0.4em] mb-4">{badge}</p>
          )}
          {title && (
            <h1 className="font-bebas text-5xl sm:text-7xl tracking-wide leading-none mb-3">
              <span className="gradient-text">{title}</span>
            </h1>
          )}
          {subtitle && (
            <p className="text-gray-400 font-orbitron text-sm uppercase tracking-widest">{subtitle}</p>
          )}
          <div className="accent-bar w-24 mt-4" />
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
