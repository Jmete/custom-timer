import React from "react";
import { Droppable } from "react-beautiful-dnd";
import SectionItem from "./SectionItem";

const SectionList = ({
  sections,
  deleteSection,
  editSection,
  editIndex,
  setEditIndex,
}) => {
  return (
    <Droppable droppableId="section-list">
      {(provided) => (
        <ul
          className="max-w-[900px]"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {sections.map((section, index) => (
            <SectionItem
              key={index}
              section={section}
              index={index}
              onDelete={() => deleteSection(index)}
              onEdit={editSection}
              isEditing={index === editIndex}
              setEditIndex={setEditIndex}
            />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default SectionList;
