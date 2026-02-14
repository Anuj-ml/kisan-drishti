import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';

export const Landing: React.FC = () => {
  const { setUserRole } = useAppStore();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Hero Image URL
  const HERO_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuCFwlct6b-VkeYSAHevsxE_FprA90_9IB5uhlMhGB6cAwqrXmMkOEvunhUUvGy977FVE0DcFeLA81vrJ74K1gsImzwr-r1lS1q-wqjOY9EOO-jYG3ozU41W3MiPEFndhQbqzWhuCDCGrH_rExTuwSfTb5kCZ-t5JwF-D27SCNA9BvQ1iugmvKJ4_23C_piTjPdyydQlUrXqYfVj9hH2vFH76Cdi3cCpRRNWxx2FjPXBtmTlOjJXNkQXhoumanRdy84LilRX0D1iPiQ";
  // Testimonial Image URL
  const TESTIMONIAL_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBhymKaY2kgTha35xEloN56Q9tGwdurBtNMbtCVdCsdX9Uk_qTrjHRQ-rhCaXp6zYDu-xpOub2ARpTS4oQPa-b9g60gQCI26aS_lGuEmcL4C9YDqTubyRYwGx8j2CTetF9OZkauV_Xavmi2P0y5FfWQuxjENmWgv_Hib_D9y8X2JVaOspMubNX2hRbmJybrNbVVnHprM5BF8oOK41xEj2563kaDNy94OChTs00EK5zIGmbEaut8IQp2cvmHZqAzW5rbjJEgE04Gso8";

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-bg-light text-[#0d1c17] selection:bg-primary/30 min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 bg-bg-light/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-2xl">agriculture</span>
            </div>
            <h2 className="text-[#0d1c17] text-xl font-black leading-tight tracking-tight uppercase">Kisan-Drishti</h2>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            <button onClick={() => scrollToSection('features')} className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer">Features</button>
            <button onClick={() => scrollToSection('social-proof')} className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer">Partners</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer">Community</button>
          </nav>
          <div className="flex items-center gap-4">
            <button 
                onClick={() => setShowLoginModal(true)}
                className="hidden sm:block text-sm font-bold text-primary px-4 py-2 hover:bg-primary/5 rounded-lg transition-all"
            >
                Log In
            </button>
            <button 
                onClick={() => setUserRole('farmer')}
                className="bg-primary text-white text-sm font-bold px-6 py-3 rounded-lg hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
                Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="pt-20 flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center px-6 py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img alt="Agriculture Landscape" className="w-full h-full object-cover" src={HERO_IMG} />
            <div className="absolute inset-0 bg-black/50 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-white text-xs font-bold mb-6 tracking-wider uppercase backdrop-blur-sm border border-white/10">
                <span className="material-symbols-outlined text-sm">verified</span>
                The Future of Farming
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white leading-[1.05] mb-8 tracking-tight">
                Modernizing Agriculture with <span className="text-emerald-400">Data-Driven</span> Insights
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-10 max-w-xl font-medium">
                The complete digital ecosystem for the modern farmer. Track markets, optimize yields, and manage resources with precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button 
                    onClick={() => setUserRole('farmer')}
                    className="px-10 py-5 text-white font-bold rounded-xl shadow-2xl hover:bg-emerald-500 hover:scale-[1.02] active:scale-95 transition-all text-xl bg-primary shadow-primary/40"
                >
                  Start Free Trial
                </button>
                <button className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2 text-xl">
                  <span className="material-symbols-outlined">play_circle</span>
                  Watch Demo
                </button>
              </div>
              <div className="mt-16 flex items-center gap-6">
                <div className="flex -space-x-3">
                  <div className="size-12 rounded-full border-2 border-white/20 bg-slate-200"></div>
                  <div className="size-12 rounded-full border-2 border-white/20 bg-slate-300"></div>
                  <div className="size-12 rounded-full border-2 border-white/20 bg-slate-400"></div>
                </div>
                <p className="text-sm font-medium text-white/70">Trusted by <span className="text-white font-bold">12,000+ farmers</span> worldwide</p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section id="social-proof" className="bg-cream-dark/50 py-12 border-y border-primary/5">
          <div className="max-w-7xl mx-auto px-6 overflow-hidden">
            <p className="text-center text-sm font-bold text-[#0d1c17]/40 uppercase tracking-[0.2em] mb-8">Trusted by Leaders in Agriculture</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Placeholders for logos */}
               <div className="flex items-center gap-2 text-xl font-black text-slate-400"><span className="material-symbols-outlined">psychology</span> AgriTech</div>
               <div className="flex items-center gap-2 text-xl font-black text-slate-400"><span className="material-symbols-outlined">eco</span> GreenField</div>
               <div className="flex items-center gap-2 text-xl font-black text-slate-400"><span className="material-symbols-outlined">water_drop</span> HydroFlow</div>
               <div className="flex items-center gap-2 text-xl font-black text-slate-400"><span className="material-symbols-outlined">science</span> CropLab</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Our Core Capabilities</h2>
            <p className="text-lg text-[#0d1c17]/60 max-w-2xl mx-auto">Empowering farmers with precision technology and real-time data to maximize yield and minimize waste.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group p-8 bg-white rounded-2xl border border-primary/5 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">trending_up</span>
              </div>
              <h3 className="text-2xl font-black mb-4">Market Intelligence</h3>
              <p className="text-[#0d1c17]/60 leading-relaxed mb-6">Live pricing, trend analysis, and market forecasts at your fingertips. Know exactly when to sell.</p>
              <a className="inline-flex items-center text-primary font-bold gap-2 group/link cursor-pointer hover:underline">
                Learn more 
                <span className="material-symbols-outlined group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
            {/* Card 2 */}
            <div className="group p-8 bg-white rounded-2xl border border-primary/5 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">precision_manufacturing</span>
              </div>
              <h3 className="text-2xl font-black mb-4">Smart Tools</h3>
              <p className="text-[#0d1c17]/60 leading-relaxed mb-6">Precision farming calculators and seamless weather integrations. Plan your season with confidence.</p>
              <a className="inline-flex items-center text-primary font-bold gap-2 group/link cursor-pointer hover:underline">
                Explore tools 
                <span className="material-symbols-outlined group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
            {/* Card 3 */}
            <div className="group p-8 bg-white rounded-2xl border border-primary/5 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">analytics</span>
              </div>
              <h3 className="text-2xl font-black mb-4">Reports</h3>
              <p className="text-[#0d1c17]/60 leading-relaxed mb-6">Comprehensive PDF exports and historical data logs for better seasonal planning and compliance.</p>
              <a className="inline-flex items-center text-primary font-bold gap-2 group/link cursor-pointer hover:underline">
                View samples 
                <span className="material-symbols-outlined group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section id="testimonials" className="py-24 px-6 bg-cream-dark">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 p-8 text-primary/10">
                <span className="material-symbols-outlined text-[120px]">format_quote</span>
              </div>
              <div className="size-64 shrink-0 rounded-2xl overflow-hidden shadow-lg border-4 border-primary/5">
                <img alt="Happy Farmer" className="w-full h-full object-cover" src={TESTIMONIAL_IMG} />
              </div>
              <div className="relative z-10">
                <div className="flex text-primary mb-6">
                  <span className="material-symbols-outlined fill-current">star</span>
                  <span className="material-symbols-outlined fill-current">star</span>
                  <span className="material-symbols-outlined fill-current">star</span>
                  <span className="material-symbols-outlined fill-current">star</span>
                  <span className="material-symbols-outlined fill-current">star</span>
                </div>
                <p className="text-2xl md:text-3xl font-medium text-[#0d1c17] leading-relaxed mb-8 italic">
                  "Kisan-Drishti changed how I look at my land. The smart tools helped me reduce water usage by 30% while increasing my harvest yield. It's the partner every modern farmer needs."
                </p>
                <div>
                  <p className="text-xl font-black text-[#0d1c17]">Arun Kumar</p>
                  <p className="text-primary font-bold">Organic Farm Owner, Punjab</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0d1c17] text-white pt-24 pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 pb-16 border-b border-white/10">
              <div>
                <h2 className="text-4xl font-black mb-6">Join the Community</h2>
                <p className="text-white/60 text-lg mb-8 max-w-md">Get the latest agricultural insights, market updates, and precision farming tips delivered to your inbox.</p>
                <form className="flex gap-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
                  <input className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Enter your email" type="email" />
                  <button className="bg-primary px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all">Subscribe</button>
                </form>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-bold mb-6 text-primary">Resources</h4>
                  <ul className="space-y-4 text-white/60 text-sm">
                    <li><a className="hover:text-white transition-colors cursor-pointer">Case Studies</a></li>
                    <li><a className="hover:text-white transition-colors cursor-pointer">Documentation</a></li>
                    <li><a className="hover:text-white transition-colors cursor-pointer">Help Center</a></li>
                    <li><a className="hover:text-white transition-colors cursor-pointer">Blog</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-6 text-primary">Company</h4>
                  <ul className="space-y-4 text-white/60 text-sm">
                    <li><a className="hover:text-white transition-colors cursor-pointer">About Us</a></li>
                    <li><a className="hover:text-white transition-colors cursor-pointer">Careers</a></li>
                    <li><a className="hover:text-white transition-colors cursor-pointer">Sustainability</a></li>
                    <li><a className="hover:text-white transition-colors cursor-pointer">News</a></li>
                  </ul>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <h4 className="font-bold mb-6 text-primary">Legal</h4>
                  <ul className="space-y-4 text-white/60 text-sm">
                    <li><a className="hover:text-white transition-colors cursor-pointer">Privacy Policy</a></li>
                    <li><a className="hover:text-white transition-colors cursor-pointer">Terms of Service</a></li>
                    <li><a className="hover:text-white transition-colors cursor-pointer">Cookie Policy</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="size-8 bg-primary rounded flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-xl">agriculture</span>
                </div>
                <h2 className="text-white text-lg font-black tracking-tight uppercase">Kisan-Drishti</h2>
              </div>
              <p className="text-white/40 text-sm">© 2024 Kisan-Drishti. All rights reserved. Built for the modern farmer.</p>
              <div className="flex gap-6 opacity-40">
                <span className="material-symbols-outlined hover:text-white transition-colors cursor-pointer">public</span>
                <span className="material-symbols-outlined hover:text-white transition-colors cursor-pointer">share</span>
              </div>
            </div>
          </div>
        </footer>

        {/* Login Selection Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setShowLoginModal(false)}>
              <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6" onClick={e => e.stopPropagation()}>
                  <div className="text-center">
                      <h3 className="text-2xl font-black text-[#0d1c17]">Select Account Type</h3>
                      <p className="text-slate-500 mt-2">Choose how you want to log in to Kisan-Drishti</p>
                  </div>
                  
                  <div className="grid gap-4">
                      <button 
                        onClick={() => setUserRole('farmer')}
                        className="flex items-center gap-4 p-4 border border-slate-200 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all group"
                      >
                          <div className="size-12 rounded-xl bg-green-100 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                              <span className="material-symbols-outlined text-2xl">person</span>
                          </div>
                          <div className="text-left">
                              <h4 className="font-bold text-[#0d1c17]">Farmer</h4>
                              <p className="text-xs text-slate-500">Access market prices & tools</p>
                          </div>
                      </button>

                      <button 
                        onClick={() => setUserRole('official')}
                        className="flex items-center gap-4 p-4 border border-slate-200 rounded-2xl hover:border-amber-500 hover:bg-amber-50 transition-all group"
                      >
                          <div className="size-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
                              <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
                          </div>
                          <div className="text-left">
                              <h4 className="font-bold text-[#0d1c17]">Market Official</h4>
                              <p className="text-xs text-slate-500">Manage rates & broadcasts</p>
                          </div>
                      </button>
                  </div>

                  <button 
                    onClick={() => setShowLoginModal(false)}
                    className="w-full py-3 text-slate-400 font-bold text-sm hover:text-slate-600"
                  >
                      Cancel
                  </button>
              </div>
          </div>
        )}
    </div>
  );
};