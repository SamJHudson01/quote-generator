let apiQuotes = [];

//Show new quote
function newQuote(){
    const randomNumber = Math.floor(Math.random() * (apiQuotes.length));
    return apiQuotes[randomNumber];
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

getQuotes();