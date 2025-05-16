import React from "react";

import { useEffect, useState } from "react";

import Banner from "../components/Banner";

import api from "../api/api";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get("/home")
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("Error fetching home message:", error);
      });
  }, []);

  return (
    <div className="">
      <Banner />
    </div>
  );
}
