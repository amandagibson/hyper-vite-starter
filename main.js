const title = document.querySelector("#heading");
const statusMsg = document.querySelector("#status-text");
const reloadBtn = document.querySelector("#reload-btn");
const chirpContent = document.querySelector("#chirp-content");
const chirpAuthor = document.querySelector("#chirp-author");

title.textContent = "Hyper Chirp API";
statusMsg.textContent = "Loading...";
// chirpCard.textContent = "Chirp Card";
reloadBtn.textContent = "Reload";

async function getChirps() {
  const url = "https://hyperchirp.vercel.app/api/chirps?limit=10";
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
  statusMsg.textContent = "Loaded " + chirps.length + " chirps";
  chirpContent.textContent = chirps[0]?.content || "No chirps found";
  chirpAuthor.textContent = `chirpped by ${chirps[0]?.author_name || "Unknown"}`;
}

showChirps();
