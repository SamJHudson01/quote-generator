const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

//Show new quote
function newQuote(){
    const randomNumber = Math.floor(Math.random() * (apiQuotes.length));

    if (apiQuotes[randomNumber].author) {
        quoteAuthor.textContent = apiQuotes[randomNumber].author;
    } else {
        quoteAuthor.textContent = 'Unknown';
    }
    
    quoteText.textContent = apiQuotes[randomNumber].text;
}

// Get quotes from API
async function getQuotes() {
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //catch error here
    }
}

newQuoteBtn.addEventListener("click", newQuote);

getQuotes();