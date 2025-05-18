function startApp() {
  document.querySelector(".play-btn").style.display = "none";

  const mainMenu = document.getElementById("main-menu");
  mainMenu.classList.remove("d-none");
}

function showPopupMateri() {
  document.getElementById("popup-materi").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup-materi").classList.add("hidden");
}

function showPenjelasan() {
  document.getElementById("popup-penjelasan").classList.remove("hidden");
}

function closePenjelasan() {
  document.getElementById("popup-penjelasan").classList.add("hidden");
}

function showPopupMulai() {
  document.getElementById("popup-penjelasan").classList.add("hidden");
  document.getElementById("popup-mulai").classList.remove("hidden");
}

function closeMulai() {
  document.getElementById("popup-mulai").classList.add("hidden");
}

function jawabMateri(tahu) {
  if (tahu) {
    alert("Keren! Yuk lanjut ke materi.");
    window.location.href = "materi.html";
  } else {
    closePopup(); 
    showPenjelasan(); 
  }
}
