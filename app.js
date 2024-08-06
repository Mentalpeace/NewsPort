const apiKey = "912b1512b4384abe9c3186de61a6663a";
const blogContainer = document.getElementById("news-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apikey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    }
    catch (error) {
        console.error("Error Fetching News", error)
        return [];
    }
};

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim()
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query)
            displayBlog(articles)
        }
        catch (error) {
            console.log("Error in fetching news", error)

        }
    }
})
async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2024-07-10&sortBy=publishedAt&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    }
    catch (error) {
        console.error("Error Fetching News", error)
        return [];
    }  
}

function displayBlog(articles) {
    blogContainer.innerHTML = ""
    articles.forEach((article) => {
        const newsCard = document.createElement("div")
        newsCard.classList.add("news-card")
        const img = document.createElement("img")
        img.src = article.urlToImage
        img.alt = article.title
        const title = document.createElement("h3")
        const trunTitle = article.title.length > 25 ? article.title.slice(0, 25) + "..." : article.title;
        title.textContent = trunTitle;
        const description = document.createElement("p")
        description.textContent = article.description

        newsCard.appendChild(img);
        newsCard.appendChild(title);
        newsCard.appendChild(description);
        newsCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });
        blogContainer.appendChild(newsCard);


    })
}
(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlog(articles);
    }
    catch (error) {
        console.error("Error Fetching News", error)
    }
})();