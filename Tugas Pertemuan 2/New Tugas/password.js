// ===== Output JavaScript =====
console.log("Hello dari console.log()");
document.write("<p>Hello dari document.write()</p>");

// ===== Variabel =====
var nama = "Belajar JavaScript Eksternal";
let tahun = 2025;
document.getElementById("outputVar").innerHTML = `Judul: ${nama}, Tahun: ${tahun}`;

// ===== Alert =====
function sayHello() {
    alert("Halo, ini contoh alert dari file eksternal!");
}

// ===== InnerHTML =====
document.getElementById("outputInnerHTML").innerHTML = "Teks ini ditulis dengan innerHTML dari file eksternal.";

// ===== Prompt =====
function askPassword() {
    let pwd = prompt("Masukkan password:", "");
    if (pwd === "KudaSantet") {
        alert("Password benar!");
    } else {
        alert("Password salah!");
    }
}

// ===== Confirm =====
function askConfirm() {
    let yakin = confirm("Apakah kamu yakin ingin melanjutkan?");
    if (yakin) {
        alert("Kamu menekan OK");
    } else {
        alert("Kamu menekan Cancel");
    }
}

// ===== Operator =====
let x = 10;
let y = 5;

// 1. Aritmatika
let tambah = x + y;
let kurang = x - y;
let kali = x * y;
let bagi = x / y;
document.getElementById("operatorAritmatika").innerHTML =
    `Aritmatika: ${x}+${y}=${tambah}, ${x}-${y}=${kurang}, ${x}*${y}=${kali}, ${x}/${y}=${bagi}`;

// 2. Penugasan (Assignment)
let z = 20;
z += 5; // z = z + 5
document.getElementById("operatorAssignment").innerHTML =
    `Penugasan: z dimulai 20 lalu z+=5 → ${z}`;

// 3. Relasi / Perbandingan
let relasi = (x > y);
document.getElementById("operatorRelasi").innerHTML =
    `Relasi: Apakah ${x} > ${y}? Jawab: ${relasi}`;

// 4. Logika
let logika = (x > 0 && y > 0);
document.getElementById("operatorLogika").innerHTML =
    `Logika: (${x}>0 && ${y}>0) → ${logika}`;

// 5. Bitwise
let bitAnd = x & y;
let bitOr = x | y;
let bitXor = x ^ y;
document.getElementById("operatorBitwise").innerHTML =
    `Bitwise: ${x}&${y}=${bitAnd}, ${x}|${y}=${bitOr}, ${x}^${y}=${bitXor}`;

// 6. Ternary
let ternary = (x > y) ? "x lebih besar dari y" : "x tidak lebih besar dari y";
document.getElementById("operatorTernary").innerHTML =
    `Ternary: ${ternary}`;  