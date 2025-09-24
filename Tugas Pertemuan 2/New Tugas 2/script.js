// Output
console.log("Hello dari console.log()");
document.write("<p>Hello dari document.write()</p>");
function sayHello() {
    document.getElementById("outputInnerHTML").innerHTML = "Hello dari innerHTML!";
}

// Variabel
var namaJudul = "Belajar Javascript";
let harga = 15000;
stock = 12;
document.getElementById("varOutput").innerHTML =
    `Judul: ${namaJudul}, Harga: ${harga}, Stock: ${stock}`;

// Dialog
function showAlert() {
    alert("Ini alert dari JavaScript!");
}
function showConfirm() {
    let result = confirm("Apakah kamu setuju?");
    alert("Jawaban kamu: " + result);
}
function showPrompt() {
    let nama = prompt("Masukkan nama kamu:", "Rudi");
    alert("Halo, " + nama);
}

// Operator
let a = 10, b = 5;
let hasil = (a > b) ? "a lebih besar dari b" : "a tidak lebih besar";
document.getElementById("operatorOutput").innerHTML = hasil;

// Percabangan
let nilai = 75;
if (nilai >= 80) {
    document.getElementById("ifOutput").innerHTML = "Nilai A";
} else if (nilai >= 70) {
    document.getElementById("ifOutput").innerHTML = "Nilai B";
} else {
    document.getElementById("ifOutput").innerHTML = "Nilai C";
}

// Perulangan
let loopOut = "";
for (let i = 1; i <= 5; i++) {
    loopOut += `<li>Perulangan ke-${i}</li>`;
}
document.getElementById("loopOutput").innerHTML = loopOut;

// Array
let buah = ["Apel", "Jeruk", "Manggis"];
buah.push("Pisang");
buah.shift(); // hapus depan
buah.pop();   // hapus belakang
let arrayOut = "";
buah.forEach((item, index) => {
    arrayOut += `<li>${index} : ${item}</li>`;
});
document.getElementById("arrayOutput").innerHTML = arrayOut;
