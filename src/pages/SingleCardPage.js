import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCard, cardSelector } from "./slices/card";
import Button from "@material-ui/core/Button";

export default function SingleCardPage({ match }) {
  const dispatch = useDispatch();
  const { card, loading, hasErrors } = useSelector(cardSelector);

  useEffect(() => {
    const { id } = match.params;
    dispatch(fetchCard(id));
  }, [dispatch, match]);

  function Info({ card }) {
    return (
      <aside>
        <h2>{card.id}</h2>
        <h3>{card.albumId}</h3>
        <h5>{card.title}</h5>
        <h5>{card.thumbnailUrl}</h5>
      </aside>
    );
  }

  const renderCard = () => {
    if (hasErrors) return <p>Unable to display card.</p>;
    if (loading) {
      return <p>Loading card...</p>;
    } else {
      return <Info card={card} />;
    }
  };

  return (
    <section>
      <div className="info">
        {renderCard()}
        <Button
          className="backMain"
          href="/cards"
          variant="contained"
          color="primary"
        >
          Back
        </Button>
      </div>
    </section>
  );
}
