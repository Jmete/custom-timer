import React, { createContext, useState, useContext, useEffect, useCallback } from 'react'
import { calculateTotalTime } from '../utils/timerUtils'

const TimerContext = createContext()

export const TimerProvider = ({ children }) => {
  const [sections, setSections] = useState([])
  const [editingSectionId, setEditingSectionId] = useState(null)
  const [isClient, setIsClient] = useState(false)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [totalTime, setTotalTime] = useState(0)

  useEffect(() => {
    setIsClient(true)
    const savedSections = localStorage.getItem('meetingSections')
    if (savedSections) {
      const parsedSections = JSON.parse(savedSections)
      setSections(parsedSections.map(section => ({
        ...section,
        id: section.id || `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      })))
      if (parsedSections.length > 0) {
        setTimeRemaining(parsedSections[0].duration)
      }
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('meetingSections', JSON.stringify(sections))
    }
  }, [sections, isClient])

  useEffect(() => {
    setTotalTime(calculateTotalTime(sections))
    if (sections.length > 0) {
      setTimeRemaining(sections[currentSectionIndex]?.duration || 0)
    } else {
      setTimeRemaining(0)
      setCurrentSectionIndex(0)
    }
  }, [sections, currentSectionIndex])

  const updateSections = useCallback((newSections) => {
    if (Array.isArray(newSections)) {
      setSections(newSections.map(section => ({
        ...section,
        id: section.id || `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      })))
    } else if (typeof newSections === 'function') {
      setSections(prevSections => {
        const updatedSections = newSections(prevSections);
        return updatedSections.map(section => ({
          ...section,
          id: section.id || `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        }));
      });
    } else {
      console.error('updateSections received invalid input:', newSections);
    }
  }, [setSections])

  const addSection = useCallback(() => {
    const newSection = {
      id: `section-${Date.now()}`,
      name: 'New Section',
      duration: 300 // 5 minutes in seconds
    }
    setSections(prevSections => [...prevSections, newSection])
    setEditingSectionId(newSection.id) // Set the new section to edit mode
  }, [])

  const value = {
    sections,
    updateSections,
    addSection,
    editingSectionId,
    setEditingSectionId,
    currentSectionIndex,
    setCurrentSectionIndex,
    timeRemaining,
    setTimeRemaining,
    isRunning,
    setIsRunning,
    totalTime,
  }

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
}

export const useTimer = () => useContext(TimerContext)