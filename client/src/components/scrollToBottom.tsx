import React, { useRef, useEffect } from 'react';

const ScrollToBottomDiv = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  return <div ref={divRef} />;
}

export default ScrollToBottomDiv;
