import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";

export function Card({ card }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    checked
      ? localStorage.setItem(card.id, checked)
      : localStorage.removeItem(card.id);
  }, [checked]);

  return (
    <article>
      <h2>{card.title}</h2>
      <h3>{card.albumId}</h3>
      <img height="100px" width="100px" src={card.url} alt="" />
      <div className="nav">
        <Link className="button" to={`/cards/${card.id}`}>
          View Card
        </Link>
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="checkbox"
          color="primary"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        <div>Add to favorites</div>
      </div>
    </article>
  );
}
