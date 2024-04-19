import React, { useEffect, useRef, useState } from 'react';
import { Hero } from '../../components/hero/hero';
import { Layout } from '../../components/layout/layout';
import { Weekly } from '../../components/weekly/weekly';
import { Helmet } from 'react-helmet-async';

export function HomePage(): JSX.Element {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>DiveSea</title>
      </Helmet>
      <main className="main">
        <Hero />
        <Weekly />
        <div 
          className="parallax" 
          ref={parallaxRef} 
          style={{ transform: `translateY(${scrollPosition * 0.5}px)` }}
        />
      </main>
    </Layout>
  );
}
