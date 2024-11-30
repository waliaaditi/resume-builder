import React, { useEffect } from 'react';

const BeforeUnloadHandler = (event) => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // This line is necessary for Chrome
      return ''; // This line is necessary for other browsers
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default BeforeUnloadHandler;
