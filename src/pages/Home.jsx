import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../components/Banner";
import Deneme from "./Deneme";
import UserMenu from "../components/UserMenu";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/home")
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
