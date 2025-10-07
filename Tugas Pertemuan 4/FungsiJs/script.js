// ==========================
// 1. Declarative Function
// ==========================
function salam() {
    console.log("Halo, selamat datang di JavaScript!");
}
salam();


// ==========================
// 2. Anonymous Function
// ==========================
// Disimpan dalam variabel tanpa nama fungsi (anonymous)
const perkalian = function (a, b) {
    return a * b;
};
console.log("Hasil perkalian:", perkalian(4, 5));


// ==========================
// 3. Arrow Function
// ==========================
const penjumlahan = (a, b) => a + b;
console.log("Hasil penjumlahan:", penjumlahan(10, 15));


// ==========================
// 4. Parameter Fungsi
// ==========================

// 4.1 Required Parameter
function cetakNama(nama) {
    console.log("Nama Anda adalah:", nama);
}
cetakNama("Rafli");

// 4.2 Optional Parameter
function sapa(nama = "Pengunjung") {
    console.log("Halo,", nama);
}
sapa();           // Tanpa argumen → default
sapa("Rafli");    // Dengan argumen

// 4.3 Callback Function
function prosesData(data, callback) {
    console.log("Memproses data:", data);
    callback();
}
function selesai() {
    console.log("Proses selesai!");
}
prosesData("Data Mahasiswa", selesai);

// 4.4 Rest Parameters
function hitungTotal(...angka) {
    let total = 0;
    for (let n of angka) {
        total += n;
    }
    console.log("Total:", total);
}
hitungTotal(10, 20, 30, 40);

// 4.5 Default Parameter