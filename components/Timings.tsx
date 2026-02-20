import React from 'react';
import { Zap } from 'lucide-react';

const Timings: React.FC = () => {
  return (
    <section className="py-24 bg-navy text-white relative overflow-hidden">
      {/* Decorative Angle */}
      <div className="absolute top-0 left-0 w-full h-16 bg-cream" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 mt-12">
        <div className="text-center mb-16">
            <Zap className="w-8 h-8 mx-auto mb-4 text-slate-400" />
            <h2 className="font-serif text-5xl md:text-6xl mb-4">Our Timings</h2>
            <div className="w-24 h-1 bg-slate-700 mx-auto"></div>
        </div>

        <div className="grid gap-6">
          
          {/* Weekdays */}
          <div className="group relative bg-slate-800/50 hover:bg-slate-800 transition-colors p-1 rounded-lg">
             <div className="flex flex-col md:flex-row items-center bg-cream text-navy p-6 md:p-8 rounded shadow-lg transform group-hover:-translate-y-1 transition-transform duration-300">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-serif font-bold">Weekdays</h3>
                </div>
                <div className="w-full md:w-auto h-px md:h-8 bg-gray-300 my-4 md:my-0 md:mx-8"></div>
                <div className="flex-1 text-center md:text-right">
                  <p className="text-xl md:text-2xl font-light tracking-wider">12:00pm – 10:00pm</p>
                </div>
             </div>
          </div>

          {/* Weekends */}
          <div className="group relative bg-slate-800/50 hover:bg-slate-800 transition-colors p-1 rounded-lg">
             <div className="flex flex-col md:flex-row items-center bg-cream text-navy p-6 md:p-8 rounded shadow-lg transform group-hover:-translate-y-1 transition-transform duration-300">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-serif font-bold">Weekends</h3>
                </div>
                <div className="w-full md:w-auto h-px md:h-8 bg-gray-300 my-4 md:my-0 md:mx-8"></div>
                <div className="flex-1 text-center md:text-right">
                  <p className="text-xl md:text-2xl font-light tracking-wider">11:30am – 10:30pm</p>
                </div>
             </div>
          </div>

          {/* Holidays */}
          <div className="group relative bg-slate-800/50 hover:bg-slate-800 transition-colors p-1 rounded-lg">
             <div className="flex flex-col md:flex-row items-center bg-slate-900 text-white p-6 md:p-8 rounded shadow-lg border border-slate-700 transform group-hover:-translate-y-1 transition-transform duration-300">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-serif font-bold text-slate-300">Public Holidays</h3>
                </div>
                <div className="w-full md:w-auto h-px md:h-8 bg-slate-700 my-4 md:my-0 md:mx-8"></div>
                <div className="flex-1 text-center md:text-right">
                  <p className="text-xl md:text-2xl font-light tracking-wider text-slate-400">Closed</p>
                </div>
             </div>
          </div>

        </div>
      </div>
      
      {/* Decorative Angle Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-cream" style={{ clipPath: 'polygon(50% 0, 0 100%, 100% 100%)' }}></div>
    </section>
  );
};

export default Timings;