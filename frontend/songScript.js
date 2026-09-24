const API = "http://localhost:3000/songs";

let selectedSongId = null;

async function loadSongs() {
    const res = await fetch(API);
    const data = await res.json();

    const table = document.getElementById("songTable");
    table.innerHTML = "";

    data.forEach(s => {
        table.innerHTML += `
            <tr>
                <td>${s.id}</td>
                <td>${s.songName}</td>
                <td>${s.releaseYear}</td>
                <td>${s.albumId}</td>
                <td>
                    <button onclick="editSong(${s.id}, '${s.songName}', ${s.releaseYear}, ${s.albumId})">Edit</button>
                    <button onclick="updateSong(${s.id})">Update</button>
                    <button onclick="deleteSong(${s.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

async function createSong() {
    try {
        const song = {
            songName: document.getElementById("songName").value,
            releaseYear: document.getElementById("releaseYear").value,
            albumId: document.getElementById("albumId").value
        };

        const res = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(song)
        });

        if (!res.ok) throw new Error("Failed to create song");

        loadSongs();
    } catch (err) {
        console.error(err);
    }
}

function editSong(id, name, year, albumId) {
    selectedSongId = id;

    document.getElementById("songName").value = name;
    document.getElementById("releaseYear").value = year;
    document.getElementById("albumId").value = albumId;
}

async function updateSong(id = selectedSongId) {
    const song = {
        songName: document.getElementById("songName").value,
        releaseYear: document.getElementById("releaseYear").value,
        albumId: document.getElementById("albumId").value
    };

    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(song)
    });

    loadSongs();
}

async function deleteSong(id) {
    const confirmDelete = confirm("Are you sure you want to delete this song?");

    if (!confirmDelete) return;

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    loadSongs();
}

loadSongs();