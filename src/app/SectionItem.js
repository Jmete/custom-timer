import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { TimeFormat } from "./utils";

const SectionItem = ({
  section,
  index,
  onDelete,
  onEdit,
  isEditing,
  setEditIndex,
}) => {
  const handleEdit = () => {
    if (isEditing) {
      onEdit(index, section);
    } else {
      setEditIndex(index);
    }
  };

  return (
    <Draggable draggableId={String(index)} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-4 p-4 flex bg-gray-50 shadow-md rounded-xl justify-end"
        >
          {isEditing ? (
            <>
              <input
                type="text"
                defaultValue={section.name}
                onChange={(e) => (section.name = e.target.value)}
                className="border-2 border-gray-300 p-2 w-full"
              />
              <input
                type="text"
                defaultValue={section.time / 60}
                onChange={(e) => {
                  const timeInSeconds = e.target.value * 60;
                  section.time = timeInSeconds;
                  section.formatTime = TimeFormat(timeInSeconds);
                }}
                className="border-2 border-gray-300 p-2 w-32"
              />
              <button
                onClick={handleEdit}
                className="bg-blue-300 hover:bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex">
              <p className="text-md font-light	text-gray-300 flex mr-4 m-auto">
                <div className="text-slate-500 mr-2">{section.name}</div>|
                <div className="mx-2 text-slate-500">{section.formatTime}</div>|
              </p>
              <div className="gap-4 flex flex-row">
                <button
                  onClick={handleEdit}
                  className="bg-gray-300 hover:bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={onDelete}
                  className="bg-red-300 hover:bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      )}
    </Draggable>
  );
};

export default SectionItem;
