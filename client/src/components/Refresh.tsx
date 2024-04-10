import React, { useEffect, useState } from "react";

function Refresh() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.179.5:8080/refresh", {
          method: "GET",
          credentials: "include",
          headers: {
            "Access-Control-Allow-Credentials": "true",
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        //console.log(response.json());
      } catch (error) {
        console.error("Eroare în timpul cererii:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}

export default Refresh;
