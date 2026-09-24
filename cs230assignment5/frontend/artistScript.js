const API = "http://localhost:3000/artists";

let selectedArtistId = null;

async function loadArtists() {
    const res = await fetch(API);
    const data = await res.json();

    const table = document.getElementById("artistTable");
    table.innerHTML = "";

    data.forEach(a => {
        table.innerHTML += `
            <tr>
                <td>${a.id}</td>
                <td>${a.artistName}</td>
                <td>${a.genre}</td>
                <td>${a.monthlyListeners}</td>
                <td>
                    <button onclick="editArtist(${a.id}, '${a.artistName}', '${a.genre}', ${a.monthlyListeners})">
                        Edit
                    </button>
                    <button onclick="updateArtist(${a.id})">Update</button>
                    <button onclick="deleteArtist(${a.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

async function createArtist() {
    const artist = {
        artistName: document.getElementById("name").value,
        genre: document.getElementById("genre").value,
        monthlyListeners: document.getElementById("listeners").value
    };

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(artist)
    });

    loadArtists();
}

function editArtist(id, name, genre, listeners) {
    selectedArtistId = id;
    document.getElementById("name").value = name;
    document.getElementById("genre").value = genre;
    document.getElementById("listeners").value = listeners;
}

async function updateArtist(id = selectedArtistId) {
    const artist = {
        artistName: document.getElementById("name").value,
        genre: document.getElementById("genre").value,
        monthlyListeners: document.getElementById("listeners").value
    };

    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(artist)
    });

    loadArtists();
}

async function deleteArtist(id) {
    const confirmDelete = confirm("Are you sure you want to delete this artist?");

    if (!confirmDelete) return;

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    loadArtists();
}

loadArtists();