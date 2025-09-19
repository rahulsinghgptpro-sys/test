
import React from 'react';

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3L9.5 8.5L4 11L9.5 13.5L12 19L14.5 13.5L20 11L14.5 8.5L12 3Z" />
    <path d="M5 3L6 5" />
    <path d="M19 13L21 14" />
    <path d="M19 21L20 19" />
    <path d="M5 21L4 19" />
    <path d="M2 11H4" />
    <path d="M20 11H22" />
    <path d="M11 2V4" />
    <path d="M11 20V22" />
  </svg>
);
