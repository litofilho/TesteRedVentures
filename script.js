document.addEventListener("DOMContentLoaded", main());
var params = {};

function main() {
  console.log("carregou");
  document.getElementsByTagName("select");

  document
    .getElementsByTagName("select")
    ["pet"].addEventListener("change", () =>
      filter(document.getElementsByTagName("select")["pet"].value, "pet")
    );
  document
    .getElementsByTagName("select")
    ["sun"].addEventListener("change", () =>
      filter(document.getElementsByTagName("select")["sun"].value, "sun")
    );
  document
    .getElementsByTagName("select")
    ["water"].addEventListener("change", () =>
      filter(document.getElementsByTagName("select")["water"].value, "water")
    );
}

function getItems(param, value) {
  var url = `https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${
    params.sun || "no"
  }&water=${params.water || "rarely"}&pets=${params.pet || false}`;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

function filter(value, param) {
  if (value) {
    params[param] = value;
    var results = getItems(value, param);
    var items = JSON.parse(results);
    document.getElementsByClassName("items")[0].innerHTML = "";
    items.sort((a, b) => (a["staff_favorite"] ? 1 : 0));
    if (items.length > 0) {
      document.getElementsByClassName("noResults")[0].classList.add("hide");
      items.map((r) => mountItems(r));
      document.getElementsByClassName("plants")[0].classList.remove("hide");
    } else {
      document.getElementsByClassName("noResults")[0].classList.remove("hide");
      document.getElementsByClassName("plants")[0].classList.add("hide");
    }
  }
}

function mountItems(item) {
  let htmlObj = document.createElement("div");
  htmlObj.className = `item ${item["staff_favorite"] ? "favorite" : ""}`;
  const htmlItem =
    `<div class="staff">✨ Staff favorite</div>` +
    `<img src="${item["url"]}"/>` +
    `<div class="info">` +
    `<h4>${item["name"]}</h4>` +
    `<span class="price">${item["price"]}</span>` +
    `<div class="conditions">` +
    `${item["toxicity"] ? `<img src="images/icons/pet.svg" />` : ""}` +
    `<img src="images/icons/${item["sun"]}-sun.svg" />` +
    `<img src="images/icons/${setDrops(item["water"])}.svg" />` +
    `</div>` +
    "</div>";

  htmlObj.innerHTML = htmlItem;
  document.getElementsByClassName("items")[0].appendChild(htmlObj);
}

function setDrops(param) {
  switch (param) {
    case "daily":
      return "3-drops";
    case "regularly":
      return "2-drops";
    case "rarely":
      return "1-drop";
  }
}
