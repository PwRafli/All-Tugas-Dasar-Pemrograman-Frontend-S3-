// =====================
// Bagian 1: Event Dasar
// =====================
const btnEvent = document.getElementById("btnEvent");
btnEvent.addEventListener("click", () => {
    alert("Tombol dengan addEventListener diklik!");
});

// =====================
// Bagian 2: Event Bubbling
// =====================
const outer1 = document.getElementById("outer1");
const inner1 = document.getElementById("inner1");

outer1.addEventListener("click", () => {
    alert("Outer elemen diklik (Bubbling)");
});

inner1.addEventListener("click", () => {
    alert("Inner elemen diklik (Bubbling)");
});

// =====================
// Bagian 3: Event Capturing
// =====================
const outer2 = document.getElementById("outer2");
const inner2 = document.getElementById("inner2");

outer2.addEventListener("click", () => {
    alert("Outer elemen diklik (Capturing)");
}, true);

inner2.addEventListener("click", () => {
    alert("Inner elemen diklik (Capturing)");
}, true);

// =====================
// Bagian 4: Stop Propagation
// =====================
const outer3 = document.getElementById("outer3");
const inner3 = document.getElementById("inner3");

outer3.addEventListener("click", () => {
    alert("Outer elemen diklik (Propagation)");
});

inner3.addEventListener("click", (event) => {
    alert("Inner elemen diklik (Propagation dihentikan)");
    event.stopPropagation();
});
