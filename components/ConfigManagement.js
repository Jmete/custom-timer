import React from 'react'
import { useTimer } from '../contexts/TimerContext'
import styles from '../styles/Home.module.css'

export default function ConfigManagement() {
  const { sections, updateSections } = useTimer()

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sections))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "timer_config.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const handleUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const uploadedSections = JSON.parse(e.target.result)
          updateSections(uploadedSections)
        } catch (error) {
          console.error('Error parsing uploaded file:', error)
          alert('Invalid file format. Please upload a valid JSON file.')
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className={styles.configManagement}>
      <button onClick={handleDownload} className={styles.configButton}>Download Config</button>
      <label className={styles.configButton}>
        Upload Config
        <input type="file" onChange={handleUpload} accept=".json" style={{ display: 'none' }} />
      </label>
    </div>
  )
}