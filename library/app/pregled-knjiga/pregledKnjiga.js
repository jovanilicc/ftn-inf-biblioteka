"use strict";

class Knjiga {
  constructor(id, naziv, datum, url, opis, popularnost) {
    this.id = id;
    this.naziv = naziv;
    this.datum = datum;
    this.url = url;
    this.opis = opis;
    this.popularnost = popularnost;
  }
}
let knjige = [];
const getData = () => {
  knjige = JSON.parse(localStorage.getItem("knjige"));

  if (!knjige) {
    knjige = [
      new Knjiga(
        1,
        "Most na Žepi",
        "1925-01-01",
        "https://example.com/most-na-zepi.jpg",
        "Pripovetka Ive Andrića o gradnji mosta na reci Žepi i njegovom značaju.",
        85,
      ),
      new Knjiga(
        2,
        "Proces",
        "1925-01-01",
        "https://example.com/proces.jpg",
        "Roman Franca Kafke o Jozefu K. koji se suočava sa neobjašnjivim sudskim procesom.",
        92,
      ),
      new Knjiga(
        3,
        "1964",
        "1964-01-01",
        "https://example.com/1964.jpg",
        "Distopijski roman Džordža Orvela o totalitarnom društvu i nadzoru pojedinca.",
        98,
      ),
    ];

    return knjige;
  } else {
    knjige.map(
      (knjiga) =>
        new Knjiga(
          knjiga.id,
          knjiga.naziv,
          knjiga.datum,
          knjiga.url,
          knjiga.opis,
          knjiga.popularnost,
        ),
    );
  }

  return knjige;
};
const saveToStorage = (knjige) => {
  localStorage.setItem("knjige", JSON.stringify(knjige));
};
const obrisiKnjigu = (tr, naziv) => {
  let tableData = document.querySelector(".table-data");
  knjige = getData();
  tableData.removeChild(tr);
  let preostaleKnjige = knjige.filter((knjiga) => {
    return knjiga.naziv !== naziv;
  });

  saveToStorage(preostaleKnjige);
};
const drawTable = (knjige) => {
  let tableData = document.querySelector(".table-data");
  tableData.innerHTML = "";
  for (let i = 0; i < knjige.length; i++) {
    let tr = document.createElement("tr");
    let br = document.createElement("td");
    let naziv = document.createElement("td");
    br.textContent = i + 1;
    naziv.textContent = knjige[i].naziv;

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Obrisi";
    removeBtn.classList.add("deleteBtn");
    removeBtn.addEventListener("click", () => {
      obrisiKnjigu(tr, naziv.textContent);
    });

    tr.appendChild(br);
    tr.appendChild(naziv);
    tr.appendChild(removeBtn);
    tableData.appendChild(tr);
  }
};
const izracunajId = (knjige) => {
  let id = 0;
  for (let i = 0; i < knjige.length; i++) {
    if (id < knjige[i].id) {
      id = knjige[i].id;
    }
  }
  return id + 1;
};
const dodajKnjigu = (knjige) => {
  let dodajBtn = document.querySelector(".submitBtn");
  knjige = getData();
  dodajBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let form = document.querySelector("form");
    let data = new FormData(form);
    let naziv = data.get("naziv");
    let id = izracunajId(knjige);
    // let tip = data.get("tip");
    // let slika = data.get("slika");
    let url = "urlPlaceholder";
    let opis = "opisPlaceholder";
    let popularnost = 5;
    let knjiga = new Knjiga(id, naziv, Date.now(), url, opis, popularnost);
    knjige.push(knjiga);
    saveToStorage(knjige);
    createRows(knjige);
    form.reset();
  });
};
const createRows = (knjige) => {
  drawTable(knjige);
};

const initializeData = () => {
  knjige = getData();
  saveToStorage(knjige);
  createRows(knjige);
  dodajKnjigu(knjige);
};
initializeData();
