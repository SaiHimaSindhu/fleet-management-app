// global array
let fleets = [];
const imgSrc = "https://via.placeholder.com/300x120?text=Vehicle"; // sample vehicle img

// DOM refs
const regNoInp = document.getElementById("regNo");
const categoryInp = document.getElementById("category");
const driverInp = document.getElementById("driver");
const availInp = document.getElementById("isAvailable");
const addBtn = document.getElementById("addFleet");
const cardsDiv = document.getElementById("cards");

const catFilter = document.getElementById("categoryFilter");
const avlFilter = document.getElementById("availabilityFilter");
const clearBtn = document.getElementById("clearFilter");

// add fleet
if (addBtn) {
  addBtn.addEventListener("click", function () {
    const reg = regNoInp.value.trim();
    const cat = categoryInp.value;
    const drv = driverInp.value.trim();
    const avl = availInp.value;

    if (!reg || !cat || !drv) {
      alert("All fields are required");
      return;
    }

    const obj = { id: Date.now(), reg, cat, drv, avl };
    fleets.push(obj);
    clearForm();
    renderCards(fleets);
  });
}

// filters
if (catFilter) {
  catFilter.addEventListener("change", applyFilters);
  avlFilter.addEventListener("change", applyFilters);
  clearBtn.addEventListener("click", function () {
    catFilter.value = "All";
    avlFilter.value = "All";
    renderCards(fleets);
  });
}

function applyFilters() {
  let data = [...fleets];
  const c = catFilter.value;
  const a = avlFilter.value;

  if (c !== "All") data = data.filter(el => el.cat === c);
  if (a !== "All") data = data.filter(el => el.avl === a);

  renderCards(data);
}

function clearForm() {
  regNoInp.value = "";
  categoryInp.value = "";
  driverInp.value = "";
  availInp.value = "Available";
}

// render
function renderCards(data) {
  cardsDiv.innerHTML = "";
  data.forEach(el => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${imgSrc}" alt="vehicle">
      <p>Reg No: ${el.reg}</p>
      <p>Category: ${el.cat}</p>
      <p>Driver: <span class="driver-name">${el.drv}</span></p>
      <p>Status: <span class="status">${el.avl}</span></p>
      <button class="update">Update Driver</button>
      <button class="toggle">Change Availability</button>
      <button class="delete">Delete Vehicle</button>
    `;

    // buttons
    card.querySelector(".update").addEventListener("click", function () {
      const newName = prompt("Enter new driver name");
      if (!newName || newName.trim() === "") {
        alert("Driver name cannot be empty");
        return;
      }
      el.drv = newName.trim();
      applyFilters();
    });

    card.querySelector(".toggle").addEventListener("click", function () {
      el.avl = el.avl === "Available" ? "Unavailable" : "Available";
      applyFilters();
    });

    card.querySelector(".delete").addEventListener("click", function () {
      const ok = confirm("Delete this vehicle?");
      if (!ok) return;
      fleets = fleets.filter(item => item.id !== el.id);
      applyFilters();
    });

    cardsDiv.appendChild(card);
  });
}
