import React, { useState, useEffect } from 'react';
import { X, User, MapPin, FileText, Check, Lock, Zap, ShieldCheck, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { BookingFormData } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  { id: 1, title: 'Personal', subtitle: 'Details', icon: User },
  { id: 2, title: 'Install', subtitle: 'Site Info', icon: MapPin },
  { id: 3, title: 'Review', subtitle: 'Check', icon: FileText },
  { id: 4, title: 'Complete', subtitle: 'Done', icon: Check },
];

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    mobile: '',
    email: '',
    city: '',
    monthlyBill: '',
    roofType: 'Concrete',
    comments: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Sanitize input to prevent injection
  const sanitize = (str: string) => str.replace(/[<>"'&]/g, '').trim().slice(0, 500);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Sanitize and construct WhatsApp message
    const text = `*New Solar Booking Request (Popup)*\n\n` +
      `*Name:* ${sanitize(formData.name)}\n` +
      `*Mobile:* ${sanitize(formData.mobile)}\n` +
      (formData.email ? `*Email:* ${sanitize(formData.email)}\n` : '') +
      `*City:* ${sanitize(formData.city)}\n` +
      `*Monthly Bill:* ₹${sanitize(formData.monthlyBill)}\n` +
      `*Roof Type:* ${sanitize(formData.roofType)}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/919897147441?text=${encodedText}`;

    await new Promise(resolve => setTimeout(resolve, 1500));
    window.open(whatsappUrl, '_blank');
    setIsSubmitting(false);
    handleNext();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[95vh] md:h-auto md:min-h-[600px] animate-fade-in-up">
        
        {/* Progress Sidebar / Header */}
        <div className="bg-slate-900 text-white p-6 md:p-10 md:w-1/3 flex flex-col md:justify-between relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[60px] pointer-events-none"></div>
          
          <div className="relative z-10">
             <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Get Started Today</h2>
             <p className="text-slate-400 text-xs md:text-sm mb-6 md:mb-10">Free professional solar consultation</p>

             <div className="flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-4 md:gap-6">
                {steps.map((s) => (
                  <div key={s.id} className={`flex items-center gap-3 transition-all duration-300 ${step >= s.id ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 shrink-0 transition-colors ${
                      step > s.id 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : step === s.id 
                          ? 'bg-blue-600 border-blue-600 text-white' 
                          : 'border-slate-600 text-slate-400'
                    }`}>
                       {step > s.id ? <Check size={14} className="md:w-4 md:h-4" /> : <s.icon size={14} className="md:w-4 md:h-4" />}
                    </div>
                    <div className="hidden md:block">
                       <p className={`font-semibold text-xs md:text-sm ${step === s.id ? 'text-white' : 'text-slate-300'}`}>{s.title}</p>
                       <p className="text-[10px] text-slate-500">{s.subtitle}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="hidden md:block relative z-10 pt-10 border-t border-white/10 mt-auto">
             <div className="flex items-center gap-2 mb-2">
               <ShieldCheck size={16} className="text-green-400" />
               <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Trusted Partner</span>
             </div>
             <p className="text-[10px] text-slate-500 leading-relaxed">
               Your data is secure. We follow strict privacy policies and government compliance for solar implementation.
             </p>
          </div>
        </div>

        {/* Form Area */}
        <div className="bg-white p-6 md:p-12 md:w-2/3 flex flex-col relative overflow-y-auto">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 z-20"
            aria-label="Close"
          >
            <X size={20} className="md:w-6 md:h-6" />
          </button>

          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full pb-6">
            
            {step === 1 && (
              <div className="animate-fade-in space-y-6">
                <div className="mb-2">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900">Personal Information</h3>
                  <p className="text-sm text-slate-500">Your contact details for the application</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 md:py-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mobile Number *</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="10-digit number"
                      className="w-full px-4 py-3 md:py-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-base"
                    />
                    <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                      <Zap size={10} className="text-green-500 fill-current" /> We'll use this for WhatsApp updates
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 md:py-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-base"
                    />
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                   <div className="hidden sm:flex gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                     <span className="flex items-center gap-1"><Lock size={12} /> Secure</span>
                   </div>
                   <button 
                     onClick={handleNext}
                     disabled={!formData.name || formData.mobile.length < 10}
                     className="w-full md:w-auto bg-black text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-slate-800 disabled:opacity-50 transition-all"
                   >
                     Continue <ChevronRight size={18} />
                   </button>
                </div>
              </div>
            )}

            {step === 2 && (
               <div className="animate-fade-in space-y-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900">Installation Site</h3>
                  <p className="text-sm text-slate-500">Location and system preferences</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">City / District *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Lucknow"
                      className="w-full px-4 py-3 md:py-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-base"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Monthly Bill (₹)</label>
                      <input
                        type="number"
                        name="monthlyBill"
                        value={formData.monthlyBill}
                        onChange={handleChange}
                        placeholder="3000"
                        className="w-full px-4 py-3 md:py-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Roof Type</label>
                      <select
                        name="roofType"
                        value={formData.roofType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 md:py-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none appearance-none text-base"
                      >
                         <option value="Concrete">Concrete</option>
                         <option value="Tin Shed">Tin Shed</option>
                         <option value="Tiled">Tiled</option>
                         <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                   <button onClick={handleBack} className="text-slate-500 font-bold text-sm hover:text-slate-800 px-4 py-3">
                     Back
                   </button>
                   <button 
                     onClick={handleNext}
                     disabled={!formData.city}
                     className="flex-1 md:flex-none bg-black text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-slate-800 disabled:opacity-50 transition-all"
                   >
                     Continue <ChevronRight size={18} />
                   </button>
                </div>
               </div>
            )}

            {step === 3 && (
               <div className="animate-fade-in space-y-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900">Review Application</h3>
                  <p className="text-sm text-slate-500">Quick check before sending</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 md:p-6 border border-gray-100 space-y-5">
                   <div className="flex justify-between items-start border-b border-gray-200 pb-4">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Contact Profile</p>
                        <p className="font-bold text-slate-900">{formData.name}</p>
                        <p className="text-xs text-slate-600 font-medium">{formData.mobile}</p>
                        {formData.email && <p className="text-xs text-slate-600">{formData.email}</p>}
                      </div>
                      <button onClick={() => setStep(1)} className="text-blue-600 text-[10px] font-bold uppercase tracking-widest hover:underline">Edit</button>
                   </div>
                   <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Site Info</p>
                        <p className="font-bold text-slate-900">{formData.city}</p>
                        <p className="text-xs text-slate-600 font-medium">Bill: ₹{formData.monthlyBill || 'N/A'} • {formData.roofType}</p>
                      </div>
                      <button onClick={() => setStep(2)} className="text-blue-600 text-[10px] font-bold uppercase tracking-widest hover:underline">Edit</button>
                   </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                   <button onClick={handleBack} className="text-slate-500 font-bold text-sm hover:text-slate-800 px-4 py-3">
                     Back
                   </button>
                   <button 
                     onClick={handleSubmit}
                     disabled={isSubmitting}
                     className="flex-1 md:flex-none bg-blue-600 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/30"
                   >
                     {isSubmitting ? <Loader2 className="animate-spin" /> : 'Confirm Booking'}
                   </button>
                </div>
               </div>
            )}

            {step === 4 && (
               <div className="animate-fade-in text-center py-8 md:py-10 flex flex-col items-center justify-center space-y-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2 animate-bounce">
                     <Check size={40} className="md:w-12 md:h-12" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">All Done!</h3>
                    <p className="text-base text-slate-600 max-w-[300px] mx-auto leading-relaxed">
                      Thanks, <strong>{formData.name.split(' ')[0]}</strong>. We have received your request. We have opened WhatsApp to connect you directly with our team.
                    </p>
                  </div>
                  
                  <div className="w-full max-w-[300px] pt-4">
                    <button 
                      onClick={onClose}
                      className="w-full bg-slate-900 text-white py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                    >
                      Close Window
                    </button>
                  </div>
               </div>
            )}

          </div>
          
          <div className="mt-auto pt-6 border-t border-gray-100">
             <p className="text-[10px] text-slate-400 flex items-center justify-center gap-2 font-medium">
               <Lock size={10} /> Data Secure & Confidential • SARASWATI SOLAR Power Solution Team
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingModal;