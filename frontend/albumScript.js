const API = "http://localhost:3000/albums";

let selectedAlbumId = null;

async function loadAlbums() {
    const res = await fetch(API);
    const data = await res.json();

    const table = document.getElementById("albumTable");
    table.innerHTML = "";

    data.forEach(a => {
        table.innerHTML += `
            <tr>
                <td>${a.id}</td>
                <td>${a.name}</td>
                <td>${a.releaseYear}</td>
                <td>${a.listeners}</td>
                <td>${a.artistId}</td>
                <td>
                    <button onclick="editAlbum(${a.id}, '${a.name}', ${a.releaseYear}, ${a.listeners}, ${a.artistId})">Edit</button>
                    <button onclick="updateAlbum(${a.id})">Update</button>
                    <button onclick="deleteAlbum(${a.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

async function createAlbum() {
    const album = {
        name: document.getElementById("name").value,
        releaseYear: document.getElementById("releaseYear").value,
        listeners: document.getElementById("listeners").value,
        artistId: document.getElementById("artistId").value
    };

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(album)
    });

    loadAlbums();
}

function editAlbum(id, name, year, listeners, artistId) {
    selectedAlbumId = id;

    document.getElementById("name").value = name;
    document.getElementById("releaseYear").value = year;
    document.getElementById("listeners").value = listeners;
    document.getElementById("artistId").value = artistId;
}

async function updateAlbum(id = selectedAlbumId) {
    const album = {
        name: document.getElementById("name").value,
        releaseYear: document.getElementById("releaseYear").value,
        listeners: document.getElementById("listeners").value,
        artistId: document.getElementById("artistId").value
    };

    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(album)
    });

    loadAlbums();
}

async function deleteAlbum(id) {
    const confirmDelete = confirm("Are you sure you want to delete this album?");

    if (!confirmDelete) return;

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    loadAlbums();
}

loadAlbums();