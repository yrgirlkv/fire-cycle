import {useState} from 'react';
import Calendar from './Components/Calendar.jsx';
import LogBook from './Components/LogBook.jsx';
import deckBuilder from './utils/deckBuilder.js'
import markdownEngine from './utils/markdownEngine.js';


const App = () => {

  //state
  const [week, changeWeek] = useState(0);
  const [deck, updateDeck] = useState(deckBuilder());
  const [card, updateCard] = useState(deck[deck.length - 1]);
  const [scale, setScale] = useState(12);

  //seasonal: 4 weeks (demo)
  //monthly: 12 weeks
  //twice monthly: 24 weeks
  //weekly

  //Ashwhite, Sparks, Bonfire, Cinder

  const [scrawl, updateScrawl] = useState('');
  const [journal, updateJournal] = useState([]);

  //download
  const [fileUrl, updateFileUrl] = useState('blank');
  const [downloadDate, updateDownloadDate] = useState('');
  const [enactDownload, setDownloadEvent] = useState({});

  let advanceButton = (e) => {
    e.preventDefault();

    if (!scrawl && week >= 1 && week <= scale) {
      alert('Write in the journal!');
    } else {
      //update journal
      if (week >= 1) {
        let newEntry = {
          week: week,
          event: card,
          log: scrawl
        }
        updateJournal([...journal, newEntry]);
        updateScrawl('');
      }

      //change weeks, draw new card
      if (week > scale) {
        changeWeek(0);
        updateDeck(deckBuilder());
        updateJournal([]);
      } else {
        changeWeek(week + 1);
        updateDeck(deck.slice(0, deck.length - 1))
      }
      updateCard(deck[deck.length - 1]);
    }
  }

  //event handlers

  let handleWriting = (e) => {
    updateScrawl(e.target.value);
  }

  let handleDownload = (e) => {
    e.preventDefault();
    //create filename
    const month = new Date().toLocaleString('default', { month: 'short' });
    const day = new Date().getDay();
    updateDownloadDate(`${day}-${month}`);

    const file = markdownEngine(journal, scale);

    const blob = new Blob([file], {type: 'text/plain'});
    const fileLoc = URL.createObjectURL(blob);
    Promise.resolve()
    .then (() => updateFileUrl(fileLoc))
    .then(() => enactDownload.click())
    .then(URL.revokeObjectURL(fileUrl))
    .then(updateFileUrl(''))
  }

  let handleScale = (e) => {
    setScale(e.target.value);
  }

  return (
    <div className="App">
      <a style={{display: "none"}}
        download = {`fire-cycle-${downloadDate}.md`}
        href={fileUrl}
        ref={e => setDownloadEvent(e)}
        >download it</a>
      {week > scale ? null : (<div><h1>Fire Cycle</h1>
      <h2>A year in the peaks.</h2></div>)}
      <Calendar week = {week} card = {card} scale={scale}/>
      <LogBook
        week = {week}
        scrawl = {scrawl}
        journal = {journal}
        card = {card}
        scale = {scale}
        advanceButton={advanceButton}
        handleWriting = {handleWriting}
        handleDownload = {handleDownload}
        handleScale = {handleScale}
      />
    </div>
  );
}

export default App;
