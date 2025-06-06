'use client';

import React, { useState, useRef } from 'react';
import { useSpring, animated, config } from '@react-spring/web';

const AnimatedButton = ({ 
  children, 
  className = '', 
  variant = 'default',
  size = 'default',
  intensity = 'medium',
  onClick,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef(null);
  
  // Define button variants
  const variants = {
    default: 'neon-button-animated',
    outline: 'gradient-border-animated',
    cyber: 'cyber-ui-3d',
    holographic: 'holographic-element',
    premium: 'neon-glow-intense',
    ghost: 'glass-effect',
  };
  
  // Define button sizes
  const sizes = {
    default: 'px-6 py-2',
    sm: 'px-4 py-1 text-sm',
    lg: 'px-8 py-3 text-lg',
    icon: 'p-2',
  };
  
  // Define intensity levels
  const intensityLevels = {
    low: {
      scale: 1.02,
      pressScale: 0.98,
      y: -2,
      shadow: '0 0 10px rgba(16, 185, 129, 0.3)',
      glow: 0.5,
    },
    medium: {
      scale: 1.05,
      pressScale: 0.95,
      y: -5,
      shadow: '0 0 20px rgba(16, 185, 129, 0.5)',
      glow: 0.8,
    },
    high: {
      scale: 1.1,
      pressScale: 0.9,
      y: -10,
      shadow: '0 0 30px rgba(16, 185, 129, 0.7)',
      glow: 1,
    },
  };
  
  // Get intensity values
  const intensityValues = intensityLevels[intensity] || intensityLevels.medium;
  
  // Animation for the button
  const buttonAnimation = useSpring({
    scale: isPressed ? intensityValues.pressScale : isHovered ? intensityValues.scale : 1,
    y: isHovered && !isPressed ? intensityValues.y : 0,
    shadow: isHovered ? intensityValues.shadow : '0 0 0px rgba(16, 185, 129, 0)',
    config: config.wobbly,
  });
  
  // Animation for the glow effect
  const glowAnimation = useSpring({
    opacity: isHovered ? intensityValues.glow : 0,
    config: { tension: 200, friction: 20 },
  });
  
  // Animation for the scan effect (for holographic variant)
  const scanAnimation = useSpring({
    from: { backgroundPosition: '0% 0%' },
    to: { backgroundPosition: isHovered ? '0% 100%' : '0% 0%' },
    config: { duration: 1500 },
    loop: isHovered,
  });
  
  // Get the variant and size classes
  const variantClass = variants[variant] || variants.default;
  const sizeClass = sizes[size] || sizes.default;
  
  // Handle special case for outline variant
  const isOutline = variant === 'outline';
  const isHolographic = variant === 'holographic';
  const isCyber = variant === 'cyber';
  const isPremium = variant === 'premium';
  
  // 3D hover effect for cyber and premium variants
  const handle3DHover = (e) => {
    if (!buttonRef.current || (!isCyber && !isPremium)) return;
    
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    
    // Calculate mouse position relative to button center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation (inverted and scaled down)
    const rotX = (mouseY / (rect.height / 2)) * -5;
    const rotY = (mouseX / (rect.width / 2)) * 5;
    
    button.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(5px)`;
  };
  
  const handle3DLeave = () => {
    if (!buttonRef.current || (!isCyber && !isPremium)) return;
    buttonRef.current.style.transform = '';
  };
  
  return (
    <animated.button
      ref={buttonRef}
      className={`relative rounded-full overflow-hidden transition-colors ${variantClass} ${className} ${isPremium ? 'animate-prismatic-glow' : ''}`}
      style={{
        transform: buttonAnimation.scale.to(s => `scale(${s}) translateY(${buttonAnimation.y.get()}px)`),
        boxShadow: buttonAnimation.shadow,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
        handle3DLeave();
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseMove={handle3DHover}
      onClick={onClick}
      {...props}
    >
      {/* Glow effect */}
      <animated.div 
        className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-blue-500/30 blur-md z-0"
        style={{ opacity: glowAnimation.opacity }}
      />
      
      {/* Holographic scan effect */}
      {isHolographic && isHovered && (
        <animated.div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(0, 180, 216, 0.2), transparent)',
            backgroundSize: '100% 200%',
            ...scanAnimation,
          }}
        />
      )}
      
      {/* Button content */}
      {isOutline ? (
        <span className={`block ${sizeClass} hover:bg-background/50 transition-colors duration-300 relative z-10`}>
          {children}
        </span>
      ) : (
        <span className={`block ${sizeClass} relative z-10`}>
          {children}
        </span>
      )}
      
      {/* Circuit pattern for cyber variant */}
      {isCyber && (
        <div className="absolute inset-0 animate-cyber-circuit pointer-events-none opacity-30"></div>
      )}
      
      {/* Particle effects for hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-1 h-1 rounded-full bg-emerald-400 animate-float-3d"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-blue-400 animate-float-3d" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-0 left-1/2 w-1 h-1 rounded-full bg-purple-400 animate-float-3d" style={{ animationDelay: '1s' }}></div>
        </div>
      )}
    </animated.button>
  );
};

export { AnimatedButton };