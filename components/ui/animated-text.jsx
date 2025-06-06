'use client';

import React, { useState, useRef } from 'react';
import { useSpring, animated, config } from '@react-spring/web';

const AnimatedText = ({ 
  children, 
  className = '', 
  variant = 'gradient',
  animation = 'none',
  intensity = 'medium',
  as: Component = 'span',
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const textRef = useRef(null);
  
  // Define text variants
  const variants = {
    gradient: 'gradient-text',
    gradientAnimated: 'gradient-text-animated',
    neon: 'neon-text',
    neonIntense: 'neon-text-intense',
    neonAnimated: 'neon-text-animated',
    cyber: 'text-foreground animate-cyber-glitch',
    holographic: 'text-foreground',
    prismatic: 'text-foreground animate-prismatic-glow',
    '3d': 'text-3d',
  };
  
  // Define intensity levels
  const intensityLevels = {
    low: {
      scale: 1.02,
      y: -2,
      rotateZ: 1,
      blur: '0px',
      glow: 0.5,
    },
    medium: {
      scale: 1.05,
      y: -5,
      rotateZ: 2,
      blur: '1px',
      glow: 0.8,
    },
    high: {
      scale: 1.1,
      y: -10,
      rotateZ: 3,
      blur: '2px',
      glow: 1,
    },
  };
  
  // Get intensity values
  const intensityValues = intensityLevels[intensity] || intensityLevels.medium;
  
  // Get the variant class
  const variantClass = variants[variant] || variants.gradient;
  
  // Animation for the text
  const textAnimation = useSpring({
    scale: isHovered && animation === 'scale' ? intensityValues.scale : 1,
    y: isHovered && animation === 'float' ? intensityValues.y : 0,
    rotateZ: isHovered && animation === 'rotate' ? intensityValues.rotateZ : 0,
    filter: isHovered && animation !== 'none' ? `blur(${intensityValues.blur})` : 'blur(0px)',
    config: config.wobbly,
  });
  
  // Animation for the glow effect
  const glowAnimation = useSpring({
    opacity: isHovered ? intensityValues.glow : 0,
    config: { tension: 200, friction: 20 },
  });
  
  // Special effects for cyber and holographic variants
  const isCyber = variant === 'cyber';
  const isHolographic = variant === 'holographic';
  const is3D = variant === '3d';
  
  // 3D hover effect for 3D variant
  const handle3DHover = (e) => {
    if (!textRef.current || !is3D) return;
    
    const text = textRef.current;
    const rect = text.getBoundingClientRect();
    
    // Calculate mouse position relative to text center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation (inverted and scaled down)
    const rotX = (mouseY / (rect.height / 2)) * -5;
    const rotY = (mouseX / (rect.width / 2)) * 5;
    
    text.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px)`;
  };
  
  const handle3DLeave = () => {
    if (!textRef.current || !is3D) return;
    textRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };
  
  return (
    <animated.div
      ref={textRef}
      className="relative inline-block"
      style={{
        transform: animation !== 'none' ? 
          textAnimation.scale.to(s => 
            `scale(${s}) translateY(${textAnimation.y.get()}px) rotate(${textAnimation.rotateZ.get()}deg)`
          ) : undefined,
        filter: textAnimation.filter,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handle3DLeave();
      }}
      onMouseMove={handle3DHover}
    >
      {/* Glow effect */}
      {isHovered && (
        <animated.div 
          className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-blue-500/30 blur-md z-0"
          style={{ opacity: glowAnimation.opacity }}
        />
      )}
      
      {/* Cyber effect */}
      {isCyber && isHovered && (
        <animated.div 
          className="absolute inset-0 bg-blue-500/10 z-0 cyber-glitch"
          style={{ opacity: glowAnimation.opacity }}
        />
      )}
      
      {/* Holographic effect */}
      {isHolographic && isHovered && (
        <animated.div 
          className="absolute inset-0 animate-hologram-scan z-0"
          style={{ opacity: glowAnimation.opacity }}
        />
      )}
      
      {/* Text content */}
      <Component 
        className={`relative z-10 ${variantClass} ${className} ${isCyber ? 'animate-cyber-glitch' : ''} ${isHolographic ? 'animate-holographic-shift' : ''}`}
        {...props}
      >
        {children}
      </Component>
    </animated.div>
  );
};

export { AnimatedText };