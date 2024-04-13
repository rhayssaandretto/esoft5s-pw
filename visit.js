function getAccess() {
  if (!localStorage.getItem("access")) {
    let access = {
      quantity: 1,
      lastvisit: getDate(),
    };

    localStorage.setItem("access", JSON.stringify(access));
  } else {
    let access = JSON.parse(localStorage.getItem("access"));
    access.quantity += 1;
    access.lastvisit = getDate();
    localStorage.setItem("access", JSON.stringify(access));
  }
}

function getDate() {
  date = new Date();

  const newDate = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);

  return newDate;
}

function updateFooter() {
  let access = JSON.parse(localStorage.getItem("access"));

  const p = document.createElement("p");
  p.textContent = `Esta página foi visitada ${access.quantity} vezes. A última visita foi: ${access.lastvisit}`;

  const section = document.querySelector("footer");

  section.appendChild(p);
}

document.addEventListener("DOMContentLoaded", function () {
  getAccess();
  updateFooter();
});
