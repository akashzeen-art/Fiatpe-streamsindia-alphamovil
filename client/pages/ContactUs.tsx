import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { FooterSection } from '@/sections/FooterSection';
import { PageLayout } from '@/components/PageLayout';

export default function ContactUs() {
  const navigate = useNavigate();
  return (
    <PageLayout title="Contact Us" subtitle="We'd love to hear from you" badge="Get In Touch">
      <div className="w-full max-w-2xl mx-auto px-6 sm:px-12 py-12">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-purple-400 hover:text-pink-400 transition-colors font-orbitron text-xs uppercase tracking-widest mb-8"
        >
          <ArrowLeft size={14} /> Back to Home
        </button>

        <div className="glass-panel rounded-xl overflow-hidden mb-6">
          <ContactRow icon="🏢" label="Company" value="Alphamovil Digital Solutions LLP" />
          <div className="border-t border-white/5" />
          <ContactRow icon="📍" label="Address" value="B-123, SUNCITY, SECTOR-54, Gurgaon, Haryana, 122011" />
          <div className="border-t border-white/5" />
          <ContactRow icon="📞" label="Phone">
            <a href="tel:+919667687077" className="text-purple-400 hover:text-pink-400 hover:underline">9667687077</a>
          </ContactRow>
          <div className="border-t border-white/5" />
          <ContactRow icon="✉️" label="Email">
            <a href="mailto:bd@alphamovil.com" className="text-purple-400 hover:text-pink-400 hover:underline">bd@alphamovil.com</a>
          </ContactRow>
          <div className="border-t border-white/5" />

          <div className="px-6 py-5">
            <a
              href="https://forms.gle/CJS6wXQis9hKe7Da8"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon flex items-center justify-center gap-2 w-full py-3.5 text-white font-orbitron font-bold uppercase text-sm rounded-xl"
            >
              ✉️ Send Us a Message
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4 glass-panel border-purple-500/20 rounded-xl px-6 py-5 mb-12">
          <span className="text-2xl leading-none mt-0.5">⚡</span>
          <div>
            <p className="text-white font-semibold text-sm mb-1">Need faster support?</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Email us at{' '}
              <a href="mailto:bd@alphamovil.com" className="text-purple-400 hover:text-pink-400 hover:underline">
                bd@alphamovil.com
              </a>{' '}
              for the quickest response.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-purple-400 hover:text-pink-400 transition-colors font-orbitron text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={14} /> Back to Home
        </button>
      </div>

      <FooterSection />
    </PageLayout>
  );
}

function ContactRow({ icon, label, value, children }: { icon: string; label: string; value?: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 px-6 py-5">
      <span className="text-xl leading-none mt-0.5">{icon}</span>
      <div>
        <p className="text-gray-500 font-orbitron text-[10px] uppercase tracking-widest mb-1">{label}</p>
        <p className="text-gray-200 text-sm leading-relaxed">{value ?? children}</p>
      </div>
    </div>
  );
}
