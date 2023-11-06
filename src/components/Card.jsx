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
      <form onSubmit={insert_to_database}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter CrewMate's name"
          onChange={handleNameChange}
        ></input>

        <label>Speed</label>
        <input
          type="number"
          placeholder="Enter speed in mph"
          onChange={handleSpeedChange}
        ></input>

        <label>Select a color</label>
        {colors.map((color, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={color}
              name={color}
              value={color}
              onChange={handleColorChange}
            />
            <label htmlFor={color}>{color}</label>
          </div>
        ))}

        <button type="submit">Create a CrewMate</button>
      </form>
    </div>
  );
}

export default Card;
