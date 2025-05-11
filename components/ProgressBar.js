import React from 'react'
import styles from '../styles/Home.module.css'

export default function ProgressBar({ progress, label, isOverall = false }) {
  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBarLabel}>{label}</div>
      <div className={`${styles.progressBar} ${isOverall ? styles.overall : ''}`}>
        <div 
          className={`${styles.progressBarFill} ${isOverall ? styles.overall : ''}`} 
          style={{ width: `${progress * 100}%` }}
        ></div>
      </div>
    </div>
  )
}