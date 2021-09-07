import { Article, createArticleList } from "./articles.js";
const seeMoreBtn = document.getElementById("see-more");

// an array which will contain all the articles and random users respectively.
let articles = createArticleList([]);

// fetches fake articles from JSONPLACEHOLDER, adds info and then adds them to 'articleList'
// and renders 10 articles to the DOM
(async function () {
  // gets the articles as 'list' with body and title only
  let r1 = await fetch("https://jsonplaceholder.typicode.com/posts"),
    list = await r1.json();

  // gets 10 different identities to be used as 'authors'
  let r2 = await fetch(
      "https://randomuser.me/api/?results=10&inc=name,dob,picture&noinfo"
    ),
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

  // renders articles in HTML
  // '0' is passed as no artcle is present
  displayCards(0);

  function getRandomDate() {
    // day
    let min = 1,
      max = 30,
      day = Math.floor(Math.random() * (max - min + 1) + min);

    // month
    max = 12;
    let month = Math.floor(Math.random() * (max - min + 1) + min);

    // year
    min = 10;
    max = 21;
    let year = Math.floor(Math.random() * (max - min + 1) + min);

    // check for two digits
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    return `${day}/${month}/${year}`;
  }

  function getRandomAuthor(arr) {
    // max = arr.length, min = 0
    const i = Math.floor(Math.random() * (arr.length - 0 + 1) + 0),
      r = arr[i];
    return r ? r : getRandomAuthor(arr);
  }
})();

// renders 10 article cards at a time
function displayCards(n) {
  const tempCon = document.getElementsByTagName("template")[0].content,
    container = document.querySelector("#article-cards"),
    arr = articles.list.slice(n, n + 10);
  arr.forEach((a) => {
    let clone = tempCon.cloneNode(true).querySelector("article"),
      nameObj = a.author.name,
      name = `${nameObj.first} ${nameObj.last}`;
    clone.querySelector("a").textContent = a.title;
    clone.querySelector("p").textContent = a.body;
    clone.querySelector("span").textContent = name;
    clone.querySelector(".card-date").textContent = a.date;
    let img = clone.querySelector("img");
    img.src = a.author.picture.thumbnail;
    img.alt = name;
    container.appendChild(clone);
  });
}

["click", "touchstart"].forEach((e) => {
  seeMoreBtn.addEventListener(e, () => {
    const n = document.getElementsByClassName("card").length;
    displayCards(n);
  });
});
