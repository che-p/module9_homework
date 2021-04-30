const buts = document.querySelector(".button");
const out = document.querySelector(".out");

buts.addEventListener("click", (e) => {
  e.preventDefault();
  let valW = document.querySelector("#inpW").value;
  let valH = document.querySelector("#inpH").value;

  if (
    Number(valW) &&
    Number(valH) &&
    valW >= 100 &&
    valH >= 100 &&
    valW <= 300 &&
    valH <= 300
  ) {
    getFetch(valW, valH);
  } else {
    out.innerHTML = `<div>одно из чисел вне диапазона от 100 до 300</div>`;
    out.style.color = "red";
  }
});

function getFetch(width, height) {
  fetch(`https://picsum.photos/${width}/${height}`)
    .then((response) => {
      out.innerHTML = `<img class="image" src="${response.url}">`;
    })
    .catch(() => {
      out.innerHTML = `<div>Ошибка запроса</div>`;
      out.style.color = "red";
    });
}
