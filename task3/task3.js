const buts = document.querySelector(".button");
const out = document.querySelector(".out");

buts.addEventListener("click", (e) => {
  e.preventDefault();
  let value = document.querySelector(".input").value;

  if (Number(value) && Number(value) >= 1 && Number(value) <= 10) {
    getXHR(Number(value));
  } else {
    out.innerHTML = `<div>число вне диапазона от 1 до 10</div>`;
  }
});

function showImg(response) {
  outTemp = "";
  response.forEach((elem) => {
    outTemp += `<div class="image"><img src="${elem.download_url}"></div>`;
  });
  out.innerHTML = outTemp;
}

function getXHR(value) {
  let xhr = new XMLHttpRequest();
  xhr.open("get", "https://picsum.photos/v2/list?limit=" + value, true);

  xhr.onload = function () {
    showImg(JSON.parse(xhr.response));
  };

  xhr.onerror = function () {
    out.innerHTML = `<div>Ошибка запроса</div>`;
  };

  xhr.send();
}
