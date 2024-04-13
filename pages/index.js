let sprites = [];
let current = 0;

function changePageTitle(title) {
  document.title = title;
}

function generateInfoSection(src, pokemonName) {
  const h2 = document.createElement("h2");
  h2.id = "info-pokemon-label";
  h2.textContent = `Informações sobre ${pokemonName}`;

  const img = document.querySelector("img");
  img.src = src;
  img.alt = `Imagem do pokemon ${pokemonName}`;

  const section = document.querySelector("#info-pokemon");

  section.appendChild(h2);
  section.appendChild(img);
}

function generateCounter() {
  const img = document.querySelector("img");

  img.addEventListener("click", () => {
    current = (current + 1) % sprites.length;
    img.src = sprites[current];
  });
}

async function getPokemonData(name) {
  try {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    const jsonData = await data.json();

    sprites = Object.values(jsonData.sprites).filter(
      (item) => typeof item === "string"
    );
    generateInfoSection(sprites[0], name);
  } catch (error) {
    console.error(error);
  }
}

function getSearchParams() {
  // Early return -> Caso location search, não faz nada.
  if (!location.search) {
    return;
  }

  // URLSearchParams é uma classe que facilita a manipulação de query strings
  const urlSearchParams = new URLSearchParams(location.search);

  // Pegando o valor do parâmetro name
  const pokemonName = urlSearchParams.get("name");

  changePageTitle(`Pagina do ${pokemonName}`);
  getPokemonData(pokemonName);
  generateCounter();
}

document.addEventListener("DOMContentLoaded", function () {
  getSearchParams();
});
