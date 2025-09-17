// components/DrawingOrchestrator.tsx
import React, { useEffect, useState } from 'react';
import { OrchestratorInstruction, PathInstruction } from '../core/JsonToPathParser';
import { useTutorSpeech } from '../hooks/useTutorSpeech';
import { AnimatedSVGPath } from './AnimatedSVGPath';

interface DrawingOrchestratorProps {
  instructions: OrchestratorInstruction[];
  viewBox: string | null;
  trigger: number;
}

export const DrawingOrchestrator: React.FC<DrawingOrchestratorProps> = ({ instructions, viewBox, trigger }) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const { speak, stop } = useTutorSpeech();

  useEffect(() => {
    stop();
    setCurrentIndex(-1);

    if (instructions && instructions.length > 0) {
      handleNextStep(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, instructions]);

  const handleAnimationComplete = () => {
    handleNextStep(currentIndex + 1);
  };

  const handleNextStep = (nextIndex: number) => {
    if (nextIndex >= instructions.length) {
      setCurrentIndex(instructions.length);
      return; 
    }
    
    const nextInstruction = instructions[nextIndex];

    if (!nextInstruction) {
        handleNextStep(nextIndex + 1);
        return;
    }
    
    switch (nextInstruction.type) {
      case 'pause':
        setTimeout(() => {
          handleNextStep(nextIndex + 1);
        }, nextInstruction.duration);
        break;
      
      case 'speak':
        speak(nextInstruction.text);
        handleNextStep(nextIndex + 1);
        break;

      default:
        setCurrentIndex(nextIndex);
        break;
    }
  };

  return (
    <svg width="100%" height="100%" viewBox={viewBox || undefined}>
      {instructions.slice(0, currentIndex).map((inst, index) => {
        if (inst && 'd' in inst) {
          const { d, stroke = '#FFFFFF', fill = 'none', strokeWidth = 4 } = inst as PathInstruction;
          return (
            <path 
              key={`drawn-${index}`} 
              d={d} 
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinecap="round" 
              fill={fill}
            />
          );
        }
        return null;
      })}
      
      {currentIndex < instructions.length && instructions[currentIndex] && 'd' in instructions[currentIndex] && (
        <AnimatedSVGPath
          key={`animating-${trigger}-${currentIndex}`}
          instruction={instructions[currentIndex] as PathInstruction}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
    </svg>
  );
};