// Ambil elemen
const openPopup = document.getElementById('openPopup');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');

// Buka popup saat tombol diklik
openPopup.addEventListener('click', () => {
    popup.style.display = 'block';
});

// Tutup popup saat tombol close diklik
closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Tutup popup saat klik di luar konten
window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});