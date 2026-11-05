const searchForm = document.querySelector("#searchForm");
const usernameInput = document.querySelector("#username");
const searchButton = document.querySelector("#searchButton");
const statusMessage = document.querySelector("#status");
const profilecard = document.querySelector("#profilecard");

const avatar = document.querySelector("#avatar");
const nameEl = document.querySelector("#name");
const loginEl = document.querySelector("#login");
const bioEl = document.querySelector("#bio");
const reposEl = document.querySelector("#public_repos");
const profileLinkEl = document.querySelector("#profileLink");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();

  if (!username) {
    statusMessage.textContent = "Silakan masukkan username GitHub";
    profilecard.hidden = true;
    return;
  }

  statusMessage.textContent = "Loading...";
  profilecard.hidden = true;
  searchButton.disabled = true;
  searchButton.textContent = "Mencari...";

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (response.status === 404) {
      statusMessage.textContent = "User tidak ditemukan";
      profilecard.hidden = true;
      return;
    }

    if (!response.ok) {
      throw new Error(`Gagal mengambil data (HTTP ${response.status})`);
    }

    const userData = await response.json();

    avatar.src = userData.avatar_url || "";
    avatar.alt = `Foto profil ${userData.login}`;

    nameEl.textContent = userData.name || userData.login;
    loginEl.textContent = `@${userData.login}`;
    bioEl.textContent = userData.bio || "Pengguna belum menambahkan bio.";
    reposEl.textContent = userData.public_repos ?? 0;
    profileLinkEl.href = userData.html_url || "#";
    profileLinkEl.textContent = "Lihat Profil GitHub";

    statusMessage.textContent = "Data berhasil ditampilkan";
    profilecard.hidden = false;
  } catch (error) {
    statusMessage.textContent =
      error.message === "Failed to fetch"
        ? "Gagal terhubung ke GitHub. Periksa koneksi internet Anda."
        : error.message;
  } finally {
    searchButton.disabled = false;
    searchButton.textContent = "Cari";
  }
});
