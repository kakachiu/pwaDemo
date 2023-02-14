var shareImageButton = document.querySelector("#share-image-button");
var createPostArea = document.querySelector("#create-post");
var closeCreatePostModalButton = document.querySelector(
  "#close-create-post-modal-btn"
);
var sharedMomentsArea = document.querySelector("#shared-moments");

function openCreatePostModal() {
  createPostArea.style.display = "block";
  // if (deferredPrompt) {
  //   deferredPrompt.prompt();

  //   deferredPrompt.userChoice.then(function (choiceResult) {
  //     console.log(choiceResult.outcome);

  //     if (choiceResult.outcome === "dismissed") {
  //       console.log("User cancelled installation");
  //     } else {
  //       console.log("User added to home screen");
  //     }
  //   });

  //   deferredPrompt = null;
  // }
}

function closeCreatePostModal() {
  createPostArea.style.display = "none";
}

shareImageButton.addEventListener("click", openCreatePostModal);

closeCreatePostModalButton.addEventListener("click", closeCreatePostModal);

function createCard() {
  var cardWrapper = document.createElement("div");
  cardWrapper.className = "shared-moment-card mdl-card mdl-shadow--2dp";
  var cardTitle = document.createElement("div");
  cardTitle.className = "mdl-card__title";
  cardTitle.style.backgroundImage = 'url("src/images/sf-boat.jpg")';
  cardTitle.style.backgroundSize = "cover";
  cardTitle.style.height = "180px";
  cardWrapper.appendChild(cardTitle);
  var cardTitleTextElement = document.createElement("h2");
  cardTitleTextElement.className = "mdl-card__title-text";
  cardTitleTextElement.textContent = "San Francisco Trip";
  cardTitle.appendChild(cardTitleTextElement);
  var cardSupportingText = document.createElement("div");
  cardSupportingText.className = "mdl-card__supporting-text";
  cardSupportingText.textContent = "In San Francisco";
  cardSupportingText.style.textAlign = "center";
  cardWrapper.appendChild(cardSupportingText);
  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);
}

fetch("https://httpbin.org/get")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    createCard();
  });

// 定位
var locationBtn = document.querySelector("#location-btn"); // 上班的按鈕
var locationLoader = document.querySelector("#location-loader"); // loader
locationBtn.addEventListener("click", function () {
  if (!("geolocation" in navigator)) {
    return;
  }

  navigator.geolocation.getCurrentPosition(success, error);
});

function initGeolocation() {
  if (!("geolocation" in navigator)) {
    locationBtn.style.display = "none"; // 如果不支援定位就將按鈕隱藏
  }
}

function success(data) {
  locationBtn.style.display = "none";
  locationLoader.style.display = "block";
  console.log(data);
  console.log("目前位置經度", data.coords.longitude);
  console.log("目前位置緯度", data.coords.latitude);

  let timestampDate = data.timestamp;
  let dateTime = new Date(timestampDate);
  const newDate = `${dateTime.getFullYear()}/${
    dateTime.getMonth() + 1 < 10 ? "0" : ""
  }${dateTime.getMonth() + 1}/${
    dateTime.getDate() < 10 ? "0" : ""
  }${dateTime.getDate()}`;
  console.log("今天日期", newDate);
  // 取得經緯度後打 API，API 打成功後會回傳資料(含經緯度)，判斷如果有經緯度就為已定位
}

function error(err) {
  console.log(err);
}
