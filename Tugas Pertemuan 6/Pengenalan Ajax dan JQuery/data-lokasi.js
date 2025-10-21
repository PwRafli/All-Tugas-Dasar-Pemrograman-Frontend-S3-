const lokasi = {
    asia: ["Indonesia", "Jepang", "India"],
    eropa: ["Prancis", "Jerman", "Italia"],
    amerika: ["Amerika Serikat", "Kanada", "Brasil"]
};

function updateNegara() {
    const selectBenua = document.getElementById("benua");
    const selectNegara = document.getElementById("negara");
    const hasilElement = document.getElementById("hasil");

    const benuaTerpilih = selectBenua.value;
    selectNegara.innerHTML = "";

    if (benuaTerpilih) {
        const defaultOption = document.createElement("option");
        defaultOption.textContent = "-- Pilih Negara --";
        selectNegara.appendChild(defaultOption);

        const negaraArray = lokasi[benuaTerpilih];
        negaraArray.forEach(negara => {
            const option = document.createElement("option");
            option.value = negara.toLowerCase();
            option.textContent = negara;
            selectNegara.appendChild(option);
        });

        selectNegara.addEventListener("change", tampilkanHasil);
    } else {
        const defaultOption = document.createElement("option");
        defaultOption.textContent = "-- Pilih Benua Dahulu --";
        selectNegara.appendChild(defaultOption);
    }
}

function tampilkanHasil() {
    const selectBenua = document.getElementById("benua");
    const selectNegara = document.getElementById("negara");
    const hasilElement = document.getElementById("hasil");

    const benuaTeks = selectBenua.options[selectBenua.selectedIndex].textContent;
    const negaraTeks = selectNegara.options[selectNegara.selectedIndex].textContent;

    if (selectNegara.value) {
        hasilElement.textContent = `Anda memilih ${negaraTeks} di benua ${benuaTeks}.`;
        hasilElement.style.color = "green";
    } else {
        hasilElement.textContent = "Silakan lengkapi pilihan Anda.";
        hasilElement.style.color = "orange";
    }
}
