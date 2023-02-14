// var deferredPrompt;

if (!window.Promise) {
  window.Promise = Promise;
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then(function () {
      console.log("Service worker registered!");
    })
    .catch(function (err) {
      console.log(err);
    });
}

// window.addEventListener("beforeinstallprompt", function (event) {
//   console.log("beforeinstallprompt fired");
//   event.preventDefault();
//   deferredPrompt = event;
//   return false;
// });

let deferredPrompt;
const installBtn = document.querySelector(".installBtn");
installBtn.style.display = "none";

window.addEventListener("beforeinstallprompt", e => {
  // console.log("beforeinstallprompt fired");
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "block";

  installBtn.addEventListener("click", e => {
    installBtn.style.display = "none";
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  });
});
