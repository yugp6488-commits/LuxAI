import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const PredictionDashboard = () => {
  const [params, setParams] = useState({
    MedInc: 5.0,
    HouseAge: 20,
    AveRooms: 6.0,
    AveBedrms: 2.0,
    Population: 1000,
    AveOccup: 3.0,
    Latitude: 35.0,
    Longitude: -120.0
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPrediction = async () => {
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await axios.post(`${API_URL}/predict`, params);
      setPrediction(response.data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchPrediction();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [params]);

  const handleChange = (e) => {
    setParams({
      ...params,
      [e.target.name]: parseFloat(e.target.value)
    });
  };

  return (
    <section id="predictor" className="min-h-screen flex items-center justify-center p-6 bg-luxBase/90 backdrop-blur-2xl relative z-20 pb-20">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Controls */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">AI Predictor</h2>
            <p className="text-gray-400">Adjust parameters to see real-time valuation updates via FastAPI & Random Forest.</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-gray-300">Median Income (x$10,000)</label>
                <span className="text-luxAccentCyan font-mono">{params.MedInc}</span>
              </div>
              <input type="range" name="MedInc" min="0.5" max="15.0" step="0.1" value={params.MedInc} onChange={handleChange} className="w-full accent-luxAccentCyan cursor-pointer" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-gray-300">House Age (Years)</label>
                <span className="text-luxAccentCyan font-mono">{params.HouseAge}</span>
              </div>
              <input type="range" name="HouseAge" min="1" max="100" step="1" value={params.HouseAge} onChange={handleChange} className="w-full accent-luxAccentCyan cursor-pointer" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-gray-300">Average Rooms</label>
                <span className="text-luxAccentCyan font-mono">{params.AveRooms}</span>
              </div>
              <input type="range" name="AveRooms" min="1" max="15" step="0.1" value={params.AveRooms} onChange={handleChange} className="w-full accent-luxAccentCyan cursor-pointer" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-gray-300">Average Bedrooms</label>
                <span className="text-luxAccentCyan font-mono">{params.AveBedrms}</span>
              </div>
              <input type="range" name="AveBedrms" min="0.5" max="5" step="0.1" value={params.AveBedrms} onChange={handleChange} className="w-full accent-luxAccentCyan cursor-pointer" />
            </div>
          </div>
        </motion.div>

        {/* Right: Result */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-[rgba(10,15,29,0.8)] rounded-3xl p-10 border border-white/10 shadow-[0_0_50px_rgba(0,80,255,0.2)] overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-luxAccentBlue/30 rounded-full blur-[100px]"></div>
          
          <h3 className="text-lg text-gray-400 mb-1">Estimated Value</h3>
          <div className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
             {loading ? <span className="animate-pulse text-gray-600">...</span> : prediction?.predicted_price || "$0"}
          </div>
          
          <div className="space-y-4">
             <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center border border-white/5">
                <span className="text-sm text-gray-400">Confidence Range</span>
                <span className="text-sm font-mono text-luxAccentCyan">{prediction?.confidence_range || "..."}</span>
             </div>
             <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center border border-white/5">
                <span className="text-sm text-gray-400">Model Inference</span>
                <span className="text-sm font-mono text-green-400">Active</span>
             </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default PredictionDashboard;
