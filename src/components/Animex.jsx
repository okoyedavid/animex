import React, { useState } from "react";
import AnimexItem from "./AnimexItem";
import { useGetMovie } from "../Api/useGetMovies";
import "./animex.css";
import Error from "../common/Error";
import NavBar from "./NavBar";
import Loading from "../common/Loading";

const Animex = ({ backgroundImage }) => {
  const [query, setQuery] = useState("");
  const { loading, error, anime } = useGetMovie(query);
  return (
    <>
      <div className="background" style={{ backgroundImage }}></div>
      <div className="overlay"></div>
      <div className="animex-container">
        <NavBar query={query} onSetQuery={setQuery} />

        {error ? (
          <Error err={error} />
        ) : loading ? (
          <Loading />
        ) : (
          <ul className="anime_list">
            {anime.map((item) => (
              <AnimexItem item={item} key={item.mal_id} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Animex;
