import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { useTimer } from '../contexts/TimerContext'
import ProgressBar from './ProgressBar'
import TimerControls from './TimerControls'
import { formatTime } from '../utils/timerUtils'

export default function Timer() {
  const {
    sections,
    currentSectionIndex,
    timeRemaining,
    setTimeRemaining,
    isRunning,
    setCurrentSectionIndex,
    totalTime,
  } = useTimer()

  const [isAlmostOver, setIsAlmostOver] = useState(false)

  useEffect(() => {
    let interval
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev - 1
          setIsAlmostOver(newTime <= 5 && newTime > 0)
          return newTime
        })
      }, 1000)
    } else if (timeRemaining === 0 && currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1)
      setTimeRemaining(sections[currentSectionIndex + 1].duration)
      setIsAlmostOver(false)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeRemaining, currentSectionIndex, sections])

  const currentSectionProgress = 1 - timeRemaining / sections[currentSectionIndex]?.duration
  
  const elapsedTime = sections.slice(0, currentSectionIndex).reduce((sum, section) => sum + section.duration, 0)
  const totalElapsedTime = elapsedTime + (sections[currentSectionIndex]?.duration - timeRemaining)
  const overallProgress = totalElapsedTime / totalTime

  return (
    <div className={styles.timerContainer}>
      {sections.length > 0 ? (
        <>
          <h2>{sections[currentSectionIndex]?.name || 'No sections'}</h2>
          <div className={`${styles.time} ${isAlmostOver ? styles.flashRed : ''}`}>
            {formatTime(timeRemaining)}
          </div>
          <div className={styles.progressAndControls}>
            <ProgressBar progress={currentSectionProgress} label="Section Progress" />
            <ProgressBar progress={overallProgress} label="Overall Progress" isOverall={true} />
            <div className={styles.totalTime}>
              Total time: {formatTime(totalTime)}
            </div>
            <TimerControls />
          </div>
        </>
      ) : (
        <p>Add sections to start the timer</p>
      )}
    </div>
  )
}