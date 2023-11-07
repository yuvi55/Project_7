import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4emptdXNsbXRiZW54Y3JmY2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzMDA1ODQsImV4cCI6MjAxNDg3NjU4NH0.dgjXDbN4Gd6WQnAxRPG-PbLVvN5JiACR2gSOXdq1UDk";
const supabase = createClient(
  "https://ixzjmuslmtbenxcrfcii.supabase.co",
  supabaseKey
);

const Individual_info = () => {
  const { id } = useParams();
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

  return (
    <>
      <img
        src="https://shimmering-stardust-c75334.netlify.app/assets/suspect.bdfacc7e.png"
        className="items-center border-8"
      ></img>
      <h1 className="text-4xl">Current crew mate info </h1>
      <h2 className="text-2xl">Name:{dbdata[0]?.Name}</h2>
      <h3 className="text-3xl my-10">Stats</h3>
      <h3 className="text-xl">
        Color:
        {dbdata[0]?.Color}
      </h3>
      <h3 className="text-xl">Speed:{dbdata[0]?.Speed}</h3>

      <h3 className="text-2xl text-blue-500 my-28">
        Wow this crew mate has a cool name and is also really fast 💨 🏃🏻
      </h3>
    </>
  );
};
export default Individual_info;
