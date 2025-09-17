// pages/index.tsx
'use client'; // Required for hooks like useState, useRef

import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import { DrawingOrchestrator } from '../components/DrawingOrchestrator';
import { PannableCanvas } from '../components/PannableCanvas';
import { DrawingToolbar } from '../components/DrawingToolbar';
import {
  OrchestratorInstruction,
  parseAiCommandsToInstructions,
  ParsedScript,
} from '../core/JsonToPathParser';
import { getDrawingScriptFromGemini } from '../services/geminiService';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

// react-icons
import { IoImageOutline, IoCloseCircle, IoMicOutline, IoSend } from 'react-icons/io5';

// Canvas to Image library
import { Canvg } from 'canvg';

// Type for user-drawn paths
interface UserPath {
  d: string;
  stroke: string;
  strokeWidth: number;
}

export default function HomeScreen() {
  const [problem, setProblem] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [instructions, setInstructions] = useState<OrchestratorInstruction[]>([]);
  const [viewBox, setViewBox] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  // State for image upload
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for user drawing
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#FF5733'); // Default drawing color
  const [userPaths, setUserPaths] = useState<UserPath[]>([]);
  const isDrawing = useRef(false);
  const currentPath = useRef('');

  // Ref for the SVG container to take snapshots
  const svgContainerRef = useRef<HTMLDivElement>(null);

  // Speech Recognition Hook
  const { isListening, transcript, startListening, setTranscript } = useSpeechRecognition();
  
  // Update problem text with live transcript
  useEffect(() => {
    if(transcript) {
        setProblem(transcript);
    }
  }, [transcript]);

  // --- IMAGE HANDLING ---
  const handleImagePick = () => fileInputRef.current?.click();
  
  const onImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultStr = reader.result as string;
        setImageUri(resultStr);
        setImageBase64(resultStr.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const clearImage = () => {
    setImageUri(null);
    setImageBase64(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };
  
  // --- CORE SOLVING LOGIC ---
  const handleSolve = async (snapshotBase64: string | null = null) => {
    const finalImageBase64 = snapshotBase64 || imageBase64;
    if ((!problem || problem.trim() === '') && !finalImageBase64) {
        alert("Input Required: Please type a problem or upload an image to solve.");
        return;
    }
    if (isLoading) return;

    setIsLoading(true);
    setInstructions([]);
    setUserPaths([]); // Clear user drawings on new problem
    setViewBox(null);

    try {
      const aiCommands = await getDrawingScriptFromGemini(problem, finalImageBase64);
      const parsedScript: ParsedScript = parseAiCommandsToInstructions(aiCommands);
      setInstructions(parsedScript.instructions);
      setViewBox(parsedScript.viewBox);
      setTrigger((prev) => prev + 1);

    } catch (error) {
      alert('Error: ' + (error instanceof Error ? error.message : 'An unknown error occurred.'));
    } finally {
      setIsLoading(false);
      clearImage();
      setProblem('');
      setTranscript(''); // Clear transcript
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !isLoading) handleSolve();
  };
  
  // --- SNAPSHOT & RESEND LOGIC ---
  const handleSolveWithSnapshot = async () => {
    if (!svgContainerRef.current) return;
    
    // Temporarily set all strokes to be more visible for the snapshot
    const svgElement = svgContainerRef.current.querySelector('svg')?.cloneNode(true) as SVGSVGElement;
    if(!svgElement) return;

    svgElement.style.backgroundColor = '#000'; // Ensure background is black
    const userPathsOnSvg = svgElement.querySelectorAll('.user-path');
    userPathsOnSvg.forEach(p => (p as SVGPathElement).style.strokeWidth = '5');


    const canvas = new OffscreenCanvas(svgElement.clientWidth, svgElement.clientHeight);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const v = await Canvg.from(ctx, svgElement.outerHTML);
    await v.render();

    const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.8 });
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result as string;
      const snapshotBase64 = base64data.split(',')[1];
      handleSolve(snapshotBase64); // Call the main solve function with the new image
    };
  };

  // --- USER DRAWING HANDLERS ---
  const getPoint = (e: React.PointerEvent) => {
    const svg = e.currentTarget.closest('svg');
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const transformedPt = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    return { x: transformedPt.x, y: transformedPt.y };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isDrawingMode || e.button !== 0) return;
    isDrawing.current = true;
    const { x, y } = getPoint(e);
    currentPath.current = `M ${x} ${y}`;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawingMode || !isDrawing.current) return;
    const { x, y } = getPoint(e);
    currentPath.current += ` L ${x} ${y}`;
    // For live drawing preview
    setUserPaths(prev => {
        const newPaths = [...prev];
        if (newPaths.length > 0 && newPaths[newPaths.length-1].d.startsWith('M')) {
           newPaths[newPaths.length-1] = { ...newPaths[newPaths.length-1], d: currentPath.current };
        } else {
            newPaths.push({ d: currentPath.current, stroke: strokeColor, strokeWidth: 3 });
        }
        return newPaths;
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDrawingMode || !isDrawing.current) return;
    isDrawing.current = false;
    const finalPath = { d: currentPath.current, stroke: strokeColor, strokeWidth: 3 };
    setUserPaths(prev => [...prev, finalPath]);
    currentPath.current = '';
  };
  

  return (
    <>
      <Head>
        <title>AI Math Tutor</title>
        <meta name="description" content="Solve math problems with an interactive visual workspace." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <DrawingToolbar
          isDrawingMode={isDrawingMode}
          strokeColor={strokeColor}
          onToggleDrawingMode={() => setIsDrawingMode(!isDrawingMode)}
          onSetStrokeColor={setStrokeColor}
          onClearUserPaths={() => setUserPaths([])}
          onSnapshotAndResend={handleSolveWithSnapshot}
        />
        
        <div className={styles.canvasContainer} ref={svgContainerRef}>
          <PannableCanvas>
            <DrawingOrchestrator
              instructions={instructions}
              viewBox={viewBox}
              trigger={trigger}
            />
          </PannableCanvas>
          {/* User Drawing Overlay */}
          <svg
            style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                pointerEvents: isDrawingMode ? 'auto' : 'none',
                cursor: isDrawingMode ? 'crosshair' : 'default'
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            viewBox={viewBox || undefined} // Match viewBox to align drawings
          >
            {userPaths.map((path, index) => (
              <path
                key={`userpath-${index}`}
                className="user-path"
                d={path.d}
                stroke={path.stroke}
                strokeWidth={path.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            ))}
          </svg>
        </div>

        {imageUri && (
          <div className={styles.imagePreviewContainer}>
            <img src={imageUri} alt="Problem preview" className={styles.imagePreview} />
            <button className={styles.removeImageButton} onClick={clearImage}>
              <IoCloseCircle size={22} color="white" />
            </button>
          </div>
        )}
        
        <div className={styles.inputContainer}>
          <input
            type="file" ref={fileInputRef} onChange={onImageFileChange}
            style={{ display: 'none' }} accept="image/*"
          />
          <button className={styles.iconButton} onClick={handleImagePick} disabled={isLoading}>
            <IoImageOutline size={22} />
          </button>

          <input
            type="text" className={styles.input}
            placeholder={isListening ? "Listening..." : (imageUri ? "Describe the image..." : "Ask a math problem...")}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />

          {isLoading ? (
            <div className={styles.activityIndicator}><div className={styles.spinner}></div></div>
          ) : (
            <div className={styles.iconRow}>
              <button className={`${styles.iconButton} ${isListening ? styles.listening : ''}`} onClick={isListening ? () => {} : startListening}>
                <IoMicOutline size={22} />
              </button>
              <button className={styles.iconButton} onClick={() => handleSolve()}>
                <IoSend size={22} />
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}