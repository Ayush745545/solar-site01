import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Calculator, Sun, IndianRupee, Zap, Info } from 'lucide-react';
import { SolarEstimate } from '../types';

const SolarCalculator: React.FC = () => {
  const [bill, setBill] = useState(3000);
  const [estimate, setEstimate] = useState<SolarEstimate | null>(null);

  // Simplified calculation logic for Uttar Pradesh context
  const calculateSolar = (monthlyBill: number) => {
    // Assumptions: ₹8/unit, 4 units/kW/day, 30 days
    const unitsConsumed = monthlyBill / 8;
    const recommendedKw = Math.ceil(unitsConsumed / (4 * 30));
    
    // Cost assumptions: ₹50,000 per kW (market average base)
    const baseCost = recommendedKw * 50000;
    
    // Subsidy (Approx PM Surya Ghar: ₹30k/kW for first 2kW, ₹18k for 3rd kW)
    let subsidy = 0;
    if (recommendedKw <= 2) subsidy = recommendedKw * 30000;
    else if (recommendedKw === 3) subsidy = (2 * 30000) + 18000;
    else subsidy = 78000; // Capped usually at 3kW subsidy level for residential
    
    const netCost = baseCost - subsidy;
    const annualSavings = (unitsConsumed * 12) * 8;
    const payback = netCost / annualSavings;

    return {
      monthlyBill,
      systemSizeKw: recommendedKw,
      estimatedCost: baseCost,
      subsidyAmount: subsidy,
      netCost,
      annualSavings,
      paybackPeriodYears: parseFloat(payback.toFixed(1))
    };
  };

  useEffect(() => {
    const result = calculateSolar(bill);
    setEstimate(result);
  }, [bill]);

  const chartData = estimate ? [
    { name: 'Year 1', savings: estimate.annualSavings, cumulative: estimate.annualSavings - estimate.netCost },
    { name: 'Year 5', savings: estimate.annualSavings, cumulative: (estimate.annualSavings * 5) - estimate.netCost },
    { name: 'Year 10', savings: estimate.annualSavings, cumulative: (estimate.annualSavings * 10) - estimate.netCost },
    { name: 'Year 25', savings: estimate.annualSavings, cumulative: (estimate.annualSavings * 25) - estimate.netCost },
  ] : [];

  return (
    <div id="calculator" className="text-white py-24 px-4 overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800/20 via-transparent to-transparent pointer-events-none z-10"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="mb-12 text-center md:text-left">
           <span className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-2 block">Pro Estimator</span>
           <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Financial Intelligence.</h2>
           <p className="text-gray-400 mt-2 text-lg">See the future of your savings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls - Left Panel */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#1c1c1e] rounded-[2rem] p-8 border border-white/5 shadow-2xl">
              <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-6">
                Monthly Bill
              </label>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-2xl text-gray-500">₹</span>
                <span className="text-6xl font-bold tracking-tighter">{bill.toLocaleString()}</span>
              </div>
              
              <input
                type="range"
                min="1000"
                max="20000"
                step="500"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-white hover:accent-gray-200 transition-all mb-4"
              />
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>₹1k</span>
                <span>₹20k</span>
              </div>
            </div>

            {estimate && (
              <div className="bg-[#1c1c1e] rounded-[2rem] p-8 border border-white/5 shadow-2xl space-y-6">
                 <div>
                    <div className="flex items-center gap-2 mb-2 text-gray-400">
                      <Sun size={16} />
                      <span className="text-xs font-bold uppercase tracking-wider">System Size</span>
                    </div>
                    <div className="text-3xl font-bold">{estimate.systemSizeKw} kW</div>
                 </div>
                 <div className="h-[1px] bg-white/10 w-full"></div>
                 <div>
                    <div className="flex items-center gap-2 mb-2 text-gray-400">
                      <Zap size={16} />
                      <span className="text-xs font-bold uppercase tracking-wider">Est. Subsidy</span>
                    </div>
                    <div className="text-3xl font-bold text-green-400">₹{estimate.subsidyAmount.toLocaleString()}</div>
                 </div>
              </div>
            )}
          </div>

          {/* Visualization - Right Panel */}
          <div className="lg:col-span-8 bg-[#1c1c1e] rounded-[2.5rem] p-8 md:p-12 border border-white/5 shadow-2xl flex flex-col">
            {estimate && (
              <>
                <div className="grid grid-cols-2 gap-8 mb-12">
                   <div>
                     <p className="text-gray-500 text-sm font-medium mb-1">Annual Savings</p>
                     <p className="text-4xl md:text-5xl font-bold text-white tracking-tight">₹{estimate.annualSavings.toLocaleString()}</p>
                   </div>
                   <div>
                     <p className="text-gray-500 text-sm font-medium mb-1">ROI Speed</p>
                     <p className="text-4xl md:text-5xl font-bold text-blue-400 tracking-tight">{estimate.paybackPeriodYears} <span className="text-2xl text-blue-400/60">Years</span></p>
                   </div>
                </div>

                <div className="flex-1 min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                      <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#2c2c2e', borderRadius: '12px', border: 'none', color: '#fff' }}
                        cursor={{fill: '#ffffff10'}}
                        formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Value']}
                        labelStyle={{color: '#999'}}
                      />
                      <Bar dataKey="cumulative" radius={[6, 6, 0, 0]} barSize={60}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.cumulative > 0 ? '#3b82f6' : '#ef4444'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                  <Info size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500">
                    Projections assume standard UP solar radiance. Blue bars indicate net positive cash flow (cumulative savings exceed system cost).
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;