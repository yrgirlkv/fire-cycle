import './App.css';
import {useState} from 'react';
const _ = require('underscore');

const App = () => {

  //build deck
  const deckBuilder = () => {
    let deck = [];
    ['Hearts', 'Clubs', 'Spades', 'Diamonds'].forEach(suit => {
      ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'].forEach(rank => {
        deck.push({
          suit: suit,
          rank: rank
        });
      });
    });
    deck = _.shuffle(deck);
    return deck;
  }

  let deck = deckBuilder();

  //control stage
  const [week, changeWeek] = useState(0);

  const evaluateStage = () => {
    if (week === 0) {
      return 'Start';
    } else if (week >= 4) {
      return 'End';
    } else {
      let card = deck.pop();
      return (`Week ${week} \n
      Playing ${card.rank} of ${card.suit}`);
    }
  }

  return (
    <div className="App">
      <h1>Fire Cycle</h1>
      <h2>A year in the peaks.</h2>
      <div>
        {evaluateStage(week)}
      </div>
      <button onClick = {() => changeWeek(week + 1)}>
        Next week
      </button>
    </div>
  );
}

export default App;
