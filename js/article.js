// create an input for comment and ux for reply
// create comment and reply
// code an appropriate regex in function 'commentOnArticle'
// generate random comments when comment section opens

// form validation and clear the form store the data to sessions torage
// google authentication login, facebook login, linked login and others
// use different social media apis to generate sharing links
// when the window closes change the stats of the article in the 'allArticles' array in localstorage
// if there is no obj in session storege display an error message
// add open graph tags

// populate the article and set sharing links
/*(function () {
	// article data
	const j = sessionStorage.getItem("article");
	if (!j) {
		// error message on the screen
		// return;
	}

	// data to fill the article with different elements used
	const data = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Videsne ut, quibus summa est in voluptate, perspicuum sit quid iis faciendum sit aut non faciendum? Ita relinquet duas, de quibus etiam atque etiam consideret. <mark>Mihi, inquam, qui te id ipsum rogavi?</mark> Sed plane dicit quod intellegit. Duo Reges: constructio interrete. Traditur, inquit, ab Epicuro ratio neglegendi doloris. <i>Igitur neque stultorum quisquam beatus neque sapientium non beatus.</i> Minime vero istorum quidem, inquit. Illi enim inter se dissentiunt. Ut pompa, ludis atque eius modi spectaculis teneantur ob eamque rem vel famem et sitim perferant? Vos autem cum perspicuis dubia debeatis illustrare, dubiis perspicua conamini tollere. Atque ut ceteri dicere existimantur melius quam facere, sic hi mihi videntur facere melius quam dicere. </p>

	<ul>
		<li>Omnes enim iucundum motum, quo sensus hilaretur.</li>
		<li>Videamus igitur sententias eorum, tum ad verba redeamus.</li>
	</ul>

	<p>Illorum vero ista ipsa quam exilia de virtutis vi! Quam tantam volunt esse, ut beatum per se efficere possit. Idque testamento cavebit is, qui nobis quasi oraculum ediderit nihil post mortem ad nos pertinere? Rem unam praeclarissimam omnium maximeque laudandam, penitus viderent, quonam gaudio complerentur, cum tantopere eius adumbrata opinione laetentur? <i>Et ille ridens: Video, inquit, quid agas;</i> Nec enim figura corporis nec ratio excellens ingenii humani significat ad unam hanc rem natum hominem, ut frueretur voluptatibus. Atque ab isto capite fluere necesse est omnem rationem bonorum et malorum. Et tamen ego a philosopho, si afferat eloquentiam, non asperner, si non habeat, non admodum flagitem. Laelius clamores sofòw ille so lebat Edere compellans gumias ex ordine nostros. </p>

	<blockquote cite='http://loripsum.net'>
		Nam et amici cultus et parentis ei, qui officio fungitur, in eo ipso prodest, quod ita fungi officio in recte factis est, quae sunt orta virtutibus.
	</blockquote>

	<dl>
		<dt><dfn>Ita credo.</dfn></dt>
		<dd>Ac tamen, ne cui loco non videatur esse responsum, pauca etiam nunc dicam ad reliquam orationem tuam.</dd>
		<dt><dfn>Non igitur bene.</dfn></dt>
		<dd>Haec quo modo conveniant, non sane intellego.</dd>
		<dt><dfn>An eiusdem modi?</dfn></dt>
		<dd>Sed quod proximum fuit non vidit.</dd>
		<dt><dfn>Stoici scilicet.</dfn></dt>
		<dd>Verum esto: verbum ipsum voluptatis non habet dignitatem, nec nos fortasse intellegimus.</dd>
	</dl>

	<p>Et quod est munus, quod opus sapientiae? Curium putes loqui, interdum ita laudat, ut quid praeterea sit bonum neget se posse ne suspicari quidem. Non igitur potestis voluptate omnia dirigentes aut tueri aut retinere virtutem. Quibus rebus vita consentiens virtutibusque respondens recta et honesta et constans et naturae congruens existimari potest. <a href='http://loripsum.net/' target='_blank'>Itaque hic ipse iam pridem est reiectus;</a> <b>Ego vero volo in virtute vim esse quam maximam;</b> </p>

	<ol>
		<li>Quod si ita se habeat, non possit beatam praestare vitam sapientia.</li>
		<li>Semovenda est igitur voluptas, non solum ut recta sequamini, sed etiam ut loqui deceat frugaliter.</li>
		<li>Ut placet, inquit, etsi enim illud erat aptius, aequum cuique concedere.</li>
	</ol>`;

	// DOM elements and other imp data
	const article = JSON.parse(j),
		authorName = `${article.author.name.first} ${article.author.name.last}`,
		date = document.getElementById("date"),
		title = document.getElementById("title"),
		image = document.getElementById("author-image"),
		name = document.getElementById("author-name"),
		body = document.getElementById("body");

	date.innerText = article.date;
	title.innerText = article.title;
	image.src = article.author.picture.thumbnail;
	image.alt = authorName;
	name.innerText = authorName;
	body.innerHTML += data;

	// setting sharing links
	const options = document.getElementById("share-options"),
		fb = options.querySelector("#share-to-facebook"),
		lin = options.querySelector("#share-to-linkedIn"),
		tweet = options.querySelector("#share-to-twitter");
	fb.href =
		"https://www.facebook.com/sharer/sharer.php?u=" +
		encodeURI(window.location);
})();
*/

