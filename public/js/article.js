// populate the article, set sharing links, set ogp
(function() {
    // article data
    const j = sessionStorage.getItem("article");
    if (!j) {
        alert("Oops! Sorry to distrub,\nbut you might head to the home page and try again.\nDon't worry I will do that for you");
        location = location.origin + "/public/index.html";
        return;
    }

    // data to fill the article with different elements used
    const data = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Videsne ut, quibus summa est in voluptate, perspicuum sit quid iis faciendum sit aut non faciendum? Ita relinquet duas, de quibus etiam atque etiam consideret. <mark>Mihi, inquam, qui te id ipsum rogavi?</mark> Sed plane dicit quod intellegit. Duo Reges: constructio interrete. Traditur, inquit, ab Epicuro ratio neglegendi doloris. <i>Igitur neque stultorum quisquam beatus neque sapientium non beatus.</i> Minime vero istorum quidem, inquit. Illi enim inter se dissentiunt. Ut pompa, ludis atque eius modi spectaculis teneantur ob eamque rem vel famem et sitim perferant? Vos autem cum perspicuis dubia debeatis illustrare, dubiis perspicua conamini tollere. Atque ut ceteri dicere existimantur melius quam facere, sic hi mihi videntur facere melius quam dicere.</p><ul><li>Omnes enim iucundum motum, quo sensus hilaretur.</li><li>Videamus igitur sententias eorum, tum ad verba redeamus.</li></ul><p>Illorum vero ista ipsa quam exilia de virtutis vi! Quam tantam volunt esse, ut beatum per se efficere possit. Idque testamento cavebit is, qui nobis quasi oraculum ediderit nihil post mortem ad nos pertinere? Rem unam praeclarissimam omnium maximeque laudandam, penitus viderent, quonam gaudio complerentur, cum tantopere eius adumbrata opinione laetentur? <i>Et ille ridens: Video, inquit, quid agas;</i> Nec enim figura corporis nec ratio excellens ingenii humani significat ad unam hanc rem natum hominem, ut frueretur voluptatibus. Atque ab isto capite fluere necesse est omnem rationem bonorum et malorum. Et tamen ego a philosopho, si afferat eloquentiam, non asperner, si non habeat, non admodum flagitem. Laelius clamores sofòw ille so lebat Edere compellans gumias ex ordine nostros.</p><blockquote cite='http://loripsum.net'>Nam et amici cultus et parentis ei, qui officio fungitur, in eo ipso prodest, quod ita fungi officio in recte factis est, quae sunt orta virtutibus.</blockquote><dl><dt><dfn>Ita credo.</dfn></dt><dd>Ac tamen, ne cui loco non videatur esse responsum, pauca etiam nunc dicam ad reliquam orationem tuam.</dd><dt><dfn>Non igitur bene.</dfn></dt><dd>Haec quo modo conveniant, non sane intellego.</dd><dt><dfn>An eiusdem modi?</dfn></dt><dd>Sed quod proximum fuit non vidit.</dd><dt><dfn>Stoici scilicet.</dfn></dt><dd>Verum esto: verbum ipsum voluptatis non habet dignitatem, nec nos fortasse intellegimus.</dd></dl><p>Et quod est munus, quod opus sapientiae? Curium putes loqui, interdum ita laudat, ut quid praeterea sit bonum neget se posse ne suspicari quidem. Non igitur potestis voluptate omnia dirigentes aut tueri aut retinere virtutem. Quibus rebus vita consentiens virtutibusque respondens recta et honesta et constans et naturae congruens existimari potest. <a href='http://loripsum.net/' target='_blank'>Itaque hic ipse iam pridem est reiectus;</a> <b>Ego vero volo in virtute vim esse quam maximam;</b> </p><ol><li>Quod si ita se habeat, non possit beatam praestare vitam sapientia.</li><li>Semovenda est igitur voluptas, non solum ut recta sequamini, sed etiam ut loqui deceat frugaliter.</li><li>Ut placet, inquit, etsi enim illud erat aptius, aequum cuique concedere.</li></ol>";

    // DOM elements and other imp data
    const article = JSON.parse(j),
        date = document.getElementById("date"),
        title = document.getElementById("title"),
        image = document.getElementById("author-image"),
        name = document.getElementById("author-name"),
        body = document.getElementById("body");

    date.innerText = article.date;
    title.innerText = article.title;
    image.src = article.author.picture.thumbnail;
    image.alt = "";
    name.innerText = `${article.author.name.first} ${article.author.name.last}`;
    body.innerHTML = `<p>${article.body}</p>` + data;

    removePreloader();

    // setting sharing links
    const options = document.getElementById("share-options"),
        fb = options.querySelector("#share-to-facebook"),
        wa = options.querySelector("#share-to-whatsapp"),
        tweet = options.querySelector("#share-to-twitter"),
        link = window.location;
    fb.href = encodeURI(`https://www.facebook.com/sharer/sharer.php?u=${link}`);
    wa.href = encodeURI(`https://api.whatsapp.com/send?text=${link}`);
    tweet.href = encodeURI(`https://twitter.com/intent/tweet?text=Hey! Check out this article here&url=${link}`);
})();

