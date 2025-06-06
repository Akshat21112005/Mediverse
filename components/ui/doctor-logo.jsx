'use client';

import React, { useRef, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Image from 'next/image';

const DoctorLogo = () => {
  const logoRef = useRef(null);
  
  // Animation for the floating effect
  const [{ y }, api] = useSpring(() => ({
    y: 0,
    config: { mass: 1, tension: 120, friction: 14 }
  }));

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
    return () => clearTimeout(timeout);
  }, [api]);

  // Mouse move effect for 3D tilt
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!logoRef.current) return;
      
      const rect = logoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center (normalized -1 to 1)
      const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 15;
      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 15;
      
      logoRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    const handleMouseLeave = () => {
      if (!logoRef.current) return;
      logoRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-blue-500/30 rounded-full blur-3xl opacity-70 animate-pulse"></div>
      
      {/* 3D Doctor Logo */}
      <animated.div 
        ref={logoRef}
        style={{ 
          y,
          transition: 'transform 0.2s ease-out',
        }}
        className="relative z-10 transition-transform duration-300"
      >
        <div className="relative">
          <Image
            src="/l3.png" 
            alt="3D Doctor Logo"
            width={400}
            height={400}
            className="object-contain drop-shadow-2xl"
            priority
          />
          
          {/* Highlight effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/20 to-blue-500/20 mix-blend-overlay rounded-full"></div>
        </div>
      </animated.div>
      
      {/* Particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 rounded-full bg-emerald-400 animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DoctorLogo;