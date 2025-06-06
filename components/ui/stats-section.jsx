'use client';

import React, { useState, useEffect } from 'react';

// Animated counter component (moved outside the main component)
const AnimatedCounter = ({ end, duration = 2000, start = 0, isVisible }) => {
  const [count, setCount] = useState(start);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startTime;
    let animationFrame;
    
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start, isVisible]);
  
  return count;
};

export function StatsSection() {

  // Stats data
  const stats = [
    {
      value: 5000,
      label: "Active Users",
      prefix: "+",
      suffix: "",
      duration: 2500,
    },
    {
      value: 98,
      label: "Satisfaction Rate",
      prefix: "",
      suffix: "%",
      duration: 2000,
    },
    {
      value: 24,
      label: "Global Presence",
      prefix: "",
      suffix: " Countries",
      duration: 1500,
    },
    {
      value: 150,
      label: "Medical Experts",
      prefix: "",
      suffix: "+",
      duration: 2200,
    },
  ];

  // Intersection Observer to trigger animation when in view
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="stats-section" className="py-20 relative">
      {/* Cyber frame background */}
      <div className="absolute inset-0 cyber-frame m-8 -z-10">
        <div className="absolute inset-0 bg-card/30 backdrop-blur-sm"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-animated inline-block mb-4">
            Mediverse Impact
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="holographic-card p-6 rounded-xl text-center">
              <div className="space-y-4">
                <div className="text-4xl md:text-5xl font-bold neon-text-animated">
                  {stat.prefix}
                  <AnimatedCounter 
                    end={stat.value} 
                    duration={stat.duration} 
                    isVisible={isVisible} 
                  />
                  {stat.suffix}
                </div>
                <div className="h-1 w-16 mx-auto data-line rounded-full"></div>
                <p className="text-foreground/80">{stat.label}</p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-2 right-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-400/50"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-500/50"></div>
                </div>
              </div>
            </div>
            ))}
        </div>
        
        {/* Call to action */}
        <div className="mt-20 text-center">
          <div className="inline-block cyber-frame p-8 bg-card/50 backdrop-blur-md">
            <h3 className="text-2xl md:text-3xl font-bold neon-text mb-4">
              Ready to Experience the Future of Healthcare?
            </h3>
            <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
              Join thousands of users who have already transformed their healthcare experience with Mediverse.
            </p>
            <button className="neon-button-animated rounded-full px-8 py-3 text-lg">
              Join Mediverse Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}