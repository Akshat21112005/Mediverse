'use client';

import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Header from '@/components/ui/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AnimatedCounter = ({ value, duration = 2000 }) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: value,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10, duration },
  });

  return <animated.span>{number.to((n) => Math.floor(n))}</animated.span>;
};

const DashboardPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse position for 3D effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation for dashboard elements
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 120, friction: 14 },
  });

  const cardProps = (delay) => useSpring({
    from: { opacity: 0, transform: 'scale(0.9) translateY(20px)' },
    to: { opacity: 1, transform: 'scale(1) translateY(0)' },
    delay,
    config: { tension: 120, friction: 14 },
  });

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-glow opacity-50 z-0"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-emerald-500/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-3xl z-0"></div>
      
      {/* Data lines */}
      <div className="data-line left-1/4 top-0 h-full w-[1px]"></div>
      <div className="data-line right-1/4 top-0 h-full w-[1px]"></div>
      <div className="data-line top-1/3 left-0 w-full h-[1px]"></div>
      <div className="data-line top-2/3 left-0 w-full h-[1px]"></div>
      
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        <animated.div style={fadeIn} className="mb-8">
          <h1 className="text-3xl font-bold gradient-text-animated mb-2">Dashboard</h1>
          <p className="text-muted-foreground neon-text">Welcome to your medical dashboard</p>
        </animated.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Quick Stats */}
          <animated.div style={cardProps(100)} className="col-span-1">
            <div className="holographic-card p-6 h-full">
              <h2 className="text-xl font-semibold mb-4 neon-text-animated">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Appointments</span>
                  <span className="text-2xl font-bold gradient-text"><AnimatedCounter value={12} /></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Prescriptions</span>
                  <span className="text-2xl font-bold gradient-text"><AnimatedCounter value={8} duration={2500} /></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Lab Results</span>
                  <span className="text-2xl font-bold gradient-text"><AnimatedCounter value={5} duration={3000} /></span>
                </div>
              </div>
            </div>
          </animated.div>
          
          {/* Recent Activity */}
          <animated.div style={cardProps(200)} className="col-span-1">
            <div 
              className="card-3d-animated p-6 h-full"
              style={{
                transform: `rotateX(${mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg)`,
              }}
            >
              <h2 className="text-xl font-semibold mb-4 neon-text-animated">Recent Activity</h2>
              <ul className="space-y-3">
                <li className="p-3 glass-effect rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-glow"></div>
                    <div>
                      <p className="text-sm font-medium">Blood test results received</p>
                      <p className="text-xs text-muted-foreground">Today, 10:30 AM</p>
                    </div>
                  </div>
                </li>
                <li className="p-3 glass-effect rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse-glow"></div>
                    <div>
                      <p className="text-sm font-medium">Appointment scheduled</p>
                      <p className="text-xs text-muted-foreground">Yesterday, 2:15 PM</p>
                    </div>
                  </div>
                </li>
                <li className="p-3 glass-effect rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse-glow"></div>
                    <div>
                      <p className="text-sm font-medium">Prescription renewed</p>
                      <p className="text-xs text-muted-foreground">Oct 15, 9:00 AM</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </animated.div>
          
          {/* Upcoming Appointments */}
          <animated.div style={cardProps(300)} className="col-span-1">
            <div className="cyber-frame p-6 h-full">
              <h2 className="text-xl font-semibold mb-4 neon-text-animated">Upcoming Appointments</h2>
              <div className="space-y-4">
                <div className="p-3 glass-effect rounded-lg border border-emerald-500/30">
                  <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">General Checkup</p>
                  <p className="text-xs font-semibold gradient-text mt-2">Oct 25, 2:30 PM</p>
                </div>
                <div className="p-3 glass-effect rounded-lg border border-blue-500/30">
                  <p className="text-sm font-medium">Dr. Michael Chen</p>
                  <p className="text-xs text-muted-foreground">Dental Cleaning</p>
                  <p className="text-xs font-semibold gradient-text mt-2">Nov 3, 10:00 AM</p>
                </div>
              </div>
              <div className="mt-6">
                <Button className="neon-button-animated w-full">Schedule New Appointment</Button>
              </div>
            </div>
          </animated.div>
        </div>
        
        {/* Health Metrics Section */}
        <animated.div style={cardProps(400)} className="mb-12">
          <div className="holographic-card p-6">
            <h2 className="text-2xl font-semibold mb-6 gradient-text-animated">Health Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-effect p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2 neon-text">Heart Rate</h3>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold gradient-text"><AnimatedCounter value={72} /></span>
                  <span className="text-sm text-muted-foreground">bpm</span>
                </div>
                <div className="mt-2 h-2 bg-background/50 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-emerald-500 to-blue-500 animate-pulse-glow"></div>
                </div>
              </div>
              
              <div className="glass-effect p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2 neon-text">Blood Pressure</h3>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold gradient-text"><AnimatedCounter value={120} /></span>
                  <span className="text-sm text-muted-foreground">/</span>
                  <span className="text-3xl font-bold gradient-text"><AnimatedCounter value={80} /></span>
                </div>
                <div className="mt-2 h-2 bg-background/50 rounded-full overflow-hidden">
                  <div className="h-full w-4/5 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse-glow"></div>
                </div>
              </div>
              
              <div className="glass-effect p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2 neon-text">Sleep</h3>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold gradient-text"><AnimatedCounter value={7} /></span>
                  <span className="text-sm text-muted-foreground">hours</span>
                </div>
                <div className="mt-2 h-2 bg-background/50 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-gradient-to-r from-purple-500 to-emerald-500 animate-pulse-glow"></div>
                </div>
              </div>
            </div>
          </div>
        </animated.div>
        
        {/* Treatment Plan */}
        <animated.div style={cardProps(500)}>
          <div className="cyber-frame p-6">
            <h2 className="text-2xl font-semibold mb-6 gradient-text-animated">Treatment Plan</h2>
            <div className="space-y-4">
              <div className="glass-effect p-4 rounded-lg border-l-4 border-emerald-500">
                <h3 className="text-lg font-medium mb-1 neon-text">Daily Medication</h3>
                <p className="text-sm text-muted-foreground mb-2">Take with food, morning and evening</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Progress</span>
                  <span className="text-sm font-medium">14/30 days</span>
                </div>
                <div className="mt-2 h-2 bg-background/50 rounded-full overflow-hidden">
                  <div className="h-full w-[45%] bg-gradient-to-r from-emerald-500 to-blue-500 animate-pulse-glow"></div>
                </div>
              </div>
              
              <div className="glass-effect p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-lg font-medium mb-1 neon-text">Physical Therapy</h3>
                <p className="text-sm text-muted-foreground mb-2">3 sessions per week, 45 minutes each</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Progress</span>
                  <span className="text-sm font-medium">8/12 sessions</span>
                </div>
                <div className="mt-2 h-2 bg-background/50 rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse-glow"></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button className="gradient-border-animated rounded-full">
                <span className="px-6 py-2 block">View Full Plan</span>
              </Button>
            </div>
          </div>
        </animated.div>
      </main>
    </div>
  );
};

export default DashboardPage;