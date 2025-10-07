// Ambil elemen-elemen HTML
const inputBarang = document.getElementById("barang");
const tombolTambah = document.getElementById("tambah");
const tombolHapusSemua = document.getElementById("hapusSemua");
const tabelBody = document.getElementById("tabel-body");

// Tambahkan event listener untuk tombol "Hapus Semua Barang"
tombolHapusSemua.addEventListener("click", () => {
    dataBarang = [];
    simpanData();
    tampilkanBarang();
});

// Tambahkan event listener untuk tombol "Hapus Semua Barang"
tombolHapusSemua.addEventListener("click", () => {
    dataBarang = [];
    simpanData();
    tampilkanBarang();
});


// Tambahkan event listener untuk tombol "Tambah Barang"
tombolTambah.addEventListener("click", () => {
    const barang = inputBarang.value.trim();
    if (barang !== "") {
        dataBarang.push(barang);
        simpanData();
        inputBarang.value = "";
        tampilkanBarang();
    }
});

// Tambahkan event listener untuk tombol "Hapus Semua Barang"
tombolHapusSemua.addEventListener("click", () => {
    dataBarang = [];
    simpanData();
    tampilkanBarang();
});

// Ambil data dari localStorage atau buat array kosong jika belum ada
let dataBarang = JSON.parse(localStorage.getItem("dataBarang")) || [];

// 🔄 Fungsi untuk menyimpan data ke localStorage
function simpanData() {
    localStorage.setItem("dataBarang", JSON.stringify(dataBarang));
}

// 🧾 Fungsi untuk menampilkan data di tabel
function tampilkanBarang() {
    tabelBody.innerHTML = "";

    if (dataBarang.length === 0) {
        tabelBody.innerHTML = `
      <tr><td colspan="3" style="text-align:center;">Belum ada data barang.</td></tr>
    `;
        return;
    }

    dataBarang.forEach((barang, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${index + 1}</td>
      <td>${barang}</td>
      <td>
        <button class="edit-btn" data-index="${index}">Edit</button>
        <button class="hapus-btn" data-index="${index}">Hapus</button>
      </td>
    `;
        tabelBody.appendChild(row);
    });

    // Tambahkan event listener setelah baris dibuat
    document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const index = btn.getAttribute("data-index");
            editBarang(index);
        });
    });

    document.querySelectorAll(".hapus-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const index = btn.getAttribute("data-index");
            hapusBarang(index);
        });
    });
}

// ➕ Tambah barang baru
tombolTambah.onclick = () => {
    const namaBarang = inputBarang.value.trim();

    if (namaBarang === "") {
        alert("Nama barang tidak boleh kosong!");
        return;
    }

    dataBarang.push(namaBarang);
    simpanData();
    inputBarang.value = "";
    tampilkanBarang();
};

// ✏️ Edit barang
function editBarang(index) {
    const barangLama = dataBarang[index];
    const barangBaru = prompt("Edit nama barang:", barangLama);

    if (barangBaru !== null && barangBaru.trim() !== "") {
        dataBarang[index] = barangBaru.trim();
        simpanData();
        tampilkanBarang();
    }
}

// ❌ Hapus barang per item
function hapusBarang(index) {
    if (confirm(`Yakin ingin menghapus "${dataBarang[index]}"?`)) {
        dataBarang.splice(index, 1);
        simpanData();
        tampilkanBarang();
    }
}

// 🗑️ Hapus semua barang
tombolHapusSemua.onclick = () => {
    if (confirm("Yakin ingin menghapus semua data barang?")) {
        dataBarang = [];
        simpanData();
        tampilkanBarang();
    }
};

// 🔃 Tampilkan data pertama kali saat halaman dibuka
tampilkanBarang();

// Simpan data ke localStorage saat halaman di-refresh
window.addEventListener("beforeunload", () => {
    localStorage.setItem("dataBarang", JSON.stringify(dataBarang));
});