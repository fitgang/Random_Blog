import { Article, createArticleList } from "./objects.js";

// DOM elemnets
const seeMoreBtn = document.getElementById("see-more"),
    searchForm = document.getElementById("sna"),
    searchBar = searchForm.querySelector("input[type='text']"),
    filterChoices = searchForm.querySelectorAll("label");

// global stats
// value to be used as a filter to search a query
// the first radio button is checked by default
let searchBy = filterChoices[0].innerText.toLowerCase();

// an array which will contain all the articles and random users respectively.
let articles = createArticleList([]);

// fetch fake articles from JSONPLACEHOLDER, add info and then add them to 'articleList' and render 10 articles to the DOM
(async function() {
    // gets the articles as 'list' with body and title only
    let r1 = await fetch("https://jsonplaceholder.typicode.com/posts"),
        list = await r1.json();

    // gets 10 different identities to be used as 'authors'
    let r2 = await fetch("https://randomuser.me/api/?results=10&inc=name,dob,picture&noinfo"),
        d = await r2.json(),
        authors = d.results;

    // creating the 'articleList'
    // finalises the 'article' object with all the important info and adds it to the list
    list.forEach((i) => {
        let date = getRandomDate(),
            author = getRandomAuthor(authors);
        let article = new Article(i.id, i.title, i.body, date, author);
        articles.addItem(article);
    });

    // renders an array of articles passed as an argument in HTML
    const arr = articles.list.slice(0, 10);
    displayCards(arr);
    localStorage.setItem("allArticles", JSON.stringify(arr));

    removePreloader();

    function getRandomAuthor(arr) {
        // max = arr.length, min = 0
        const i = Math.floor(Math.random() * (arr.length - 0 + 1) + 0),
            r = arr[i];
        return r ? r : getRandomAuthor(arr);
    }
})();

// collect data and sets OGP
(function() {
    const title = document.querySelector("h1").innerText.toUpperCase(),
        des = 'dummy website which generates random articles',
        type = 'website',
        url = location,
        image = location.origin + '/images/logo.png';
    setOGP(title, des, type, url, image);
})();

// renders article cards
function displayCards(arr) {
    const tempCon = document.getElementsByTagName("template")[0].content,
        container = document.querySelector("#article-cards");
    arr.forEach((a) => {
        let clone = tempCon.cloneNode(true).querySelector("article"),
            nameObj = a.author.name,
            name = `${nameObj.first} ${nameObj.last}`;
        clone.querySelector("p").textContent = a.body;
        clone.querySelector("span").textContent = name;
        clone.querySelector(".card-date").textContent = a.date;
        let img = clone.querySelector("img");
        img.src = a.author.picture.thumbnail;
        img.alt = name;
        let link = clone.querySelector("a");
        link.textContent = a.title;
        link.id = a.id;
        link.addEventListener("click", openArticle);
        container.appendChild(clone);
    });
}

function openArticle(e) {
    e.preventDefault();

    // stores article info in browser storage
    const art = articles.list.find((o) => o.id == e.target.id);
    sessionStorage.setItem("article", JSON.stringify(art));

    // opens a different URL in a new tab
    window.open("article.html");
}

function setFilterAndSearch(e) {
    searchBy = e.target.innerText.toLowerCase();

    // manually trigger the submit event
    searchForm.dispatchEvent(new SubmitEvent("submit"));
}

function toggleFilter() {
    const filter = document.getElementById("filter");
    if (this.value) filter.classList.remove("none");
    else filter.classList.add("none");
}

function searchQuery(e) {
    e.preventDefault();

    // hides the filter
    const filter = document.getElementById("filter");
    setTimeout(() => filter.classList.add("none"), 1000);

    // makes the search
    let text = searchBar.value.trim();
    if (!text) return;
    const query = text.replace(/\s+/g, " ").toLowerCase(),
        arr = getMatchingArticles(query, searchBy);

    // clears the markup and input bar
    const container = document.querySelector("#article-cards");
    container.innerHTML = "";
    searchBar.value = "";

    // displays the articles
    displayCards(arr);
}

// return an array of articles
function getMatchingArticles(query, filter) {
    let list = articles.list,
        arr = [];

    // checks for the title
    if (filter == "title" || filter == "all")
        arr = list.filter((a) => a.title.toLowerCase().includes(query));

    // checks for the author
    if (filter == "author" || filter == "all") {
        let idArr = arr ? Array.from(arr, (a) => a.id) : [],
            match = list.filter((a) => {
                if (idArr.includes(a.id)) return false;
                const nameObj = a.author.name,
                    name = `${nameObj.first} ${nameObj.last}`.toLowerCase();
                return name.includes(query);
            });
        arr = arr.concat(match);
    }
    return arr;
}

// EVENT LISTENERS
seeMoreBtn.addEventListener("click", () => {
    const n = document.getElementsByClassName("card").length,
        arr = articles.list.slice(n, n + 10);
    displayCards(arr);
});
filterChoices.forEach((c) => {
    c.addEventListener("click", setFilterAndSearch);
});
searchBar.addEventListener("input", toggleFilter);
searchForm.addEventListener("submit", searchQuery);