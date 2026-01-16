import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Sun, Zap, Shield, Thermometer, Award, ChevronDown } from 'lucide-react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEO } from './SEO';

gsap.registerPlugin(ScrollTrigger);

interface SolarPanelPageProps {
  onBack: () => void;
}

const TOTAL_FRAMES = 40;
const FRAME_PATH = '/media/solar-jpg/ezgif-frame-';

function SolarPanelPage({ onBack }: SolarPanelPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const currentFrameRef = useRef(0);

  // Scroll to top on mount
  // Scroll to top on mount and init Lenis
  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // Preload all images with error handling
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    let errorCount = 0;

    // Timeout fallback - if images don't load in 5 seconds, proceed anyway
    const timeout = setTimeout(() => {
      if (!imagesLoaded) {
        console.warn('Image loading timeout - proceeding with fallback');
        setImagesLoaded(true);
      }
    }, 5000);

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, '0');
      img.src = `${FRAME_PATH}${frameNum}.jpg`;

      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount + errorCount === TOTAL_FRAMES) {
          clearTimeout(timeout);
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        errorCount++;
        console.warn(`Failed to load frame ${frameNum}`);
        if (loadedCount + errorCount === TOTAL_FRAMES) {
          clearTimeout(timeout);
          setImagesLoaded(true);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => clearTimeout(timeout);
  }, []);

  // Setup canvas and scroll animation
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrameRef.current);
    };

    const renderFrame = (frameIndex: number) => {
      const img = imagesRef.current[frameIndex];
      if (!img || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate scaling to cover the canvas
      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      );
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // GSAP ScrollTrigger animation with enhanced smoothness
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5, // Increased for smoother frame transitions
      onUpdate: (self) => {
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(self.progress * TOTAL_FRAMES)
        );
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          renderFrame(frameIndex);
        }
      },
    });

    // Render first frame
    renderFrame(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      scrollTrigger.kill();
    };
  }, [imagesLoaded]);

  // Content sections animation
  useEffect(() => {
    if (!imagesLoaded) return;

    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [imagesLoaded]);




  return (
    <div className="bg-black text-white min-h-screen">
      <SEO
        title="Adani Solar Panels | High Efficiency Mono-PERC | Saraswati Solar"
        description="Discover premium Adani Solar Panels with 21.5% efficiency and 25-year warranty. Best solar panels for home in Saharanpur. MNRE approved."
        canonical="/products/adani-solar-panels"
      />
      {/* Loading Screen */}
      {!imagesLoaded && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
            <div
              className="absolute inset-0 rounded-full border-2 border-orange-500 border-t-transparent animate-spin"
              style={{ animationDuration: '1s' }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sun className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <p className="text-white/60 text-sm font-medium tracking-wider uppercase mb-2">Loading Experience</p>
          <p className="text-white text-2xl font-bold">{loadProgress}%</p>
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-6 left-6 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 rounded-full px-5 py-3 flex items-center gap-2 transition-all duration-300 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium text-sm">Back</span>
      </button>

      {/* Fixed Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0"
        style={{ opacity: imagesLoaded ? 1 : 0, transition: 'opacity 0.5s' }}
      />

      {/* Dark overlay gradient */}
      <div className="fixed inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Scrollable Content Container */}
      <div ref={containerRef} className="relative z-20" style={{ height: '500vh' }}>

        {/* Section 1: Hero */}
        <section className="scroll-section h-screen flex flex-col items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
              Adani Solar Panels
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl mx-auto leading-relaxed">
              High-efficiency mono-PERC technology engineered for Indian weather conditions
            </p>
          </div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-white/40 text-xs tracking-widest uppercase mb-2">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 text-white/40" />
          </div>
        </section>

        {/* Section 2: Mono-PERC Technology */}
        <section className="scroll-section min-h-screen flex items-center justify-start px-6 md:px-16 py-24">
          <div className="max-w-lg bg-black/40 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-500/30 to-orange-600/20 rounded-2xl flex items-center justify-center mb-6 border border-yellow-500/20">
              <Sun className="w-7 h-7 text-yellow-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Mono-PERC Technology</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              Passivated Emitter Rear Cell technology captures more sunlight and converts it to electricity with industry-leading efficiency rates up to <span className="text-orange-400 font-bold">21.5%</span>.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
              </div>
              <span className="text-orange-400 font-bold text-sm">21.5% Efficiency</span>
            </div>
          </div>
        </section>

        {/* Section 3: Power Output */}
        <section className="scroll-section min-h-screen flex items-center justify-end px-6 md:px-16 py-24">
          <div className="max-w-lg bg-black/40 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-cyan-600/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
              <Zap className="w-7 h-7 text-blue-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Superior Power Output</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              Each panel delivers consistent power output of <span className="text-blue-400 font-bold">540W+</span> even in low-light conditions, maximizing your energy generation throughout the day.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                <p className="text-3xl font-bold text-blue-400">540W</p>
                <p className="text-white/40 text-xs uppercase tracking-wider mt-1">Peak Power</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                <p className="text-3xl font-bold text-cyan-400">4.5</p>
                <p className="text-white/40 text-xs uppercase tracking-wider mt-1">Units/Day</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Weather Resistance */}
        <section className="scroll-section min-h-screen flex items-center justify-start px-6 md:px-16 py-24">
          <div className="max-w-lg bg-black/40 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/30 to-green-600/20 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
              <Thermometer className="w-7 h-7 text-emerald-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Built for India</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              Engineered to withstand extreme Indian weather – from scorching summers to monsoon rains. Temperature coefficient of <span className="text-emerald-400 font-bold">-0.35%/°C</span> ensures optimal performance.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-400 text-sm font-medium border border-emerald-500/20">45°C+ Tolerance</span>
              <span className="px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-400 text-sm font-medium border border-emerald-500/20">IP68 Rated</span>
              <span className="px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-400 text-sm font-medium border border-emerald-500/20">Hail Resistant</span>
            </div>
          </div>
        </section>

        {/* Section 5: Warranty */}
        <section className="scroll-section min-h-screen flex items-center justify-end px-6 md:px-16 py-24">
          <div className="max-w-lg bg-black/40 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500/30 to-violet-600/20 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20">
              <Shield className="w-7 h-7 text-purple-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">25-Year Warranty</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              Industry-leading performance warranty guarantees <span className="text-purple-400 font-bold">80%+ output</span> even after 25 years. Your investment is protected for decades.
            </p>
            <div className="bg-gradient-to-r from-purple-500/20 to-violet-500/10 rounded-xl p-5 border border-purple-500/20">
              <div className="flex items-center gap-4">
                <Award className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-white font-bold">MNRE Approved</p>
                  <p className="text-white/50 text-sm">Government certified quality</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: CTA */}
        <section className="scroll-section min-h-screen flex items-center justify-center px-6 py-24">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">
              Power Your Future
            </h2>
            <p className="text-xl text-white/60 mb-10 leading-relaxed">
              Join thousands of homeowners in Saharanpur who've made the switch to clean, reliable solar energy.
            </p>
            <button
              onClick={onBack}
              className="group bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl shadow-white/20 flex items-center gap-3 mx-auto"
            >
              Get Your Free Quote
              <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SolarPanelPage;
