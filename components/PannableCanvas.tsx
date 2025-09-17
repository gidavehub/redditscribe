// components/PannableCanvas.tsx
import React, { useState, useRef, CSSProperties } from 'react';

interface PannableCanvasProps {
  children: React.ReactNode;
}

const MIN_SCALE = 0.2;
const MAX_SCALE = 5;

export const PannableCanvas: React.FC<PannableCanvasProps> = ({ children }) => {
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const isInteracting = useRef(false);
  const lastPanPoint = useRef({ x: 0, y: 0 });
  const pointers = useRef<React.PointerEvent[]>([]).current;
  
  const getDistance = (p: React.PointerEvent[]) => Math.hypot(p[0].clientX - p[1].clientX, p[0].clientY - p[1].clientY);

  const handlePointerDown = (e: React.PointerEvent) => {
    isInteracting.current = true;
    pointers.push(e);
    lastPanPoint.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isInteracting.current) return;
    
    const index = pointers.findIndex(p => p.pointerId === e.pointerId);
    if(index > -1) pointers[index] = e;
    
    if (pointers.length === 1) { // Panning
      const dx = e.clientX - lastPanPoint.current.x;
      const dy = e.clientY - lastPanPoint.current.y;
      setTranslate(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      lastPanPoint.current = { x: e.clientX, y: e.clientY };
    } else if (pointers.length === 2) { // Pinching
      const newDist = getDistance(pointers);
      const oldDist = getDistance(pointers.map(p => {
        if (p.pointerId === e.pointerId) {
            return {clientX: lastPanPoint.current.x, clientY: lastPanPoint.current.y} as React.PointerEvent
        }
        return p;
      }));

      setScale(prev => Math.max(MIN_SCALE, Math.min(MAX_SCALE, prev * (newDist / oldDist))));
    }
  };
  
  const handlePointerUp = (e: React.PointerEvent) => {
    const index = pointers.findIndex(p => p.pointerId === e.pointerId);
    if(index > -1) pointers.splice(index, 1);
    
    if (pointers.length < 1) {
        isInteracting.current = false;
    } else {
        lastPanPoint.current = { x: pointers[0].clientX, y: pointers[0].clientY };
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    const scaleAmount = -e.deltaY * 0.005;
    setScale(prevScale => Math.max(MIN_SCALE, Math.min(MAX_SCALE, prevScale + scaleAmount)));
  };
  
  const handleDoubleClick = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  };
  
  const containerStyle: CSSProperties = {
    width: '100%', 
    height: '100%', 
    overflow: 'hidden',
    touchAction: 'none' // Essential for custom touch handling
  };
  
  const animatedStyle: CSSProperties = {
    transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
    transition: isInteracting.current ? 'none' : 'transform 0.1s ease-out',
    width: '100%',
    height: '100%',
  };

  return (
    <div
      style={containerStyle}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
      onDoubleClick={handleDoubleClick}
    >
      <div style={animatedStyle}>
        {children}
      </div>
    </div>
  );
};