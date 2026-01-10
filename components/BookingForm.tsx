import React, { useState } from 'react';
import { BookingFormData } from '../types';
import { CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    mobile: '',
    email: '',
    city: '',
    monthlyBill: '',
    roofType: 'Concrete',
    comments: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sanitize input to prevent injection
  const sanitize = (str: string) => str.replace(/[<>"'&]/g, '').trim().slice(0, 500);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Sanitize and construct WhatsApp message
    const text = `*New Solar Inquiry (Website Form)*\n\n` +
      `*Name:* ${sanitize(formData.name)}\n` +
      `*Mobile:* ${sanitize(formData.mobile)}\n` +
      `*Email:* ${sanitize(formData.email)}\n` +
      `*City:* ${sanitize(formData.city)}\n` +
      `*Monthly Bill:* ₹${sanitize(formData.monthlyBill)}\n` +
      `*Roof Type:* ${sanitize(formData.roofType)}\n` +
      (formData.comments ? `*Comments:* ${sanitize(formData.comments)}` : '');
      
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/919897147441?text=${encodedText}`;

    // Simulate delay for user experience
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="bg-green-50/50 backdrop-blur-xl p-10 rounded-[2.5rem] border border-green-100 text-center animate-fade-in flex flex-col items-center justify-center h-full">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-3xl font-bold text-green-900 mb-4 tracking-tight">Request Received</h3>
        <p className="text-green-800/80 mb-8 max-w-xs mx-auto text-lg">
          We'll contact you at <strong>{formData.mobile}</strong> shortly. We have also opened WhatsApp to connect directly.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-green-700 font-semibold hover:text-green-900 transition-colors text-sm uppercase tracking-wider"
        >
          Submit New Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-700 h-full flex flex-col justify-center">
      <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">VIP Assessment</h3>
      <p className="text-gray-300 mb-8">Fast-track your application for subsidy.</p>
      
      <div className="space-y-4">
        <div className="group">
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-800 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all outline-none text-white placeholder:text-gray-400 font-medium"
            placeholder="Full Name"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="tel"
            name="mobile"
            required
            pattern="[0-9]{10}"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-slate-900 placeholder:text-gray-400 font-medium"
            placeholder="Mobile Number"
          />
           <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-slate-900 placeholder:text-gray-400 font-medium"
            placeholder="Email Address"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-slate-900 placeholder:text-gray-400 font-medium"
            placeholder="City"
          />
          <input
            type="number"
            name="monthlyBill"
            value={formData.monthlyBill}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-slate-900 placeholder:text-gray-400 font-medium"
            placeholder="Bill (₹)"
          />
        </div>

        <div className="relative">
          <select
            name="roofType"
            value={formData.roofType}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-slate-900 font-medium appearance-none cursor-pointer"
          >
            <option value="Concrete">Concrete Roof</option>
            <option value="Tin Shed">Tin/Metal Shed</option>
            <option value="Tiled">Tiled Roof</option>
            <option value="Other">Other</option>
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
             <ChevronRight size={20} className="rotate-90" />
          </div>
        </div>

        <div className="group">
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-slate-900 placeholder:text-gray-400 font-medium min-h-[100px] resize-none"
            placeholder="Additional comments (optional)"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white font-bold py-5 rounded-2xl shadow-lg shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 mt-2"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : <>Request Callback <ChevronRight size={20} /></>}
        </button>
        <p className="text-[10px] text-gray-400 text-center mt-4">
          Data secured. We value your privacy.
        </p>
      </div>
    </form>
  );
};

export default BookingForm;