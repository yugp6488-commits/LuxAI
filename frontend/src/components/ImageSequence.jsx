import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const ImageSequence = () => {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const frameCountTotal = 600;

  useEffect(() => {
    const loadedImages = [];
    
    // First 300 frames from 'fr' folder
    for (let i = 1; i <= 300; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `/fr/ezgif-frame-${paddedIndex}.png`;
      loadedImages.push(img);
    }
    
    // Next 300 frames from 'frames' folder
    for (let i = 1; i <= 300; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `/frames/ezgif-frame-${paddedIndex}.png`;
      loadedImages.push(img);
    }
    
    setImages(loadedImages);
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let lastRenderedFrame = -1;
    let renderRequested = false;

    const render = (index) => {
      const idx = Math.floor(index);
      // Skip drawing if we are already on this frame
      if (idx === lastRenderedFrame) return; 
      // Skip if a frame is already queued for the next paint
      if (renderRequested) return;

      renderRequested = true;
      requestAnimationFrame(() => {
        if (!images[idx] || !images[idx].complete) {
          renderRequested = false;
          return;
        }
        
        const img = images[idx];
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;  
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, img.width, img.height,
                           centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
                           
        lastRenderedFrame = idx;
        renderRequested = false;
      });
    };

    // Draw first frame once loaded
    images[0].onload = () => render(0);
    if (images[0].complete) render(0);

    const playhead = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5
      }
    });

    tl.to(playhead, {
      frame: frameCountTotal - 1,
      snap: "frame",
      ease: "none",
      onUpdate: () => render(playhead.frame)
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(playhead.frame);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [images]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full object-cover"
      style={{ filter: "brightness(0.6)" }} 
    />
  );
};

export default ImageSequence;
