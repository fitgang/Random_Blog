// DOM elements
const accBtn = document.getElementsByClassName("account-btn")[0];

// displays the account modal
function showAccount() {
    const acc = document.querySelector(".account");
    acc.classList.remove("none");
    const close = acc.querySelector("#close-account-btn");
    close.addEventListener("click", hideAccount);

    // hides the account modal
    function hideAccount() {
        this.parentElement.classList.add("none");
        this.removeEventListener("click", hideAccount);
    }
}

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
    let year = 2000 + Math.floor(Math.random() * (max - min + 1) + min);

    // check for two digits
    return `${day}/${month}/${year}`;
}

// EVENT listeners
["click", "touchstart"].forEach((e) => {
    accBtn.addEventListener(e, showAccount);
});
accBtn.addEventListener("keypress", (e) => {
    if (e.key === "Enter") showAccount;
});