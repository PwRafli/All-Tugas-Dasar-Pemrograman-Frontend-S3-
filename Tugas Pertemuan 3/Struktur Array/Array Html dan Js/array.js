function clearOutput() {
    document.getElementById("output").innerHTML = "";
}

function hapusArrayDenganDelete() {
    clearOutput();
    var buah = ["Apel", "Jeruk", "Manggis", "Semangka"];
    delete buah[2];  // Menghapus index ke-2, tapi meninggalkan ruang kosong

    let output = "<h3>Isi Array Setelah Delete:</h3><ul>";
    buah.forEach((item, index) => {
        output += `<li>Index ${index}: ${item}</li>`;
    });
    output += "</ul>";

    document.getElementById("output").innerHTML = output;
}

function hapusArrayDariBelakang() {
    clearOutput();
    var bunga = ["Mawar", "Melati", "Anggrek", "Sakura"];
    bunga.pop();  // hapus elemen belakang

    let output = "<h3>Daftar Produk:</h3><ol>";
    bunga.forEach((data) => {
        output += `<li>${data}</li>`;
    });
    output += "</ol>";

    document.getElementById("output").innerHTML = output;
}

function hapusArrayDariDepan() {
    clearOutput();
    var bunga = ["Mawar", "Melati", "Anggrek", "Sakura"];
    bunga.shift();  // hapus elemen depan

    let output = "<h3>Daftar Produk:</h3><ol>";
    bunga.forEach((data) => {
        output += `<li>${data}</li>`;
    });
    output += "</ol>";

    document.getElementById("output").innerHTML = output;
}