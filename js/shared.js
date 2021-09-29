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

// EVENT listeners
["click", "touchstart"].forEach((e) => {
  accBtn.addEventListener(e, showAccount);
});
accBtn.addEventListener("keypress", (e) => {
  if (e.key === "Enter") showAccount;
});
