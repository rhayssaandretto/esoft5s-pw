const search = new URLSearchParams(location.search);

let pokemonName = search.get("name");

async function fetchData() {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to load data", error);
  }
}

function setupPage(pokemonName) {
  document.title = "Página do " + pokemonName;
  const h2 = document.querySelector("h2");
  h2.textContent = "Informações sobre " + pokemonName;
}

async function loadImage(data) {
  try {
    const img = data.sprites.front_default;
    const image = await new Promise((resolve, reject) => {
      const imgElement = new Image();
      imgElement.onload = () => resolve(imgElement);
      imgElement.onerror = () => reject(new Error("Failed to load image"));
      imgElement.src = img;
    });
    return image;
  } catch (error) {
    console.error("Failed to create image", error);
    console.error(error.message);
  }
}

async function useImage(data) {
  try {
    const image = await loadImage(data);
    document.body.appendChild(image);
    document.querySelector("section").appendChild(image);
  } catch (error) {
    console.error(error.message);
  }
}

async function showPokemon() {
  try {
    const data = await fetchData();
    setupPage(pokemonName);
    await useImage(data);
  } catch (error) {
    console.error(error.message);
  }
}

showPokemon();
