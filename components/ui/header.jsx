'use client';

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Button } from './button';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-2 glass-effect' : 'py-4 bg-transparent'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-500/5 z-[-1]"></div>
      
      <nav className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo with 3D effect */}
        <Link href="/" className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full blur-md opacity-0 group-hover:opacity-70 transition duration-500"></div>
          <div className="relative flex items-center space-x-3 animate-pulse-glow">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-emerald-400/50 to-blue-500/50"></div>
              <Image
                src="/logo-single.png"
                alt="Mediverse logo"
                width={45}
                height={55}
                className="relative object-contain transform group-hover:scale-110 transition-all duration-300"
                priority
              />
            </div>
            <span className="text-xl font-bold gradient-text-animated">Mediverse</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/dashboard" className="text-foreground hover:text-emerald-400 transition-colors duration-300 neon-text">
            Dashboard
          </Link>
          <Link href="/services" className="text-foreground hover:text-emerald-400 transition-colors duration-300 neon-text">
            Services
          </Link>
          <Link href="/about" className="text-foreground hover:text-emerald-400 transition-colors duration-300 neon-text">
            About
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button className="neon-button-animated rounded-full px-6 py-2">
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="gradient-border-animated rounded-full">
                <span className="px-6 py-2 block hover:bg-background/50 transition-colors duration-300">
                  Join Now
                </span>
              </Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <div className="gradient-border-animated rounded-full p-[2px]">
              <UserButton 
                afterSignOutUrl="/" 
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8"
                  }
                }}
              />
            </div>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
