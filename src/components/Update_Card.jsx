import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4emptdXNsbXRiZW54Y3JmY2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzMDA1ODQsImV4cCI6MjAxNDg3NjU4NH0.dgjXDbN4Gd6WQnAxRPG-PbLVvN5JiACR2gSOXdq1UDk";
const supabase = createClient(
  "https://ixzjmuslmtbenxcrfcii.supabase.co",
  supabaseKey
);

function Update_Card() {
  const colors = ["Red", "Green", "Yellow", "Blue", "Purple", "Yellow", "Pink"];
  const { id } = useParams();
  const [colorState, setColorState] = useState("");
  const [name, setName] = useState("");
  const [speed, setSpeed] = useState(0);
  const [dbdata, setDbdata] = useState([]);

  useEffect(() => {
    // Function to fetch data when the component mounts
    async function fetch_data() {
      try {
        const { data, error } = await supabase
          .from("crew_mates")
          .select()
          .eq("id", parseInt(id));
        if (error) {
          console.error("Error fetching data:", error);
          return;
        }
        setDbdata(data || []); // If the data exists, store it in the state variable; if not, store an empty array
      } catch (error) {
        console.error("Error in the operation:", error);
      }
    }

    fetch_data(); // Invoke the function to fetch data
  }, []);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleColorChange(e) {
    setColorState(e.target.value);
  }

  function handleSpeedChange(e) {
    setSpeed(e.target.value);
  }

  async function update_database(e) {
    e.preventDefault(); // Prevents default form submission behavior

    try {
      const { data, error } = await supabase
        .from("crew_mates")
        .update({ Name: name, Speed: speed, Color: colorState })
        .eq("id", parseInt(id));

      if (error) {
        console.error("Error updating data:", error);
        return;
      }

      console.log("Data updated:", data);
    } catch (error) {
      console.error("Error in the operation:", error);
    }
  }
  async function delete_crew_mate() {
    try {
      const { data, error } = await supabase
        .from("crew_mates")
        .delete()
        .eq("id", parseInt(id));

      if (error) {
        console.error("Error deleting data:", error);
        return;
      }

      console.log("Data deleted");
    } catch (error) {
      console.error("Error in the operation:", error);
    }
  }
  return (
    <div>
      <h1>Update your Crewmate 😍</h1>
      <img src="https://shimmering-stardust-c75334.netlify.app/assets/crewmates.43d07b24.png"></img>

      <h2>Current crew mate info </h2>
      <h3>
        Name:{dbdata[0]?.Name}, Speed:{dbdata[0]?.Speed}, Color:
        {dbdata[0]?.Color}
      </h3>
      <form
        onSubmit={update_database}
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        >
          Update CrewMate
        </button>

        <button
          onClick={delete_crew_mate}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Delete CrewMate
        </button>
      </form>
    </div>
  );
}

export default Update_Card;
