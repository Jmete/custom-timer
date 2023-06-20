"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

const SectionForm = ({ addSection }) => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== "" && time !== "" && time > 0) {
      addSection({ name, time: parseInt(time) });
      setName("");
      setTime("");
    } else {
      toast.error("Make sure fields are not empty and time is greater than 0.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-5 flex flex-col md:flex-row gap-y-1 items-center md:justify-around"
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Section Name"
        className="border-2 border-gray-300 rounded-lg px-3 py-2 md:mr-3 text-md"
      />
      <input
        type="number"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="Time in Seconds"
        className="border-2 border-gray-300 rounded-lg px-3 py-2 md:mr-3 text-md"
      />
      <button
        type="submit"
        className="px-5 py-2 rounded-lg bg-green-300 hover:bg-green-500 text-white"
      >
        Add Section
      </button>
    </form>
  );
};

export default SectionForm;
