import React, { useState } from "react";

import { createClient } from "@supabase/supabase-js";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4emptdXNsbXRiZW54Y3JmY2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzMDA1ODQsImV4cCI6MjAxNDg3NjU4NH0.dgjXDbN4Gd6WQnAxRPG-PbLVvN5JiACR2gSOXdq1UDk";
const supabase = createClient(
  "https://ixzjmuslmtbenxcrfcii.supabase.co",
  supabaseKey
);

function Card() {
  const colors = ["Red", "Green", "Yellow", "Blue", "Purple", "Yellow", "Pink"];

  const [colorState, setColorState] = useState("");
  const [name, setName] = useState("");
  const [speed, setSpeed] = useState(0);

  async function insert_to_database(e) {
    e.preventDefault(); // Prevents default form submission behavior

    try {
      const { data, error } = await supabase
        .from("crew_mates")
        .insert({ Name: name, Speed: speed, Color: colorState })
        .select();

      if (error) {
        console.error("Error inserting data:", error);
        return;
      }

      console.log("Data inserted:", data);
    } catch (error) {
      console.error("Error in the operation:", error);
    }
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleColorChange(e) {
    setColorState(e.target.value);
  }

  function handleSpeedChange(e) {
    setSpeed(e.target.value);
  }

  return (
    <div>
      <form
        onSubmit={insert_to_database}
        className="mt-4 p-4 bg-white rounded shadow-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter CrewMate's name"
            onChange={handleNameChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></input>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="speed"
          >
            Speed
          </label>
          <input
            id="speed"
            type="number"
            placeholder="Enter speed in mph"
            onChange={handleSpeedChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></input>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="colors"
          >
            Select a color
          </label>
          {colors.map((color, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={color}
                name={color}
                value={color}
                onChange={handleColorChange}
                className="mr-2"
              />
              <label htmlFor={color} className="mr-4">
                {color}
              </label>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create a CrewMate
        </button>
      </form>
    </div>
  );
}

export default Card;
