const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new quote
function newQuote(){
    loading();
    const randomNumber = Math.floor(Math.random() * (apiQuotes.length));

    if (apiQuotes[randomNumber].author) {
        quoteAuthor.textContent = apiQuotes[randomNumber].author;
    } else {
        quoteAuthor.textContent = 'Unknown';
    }
    
    if (apiQuotes[randomNumber].text.length > 70) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
        quoteText.textContent = apiQuotes[randomNumber].text;
    complete();
}

// Get quotes from API
async function getQuotes() {
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //catch error here
    }
    complete();
}

newQuoteBtn.addEventListener("click", newQuote);

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, 'blank');
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();