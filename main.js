const title = document.querySelector("#heading");
const statusMsg = document.querySelector(".status-text");
const reloadBtn = document.querySelector("#reload-btn");
const chirpsContainer = document.querySelector("#chirps-container");

title.textContent = "Hyper Chirp API";
reloadBtn.textContent = "Load more";

let limit = 10;

async function getChirps() {
  const url = `https://hyperchirp.vercel.app/api/chirps?limit=${limit}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("HTTP " + response.status);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

async function showChirps() {
  statusMsg.textContent = "Loading...";
  const chirps = await getChirps();
  statusMsg.textContent = `Success! Loaded ${chirps.length} chirps`;
  if (chirps.length < limit) {
    reloadBtn.textContent = "All chirps loaded";
    reloadBtn.disabled = true;
  }

  chirpsContainer.innerHTML = "";
  if (!chirps.length) {
    chirpsContainer.textContent = "Error: No chirps found";
    return;
  }

  const cards = chirps.map((chirp) => createChirpCard(chirp));
  chirpsContainer.append(...cards);
}

function createChirpCard(chirp) {
  const card = document.createElement("div");
  card.classList.add("chirp-card");

  const content = document.createElement("p");
  content.classList.add("chirp-content");
  content.textContent = chirp.content;

  const author = document.createElement("p");
  author.classList.add("chirp-author");
  if (chirp.is_anonymous == true) {
    author.textContent = "Chirpped by an anonymous user";
  } else {
    author.textContent = `Chirpped by ${chirp.author_name || "Unknown"}`;
  }

  card.append(content, author);
  return card;
}

showChirps();
reloadBtn.addEventListener("click", () => {
  limit += 10;
  showChirps();
});
