import { useEffect, useRef, useState } from 'react';

export function Parallax(): JSX.Element {
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
    <div 
      className="parallax" 
      ref={parallaxRef} 
      style={{ transform: `translateY(${scrollPosition * 0.65}px)` }}
    />
  )
}
