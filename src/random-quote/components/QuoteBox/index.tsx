import React from 'react';
import quotes from '../../constants/quotes';

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function getUniqueQuoteIndex(previousIndex: number, max: number) {
    let newIndex: number;
    do {
        newIndex = getRandomInt(max);
    } while (newIndex === previousIndex)

    return newIndex;
}

export default function QuoteBox() {
    const [quoteIndex, setQuoteIndex] = React.useState(getRandomInt(quotes.length))
    const {quote, author} = quotes[quoteIndex];

    return (
        <div id='quote-box'>
            <div id='text'>
                <i className='material-icons format-quote'>format_quote</i>
                {quote}
            </div>
            <div id='author'>- {author}</div>
            <footer>
                <a target='_blank' href={encodeURI(`https://twitter.com/intent/tweet?hashtags=quotes&text="${quote}" - ${author}`)} id='tweet-quote'>
                    <i className="fa fa-twitter"/>
                </a>
                <button
                    type='button'
                    id='new-quote'
                    className='waves-effect waves-light btn'
                    onClick={() => setQuoteIndex(getUniqueQuoteIndex(quoteIndex, quotes.length))}
                >
                    New Quote
                </button>
            </footer>
        </div>
    );
}