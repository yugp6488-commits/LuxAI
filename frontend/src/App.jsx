import { useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import ImageSequence from './components/ImageSequence';
import Overlays from './components/Overlays';
import PredictionDashboard from './components/PredictionDashboard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <div className="relative w-full bg-luxBase min-h-screen text-gray-300 font-sans" id="scroll-container">
      <Navbar />
      
      {/* Fixed 3D Canvas Background */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
        <ImageSequence />
      </div>
      
      {/* Scrollable Content */}
      <div className="relative z-10 w-full">
        <Overlays />
        <PredictionDashboard />
      </div>
    </div>
  );
}

export default App;