// DOM elements
const reactions = document.getElementById("reactions"),
    likeBtn = reactions.querySelector("#like-btn"),
    commentSectionBtn = reactions.querySelector("#comment-btn"),
    shareBtn = reactions.querySelector("#share-btn"),
    reportBtn = reactions.querySelector("#report-btn");

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
        sec = document.getElementById("comments-section"),
        commentForm = sec.querySelector("#comment-form"),
        replyBtns = sec.querySelectorAll(".reply-btn");

    // stats
    let secIsOpen = elem.classList.toggle("clicked");

    // display the comment section
    ["none", "show-comment-section"].forEach(c => sec.classList.toggle(c));

    if (secIsOpen) {
        commentForm.addEventListener("submit", commentOnArticle);
        replyBtns.forEach(b => b.addEventListener("click", generateReplyUI));
    } else {
        commentForm.removeEventListener("submit", commentOnArticle);
        replyBtns.forEach(b => b.removeEventListener("click", generateReplyUI))
    }
}

// comments on the article
function commentOnArticle(e) {
    // code an appropriate regex
    e.preventDefault();
    const input = e.target.querySelector("textarea"),
        comment = input.value.trim().replaceAll(/\s+[^\n]/g, ' ');
    input.value = '';
    console.log(comment);

    // create comment
}

// replies on a comment
function replyOnComment(e) {
    e.preventDefault();
    // get input
    // remove the input ui and show reply-btn
    // remove the event listener
    console.log("replied");
}

// makes the comment UI when a reply btn is clicked
function generateReplyUI() {
    // DOM
    const replyBtn = this,
        parent = this.parentElement,
        idForTextarea = `${parent.id}-input`,
        template = document.getElementsByTagName("template")[0],
        clone = template.content.querySelector("form").cloneNode(true);

    // specify ids for labels and event listener
    clone.querySelector("textarea").id = idForTextarea;
    clone.querySelector("label").for = idForTextarea;
    clone.addEventListener("submit", replyOnComment);
    replyBtn.classList.add("none");
    parent.appendChild(clone);
}

// shows sharing options
function toggleSharingOptions() {
    const options = document.getElementById("share-options");
    options.classList.toggle("none");
}

// opens the report dialog
function openReportDialog() {
    const dialog = document.getElementById("report-dialog"),
        closeBtn = dialog.querySelector("#close-dialog-btn"),
        submitBtn = dialog.querySelector("#submit-report-form-btn");

    dialog.classList.remove("none");

    // event listeners
    closeBtn.addEventListener("click", closeReportDialog);
    submitBtn.addEventListener("click", submitAndClose);

    function closeReportDialog() {
        dialog.classList.add("none");
        closeBtn.removeEventListener("click", closeReportDialog);
        submitBtn.removeEventListener("click", submitAndClose);
    }

    function submitAndClose(e) {
        e.preventDefault();
        // something to verify the input
        // post this data to some backend
        // clears the input

        closeReportDialog();
    }
}

// EVENT listeners
likeBtn.addEventListener("click", toggleLike);
commentSectionBtn.addEventListener("click", toggleCommentSection);
shareBtn.addEventListener("click", toggleSharingOptions);
reportBtn.addEventListener("click", openReportDialog);