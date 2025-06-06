'use client';

import React from 'react';

export function FeaturesSection() {
  const features = [
    {
      title: "Advanced Diagnostics",
      description: "Cutting-edge diagnostic tools powered by AI for accurate and fast results.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      delay: 0,
    },
    {
      title: "Personalized Care",
      description: "Tailored medical solutions designed specifically for your unique health profile.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      delay: 0.2,
    },
    {
      title: "Instant Consultations",
      description: "Connect with specialists instantly through our secure virtual platform.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      delay: 0.4,
    },
    {
      title: "Blockchain Records",
      description: "Secure and immutable medical records using advanced blockchain technology.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      delay: 0,
    },
    {
      title: "AI Health Predictions",
      description: "Predictive analytics that forecast potential health issues before they arise.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      delay: 0.2,
    },
    {
      title: "Global Network",
      description: "Access to a worldwide network of medical professionals and institutions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      delay: 0.4,
    },
  ];

  return (
    <section className="py-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-glow opacity-30 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-animated inline-block mb-4">
            Our Services
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full"></div>
          <p className="mt-6 text-xl text-foreground/80 max-w-2xl mx-auto">
            Experience the future of healthcare with our cutting-edge services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card-3d-animated p-6 rounded-xl"
              style={{ animationDelay: `${feature.delay}s` }}
            >
              <div className="h-full space-y-4 relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-emerald-400 to-blue-500 flex items-center justify-center animate-pulse-glow">
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold neon-text-animated">{feature.title}</h3>
                <p className="text-foreground/80">{feature.description}</p>
                
                {/* Decorative elements */}
                <div className="absolute top-2 right-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400/50"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-500/50"></div>
                  </div>
                </div>
                
                {/* Bottom data line */}
                <div className="h-1 w-full data-line rounded-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}