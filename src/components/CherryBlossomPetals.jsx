import React from 'react';
import './CherryBlossomPetals.css';

const CherryBlossomPetals = () => {
  // Generate an array of 35 petals
  const petals = Array.from({ length: 35 });

  return (
    <div className="cherry-blossom-container" aria-hidden="true">
      {petals.map((_, index) => {
        // Randomize properties for more organic movement
        const left = Math.random() * 100; // Random horizontal position
        const animationDelay = Math.random() * 10; // Random delay
        const animationDuration = 6 + Math.random() * 10; // Random duration (6 to 16 seconds)
        const opacity = 0.4 + Math.random() * 0.6; // Random opacity
        const size = 10 + Math.random() * 12; // Random size (10px to 22px)

        const style = {
          left: `${left}%`,
          animationDelay: `${animationDelay}s`,
          animationDuration: `${animationDuration}s`,
          opacity: opacity,
          width: `${size}px`,
          height: `${size}px`,
        };

        return <div key={index} className="petal" style={style}></div>;
      })}
    </div>
  );
};

export default CherryBlossomPetals;
