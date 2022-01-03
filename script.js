const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const previousQuoteBtn = document.getElementById("previous-quote-button");

let apiQuotes = [];
let displayedQuotes =[];

function noPreviousQuote() {
    if (!displayedQuotes.length) {
        previousQuoteBtn.hidden = true;
    } else {
        previousQuoteBtn.hidden = false;
    }
}

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new quote
function newQuote() {
    loading();
    const randomNumber = Math.floor(Math.random() * apiQuotes.length);

    if (apiQuotes[randomNumber].author) {
        quoteAuthor.textContent = apiQuotes[randomNumber].author;
    } else {
        quoteAuthor.textContent = "Unknown";
    }

    if (apiQuotes[randomNumber].text.length > 70) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = apiQuotes[randomNumber].text;

    noPreviousQuote();
    displayedQuotes.push(apiQuotes[randomNumber]);
    complete();
}

displayedQuotesCounter = 2;

function previousQuote() {
    if (displayedQuotes[displayedQuotes.length - displayedQuotesCounter].author) {
        quoteAuthor.textContent = displayedQuotes[displayedQuotes.length - displayedQuotesCounter].author;
    } else {
        quoteAuthor.textContent = "Unknown";
    }
    if (displayedQuotes[displayedQuotes.length - displayedQuotesCounter].text.length > 70) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = displayedQuotes[displayedQuotes.length - displayedQuotesCounter].text;
    displayedQuotesCounter +=1;
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
    window.open(twitterUrl, "blank");
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
previousQuoteBtn.addEventListener("click", previousQuote);

getQuotes();