// DOM elements
const reactions = document.getElementById("reactions"),
    likeBtn = reactions.querySelector("#like-btn"),
    commentSectionBtn = reactions.querySelector("#comment-btn"),
    shareBtn = reactions.querySelector("#share-btn"),
    reportBtn = reactions.querySelector("#report-btn"),
    searchForm = document.getElementById("sna"),
    searchBar = searchForm.querySelector("input[type='text']");

// add or removes the article form liked articles
function toggleLike() {
    const elem = this;
    elem.classList.toggle("clicked");

    // toggling the liked state of the article
    let article = JSON.parse(sessionStorage.getItem("article"));
    if (article.like) article.like = false;
    else article.like = true;
    sessionStorage.setItem("article", JSON.stringify(article));
}

// toggles the display of comment section
function toggleCommentSection() {
    // DOM
    const elem = this,
        comSec = document.getElementById("comments-section"),
        commentForm = comSec.querySelector("#comment-form"),
        replyBtns = comSec.querySelectorAll(".reply-btn");

    // stats
    const secIsOpen = elem.classList.toggle("clicked");

    // display the comment section
    ["none", "show-comment-section"].forEach(c => comSec.classList.toggle(c));

    if (secIsOpen) {
        if (!replyBtns.length) {
            fetchCommentsAndDisplay();
        }
        setTimeout(() => commentForm.querySelector("textarea").focus(), 1000);
        commentForm.addEventListener("submit", commentOnArticle);
        replyBtns.forEach(b => b.addEventListener("click", generateReplyUI));
    } else {
        commentForm.removeEventListener("submit", commentOnArticle);
        replyBtns.forEach(b => b.removeEventListener("click", generateReplyUI))
    }

    async function fetchCommentsAndDisplay() {
        const id = JSON.parse(sessionStorage.getItem("article")).id,
            r = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`),
            d = await r.json();
        let article = JSON.parse(sessionStorage.getItem("article"));
        article.comments = {};
        d.forEach(o => {
            const comObj = {
                id: o.id,
                author: {
                    name: o.name,
                    image: "./images/writing.jpg"
                },
                body: o.body,
                timeStamp: getRandomDate()
            };
            const child = createComment(comObj);
            comSec.appendChild(child);
            article.comments[o.id] = comObj;
        });
        sessionStorage.setItem("article", JSON.stringify(article))
    }
}

// gets the input from some form, checks it with a regex
function getInput(form) {
    // code an appropriate regex
    const input = form.querySelector("textarea");
    let comment = input.value.trim();
    if (comment) {
        comment = input.value.trim().replace(/[^\S\n]/g, ' '); // thanks to stackoverflow for the regex
        input.value = '';
    }
    return comment;
}

function commentOnArticle(e) {
    e.preventDefault();
    const form = e.target;
    getInputAndDisplayComment(form, e.path[1].childElementCount++, form)
}

// returns a date string 'day/month/year'
function createDate(date) {
    const day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
    return `${day}/${month}/${year}`
}

// returns a DOM node
function createComment(comObj, replyTo) {
    const template = document.getElementsByTagName("template")[0],
        clone = template.content.querySelector(".comment").cloneNode(true),
        author = clone.querySelector(".comment-author"),
        image = author.querySelector("img"),
        name = clone.querySelector("span"),
        body = clone.querySelector(".comment-body"),
        time = clone.querySelector("time"),
        replyBtn = clone.querySelector("button");
    clone.id = `comment-${comObj.id}`;
    image.src = comObj.author.image;
    image.alt = comObj.author.name;
    name.innerText = comObj.author.name;
    body.innerText = replyTo ? `${replyTo}\n${comObj.body}` : comObj.body;
    time.innerText = comObj.timeStamp;
    replyBtn.addEventListener("click", generateReplyUI);
    return clone;
}

function getInputAndDisplayComment(form, comId, adjElem, replyTo) {
    const input = getInput(form);
    if (input) {
        const comObj = {
                timeStamp: createDate(new Date()),
                id: comId,
                author: {
                    name: 'anonymous',
                    image: "./images/writing.jpg"
                },
                body: input
            },
            comElem = createComment(comObj, replyTo);
        adjElem.insertAdjacentElement("afterend", comElem);
        let article = JSON.parse(sessionStorage.getItem("article"));
        article.comments[comId] = comObj;
        sessionStorage.setItem("article", JSON.stringify(article));
    }
}

// replies on a comment
function replyOnComment(e) {
    e.preventDefault();
    // DOM and stats
    const form = e.target,
        curCom = e.path[1],
        replyBtn = curCom.querySelector(".reply-btn"),
        replyTo = `@${curCom.querySelector(".comment-author-name").innerText}`;

    removeReplyUI(form, replyBtn);
    getInputAndDisplayComment(form, e.path[2].childElementCount++, curCom, replyTo)
}

function removeReplyUI(form, btn) {
    form.remove();
    btn.classList.remove("none");
}

// makes the comment UI when a reply btn is clicked
function generateReplyUI() {
    // DOM
    const replyBtn = this,
        parent = this.parentElement,
        template = document.getElementsByTagName("template")[0],
        clone = template.content.querySelector("form").cloneNode(true),
        textarea = clone.querySelector("textarea"),
        label = clone.querySelector("label"),
        cancelBtn = clone.querySelector(".cancel-reply-btn"),
        idForTextarea = `${parent.id}-input`;

    // specify ids for labels and event listener
    textarea.id = idForTextarea;
    label.for = idForTextarea;
    clone.addEventListener("submit", replyOnComment);
    cancelBtn.addEventListener("click", () => removeReplyUI(clone, replyBtn))
    replyBtn.classList.add("none");
    parent.appendChild(clone);
    textarea.focus();
}

// shows sharing options
function toggleSharingOptions(show) {
    const options = document.getElementById("share-options");
    if (show) {
        options.classList.toggle("none");
        console.log("clicked");
    } else setTimeout(() => options.classList.add("none"), 500); // above not good for acessibility 
}

function openReportDialog() {
    const dialog = document.getElementById("report-dialog"),
        form = dialog.querySelector("form"),
        closeBtn = form.querySelector("#close-dialog-btn");

    dialog.classList.remove("none");

    // event listeners
    closeBtn.addEventListener("click", closeReportDialog);
    form.addEventListener("submit", submitAndClose);

    function closeReportDialog() {
        dialog.classList.add("none");
        closeBtn.removeEventListener("click", closeReportDialog);
        form.removeEventListener("submit", submitAndClose);
    }

    function submitAndClose(e) {
        e.preventDefault();
        const form = e.target,
            title = form.querySelector("#report-form-title"),
            description = form.querySelector("#report-form-description"),
            titleText = title.value.trim(),
            descriptionText = description.value.trim();

        if (titleText && descriptionText) {

            // validate the data if required
            // the following obj will be posted to some backend
            /* report = {
                id : article's unique id,
                title : titleText,
                body : descriptionText,
                date : the date of complain
                user : the user who complained
            } */

            // clears the form inputs
            [title, description].forEach(i => i.value = '');

            closeReportDialog();
        }
    }
}

function searchQuery(e) {
    e.preventDefault();

    // On the very first search, put the article content in sessionstorage
    // assuming some text was highlighted on the last search
    if (!sessionStorage.getItem("content")) saveContentInSession();
    else removeSearchHighlight();

    // check for empty input
    const input = searchBar.value.trim();
    if (!input) return;

    // if not empty, search
    const query = input.replace(/\s+/g, " ").toLowerCase(),
        tree = document.createTreeWalker(document.getElementById("body"));
    tree.firstChild();

    // search the query individually in every NODE of "tree" treewalker
    do {
        checkForChildAndAct(tree.currentNode)
    } while (tree.nextSibling());

    // arg node can be elem or text
    function checkForChildAndAct(node) {
        // no textnode contain another node
        // elem node may contain child nodes 
        if (node.hasChildNodes()) node.childNodes.forEach(checkForChildAndAct);
        else if (node.nodeType === 3) searchAndHighlight(node);
    }

    // search the query in the textnode
    // if present, highlight
    function searchAndHighlight(textnode) {
        const content = textnode.textContent,
            position = content.toLowerCase().indexOf(query);
        if (position !== -1) {
            const queryLength = query.length;
            textnode.splitText(position);
            textnode = textnode.nextSibling;
            textnode.splitText(queryLength);
            const mark = document.createElement("mark");
            mark.innerText = content.substring(position, position + queryLength);
            mark.className = "mark";
            textnode.replaceWith(mark);
            searchAndHighlight(mark.nextSibling);
        }
    }
}

function saveContentInSession() {
    const content = document.getElementById("body").innerHTML;
    sessionStorage.setItem("content", JSON.stringify(content))
}

function removeSearchHighlight() {
    // marked are highlighted textnodes by using mark tags
    const marked = document.getElementsByClassName("mark").length;
    if (marked) {
        // instead of removing the mark tags, replace the HTML with the original content
        const content = JSON.parse(sessionStorage.getItem("content"));
        document.getElementById("body").innerHTML = content
    }
}

function reactToInput() {
    const input = this.value.trim();
    if (!input && marked) removeSearchHighlight();
}

// EVENT listeners
likeBtn.addEventListener("click", toggleLike);
commentSectionBtn.addEventListener("click", toggleCommentSection);
shareBtn.addEventListener("click", () => toggleSharingOptions(true));
shareBtn.addEventListener("blur", () => toggleSharingOptions(false));
reportBtn.addEventListener("click", openReportDialog);
searchBar.addEventListener("blur", reactToInput);
searchForm.addEventListener("submit", searchQuery);