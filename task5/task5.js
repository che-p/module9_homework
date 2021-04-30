let inpPage = document.getElementById("numpage");
let inpLimit = document.getElementById("limit");
let inpBut = document.querySelector(".button");
let images = document.querySelector(".images");
let mes1, mes2, mes3, goRequest;

function pageLoaded() {
  outFields();

  inpPage.addEventListener("blur", showMes);
  inpLimit.addEventListener("blur", showMes);
  inpBut.addEventListener("click", sendRequest);

  let saved = localStorage.getItem("saved");
  inpPage.value = localStorage.getItem("inpPage");
  inpLimit.value = localStorage.getItem("inpLimit");

  if (saved) {
    dispImg(JSON.parse(saved));
  }
}

function showMes() {
  mes1.innerHTML = "";
  mes2.innerHTML = "";
  mes3.innerHTML = "";
  goRequest = true;
  if (inpPage.value < 1 || inpPage.value > 10) {
    mes1.innerHTML = "Номер страницы вне диапазона от 1 до 10";
    goRequest = false;
  }
  if (inpLimit.value < 1 || inpLimit.value > 10) {
    mes2.innerHTML = "Лимит вне диапазона от 1 до 10";
    goRequest = false;
  }
  if (
    (inpLimit.value < 1 || inpLimit.value > 10) &&
    (inpPage.value < 1 || inpPage.value > 10)
  ) {
    mes3.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
  }
}

function getFetch() {
  fetch(
    `https://picsum.photos/v2/list?page=${inpPage.value}&limit=${inpLimit.value}`
  )
    .then((response) => {
      const result = response.json();
      return result;
    })
    .then((result) => {
      localStorage.setItem("saved", JSON.stringify(result));
      localStorage.setItem("inpPage", inpPage.value);
      localStorage.setItem("inpLimit", inpLimit.value);
      dispImg(result);
    })
    .catch(() => {
      images.innerHTML = `<div>Ошибка запроса</div>`;
      images.style.color = "red";
    });
}

function sendRequest(event) {
  event.preventDefault();
  if (goRequest) {
    localStorage.clear();
    getFetch();
  }
}

function dispImg(data) {
  if (data) {
    let outImage = "";
    data.forEach((element) => {
      outImage += `<img class="image" width="700px" height="auto" style="margin-bottom: 10px" src="${element.download_url}">`;
    });
    images.innerHTML = outImage;
  }
}

function outFields() {
  mes1 = document.createElement("div");
  inpPage.after(mes1);
  mes1.classList.add("red");

  mes2 = document.createElement("div");
  inpLimit.after(mes2);
  mes2.classList.add("red");

  mes3 = document.createElement("div");
  inpBut.after(mes3);
  mes3.classList.add("red");
}

document.addEventListener("DOMContentLoaded", pageLoaded);
