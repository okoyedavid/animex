import { useEffect, useRef } from "react";
import Logo from "../common/Logo";
import { useKey } from "../hooks/useKey";

function NavBar({ query, onSetQuery }) {
  useKey("Enter", () => {
    if (document.activeElement === search.current) return;
    search.current.focus();
    onSetQuery("");
  });

  const search = useRef();

  useEffect(() => {
    search.current.focus();
  }, []);

  return (
    <div className="navBar">
      <Logo className="logo" />
      <input
        className="form-control search-bar"
        type="text"
        placeholder="Search anime"
        aria-describedby="searchBar"
        value={query}
        onChange={(e) => onSetQuery(e.target.value)}
        ref={search}
      />
    </div>
  );
}

export default NavBar;
