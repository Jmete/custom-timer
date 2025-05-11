import React from 'react'
import { useTimer } from '../contexts/TimerContext'
import styles from '../styles/Home.module.css'

export default function TimerControls() {
  const {
    isRunning,
    setIsRunning,
    currentSectionIndex,
    setCurrentSectionIndex,
    sections,
    setTimeRemaining,
  } = useTimer()

  const toggleTimer = () => setIsRunning(!isRunning)

  const previousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1)
      setTimeRemaining(sections[currentSectionIndex - 1].duration)
    }
  }

  const nextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1)
      setTimeRemaining(sections[currentSectionIndex + 1].duration)
    }
  }

  const resetTimer = () => {
    setCurrentSectionIndex(0)
    setTimeRemaining(sections[0]?.duration || 0)
    setIsRunning(false)
  }

  return (
    <div className={styles.controls}>
      <button 
        className={`${styles.controlButton} ${isRunning ? styles.pause : styles.play}`}
        onClick={toggleTimer}
      >
        {isRunning ? 'Pause' : 'Play'}
      </button>
      <button className={styles.controlButton} onClick={previousSection}>Previous</button>
      <button className={styles.controlButton} onClick={nextSection}>Next</button>
      <button className={`${styles.controlButton} ${styles.reset}`} onClick={resetTimer}>Reset</button>
    </div>
  )
}