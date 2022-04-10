import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards, cardsSelector } from "./slices/cards";
import { Card } from "../components/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default function CardsPage() {
  const dispatch = useDispatch();
  const { cards, loading, hasErrors } = useSelector(cardsSelector);
  const [valueTitle, setValueTitle] = useState("");
  const [isSort_A, setIsSort_A] = useState(false);
  const [isSort_N, setIsSort_N] = useState(false);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  function renderCards() {
    if (loading) return <p>Loading cards...</p>;
    if (hasErrors) return <p>Unable to display cards.</p>;
    if (isSort_A) {
      let arrData = [...cards];
      return arrData
        .sort((a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        })
        .map((card) => <Card key={card.id} card={card} />);
    }
    if (isSort_N) {
      let arrData = [...cards];
      return arrData
        .sort((a, b) => a.albumId - b.albumId)
        .map((card) => <Card key={card.id} card={card} />);
    }
    if (Boolean(valueTitle) && !isSort_A && !isSort_N) {
      return cards.map((card) =>
        card.title.includes(valueTitle) ? (
          <Card key={card.id} card={card} />
        ) : null
      );
    } else {
      return cards.map((card) => <Card key={card.id} card={card} />);
    }
  }
  return (
    <section>
      <div className="search">
        <TextField
          id="outlined-basic"
          value={valueTitle}
          onChange={(event) => {
            setIsSort_A(false);
            setIsSort_N(false);
            setValueTitle(event.target.value);
          }}
          label="Search title"
          variant="outlined"
        />
        <Button
          className="sort_a"
          onClick={() => {
            setValueTitle("");
            setIsSort_A(true);
            setIsSort_N(false);
          }}
          variant="contained"
          color="secondary"
        >
          Sort "A"
        </Button>
        <Button
          className="sort_n"
          onClick={() => {
            setValueTitle("");
            setIsSort_A(false);
            setIsSort_N(true);
          }}
          variant="contained"
          color="secondary"
        >
          Sort "№"
        </Button>
      </div>
      <Button
        className="favorites"
        href="/favorites"
        variant="contained"
        color="primary"
      >
        Favorites
      </Button>
      <div className="boardCards">{renderCards()}</div>
    </section>
  );
}
