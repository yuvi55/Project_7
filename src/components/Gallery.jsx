import React, { useState, useEffect } from "react";

import { createClient } from "@supabase/supabase-js";

import { Link } from "react-router-dom";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4emptdXNsbXRiZW54Y3JmY2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzMDA1ODQsImV4cCI6MjAxNDg3NjU4NH0.dgjXDbN4Gd6WQnAxRPG-PbLVvN5JiACR2gSOXdq1UDk";
const supabase = createClient(
  "https://ixzjmuslmtbenxcrfcii.supabase.co",
  supabaseKey
);

const Gallery = () => {
  const [dbdata, setDbdata] = useState([]);
  useEffect(() => {
    // Function to fetch data when the component mounts
    async function fetch_data() {
      try {
        const { data, error } = await supabase.from("crew_mates").select();
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
  }, []); // The empty dependency array ensures this runs only on the initial component mount

  return (
    <div className="">
      <h1 className="my-24">Gallery</h1>
      <div className="flex text-center">
        {dbdata.map((item) => (
          <div>
            <Card_view key={item.id} item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Card_view = ({ item }) => {
  return (
    <div className="grid grid-cols-2">
      <div className="border-8 items-center">
        <Link to={`/character/${item.id}`}>
          <img
            src="https://shimmering-stardust-c75334.netlify.app/assets/crewmate.ce385016.png"
            alt={item.Name}
          />
        </Link>

        <h2 className="text-3xl">Name of the crewmate: {item.Name}</h2>
        <h2 className="text-2xl">Speed of the crewmate: {item.Speed}</h2>
        <h2 className="text-1xl">Color of the crewmate: {item.Color}</h2>
        <Link to={`/gallery/${item.id}`} className="items-center my-10">
          <button>Edit</button>
        </Link>
      </div>
    </div>
  );
};
export default Gallery;
