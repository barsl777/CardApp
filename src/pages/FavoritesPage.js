import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import { Card } from "../components/Card";
import { fetchCards, cardsSelector } from "./slices/cards";

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const { cards } = useSelector(cardsSelector);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  function favoritesCards() {
    return cards.map((card) =>
      localStorage.getItem(card.id) === "true" ? (
        <Card key={card.id} card={card} />
      ) : null
    );
  }
  return (
    <div className="favoritesBlock">
      <h2>Favorites</h2>
      <div className="boardFavoritesCards">{favoritesCards()}</div>
      <Button
        className="backMain"
        href="/cards"
        variant="contained"
        color="primary"
      >
        Back
      </Button>
    </div>
  );
}
