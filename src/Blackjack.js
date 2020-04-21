import React from "react";
import axios from "axios";

const specialValues = {
  ACE: 11,
  KING: 10,
  QUEEN: 10,
  JACK: 10,
};

function Blackjack(props) {
  let card1;
  let card2;
  let score;

  async function getDeck() {
    let deck = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    let deckId = deck.deck_id;
    let cards = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
    );
    card1 = cards.cards[0];
    card2 = cards.cards[1];
    if (card1.value in specialValues) {
      card1.value = specialValues[card1.value];
    } else {
      card1.value = parseInt(card1.value);
    }
    if (card2.value in specialValues) {
      card2.value = specialValues[card2.value];
    } else {
      card2.value = parseInt(card2.value);
    }
    score = card1.value + card2.value;
  }
  getDeck();
  // NOT GONNA BE FINISHED RUNNING (NO AWAIT)
  // useState / useEffect is going to be used for async react stuff
  if (!card1) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <img src={card1.image} alt="" />
      <img src={card2.image} alt="" />
      <p>Score: {score}</p>
      {score === 21 ? <p>BLACKJACK!!!</p> : <p></p>}
    </div>
  );
}

export default Blackjack;
