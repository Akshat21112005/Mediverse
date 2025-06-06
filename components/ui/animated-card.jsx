'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSpring, animated, config } from '@react-spring/web';

const AnimatedCard = ({ 
  children, 
  className = '', 
  variant = 'default',
  intensity = 15,
  glowColor = 'emerald',
  depth = false,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const [{ rotateX, rotateY, scale, shadow, translateZ }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    translateZ: 0,
    shadow: '0px 0px 0px rgba(0, 0, 0, 0)',
    config: { mass: 1, tension: 280, friction: 40 },
  }));
  
  // Define card variants
  const variants = {
    default: 'card-3d-animated',
    premium: 'card-3d-premium',
    holographic: 'holographic-element',
    cyber: 'cyber-ui-3d',
    glass: 'glass-effect',
    neon: 'neon-button-animated',
  };
  
  // Define glow colors
  const glowColors = {
    emerald: 'from-emerald-400/30 to-blue-500/30',
    blue: 'from-blue-400/30 to-purple-500/30',
    purple: 'from-purple-400/30 to-emerald-500/30',
    multi: 'from-emerald-400/30 via-blue-500/30 to-purple-500/30',
  };
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation (inverted and scaled down)
    const rotX = (mouseY / (rect.height / 2)) * -intensity;
    const rotY = (mouseX / (rect.width / 2)) * intensity;
    const zTranslation = depth ? Math.abs(rotX) + Math.abs(rotY) > 10 ? 50 : 20 : 0;
    
    // Update spring animation
    api.start({
      rotateX: rotX,
      rotateY: rotY,
      scale: 1.05,
      translateZ: zTranslation,
      shadow: '0px 20px 40px rgba(0, 0, 0, 0.3)',
    });
  };
  
  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
    api.start({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      translateZ: 0,
      shadow: '0px 0px 0px rgba(0, 0, 0, 0)',
    });
  };
  
  // Get the variant class
  const variantClass = variants[variant] || variants.default;
  const glowColorClass = glowColors[glowColor] || glowColors.emerald;
  
  // Animation for the glow effect
  const [{ glowOpacity }, glowApi] = useSpring(() => ({
    glowOpacity: 0,
    config: { tension: 200, friction: 20 },
  }));
  
  useEffect(() => {
    glowApi.start({ glowOpacity: isHovered ? 1 : 0 });
  }, [isHovered, glowApi]);
  
  // Animation for the scan effect
  const scanAnimation = useSpring({
    from: { backgroundPosition: '0% 0%' },
    to: { backgroundPosition: isHovered ? '0% 100%' : '0% 0%' },
    config: { duration: 1500 },
    loop: isHovered,
  });
  
  return (
    <animated.div
      ref={cardRef}
      className={`relative overflow-hidden ${variantClass} ${className} ${depth ? 'transform-style-preserve-3d' : ''}`}
      style={{
        transform: [rotateX, rotateY, scale, translateZ].map((val, i) => {
          const transformType = i === 0 ? 'rotateX' : i === 1 ? 'rotateY' : i === 2 ? 'scale' : 'translateZ';
          return val.to(v => `${transformType}(${v}${i < 2 ? 'deg' : i === 3 ? 'px' : ''})`)
        }).reduce((acc, val) => `${acc} ${val}`),
        boxShadow: shadow,
        zIndex: 1,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Glow effect */}
      <animated.div 
        className={`absolute inset-0 bg-gradient-to-r ${glowColorClass} blur-md z-0 ${variant === 'premium' ? 'animate-prismatic-glow' : ''}`}
        style={{ opacity: glowOpacity }}
      />
      
      {/* Holographic scan effect */}
      {(variant === 'holographic' || variant === 'premium') && isHovered && (
        <animated.div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(0, 180, 216, 0.2), transparent)',
            backgroundSize: '100% 200%',
            ...scanAnimation,
          }}
        />
      )}
      
      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Holographic effect for holographic variant */}
      {variant === 'holographic' && isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-holographic pointer-events-none"></div>
      )}
      
      {/* Data lines for cyber variant */}
      {variant === 'cyber' && (
        <>
          <div className="absolute top-0 left-1/4 h-full w-[1px] data-line pointer-events-none"></div>
          <div className="absolute top-1/3 left-0 w-full h-[1px] data-line pointer-events-none"></div>
        </>
      )}
      
      {/* Circuit pattern for premium and cyber variants */}
      {(variant === 'premium' || variant === 'cyber') && (
        <div className="absolute inset-0 animate-cyber-circuit pointer-events-none opacity-30"></div>
      )}
      
      {/* Particles for premium variant */}
      {variant === 'premium' && (
        <div className="absolute inset-0 particles-3d pointer-events-none"></div>
      )}
    </animated.div>
  );
};

export { AnimatedCard };