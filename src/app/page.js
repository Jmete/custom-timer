"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import CountdownTimer from "./CountdownTimer";
import SectionForm from "./SectionForm";
import SectionList from "./SectionList";
import { DragDropContext } from "react-beautiful-dnd";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [sections, setSections] = useState(() => {
    const savedSections = localStorage.getItem("sections");
    if (savedSections) {
      return JSON.parse(savedSections);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("sections", JSON.stringify(sections));
  }, [sections]);

  const [editIndex, setEditIndex] = useState(null);
  const fileInput = useRef(null);

  const addSection = (section) => {
    setSections((prevSections) => [...prevSections, section]);
  };

  const deleteSection = (index) => {
    setSections((prevSections) => prevSections.filter((_, i) => i !== index));
  };

  const editSection = (index, newSection) => {
    if (editIndex !== null) {
      setSections((prevSections) =>
        prevSections.map((section, i) =>
          i === editIndex ? newSection : section
        )
      );
      setEditIndex(null);
    }
  };

  const reorderSections = (startIndex, endIndex) => {
    const result = Array.from(sections);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setSections(result);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index !== result.source.index) {
      reorderSections(result.source.index, result.destination.index);
    }
  };

  const downloadJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(sections));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "sections.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const uploadJSON = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newSections = JSON.parse(event.target.result);
        setSections(newSections);
      };
      reader.readAsText(file);
    }
  };

  const triggerFileUpload = () => {
    fileInput.current.click();
  };

  return (
    <main className="">
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-5">
        <div>
          <Toaster position="bottom-center" />
        </div>
        <a href="https://timer.jamesmete.com/">
          <Image
            src="/timer-logo.svg"
            alt="Timer Logo"
            width={200}
            height={200}
            className="my-4"
          />
        </a>

        {sections.length > 0 ? <CountdownTimer sections={sections} /> : ""}

        <SectionForm addSection={addSection} />
        <DragDropContext onDragEnd={onDragEnd}>
          <SectionList
            sections={sections}
            deleteSection={deleteSection}
            editSection={editSection}
            editIndex={editIndex}
            setEditIndex={setEditIndex}
          />
        </DragDropContext>

        <div className="mt-4">
          <button
            className="bg-gray-300 hover:bg-blue-500 text-white px-4 py-2 rounded mr-4"
            onClick={downloadJSON}
          >
            Download JSON
          </button>
          <button
            className="bg-gray-300 hover:bg-green-500 text-white px-4 py-2 rounded"
            onClick={triggerFileUpload}
          >
            Upload JSON
          </button>
          <input ref={fileInput} type="file" hidden onChange={uploadJSON} />
        </div>

        <a href="https://jamesmete.com/">
          <div className="py-4 text-gray-300">jamesmete.com</div>
        </a>
      </div>
    </main>
  );
}
