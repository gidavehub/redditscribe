// components/DrawingToolbar.tsx
import React from 'react';
import styles from '../styles/Home.module.css';
import { IoPencil, IoTrashOutline, IoCameraOutline, IoBrushOutline } from 'react-icons/io5';

interface DrawingToolbarProps {
  isDrawingMode: boolean;
  strokeColor: string;
  onToggleDrawingMode: () => void;
  onSetStrokeColor: (color: string) => void;
  onClearUserPaths: () => void;
  onSnapshotAndResend: () => void;
}

export const DrawingToolbar: React.FC<DrawingToolbarProps> = ({
  isDrawingMode,
  strokeColor,
  onToggleDrawingMode,
  onSetStrokeColor,
  onClearUserPaths,
  onSnapshotAndResend,
}) => {
  return (
    <div className={styles.toolbarContainer}>
      <button
        className={`${styles.toolbarButton} ${isDrawingMode ? styles.active : ''}`}
        onClick={onToggleDrawingMode}
        title={isDrawingMode ? 'Disable Drawing Mode' : 'Enable Drawing Mode'}
      >
        <IoPencil size={22} />
      </button>
      
      <div className={styles.toolbarButton} title="Select Color">
        <IoBrushOutline size={22} />
        <input
          type="color"
          value={strokeColor}
          onChange={(e) => onSetStrokeColor(e.target.value)}
          className={styles.colorPicker}
        />
      </div>

      <button
        className={styles.toolbarButton}
        onClick={onClearUserPaths}
        title="Clear Your Drawings"
      >
        <IoTrashOutline size={22} />
      </button>

      <button
        className={styles.toolbarButton}
        onClick={onSnapshotAndResend}
        title="Send with Annotations"
      >
        <IoCameraOutline size={22} />
      </button>
    </div>
  );
};