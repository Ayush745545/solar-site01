import React, { useState } from 'react';
import { Sun, CheckCircle, ShieldCheck, FileText, Zap, Menu, X, Phone, Mail, MapPin, ArrowRight, Battery, Gauge, TrendingUp, Factory, Globe, HardHat, Activity, Scale, FileCheck, Landmark, Building2, Receipt, MessageCircle, Calendar, Wrench, Layers, Plug, Sparkles } from 'lucide-react';
import SolarCalculator from './components/SolarCalculator';
import BookingForm from './components/BookingForm';
import BookingModal from './components/BookingModal';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setIsNavVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const openBookingModal = () => {
    setIsBookingModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-slate-900 selection:bg-orange-500 selection:text-white font-sans">
      
      {/* Booking Popup Modal */}
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />

      {/* Navigation - Floating Glass Island */}
      <nav className={`fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 transition-transform duration-300 ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="glass-panel-light px-3 md:px-4 py-1.5 md:py-2 rounded-full flex items-center justify-between shadow-xl shadow-black/5 w-full max-w-5xl transition-all duration-300 border border-white/40">
          
          {/* Enhanced Logo: Solar Prism Design */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
              <div className="absolute inset-0 bg-white rounded-xl shadow-lg shadow-black/20 overflow-hidden">
                <img src="/media/Sun & Fun.png" alt="SARASWATI SOLAR Power Solution" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-[15px] md:text-lg tracking-[-0.03em] text-slate-900">SARASWATI SOLAR</span>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[9px] md:text-[10px] tracking-[0.3em] text-orange-600">Power Solution</span>
                <div className="h-[2px] w-4 bg-orange-600/30 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-full border border-gray-200/50">
            <button onClick={() => scrollToSection('about')} className="px-4 py-1.5 text-xs font-medium text-gray-600 hover:text-black hover:bg-white rounded-full transition-all">About</button>
            <button onClick={() => scrollToSection('products')} className="px-4 py-1.5 text-xs font-medium text-gray-600 hover:text-black hover:bg-white rounded-full transition-all">Products</button>
            <button onClick={() => scrollToSection('services')} className="px-4 py-1.5 text-xs font-medium text-gray-600 hover:text-black hover:bg-white rounded-full transition-all">Solutions</button>
            <button onClick={() => scrollToSection('subsidy')} className="px-4 py-1.5 text-xs font-medium text-gray-600 hover:text-black hover:bg-white rounded-full transition-all">Subsidy</button>
            <button onClick={() => scrollToSection('calculator')} className="px-4 py-1.5 text-xs font-medium text-gray-600 hover:text-black hover:bg-white rounded-full transition-all">Estimator</button>
          </div>

          <div className="flex items-center gap-2.5">
             <button 
              onClick={openBookingModal}
              className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-blue-600 transition-all shadow-lg shadow-black/10 active:scale-95"
            >
              Booking
            </button>
            <button className="md:hidden text-slate-800 p-1 bg-white/50 rounded-full" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white/40 flex flex-col gap-5 text-center animate-fade-in">
              <button onClick={() => scrollToSection('about')} className="text-xl font-bold text-slate-800">About Us</button>
              <button onClick={() => scrollToSection('products')} className="text-xl font-bold text-slate-800">3kW Systems</button>
              <button onClick={() => scrollToSection('services')} className="text-xl font-bold text-slate-800">Solutions</button>
              <button onClick={() => scrollToSection('subsidy')} className="text-xl font-bold text-slate-800">Subsidy Info</button>
              <button onClick={() => scrollToSection('calculator')} className="text-xl font-bold text-slate-800">Price Estimator</button>
              <button onClick={openBookingModal} className="mt-2 py-4 bg-orange-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-600/20">GET STARTED</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden" style={{backgroundImage: 'url(/media/solar.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto max-w-5xl text-center relative z-10 space-y-8">
          <div className="animate-fade-in-up">
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold tracking-[0.2em] uppercase text-orange-400 backdrop-blur-md mb-8">
              AUTHORIZED PARTNER • TALHERI BUZURG
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
              Solar Energy <br />
              Made Simple.
            </h1>
            <p className="text-lg md:text-2xl text-white max-w-2xl mx-auto font-medium leading-relaxed tracking-tight px-4">
              Premium rooftop solar systems designed for the UP climate. <br className="hidden md:block"/>
              Regional experts in the Saharanpur district.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 px-4 animate-fade-in-up delay-100">
            <button 
              onClick={() => scrollToSection('calculator')}
              className="group relative px-10 py-5 bg-white text-black rounded-full font-bold text-base hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10">Calculate Savings</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform"/>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="px-10 py-5 bg-white/10 text-white border border-white/10 rounded-full font-bold text-base hover:bg-white/20 backdrop-blur-md transition-all w-full sm:w-auto"
            >
              View Solutions
            </button>
          </div>

          {/* Hero Image */}
          <div className="mt-16 relative mx-auto max-w-4xl animate-fade-in-up delay-200 px-2 md:px-0">
             <div className="aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/20 bg-[#111]">
                <img
                  src="/media/ji.jpg"
                  alt="Premium Rooftop Solar"
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0 text-left">
                  <div className="text-left">
                    <p className="text-orange-400 text-[10px] uppercase tracking-[0.2em] font-black mb-2">Presence</p>
                    <p className="text-2xl md:text-3xl font-black text-white">Talheri Buzurg</p>
                  </div>
                   <div className="text-right w-full md:w-auto">
                    <p className="text-blue-400 text-[10px] uppercase tracking-[0.2em] font-black mb-2">Efficiency</p>
                    <p className="text-2xl md:text-3xl font-black text-white">Zero Electricity Bills</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 px-4 bg-white relative overflow-hidden scroll-mt-28" style={{backgroundImage: 'url(/media/page.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="container mx-auto max-w-6xl relative z-10 px-4">
           <div className="text-center mb-16 px-4">
              <span className="text-blue-400 font-bold tracking-widest text-[10px] uppercase mb-3 block">Our Products</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">3 kW On-Grid Solar System</h2>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">Complete end-to-end installation with premium, MNRE-approved components, designed for residential homes in the Saharanpur region.</p>
           </div>
           <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 grid-auto-rows-1fr">
                 <div className="bg-blue-50/20 p-6 rounded-[2rem] border border-blue-100/50 group backdrop-blur-sm hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-400 shadow-sm mb-4 group-hover:scale-110 transition-transform">
                       <Wrench size={20} />
                    </div>
                    <h4 className="font-bold text-white mb-1">Local Installation</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">Dedicated on-ground installation teams based near Talheri Buzurg, ensuring faster site surveys, timely installation, and reliable after-sales support.</p>
                 </div>
                 <div className="bg-orange-50/20 p-6 rounded-[2rem] border border-orange-100/50 group backdrop-blur-sm hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-400 shadow-sm mb-4 group-hover:scale-110 transition-transform">
                       <Sun size={20} />
                    </div>
                    <h4 className="font-bold text-white mb-1">Adani Solar Module Kit</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">High-efficiency mono-PERC solar panels manufactured by Adani Solar, designed for Indian weather conditions with strong performance in high temperatures and dusty environments.</p>
                 </div>
                 <div className="bg-green-50/20 p-6 rounded-[2rem] border border-green-100/50 group backdrop-blur-sm hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-400 shadow-sm mb-4 group-hover:scale-110 transition-transform">
                       <ShieldCheck size={20} />
                    </div>
                    <h4 className="font-bold text-white mb-1">25-Year Performance Warranty</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">Manufacturer-backed panel performance warranty ensuring long-term output stability and peace of mind for homeowners.</p>
                 </div>
                 <div className="bg-yellow-50/20 p-6 rounded-[2rem] border border-yellow-100/50 group backdrop-blur-sm hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-yellow-400 shadow-sm mb-4 group-hover:scale-110 transition-transform">
                       <Plug size={20} />
                    </div>
                    <h4 className="font-bold text-white mb-1">Premium Cabling</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">ISI-certified Havells DC & AC cables used for rooftop and inverter connections, ensuring high insulation resistance, reduced power loss, and electrical safety.</p>
                 </div>
                 <div className="bg-red-50/20 p-6 rounded-[2rem] border border-red-100/50 group backdrop-blur-sm hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-400 shadow-sm mb-4 group-hover:scale-110 transition-transform">
                       <Zap size={20} />
                    </div>
                    <h4 className="font-bold text-white mb-1">Copper Earthing System</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">Heavy-gauge copper earthing with proper grounding pits to protect the system against electrical faults, lightning, and voltage fluctuations.</p>
                 </div>
                 <div className="bg-slate-50/20 p-6 rounded-[2rem] border border-slate-100/50 group backdrop-blur-sm hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm mb-4 group-hover:scale-110 transition-transform">
                       <Layers size={20} />
                    </div>
                    <h4 className="font-bold text-white mb-1">Robust Mounting Structure</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">Hot-dip galvanized or galvalume mounting structure engineered to withstand strong winds, corrosion, and long-term outdoor exposure.</p>
                 </div>
                 <div className="bg-purple-50/20 p-6 rounded-[2rem] border border-purple-100/50 group backdrop-blur-sm hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-purple-400 shadow-sm mb-4 group-hover:scale-110 transition-transform">
                       <Zap size={20} />
                    </div>
                    <h4 className="font-bold text-white mb-1">On-Grid Net Metering Support</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">Complete assistance with DISCOM coordination, net-meter installation, and documentation as per Uttar Pradesh electricity regulations.</p>
                 </div>
              </div>
              <div className="lg:col-span-1 lg:sticky lg:top-0 order-first lg:order-last">
                 <div className="bg-[#1c1c1e] rounded-[2rem] shadow-xl p-8 text-white relative overflow-hidden hover:translate-y-[-4px] hover:shadow-2xl transition-all duration-300">
                    <div className="relative z-10">
                       <div className="mb-8">
                          <span className="block text-blue-200 text-[10px] font-bold uppercase tracking-wider mb-2">Price (After Government Subsidy)</span>
                          <div className="flex items-baseline gap-2">
                             <span className="text-5xl font-black tracking-tight">₹1,12,000</span>
                             <span className="text-xl font-medium opacity-80">/-</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-2">(Indicative price for standard residential installation. Final cost may vary based on site conditions, roof type, and DISCOM norms.)</p>
                       </div>
                       <button onClick={openBookingModal} className="w-full bg-white text-blue-600 font-bold py-5 rounded-2xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                          Book Now <ArrowRight size={18} />
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
     </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 bg-[#f5f5f7] scroll-mt-28" style={{backgroundImage: 'url(/media/kkk.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16 px-4">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">Engineering excellence.</h2>
            <p className="text-lg text-white max-w-2xl mx-auto">Modern solar solutions for homes and industrial hubs in Saharanpur.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white rounded-[2.5rem] shadow-xl shadow-black/5 overflow-hidden group relative h-[350px] md:h-[400px]">
              <div className="absolute inset-0 w-full h-full">
                <img
                  src="/media/jojd.jpg"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt="Solar Panels Roof"
                />
              </div>
              <div className="absolute top-8 left-8 right-8 z-20">
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">Residential Pro.</h3>
                    <p className="text-slate-300 font-medium max-w-md text-base md:text-lg leading-snug">
                        Perfect for independent homes in Talheri Buzurg. <br/>
                        Built to handle UP's unique weather conditions.
                    </p>
              </div>
            </div>
            <div className="bg-black text-white p-8 md:p-10 rounded-[2.5rem] shadow-xl flex flex-col h-[350px] md:h-[400px] relative overflow-hidden">
               <div className="relative z-10">
                 <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                    <ShieldCheck size={24} />
                 </div>
                 <h3 className="text-2xl md:text-3xl font-black mb-2 tracking-tight leading-tight">Govt Approved.</h3>
                 <p className="text-gray-400 font-medium">
                   Fully compliant with PM Surya Ghar Yojana standards for all Talheri Buzurg and Saharanpur installs.
                 </p>
               </div>
               <div className="mt-auto pt-8">
                 <div className="flex items-center gap-3">
                   <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                     <div className="h-full w-[80%] bg-green-500 rounded-full"></div>
                   </div>
                   <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">APPROVED</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solar Calculator Section */}
      <section id="calculator" className="py-0 scroll-mt-28 relative overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/media/Untitled design (2).mp4" type="video/mp4" />
        </video>
        <SolarCalculator />
      </section>

      {/* Subsidy Section */}
      <section id="subsidy" className="py-24 px-4 relative overflow-hidden scroll-mt-28" style={{backgroundImage: 'url(/media/kok.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
          <div className="container mx-auto max-w-6xl relative z-10 px-4">
            <div className="text-center mb-16">
               <span className="text-blue-400 font-bold tracking-widest text-[10px] uppercase mb-3 block">Policy & Incentives</span>
               <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">UP Solar Roadmap.</h2>
               <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
                 Leverage Central and State schemes. We guide you through every regulatory benefit available across the Saharanpur district.
               </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
               <button 
                 onClick={openBookingModal}
                 className="bg-gradient-to-br from-blue-50 to-white p-8 md:p-10 rounded-[2.5rem] border border-blue-100 shadow-xl group hover:scale-[1.01] transition-all text-left outline-none"
               >
                  <div className="relative z-10">
                     <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                        <Landmark size={28} />
                     </div>
                     <h3 className="text-2xl font-black text-slate-900 mb-2">PM Surya Ghar Yojana</h3>
                     <p className="text-blue-600 font-bold text-[10px] mb-6 uppercase tracking-wider">UP Residential Sector</p>
                     <div className="space-y-4">
                       <div className="flex items-center justify-between p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
                         <span className="text-slate-500 font-bold">1-2 kW System</span>
                         <span className="text-slate-900 font-black">₹30k - ₹60k</span>
                       </div>
                       <div className="flex items-center justify-between p-5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20">
                         <span className="font-bold">3 kW+ System</span>
                         <span className="font-black">₹78,000 Subsidy</span>
                       </div>
                     </div>
                  </div>
               </button>
               <div className="flex flex-col gap-8">
                  <div className="flex-1 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-lg hover:border-blue-200 transition-colors cursor-pointer group" onClick={openBookingModal}>
                     <div className="flex items-start gap-6">
                        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                           <Building2 size={24} />
                        </div>
                        <div>
                           <h3 className="text-xl font-black text-slate-900 mb-1">Regional Commercial</h3>
                           <p className="text-slate-500 text-sm">Tax benefits & accelerated depreciation for regional businesses.</p>
                        </div>
                     </div>
                  </div>
                  <div className="flex-1 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-lg hover:border-green-200 transition-colors cursor-pointer group" onClick={openBookingModal}>
                     <div className="flex items-start gap-6">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                           <Receipt size={24} />
                        </div>
                        <div>
                           <h3 className="text-xl font-black text-slate-900 mb-1">UP Net Metering</h3>
                           <p className="text-slate-500 text-sm">Sell surplus energy back to UPPCL and reduce your bills to zero.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="py-24 px-4 bg-black scroll-mt-28">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">Book Your Free Consultation.</h2>
              <p className="text-gray-300 text-lg mb-10 leading-relaxed font-medium">Regional support in the Talheri Buzurg region. Get expert guidance and complete subsidy management from UP's top specialists.</p>
              <div className="flex flex-col gap-4">
                 <a href="tel:+919897147441" className="bg-slate-900 text-white px-8 py-5 rounded-2xl font-bold flex items-center justify-between hover:bg-slate-800 transition-all group shadow-xl">
                    <span className="flex items-center gap-3"><Phone size={22} className="text-green-400"/> Call Now</span>
                    <ArrowRight size={20} className="text-gray-500 group-hover:text-white transition-transform group-hover:translate-x-1"/>
                 </a>
                 <a href="https://wa.me/919897147441" target="_blank" rel="noreferrer" className="bg-[#25D366] text-white px-8 py-5 rounded-2xl font-bold flex items-center justify-between hover:bg-[#20bd5a] transition-all group shadow-xl shadow-green-500/10">
                    <span className="flex items-center gap-3"><MessageCircle size={22} className="text-white"/> WhatsApp Us</span>
                    <ArrowRight size={20} className="text-white/70 group-hover:text-white transition-transform group-hover:translate-x-1"/>
                 </a>
              </div>
            </div>
            <div><BookingForm /></div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-black text-white pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-12 mb-20 border-b border-gray-800 pb-16">
             <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center shadow-lg border border-white/5 overflow-hidden">
                    <img src="/media/Sun & Fun.png" alt="SARASWATI SOLAR Power Solution" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-black text-2xl tracking-tighter">SARASWATI SOLAR Power Solution</span>
                </div>
                <p className="text-gray-500 max-w-sm mb-8 font-medium">
                  Leading solar provider for Uttar Pradesh. Committed to transparency, engineering excellence, and a cleaner future for the Saharanpur region.
                </p>
                <div className="p-5 bg-gray-900/50 rounded-2xl border border-gray-800 text-[10px] text-gray-500 leading-relaxed max-w-md italic">
                   SARASWATI SOLAR Power Solution operates a primary regional center in Talheri Buzurg (U.P.), providing high-quality solar EPC services.
                </div>
             </div>
             <div>
                <h4 className="font-bold text-white mb-8 uppercase tracking-[0.2em] text-xs">Explore</h4>
                <ul className="space-y-4 text-gray-500 text-sm font-bold">
                  <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">Our Story</button></li>
                  <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Expert Solutions</button></li>
                  <li><button onClick={() => scrollToSection('calculator')} className="hover:text-white transition-colors">Free Estimator</button></li>
                  <li><button onClick={() => scrollToSection('subsidy')} className="hover:text-white transition-colors">Subsidy Guide</button></li>
                </ul>
             </div>
             <div>
                <h4 className="font-bold text-white mb-8 uppercase tracking-[0.2em] text-xs">Locations</h4>
                <ul className="space-y-4 text-gray-500 text-sm font-bold">
                  <li className="flex items-start gap-2 hover:text-white transition-colors">
                    <MapPin size={14} className="mt-1 shrink-0" />
                    <span>Regional Center, Talheri Buzurg,<br/>Saharanpur (U.P.)</span>
                  </li>
                  <li className="flex items-center gap-2 hover:text-white transition-colors"><Mail size={14} /> help@upsolarexpert.com</li>
                  <li className="flex items-center gap-2 hover:text-white transition-colors"><Phone size={14} /> +91 98971 47441</li>
                </ul>
             </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 font-black uppercase tracking-[0.3em] gap-4">
            <p>© {new Date().getFullYear()} SARASWATI SOLAR Power Solution</p>
            <p>built ❤️ by ayush chaudhary</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;