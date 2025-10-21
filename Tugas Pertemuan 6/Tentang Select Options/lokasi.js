// Data lokasi berdasarkan benua
const lokasi = {
    asia: ["Indonesia", "Jepang", "India"],
    eropa: ["Prancis", "Jerman", "Italia"],
    amerika: ["Amerika Serikat", "Kanada", "Brasil"]
};

// Fungsi utama untuk mengupdate dropdown negara
function updateNegara() {
    const selectBenua = document.getElementById("benua");
    const selectNegara = document.getElementById("negara");
    const hasilElement = document.getElementById("hasil");

    const benuaTerpilih = selectBenua.value;

    // Reset isi dropdown negara
    selectNegara.innerHTML = "";

    if (benuaTerpilih) {
        // Tambahkan opsi default
        const defaultOption = document.createElement("option");
        defaultOption.textContent = "-- Pilih Negara --";
        selectNegara.appendChild(defaultOption);

        // Ambil data negara sesuai benua
        const negaraArray = lokasi[benuaTerpilih];

        // Tambahkan opsi baru
        negaraArray.forEach(negara => {
            const option = document.createElement("option");
            option.value = negara.toLowerCase();
            option.textContent = negara;
            selectNegara.appendChild(option);
        });

        // Tambahkan event listener ke dropdown negara
        selectNegara.addEventListener("change", tampilkanHasil);
    } else {
        // Jika belum memilih benua
        const defaultOption = document.createElement("option");
        defaultOption.textContent = "-- Pilih Benua Dahulu --";
        selectNegara.appendChild(defaultOption);
    }
}

// Fungsi untuk menampilkan hasil akhir
function tampilkanHasil() {
    const selectBenua = document.getElementById("benua");
    const selectNegara = document.getElementById("negara");
    const hasilElement = document.getElementById("hasil");

    const benuaTeks = selectBenua.options[selectBenua.selectedIndex].textContent;
    const negaraTeks = selectNegara.options[selectNegara.selectedIndex].textContent;

    if (selectNegara.value) {
        hasilElement.textContent = `Anda memilih: ${negaraTeks}, yang terletak di benua ${benuaTeks}.`;
        hasilElement.style.color = "green";
    } else {
        hasilElement.textContent = "Silakan lengkapi pilihan Anda.";
        hasilElement.style.color = "orange";
    }
}

// Panggil fungsi saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
    console.log("Halaman siap digunakan");
});

// Panggil fungsi updateNegara saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", updateNegara);