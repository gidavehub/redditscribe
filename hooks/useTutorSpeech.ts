// hooks/useTutorSpeech.ts
'use client';
import { useEffect, useCallback } from 'react';

export const useTutorSpeech = () => {
  const cleanText = (text: string) => {
    return text
      .replace(/\\frac{([^}]+)}{([^}]+)}/g, '$1 divided by $2')
      .replace(/\^/g, ' to the power of ')
      .replace(/_/g, ' sub ')
      .replace(/\\sqrt{([^}]+)}/g, 'the square root of $1')
      .replace(/\\/g, '');
  };

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.warn("Speech synthesis not supported.");
      return;
    }
    const speakableText = cleanText(text);
    const utterance = new SpeechSynthesisUtterance(speakableText);
    utterance.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return { speak, stop };
};