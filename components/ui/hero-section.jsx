'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from './button';
import { useSpring, animated, config } from '@react-spring/web';

export function HeroSection() {
  const heroRef = useRef(null);
  const modelRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation for the floating effect
  const [{ y }, api] = useSpring(() => ({
    y: 0,
    config: { mass: 1, tension: 120, friction: 14 }
  }));

  // Animation for the title
  const titleSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0px)' : 'translateY(30px)' },
    config: config.molasses,
    delay: 200
  });

  // Animation for the description
  const descSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0px)' : 'translateY(30px)' },
    config: config.molasses,
    delay: 400
  });

  // Animation for the buttons
  const buttonSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0px)' : 'translateY(30px)' },
    config: config.molasses,
    delay: 600
  });

  // Start the floating animation
  useEffect(() => {
    let timeout;
    const animate = () => {
      api.start({
        y: Math.random() * 10 - 5,
        onRest: () => {
          timeout = setTimeout(animate, 1500);
        },
      });
    };
    
    animate();
    setIsVisible(true);
    return () => clearTimeout(timeout);
  }, [api]);

  // Mouse move effect for 3D tilt
  useEffect(() => {
    if (!modelRef.current) return;
    
    const handleMouseMove = (e) => {
      if (!heroRef.current || !modelRef.current) return;
      
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center (normalized -1 to 1)
      const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 20; // Increased intensity
      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 20; // Increased intensity
      const translateZ = Math.abs(rotateX) + Math.abs(rotateY) > 10 ? 50 : 0; // Add Z translation based on rotation
      
      modelRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
    };
    
    const handleMouseLeave = () => {
      if (!modelRef.current) return;
      modelRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 particles-3d"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-glow -z-10 opacity-70"></div>
      <div className="absolute inset-0 animate-cyber-circuit -z-10 opacity-30"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
            <animated.h1 
              style={titleSpring} 
              className="text-5xl md:text-7xl font-bold gradient-text-animated text-3d"
            >
              Welcome to <span className="block md:inline animate-prismatic-glow">Mediverse</span>
            </animated.h1>
            
            <animated.p 
              style={descSpring} 
              className="text-xl text-foreground/80 max-w-xl neon-text"
            >
              Your comprehensive medical platform with cutting-edge technology and personalized care
            </animated.p>
            
            <animated.div 
              style={buttonSpring} 
              className="flex flex-wrap gap-6 justify-center md:justify-start pt-4"
            >
              <Button className="neon-glow-intense rounded-full px-8 py-3 text-lg animate-prismatic-glow">
                Get Started
              </Button>
              <Button className="gradient-border-animated rounded-full holographic-element">
                <span className="px-8 py-3 block text-lg hover:bg-background/50 transition-colors duration-300">
                  Learn More
                </span>
              </Button>
            </animated.div>
            
            {/* Data visualization element */}
            <div className="hidden md:block mt-8 animate-hologram-scan">
              <div className="relative h-2 data-line rounded-full overflow-hidden"></div>
              <div className="flex justify-between mt-2 text-xs text-foreground/60 font-mono">
                <span>01</span>
                <span>02</span>
                <span>03</span>
                <span>04</span>
                <span>05</span>
              </div>
            </div>
          </div>
          
          {/* 3D Model */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-blue-500/30 rounded-full blur-3xl opacity-70 animate-pulse-glow"></div>
              
              {/* 3D Model */}
              <animated.div 
                ref={modelRef}
                style={{ 
                  y,
                  transition: 'transform 0.2s ease-out',
                }}
                className="relative z-10 transition-transform duration-300 animate-depth-shift"
              >
                <div className="relative">
                  <div className="cyber-ui-3d p-4 rounded-xl">
                    <Image
                      src="/l3.png" 
                      alt="3D Medical Model"
                      width={500}
                      height={500}
                      className="object-contain drop-shadow-2xl"
                      priority
                    />
                  </div>
                  
                  {/* Holographic effect */}
                  <div className="absolute inset-0 animate-holographic rounded-xl mix-blend-overlay"></div>
                  
                  {/* Cyber UI elements */}
                  <div className="absolute -bottom-4 -right-4 cyber-ui-3d p-2 bg-card/80 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                      <span className="text-xs font-mono neon-text-intense">SYSTEM ACTIVE</span>
                    </div>
                  </div>
                  
                  <div className="absolute -top-4 -left-4 cyber-ui-3d p-2 bg-card/80 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                      <span className="text-xs font-mono neon-text-intense">MEDIVERSE 3.0</span>
                    </div>
                  </div>
                  
                  {/* Additional 3D elements */}
                  <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 cyber-ui-3d p-2 bg-card/80 backdrop-blur-md">
                    <div className="h-20 w-2 bg-gradient-to-b from-emerald-400/50 to-blue-500/50 rounded-full animate-pulse-glow"></div>
                  </div>
                  
                  <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 cyber-ui-3d p-2 bg-card/80 backdrop-blur-md">
                    <div className="h-20 w-2 bg-gradient-to-b from-blue-500/50 to-emerald-400/50 rounded-full animate-pulse-glow"></div>
                  </div>
                </div>
              </animated.div>
              
              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-emerald-400 animate-float-3d"></div>
                <div className="absolute top-3/4 right-1/4 w-2 h-2 rounded-full bg-blue-400 animate-float-3d" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1/4 left-1/2 w-2 h-2 rounded-full bg-purple-400 animate-float-3d" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}