import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { FaSquareTwitter } from 'react-icons/fa6'
function App() {

  const [quote, setQuote] = useState("");
  const [quoteHref, setQuoteHref] = useState("");
  const [quoteColor, setQuoteColor] = useState("");
  const getRandomQuote = async () => {
    let response = await axios.get("https://api.quotable.io/random");
    return response.data;
  }

  const createRandomColor = () => {
    let color = "#";
    const content = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
    for (let i = 0; i < 6; i++) {
      color += content[Math.floor(Math.random() * content.length)]
    }
    return color;
  }

  const getQuote = async () => {
    let randomQuote = await getRandomQuote();
    return randomQuote;
  }

  const setQuoteOnScreen = async (randomQuote) => {
    setQuote(randomQuote)
    setQuoteHref('https://twitter.com/intent/tweet?text=' + randomQuote.content + " - " + randomQuote.author + " %23quotes")
    let randomColor = createRandomColor();
    document.body.style.backgroundColor = randomColor;
    setQuoteColor(randomColor);
  }

  useEffect(async () => {
    let quote = await getQuote();
    await setQuoteOnScreen(quote);
  }, []);

  return (
    <div id='quote-box'>
      <h2 key={quote.content} id='text' style={{ color: quoteColor }}>{quote.content}</h2>
      <h4 key={quote.author} id='author' style={{ color: quoteColor }}>- {quote.author}</h4>
      <div className='more'>
        <a target='_blank' href={quoteHref}><FaSquareTwitter className='twitter' /></a>
        <button id="new-quote" onClick={async () => {
          let quote = await getQuote();
          await setQuoteOnScreen(quote);
        }
        }>New quote</button>
      </div>
    </div>
  )
}

export default App;
