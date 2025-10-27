import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      id="scrollBtn"
      onClick={scrollToTop}
      style={{ display: isVisible ? 'block' : 'none' }}
      className="scroll-to-top-btn"
    >
      <i className="fa-solid fa-angle-up"></i>
    </button>
  );
};

export default ScrollToTop;
