import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[rgba(5,5,5,0.75)] backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-wider text-white">LUXAI <span className="text-luxAccentCyan font-light">//</span></span>
          <span className="text-sm text-gray-400 hidden sm:inline-block">3D Estate Predictor</span>
        </div>
        
        <div className="hidden md:flex space-x-8 text-sm text-gray-300 font-medium">
          <a href="#garden" className="hover:text-white transition-colors">Exterior</a>
          <a href="#interior" className="hover:text-white transition-colors">Interior Specs</a>
          <a href="#market" className="hover:text-white transition-colors">Market Ranges</a>
        </div>
        
        <div>
          <a href="#predictor" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-luxAccentBlue/20 to-luxAccentCyan/20 border border-luxAccentCyan/50 text-white text-sm font-semibold hover:shadow-[0_0_15px_rgba(0,214,255,0.4)] transition-all duration-300">
            Predict Valuation
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
