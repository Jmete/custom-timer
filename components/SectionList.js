import React, { useCallback, useState, useEffect } from 'react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useTimer } from '../contexts/TimerContext'
import styles from '../styles/Home.module.css'

function SortableItem({ id, name, duration, removeSection, updateSection, isEditing, setEditingSectionId }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const [editName, setEditName] = useState(name)
  const [editMinutes, setEditMinutes] = useState(Math.floor(duration / 60))
  const [editSeconds, setEditSeconds] = useState(duration % 60)

  useEffect(() => {
    setEditName(name)
    setEditMinutes(Math.floor(duration / 60))
    setEditSeconds(duration % 60)
  }, [name, duration])

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleRemove = useCallback((e) => {
    e.stopPropagation()
    removeSection(id)
  }, [id, removeSection])

  const handleEdit = useCallback((e) => {
    e.stopPropagation()
    setEditingSectionId(id)
  }, [id, setEditingSectionId])

  const handleSave = useCallback((e) => {
    e.stopPropagation()
    const totalSeconds = parseInt(editMinutes, 10) * 60 + parseInt(editSeconds, 10)
    updateSection(id, { name: editName, duration: totalSeconds })
    setEditingSectionId(null)
  }, [id, editName, editMinutes, editSeconds, updateSection, setEditingSectionId])

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSave(e)
    }
  }, [handleSave])

  return (
    <li ref={setNodeRef} style={style} className={styles.sectionItem}>
      <div {...attributes} {...listeners} className={styles.dragHandle}>
        ☰
      </div>
      <div className={styles.sectionContent}>
        {isEditing ? (
          <>
            <input
              className={`${styles.editInput} ${styles.editNameInput}`}
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className={styles.timeInputContainer}>
              <input
                className={`${styles.editInput} ${styles.editTimeInput}`}
                type="number"
                min="0"
                value={editMinutes}
                onChange={(e) => setEditMinutes(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <span>:</span>
              <input
                className={`${styles.editInput} ${styles.editTimeInput}`}
                type="number"
                min="0"
                max="59"
                value={editSeconds}
                onChange={(e) => setEditSeconds(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </>
        ) : (
          <>
            <span className={styles.sectionName}>{name}</span>
            <span className={styles.sectionDuration}>
              {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
            </span>
          </>
        )}
      </div>
      <div className={styles.sectionActions}>
        {isEditing ? (
          <button className={styles.saveButton} onClick={handleSave}>Save</button>
        ) : (
          <button className={styles.editButton} onClick={handleEdit}>Edit</button>
        )}
        <button className={styles.removeButton} onClick={handleRemove}>×</button>
      </div>
    </li>
  )
}

export default function SectionList() {
  const { sections, updateSections, addSection, editingSectionId, setEditingSectionId } = useTimer()
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const removeSection = useCallback((id) => {
    updateSections(prevSections => prevSections.filter(section => section.id !== id))
  }, [updateSections])

  const updateSection = useCallback((id, updatedData) => {
    updateSections(prevSections => prevSections.map(section => 
      section.id === id ? { ...section, ...updatedData } : section
    ))
    setEditingSectionId(null)
  }, [updateSections, setEditingSectionId])

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      updateSections(prevSections => {
        const oldIndex = prevSections.findIndex((section) => section.id === active.id)
        const newIndex = prevSections.findIndex((section) => section.id === over.id)
        return arrayMove(prevSections, oldIndex, newIndex)
      })
    }
  }, [updateSections])

  return (
    <div className={styles.sectionList}>
      <h3 className={styles.sectionListHeader}>Meeting Sections</h3>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
          <ul>
            {sections.map((section) => (
              <SortableItem 
                key={section.id} 
                id={section.id} 
                name={section.name} 
                duration={section.duration} 
                removeSection={removeSection} 
                updateSection={updateSection}
                isEditing={section.id === editingSectionId}
                setEditingSectionId={setEditingSectionId}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <div className={styles.addSectionButtonContainer}>
        <button onClick={addSection} className={styles.addSectionButton}>Add Section</button>
      </div>
    </div>
  )
}

function arrayMove(array, from, to) {
  const newArray = array.slice()
  newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0])
  return newArray
}