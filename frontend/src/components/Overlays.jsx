import React from 'react';
import { motion } from 'framer-motion';

const Overlays = () => {
  return (
    <div className="w-full pointer-events-none">
      {/* Section 1: Exterior (0-30%) */}
      <section id="garden" className="h-[150vh] flex flex-col justify-center px-10 md:px-32">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl pointer-events-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxAccentBlue to-luxAccentCyan">Future of Real Estate</span> Valuation.
          </h1>
          <p className="text-xl text-gray-400 mb-10">An interactive 3D spatial experience powered by real-time ML inference.</p>
          
          <div className="flex space-x-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex-1 hover:border-luxAccentCyan/30 transition-colors">
              <h3 className="text-3xl font-bold text-white mb-2">8</h3>
              <p className="text-sm text-gray-400">Architectural Features</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex-1 hover:border-luxAccentBlue/30 transition-colors">
              <h3 className="text-3xl font-bold text-white mb-2">California</h3>
              <p className="text-sm text-gray-400">Housing Dataset</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 2: Interior (30-65%) */}
      <section id="interior" className="h-[150vh] flex flex-col justify-center items-end px-10 md:px-32 text-right">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="max-w-xl pointer-events-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Data-Driven <br/> Architectural Precision.</h2>
          <p className="text-lg text-gray-400 mb-8">Dive into the specifications extracted from the dataset, mapping spatial parameters to predictive weights.</p>
          
          <div className="space-y-4">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex justify-between items-center">
              <span className="text-gray-400">Median Income Weight</span>
              <span className="text-luxAccentCyan font-semibold">High Impact</span>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex justify-between items-center">
              <span className="text-gray-400">Rooms & Age</span>
              <span className="text-luxAccentBlue font-semibold">Medium Impact</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 3: Rooftop (65-85%) */}
      <section id="market" className="h-[100vh] flex flex-col justify-center items-center px-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl pointer-events-auto bg-[rgba(10,15,29,0.6)] backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl shadow-luxAccentBlue/10"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">Intelligent Market Analytics.</h2>
          <p className="text-lg text-gray-400 mb-10">Real-time analysis of neighborhood valuation tiers and historical pricing accuracy metrics.</p>
          
          <a href="#predictor" className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-luxAccentBlue to-luxAccentCyan text-white text-lg font-bold hover:shadow-[0_0_30px_rgba(0,214,255,0.6)] transition-all duration-300">
            Calculate Custom Valuation
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default Overlays;
