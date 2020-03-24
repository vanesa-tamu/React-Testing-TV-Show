import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "react-dropdown";
import parse from "html-react-parser";

import { formatSeasons } from "./utils/formatSeasons";
import { fetchShow } from './api/fetchShow.js'
import Episodes from "./components/Episodes";
import "./styles.css";

export default function App() {
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);  //object with *seasons as keys* and values of []s
  const [selectedSeason, setSelectedSeason] = useState("");
  const episodes = seasons[selectedSeason] || []; //ex: {season 1: Array(8), season2: Array(9),...} -> Season 1: Array(8)

  useEffect(() => {
      fetchShow()
        .then(res => {
          setShow(res.data);
          setSeasons(formatSeasons(res.data._embedded.episodes)); //array of 26 objects
        });
    
  }, []);

  const handleSelect = e => {
    setSelectedSeason(e.value);
  };

  if (!show) {
    return <h2>Fetching data...</h2>;
  }

  return (
    <div className="App">
      <img className="poster-img" src={show.image.original} alt={show.name} />
      <h1>{show.name}</h1>
      {parse(show.summary)}
      <Dropdown
        options={Object.keys(seasons)}
        onChange={handleSelect}
        value={selectedSeason || "Select a season"}
        placeholder="Select an option"
      />
      <Episodes episodes={episodes} />
    </div>
  );
}
