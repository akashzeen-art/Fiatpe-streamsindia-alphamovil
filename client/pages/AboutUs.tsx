import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { FooterSection } from '@/sections/FooterSection';
import { PageLayout } from '@/components/PageLayout';
import { ContentCard } from '@/components/ContentCard';

export default function AboutUs() {
  const navigate = useNavigate();
  return (
    <PageLayout title="About Us" subtitle="StreamNow" badge="Welcome">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-purple-400 hover:text-pink-400 transition-colors font-orbitron text-xs uppercase tracking-widest mb-6"
        >
          <ArrowLeft size={14} /> Back to Home
        </button>

        <div className="space-y-4">
          <ContentCard>
            <h2 className="text-white font-semibold text-xl mb-4">
              Welcome – Your Digital Gateway to Premium Entertainment
            </h2>
            <p className="text-gray-100 leading-relaxed text-[15px] mb-5">
              At StreamNow, we believe that entertainment should be accessible, flexible, and empowering. That's why we created a modern OTT streaming platform designed to bring the benefits of OTT streaming directly to your screen — anytime, anywhere.
            </p>
            <p className="text-gray-100 leading-relaxed text-[15px] mb-5">
              Our platform offers a curated collection of high-quality OTT streaming videos led by experienced creators, focused on improving your physical viewer, mental clarity, and inner peace. Whether you're a beginner or an advanced practitioner, our diverse video library helps you stay consistent with your practice, at your own pace.
            </p>
            <p className="text-gray-100 leading-relaxed text-[15px]">
              As a OTT streaming subscription service, StreamNow bridges the gap between traditional OTT streaming practice and the demands of today's digital lifestyle. No more fixed schedules or crowded devices — just pure, uninterrupted OTT streaming whenever you need it.
            </p>
          </ContentCard>

          <ContentCard>
            <h2 className="font-bebas text-3xl sm:text-4xl mb-4 tracking-wide">
              <span className="gradient-text">Our Mission</span>
            </h2>
            <p className="text-gray-100 leading-relaxed text-[15px] mb-5">
              To make OTT streaming an everyday habit for everyone by delivering affordable, expert-guided, and viewer-focused content that nurtures your experience, preferences, and soul.
            </p>
            <p className="text-gray-100 leading-relaxed text-[15px]">
              Join the StreamNow movement today — and let's breathe, move, and grow together.
            </p>
          </ContentCard>

          <ContentCard>
            <h2 className="font-bebas text-3xl sm:text-4xl mb-6 tracking-wide">
              <span className="gradient-text">Platform</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Watch anytime',
                'Expert Creators',
                'Certified teachers',
                'Flexible Schedule',
                'Your own pace',
                'Premium Entertainment',
                'Body & preferences',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="text-purple-400 text-lg leading-none mt-0.5">✓</span>
                  <span className="text-gray-100 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </ContentCard>

          <ContentCard>
            <h2 className="font-bebas text-3xl sm:text-4xl mb-6 tracking-wide">
              <span className="gradient-text">Contact Information</span>
            </h2>
            <div className="space-y-4">
              <DetailRow label="Company" value="Alphamovil Digital Solutions LLP" />
              <DetailRow label="Address" value="B-123, SUNCITY, SECTOR-54, Gurgaon, Haryana, 122011" />
              <DetailRow label="Phone">
                <a href="tel:+919667687077" className="text-purple-300 hover:text-pink-300 hover:underline">9667687077</a>
              </DetailRow>
              <DetailRow label="Email">
                <a href="mailto:bd@alphamovil.com" className="text-purple-300 hover:text-pink-300 hover:underline">bd@alphamovil.com</a>
              </DetailRow>
            </div>
          </ContentCard>
        </div>

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-purple-400 hover:text-pink-400 transition-colors mt-8 font-orbitron text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={14} /> Back to Home
        </button>
      </div>

      <FooterSection />
    </PageLayout>
  );
}

function DetailRow({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 pb-4 border-b border-white/10 last:border-0 last:pb-0">
      <span className="text-gray-400 font-orbitron text-xs uppercase tracking-widest min-w-[140px]">{label}</span>
      <span className="text-gray-100 text-sm leading-relaxed">{value ?? children}</span>
    </div>
  );
}
