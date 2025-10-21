// A global variable to store the data so we don't have to fetch it every time
let allUserData = [];

function loadData() {
    // If data is already loaded, just filter and display it
    if (allUserData.length > 0) {
        displayData(allUserData);
        return;
    }

    // 1. Buat object XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // 2. Tentukan apa yang dilakukan saat request selesai
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Parse data JSON (now it's an array)
            allUserData = JSON.parse(xhr.responseText);

            // Tampilkan data
            displayData(allUserData);

        } else {
            console.error("Gagal mengambil data. Status: " + xhr.status);
            document.getElementById('hasil').innerHTML = '<p style="color: red;">Gagal memuat data.</p>';
        }
    };

    // 3. Kirim request GET ke file data.json
    xhr.open("GET", "data.json", true);
    xhr.send();
}

function displayData(data) {
    // Ambil elemen hasil dan input pencarian
    const hasilDiv = document.getElementById('hasil');
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();

    // Filter data berdasarkan nama
    const filteredData = data.filter(person => {
        return person.nama.toLowerCase().includes(searchTerm);
    });

    // Kosongkan div hasil sebelum menambahkan data baru
    hasilDiv.innerHTML = '';

    // Periksa apakah ada hasil
    if (filteredData.length === 0) {
        hasilDiv.innerHTML = '<p>Data tidak ditemukan.</p>';
        return;
    }

    // Tampilkan data yang sudah difilter
    filteredData.forEach(person => {
        const personDiv = document.createElement('div');
        personDiv.className = 'data-item'; // Add a class for styling
        personDiv.innerHTML = `
            <p><strong>Nama:</strong> ${person.nama}</p>
            <p><strong>Umur:</strong> ${person.umur}</p>
            <p><strong>Kota:</strong> ${person.kota}</p>
        `;
        hasilDiv.appendChild(personDiv);
    });
}

// Optional: Add event listener for real-time search
document.addEventListener('DOMContentLoaded', () => {
    // Load data when the page loads
    loadData();

    // Add event listener to the search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keyup', () => {
        // When user types, re-display the data with the new filter
        displayData(allUserData);
    });
});