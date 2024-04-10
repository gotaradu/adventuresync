import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Athlete from "../models/Athlete";

function Login() {
  const [user, setUser] = useState<Athlete | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.179.5:8080/home", {
          method: "GET",
          headers: {
            Origin: "http://192.168.179.5:3000",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: Athlete = await response.json();

        setUser(data);
      } catch (error) {
        console.error("Eroare în timpul cererii:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>Bun venit, {user.firstname}!</h1>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default Login;
